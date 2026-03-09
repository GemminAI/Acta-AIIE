"""
gem0_semantic_scholar.py
────────────────────────────────────────────────────────────────
GemminAI Gem0 拡張モジュール — Semantic Scholar API 連携
Pipeline Position: Layer 0 (Gem0) — Contextual Depth Booster
Compatible with: GemminAI SRS v4.0 / CFI v2.1
────────────────────────────────────────────────────────────────

役割:
  Gem0のソース選別時に、記事のキーワードで学術論文を検索し
  `contextual_depth_score` を補強する。
  査読済み論文がヒットした場合、`is_historical_rich` 判定の
  信頼性を大幅に高める。
"""

import os
import time
import requests
import json
import logging
from typing import Optional

logger = logging.getLogger(__name__)

# ─── 定数 ────────────────────────────────────────────────────
S2_SEARCH_ENDPOINT = "https://api.semanticscholar.org/graph/v1/paper/search"
S2_BATCH_ENDPOINT  = "https://api.semanticscholar.org/graph/v1/paper/batch"

# Gem0スコアへの加算定数（変更禁止）
ACADEMIC_DEPTH_BONUS = {
    "high_citation":   0.20,   # citationCount >= 100
    "mid_citation":    0.10,   # citationCount 10–99
    "low_citation":    0.05,   # citationCount 1–9
    "zero_citation":   0.00,   # 未引用論文はボーナスなし
}
MAX_RESULTS_PER_QUERY = 3      # APIコスト節約のため上位3件に絞る
REQUEST_TIMEOUT_SEC   = 10

# Exponential Backoff 設定（Semantic Scholar API 必須要件）
BACKOFF_MAX_RETRIES   = 4      # 最大リトライ回数
BACKOFF_BASE_SEC      = 1.0    # 初回待機秒数（1→2→4→8秒）
BACKOFF_MULTIPLIER    = 2.0    # 待機時間の倍率


