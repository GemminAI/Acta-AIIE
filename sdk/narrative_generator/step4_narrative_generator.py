"""
narrative_generator.py
GemminAI Narrative Engine v1.2
GCP Cloud Functions (1st gen)

pulse_meter の構造を流用。
入力: Bridge からの JSON ペイロード
出力: Narrative State Vector → Hostinger MySQL に保存
"""

import os
import json
import math
import hashlib
import logging
from datetime import datetime, date

import functions_framework
import google.generativeai as genai
import sqlalchemy
from flask import Request

# ─────────────────────────────────────────────
# 定数（変更禁止）
# ─────────────────────────────────────────────
ESCALATION_BIAS_MAX = 0.85   # escalation_biasのハード上限
DPI_CLIP_MIN        = 0.1
DPI_CLIP_MAX        = 0.9
DPI_EMA_WEIGHT      = 0.7    # 当日 70%、7日平均 30%

# ─────────────────────────────────────────────
# Structural Vector → Narrative 変換マップ
# ─────────────────────────────────────────────
PERSONA_PROMPT = {
    "JP": "あなたは日本の地政学研究者です。",
    "US": "あなたは米国の安全保障アナリストです。",
    "CN": "あなたは中国の国際関係研究者です。",
    "GB": "あなたは英国の外交政策アナリストです。",
    "EU": "あなたはEUの多国間主義研究者です。",
    "QA": "あなたは中東の地域安全保障アナリストです。",
}


# ─────────────────────────────────────────────
# DB接続
# ─────────────────────────────────────────────
def get_db_engine():
    db_url = (
        f"mysql+pymysql://{os.environ['DB_USER']}:{os.environ['DB_PASSWORD']}"
        f"@{os.environ['DB_HOST']}/{os.environ['DB_NAME']}?charset=utf8mb4"
    )
    return sqlalchemy.create_engine(db_url, pool_size=1, max_overflow=0)


# ─────────────────────────────────────────────
# DPI 計算（ガードレール付き）
# ─────────────────────────────────────────────
def calc_dpi(distortion_index: float, silence_topology: float,
             narrative_grafting: float, momentum: float = 0.0,
             dpi_7day_avg: float = 0.5) -> dict:

    dpi_raw = (
        0.4 * distortion_index
        + 0.2 * silence_topology
        + 0.2 * narrative_grafting
        + 0.2 * momentum
    )

    dpi_clipped = max(DPI_CLIP_MIN, min(DPI_CLIP_MAX, dpi_raw))
    dpi_smooth  = DPI_EMA_WEIGHT * dpi_clipped + (1 - DPI_EMA_WEIGHT) * dpi_7day_avg

    return {
        "dpi_raw":     round(dpi_raw, 4),
        "dpi_clipped": round(dpi_clipped, 4),
        "dpi_smooth":  round(dpi_smooth, 4),
    }


# ─────────────────────────────────────────────
# Narrative State Vector 計算
# ─────────────────────────────────────────────
def calc_narrative_vector(sv: dict, dpi: dict) -> dict:
    dpi_s = dpi["dpi_smooth"]

    def effective(baseline: float, influence: float) -> float:
        return baseline * (1 + math.tanh(influence))

    military_emphasis = effective(
        sv["security_priority"],
        0.6 * dpi_s + 0.4 * sv["state_control"]
    )

    economic_emphasis = effective(
        sv["market_orientation"],
        0.5 * dpi_s + 0.5 * (1 - sv["liberal_norms"])
    )

    domestic_stability_emphasis = effective(
        1.0 - sv["state_control"],
        0.4 * dpi_s
    )

    alliance_frame_strength = effective(
        sv["liberal_norms"],
        0.3 * dpi_s + 0.7 * (1 - sv["narrative_cohesion"])
    )

    market_sensitivity = effective(
        sv["market_orientation"],
        0.5 * dpi_s
    )

    escalation_bias_raw = (
        sv["security_priority"] * 0.5
        + dpi_s * 0.3
        + sv["state_control"] * 0.2
    )
    escalation_bias = min(escalation_bias_raw, ESCALATION_BIAS_MAX)

    # system_stability（Volatility Indexは蓄積データが必要なため初期は暫定計算）
    system_stability = round(
        1.0 - max(0.0, min(1.0, abs(dpi["dpi_raw"] - dpi["dpi_smooth"]) * 2)), 4
    )

    def clamp(v: float) -> float:
        return round(max(0.0, min(1.0, v)), 4)

    return {
        "military_emphasis":            clamp(military_emphasis),
        "economic_emphasis":            clamp(economic_emphasis),
        "domestic_stability_emphasis":  clamp(domestic_stability_emphasis),
        "alliance_frame_strength":      clamp(alliance_frame_strength),
        "market_sensitivity":           clamp(market_sensitivity),
        "escalation_bias":              clamp(escalation_bias),
        "system_stability":             system_stability,
    }


