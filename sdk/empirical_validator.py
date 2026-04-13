"""
empirical_validator.py
Acta-AIIE SDK — QMNSO v3.1 Empirical Validator

Reproduces Table 2 (AIC comparison) and Figure 3/4 statistical tests
from the QMNSO v3.1 paper (NarrativeQM3_v31_final.pdf).

Implements:
  V3: Non-Markovian Memory     — Weibull vs Exponential AIC comparison
  F4: Excited State Entropy    — Permutation test H_pair > H_noise

Reference results (4,729 narratives, 854 events):
  V3: Weibull β=0.78<1, ΔAIC=28,953 — Non-Markovian confirmed
  F4: p=0.0002, Cliff's δ=0.12     — Excited state detected

Repository: https://github.com/GemminAI/Acta-AIIE
License:    MIT — © 2026 Gemmina Intelligence LLC.
"""

import numpy as np
import pandas as pd
from scipy.stats import expon, weibull_min
from scipy.stats import permutation_test


class EmpiricalValidator:
    """
    QMNSO v3.1 論文の Table 2 & Figure 3/4 を再現するための統計バリデーター。

    Required DataFrame columns:
      delta_t  : float  — 対ナラティブペア間の時間差 Δt (hours)
      is_pair  : bool   — T25-matched structural pair か否か
      entropy  : float  — SIV variance (narrative state entropy proxy)
    """

    def __init__(self, data_df: pd.DataFrame):
        self.df = data_df

    # ──────────────────────────────────────────────
    # V3: Non-Markovian Memory (Table 2)
    # ──────────────────────────────────────────────

    def verify_v3_hazard(self) -> dict:
        """
        V3: 非マルコフ性（記憶依存性）の検定

        Weibull 分布 (k=2, memory-dependent) と
        指数分布 (k=1, memoryless) の AIC を比較する。

        QMNSO v3.1 基準値:
          Weibull  AIC = 796,189  (ΔAIC = 0,     BEST FIT)
          Expon    AIC = 825,141  (ΔAIC = 28,953, REJECTED)
          β = 0.78 < 1 → 減衰型ハザード → 非マルコフ記憶を確認

        Returns:
            weibull_shape : β (< 1: 減衰型, > 1: 増大型, = 1: 指数/マルコフ)
            aic_weibull   : Weibull AIC
            aic_expon     : 指数分布 AIC
            delta_aic     : AIC_expon − AIC_weibull (>10 で非マルコフ確定)
            result        : "Non-Markovian Confirmed" or "Inconclusive"
        """
        delta_t = self.df["delta_t"].dropna().values

        # 指数分布 (k=1, Memoryless / Poisson)
        loc_e, scale_e = expon.fit(delta_t, floc=0)
        loglik_e = np.sum(expon.logpdf(delta_t, loc=loc_e, scale=scale_e))
        aic_e = 2 * 1 - 2 * loglik_e  # k=1 パラメータ

        # Weibull 分布 (k=2, Non-Markovian)
        shape_w, loc_w, scale_w = weibull_min.fit(delta_t, floc=0)
        loglik_w = np.sum(weibull_min.logpdf(delta_t, shape_w, loc=loc_w, scale=scale_w))
        aic_w = 2 * 2 - 2 * loglik_w  # k=2 パラメータ

        delta_aic = aic_e - aic_w

        return {
            "weibull_shape": float(shape_w),
            "aic_weibull": float(aic_w),
            "aic_expon": float(aic_e),
            "delta_aic": float(delta_aic),
            "result": "Non-Markovian Confirmed" if delta_aic > 10 else "Inconclusive",
        }

    # ──────────────────────────────────────────────
    # F4: Excited State Entropy (Figure 4)
    # ──────────────────────────────────────────────

    def verify_f4_excited_state(self, n_resamples: int = 5000) -> dict:
        """
        F4: 励起状態（情報の熱量）の検定

        構造的ペア (T25-matched) のエントロピー H_pair が
        ランダムノイズ H_noise を統計的に上回るかを
        パーミュテーション検定で確認する。

        量子力学的解釈:
          古典モデル予測:  H_pair ≤ H_noise
          実測 (QMNSO):   H_pair > H_noise  → 干渉項 2Re(Ψ₁*Ψ₂) が必要

        QMNSO v3.1 基準値:
          Pair mean  = 0.0501, Noise mean = 0.0357
          Difference = +0.0143, p = 0.0002
          Cliff's δ  = 0.12 (small but robust across 854 events)

        Args:
            n_resamples: パーミュテーション回数 (default: 5,000)

        Returns:
            pair_mean  : 構造的ペアのエントロピー平均
            noise_mean : ノイズのエントロピー平均
            difference : pair_mean − noise_mean
            p_value    : パーミュテーション検定 p 値
            cliffs_d   : Cliff's δ 効果量
            status     : "Excited State Detected" or "Crystallized"
        """
        pair_h  = self.df[self.df["is_pair"] == True]["entropy"].values
        noise_h = self.df[self.df["is_pair"] == False]["entropy"].values

        def statistic(x, y):
            return float(np.mean(x) - np.mean(y))

        res = permutation_test(
            (pair_h, noise_h),
            statistic,
            alternative="greater",
            n_resamples=n_resamples,
        )

        # Cliff's δ 効果量
        cliffs_d = _cliffs_delta(pair_h, noise_h)

        return {
            "pair_mean": float(np.mean(pair_h)),
            "noise_mean": float(np.mean(noise_h)),
            "difference": float(np.mean(pair_h) - np.mean(noise_h)),
            "p_value": float(res.pvalue),
            "cliffs_d": float(cliffs_d),
            "status": "Excited State Detected" if res.pvalue < 0.05 else "Crystallized",
        }

    # ──────────────────────────────────────────────
    # Combined Report
    # ──────────────────────────────────────────────

    def full_report(self) -> dict:
        """V3 + F4 を両方実行してまとめて返す"""
        v3 = self.verify_v3_hazard()
        f4 = self.verify_f4_excited_state()
        return {"V3_NonMarkovian": v3, "F4_ExcitedState": f4}


# ──────────────────────────────────────────────
# Utilities
# ──────────────────────────────────────────────

def _cliffs_delta(x: np.ndarray, y: np.ndarray) -> float:
    """
    Cliff's δ 効果量
    δ = (P(X>Y) − P(X<Y))
    """
    n1, n2 = len(x), len(y)
    dominance = sum(1 if xi > yj else -1 if xi < yj else 0
                    for xi in x for yj in y)
    return dominance / (n1 * n2)


# ──────────────────────────────────────────────
# CLI / Quick Test
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import json

    # 最小限のサンプルデータで動作確認
    rng = np.random.default_rng(42)
    n = 200
    sample_df = pd.DataFrame({
        "delta_t": rng.weibull(0.78, n) * 3.0,          # β=0.78 に近似
        "is_pair": [True] * (n // 2) + [False] * (n // 2),
        "entropy": np.concatenate([
            rng.normal(0.050, 0.01, n // 2),             # pair
            rng.normal(0.036, 0.01, n // 2),             # noise
        ]),
    })

    validator = EmpiricalValidator(sample_df)
    report = validator.full_report()

    print("Acta-AIIE Empirical Validator v1.1.0 Ready.")
    print(json.dumps(report, indent=2))