class SemanticScholarEnricher:
    """
    Gem0の出力JSONを学術的深層情報で補強するクラス。

    使用例:
        enricher = SemanticScholarEnricher()
        result = enricher.enrich_gem0_output(gem0_output, query_keywords)
    """

    def __init__(self):
        self.api_key = os.getenv("S2_API_KEY")
        if not self.api_key:
            raise EnvironmentError(
                "[Gem0-S2] S2_API_KEY が環境変数に設定されていません。"
            )
        self.headers = {"x-api-key": self.api_key}

    # ─── Public API ──────────────────────────────────────────

    def enrich_gem0_output(
        self,
        gem0_output: dict,
        query_keywords: str,
    ) -> dict:
        """
        Gem0の出力JSONを受け取り、学術論文データを付与して返す。

        Args:
            gem0_output:     Gem0が生成した標準出力JSON
            query_keywords:  記事タイトル or 主要キーワード（英語推奨）

        Returns:
            gem0_output に `academic_context` フィールドを追加したdict
        """
        papers = self._search_papers(query_keywords)

        if not papers:
            logger.info("[Gem0-S2] 関連論文なし。academic_context をスキップ。")
            gem0_output["academic_context"] = {
                "papers_found": 0,
                "academic_depth_bonus": 0.0,
                "papers": [],
            }
            return gem0_output

        bonus = self._calc_depth_bonus(papers)
        gem0_output["academic_context"] = {
            "papers_found": len(papers),
            "academic_depth_bonus": bonus,
            "papers": papers,
        }

        # contextual_depth_score を補強
        gem0_output["source_depth_score"] = round(
            gem0_output.get("source_depth_score", 0) + bonus, 2
        )

        # 論文がヒットした場合は depth_status を強制昇格
        if bonus >= ACADEMIC_DEPTH_BONUS["mid_citation"]:
            gem0_output["depth_status"] = "HIGH"

        logger.info(
            f"[Gem0-S2] {len(papers)}件の論文を検出。"
            f"depth_bonus={bonus} / depth_status={gem0_output['depth_status']}"
        )
        return gem0_output

    # ─── Private Methods ─────────────────────────────────────

    def _search_papers(self, query: str) -> list[dict]:
        """
        Semantic Scholar でキーワード検索し、上位N件を返す。
        429 レート制限時は Exponential Backoff でリトライする（API必須要件）。
        """
        params = {
            "query":  query,
            "limit":  MAX_RESULTS_PER_QUERY,
            "fields": "title,authors,year,citationCount,referenceCount,externalIds",
        }
        wait_sec = BACKOFF_BASE_SEC

        for attempt in range(1, BACKOFF_MAX_RETRIES + 1):
            try:
                r = requests.get(
                    S2_SEARCH_ENDPOINT,
                    headers=self.headers,
                    params=params,
                    timeout=REQUEST_TIMEOUT_SEC,
                )

                if r.status_code == 200:
                    data = r.json().get("data", [])
                    return [self._normalize_paper(p) for p in data]

                elif r.status_code == 429:
                    # レート制限 — Exponential Backoff
                    if attempt == BACKOFF_MAX_RETRIES:
                        logger.error(
                            f"[Gem0-S2] RATE_LIMIT — {BACKOFF_MAX_RETRIES}回リトライ後も解消せず。スキップ。"
                        )
                        return []
                    logger.warning(
                        f"[Gem0-S2] RATE_LIMIT (429) — {wait_sec:.1f}秒後にリトライ "
                        f"({attempt}/{BACKOFF_MAX_RETRIES})"
                    )
                    time.sleep(wait_sec)
                    wait_sec *= BACKOFF_MULTIPLIER  # 1→2→4→8秒

                else:
                    logger.error(
                        f"[Gem0-S2] API Error {r.status_code}: {r.text[:200]}"
                    )
                    return []

            except requests.exceptions.Timeout:
                logger.error("[Gem0-S2] FETCH_TIMEOUT — Semantic Scholar API")
                return []
            except Exception as e:
                logger.error(f"[Gem0-S2] 予期しないエラー: {e}")
                return []

        return []  # リトライ上限到達（安全網）

    def _normalize_paper(self, raw: dict) -> dict:
        """APIレスポンスをGemminAI内部形式に正規化する。"""
        return {
            "title":           raw.get("title"),
            "year":            raw.get("year"),
            "citation_count":  raw.get("citationCount", 0),
            "reference_count": raw.get("referenceCount", 0),
            "arxiv_id":        raw.get("externalIds", {}).get("ArXiv"),
            "doi":             raw.get("externalIds", {}).get("DOI"),
        }

    def _calc_depth_bonus(self, papers: list[dict]) -> float:
        """
        最高被引用数の論文を基準にボーナス値を決定する。
        複数論文の合算は行わない（最大値を採用）。
        """
        if not papers:
            return 0.0
        max_citations = max(p["citation_count"] for p in papers)
        if max_citations >= 100:
            return ACADEMIC_DEPTH_BONUS["high_citation"]
        elif max_citations >= 10:
            return ACADEMIC_DEPTH_BONUS["mid_citation"]
        elif max_citations >= 1:
            return ACADEMIC_DEPTH_BONUS["low_citation"]
        return ACADEMIC_DEPTH_BONUS["zero_citation"]


# ─── CLI テスト用エントリーポイント ──────────────────────────
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Gem0の標準出力をモック
    mock_gem0_output = {
        "url":                "https://example.com/article",
        "article_id":         "abc123def456789",
        "clean_text":         "サンプル記事テキスト...",
        "depth_status":       "LOW",
        "source_depth_score": 2,
        "images_found":       True,
        "primary_image_url":  "https://example.com/image.jpg",
        "gem0_timestamp":     "2026-03-03T09:00:00Z",
    }

    enricher = SemanticScholarEnricher()
    enriched = enricher.enrich_gem0_output(
        gem0_output=mock_gem0_output,
        query_keywords="semiconductor export control geopolitics",
    )

    print(json.dumps(enriched, indent=2, ensure_ascii=False))