# ─────────────────────────────────────────────
# input_hash 生成
# ─────────────────────────────────────────────
def make_input_hash(sv: dict, dpi_smooth: float) -> str:
    raw = json.dumps(sv, sort_keys=True) + str(dpi_smooth)
    return hashlib.sha256(raw.encode()).hexdigest()[:16]


# ─────────────────────────────────────────────
# DB保存
# ─────────────────────────────────────────────
def save_vector(engine, fact_id: str, country_code: str,
                calc_date: str, sv_version: str,
                dpi: dict, vector: dict, input_hash: str):

    output_raw = json.dumps(vector, sort_keys=True)
    output_hash = hashlib.sha256(output_raw.encode()).hexdigest()[:16]

    with engine.connect() as conn:
        conn.execute(sqlalchemy.text("""
            INSERT INTO narrative_state_vectors
                (fact_id, country_code, calculation_date, vector_version,
                 military_emphasis, economic_emphasis, domestic_stability_emphasis,
                 alliance_frame_strength, market_sensitivity, escalation_bias,
                 system_stability, dpi_raw, dpi_clipped, dpi_smooth,
                 structural_vector_version, input_hash, output_hash)
            VALUES
                (:fact_id, :country_code, :calculation_date, :vector_version,
                 :military_emphasis, :economic_emphasis, :domestic_stability_emphasis,
                 :alliance_frame_strength, :market_sensitivity, :escalation_bias,
                 :system_stability, :dpi_raw, :dpi_clipped, :dpi_smooth,
                 :sv_version, :input_hash, :output_hash)
            ON DUPLICATE KEY UPDATE
                military_emphasis           = VALUES(military_emphasis),
                economic_emphasis           = VALUES(economic_emphasis),
                domestic_stability_emphasis = VALUES(domestic_stability_emphasis),
                alliance_frame_strength     = VALUES(alliance_frame_strength),
                market_sensitivity          = VALUES(market_sensitivity),
                escalation_bias             = VALUES(escalation_bias),
                system_stability            = VALUES(system_stability),
                dpi_raw                     = VALUES(dpi_raw),
                dpi_clipped                 = VALUES(dpi_clipped),
                dpi_smooth                  = VALUES(dpi_smooth),
                input_hash                  = VALUES(input_hash),
                output_hash                 = VALUES(output_hash)
        """), {
            "fact_id":                      fact_id,
            "country_code":                 country_code,
            "calculation_date":             calc_date,
            "vector_version":               "v1.0",
            "sv_version":                   sv_version,
            "input_hash":                   input_hash,
            "output_hash":                  output_hash,
            **dpi,
            **vector,
        })
        conn.commit()


# ─────────────────────────────────────────────
# メインハンドラ
# ─────────────────────────────────────────────
@functions_framework.http
def narrative_generator(request: Request):

    # 認証
    data = request.get_json(silent=True) or {}
    if data.get("_secret") != os.environ.get("GEMMINA_SECRET"):
        return {"error": "unauthorized"}, 401

    country_code = data.get("country_code", "JP")
    fact_id      = data.get("fact_id", f"{date.today().strftime('%Y%m%d')}-001")
    calc_date    = data.get("calculation_date", date.today().isoformat())
    sv_version   = data.get("structural_vector_version", "SIPRI_2025")

    # Structural Vector（Bridgeから受け取り）
    sv = {
        "state_control":        data.get("state_control", 0.5),
        "market_orientation":   data.get("market_orientation", 0.5),
        "security_priority":    data.get("security_priority", 0.5),
        "liberal_norms":        data.get("liberal_norms", 0.5),
        "narrative_cohesion":   data.get("narrative_cohesion", 0.5),
        "information_openness": data.get("information_openness", 0.5),
    }

    # DPI計算
    dpi = calc_dpi(
        distortion_index   = data.get("distortion_index", 0.5),
        silence_topology   = data.get("silence_topology", 0.5),
        narrative_grafting = data.get("narrative_grafting", 0.5),
    )

    # Narrative State Vector計算
    vector = calc_narrative_vector(sv, dpi)

    # input_hash
    input_hash = make_input_hash(sv, dpi["dpi_smooth"])

    # DB保存
    try:
        engine = get_db_engine()
        save_vector(engine, fact_id, country_code, calc_date,
                    sv_version, dpi, vector, input_hash)
    except Exception as e:
        logging.error(f"[narrative_generator] DB save failed: {e}")
        return {"error": str(e)}, 500

    return {
        "status":       "ok",
        "country_code": country_code,
        "fact_id":      fact_id,
        "dpi":          dpi,
        "vector":       vector,
        "input_hash":   input_hash,
    }, 200
