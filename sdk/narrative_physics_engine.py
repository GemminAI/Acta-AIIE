"""
narrative_physics_engine.py
Acta-AIIE SDK — Core Physics Engine

Implements:
  RFC-0008 (PNLA)    — Principle of Narrative Least Action
  RFC-0009 (Revised) — Narrative Curvature and Information Statistical Mechanics
  RFC-0006 (QFOM)    — Quantum-Formalism Observation Model (interference term)

Repository: https://github.com/GemminAI/Acta-AIIE
License:    MIT — © 2026 Gemmina Intelligence LLC.
"""

import numpy as np
from scipy.spatial.distance import cosine


class NarrativePhysicsEngine:
    """
    Acta-AIIE RFC-0008 (PNLA) & RFC-0009 (Curvature/Statistical Mechanics) 準拠
    ナラティブの軌道計算、時空の歪み（曲率）、および情報熱力学を扱うコアライブラリ。
    """

    def __init__(self, h_bar_info: float = 1.0, k_b_info: float = 1.0, viscosity_gamma: float = 0.5):
        """
        Args:
            h_bar_info:      Information quantum constant ℏ_I (RFC-0008 §8)
            k_b_info:        Gemmina-Boltzmann constant k_B (RFC-0009 §3.2)
            viscosity_gamma: Narrative Viscosity γ — resistance of the field to change (RFC-0009 §4)
        """
        self.h_bar = h_bar_info
        self.k_b = k_b_info
        self.gamma = viscosity_gamma

    # ──────────────────────────────────────────────
    # RFC-0009 §2: Narrative Curvature κ
    # ──────────────────────────────────────────────

    def calculate_curvature(self, s0: np.ndarray, s1: np.ndarray, s2: np.ndarray, dt: float = 1.0) -> dict:
        """
        RFC-0009 §2.2: 2階微分によるナラティブ曲率 κ の算出

        κ(t) = d²/dt² · d(s_a(t), s_b(t))
        Discrete: κ̂_t = (d_{t+1} − 2d_t + d_{t-1}) / (Δt)²

        Args:
            s0, s1, s2: 連続する3時点の35TAGステートベクトル
            dt:         時間刻み Δt (T06 由来)

        Returns:
            distance:  d(s1, s2) — 現在のΔV
            velocity:  d(s1,s2) − d(s0,s1) — 1階差分
            curvature: κ — 2階差分 / dt²
            gravity:   −κ  (κ<0 → 引力, κ>0 → 斥力/PCE)
        """
        dv1 = 1 - cosine(s0, s1)
        dv2 = 1 - cosine(s1, s2)
        curvature = (dv2 - dv1) / (dt ** 2)
        return {
            "distance": dv2,
            "velocity": dv2 - dv1,
            "curvature": curvature,
            "gravity": -curvature,
        }

    # ──────────────────────────────────────────────
    # RFC-0009 §3: Information Statistical Mechanics
    # ──────────────────────────────────────────────

    def calculate_temperature(self, influx_rate: float, interaction_strength: float) -> float:
        """
        RFC-0009 §3.1: 情報温度 T の算出

        T ∝ d/dt |ℐ(t)|
        実装: T = influx_rate × interaction_strength

        Args:
            influx_rate:          単位時間あたりの記事流入数 (T06 由来)
            interaction_strength: 相互作用強度 |ℐ| (RFC-0003)

        Returns:
            T ≥ 0.1 (絶対零度付近の特異点を回避)
        """
        return max(0.1, influx_rate * interaction_strength)

    def get_boltzmann_weight(self, energy: float, temperature: float) -> float:
        """
        RFC-0009 §3.2: ボルツマン分布による状態占有確率 P(s)

        P(s) = exp(−E(s) / k_B · T)
        ※ 正規化定数 Z は呼び出し側で計算 (Σ weights で除算)

        Args:
            energy:      状態エネルギー E(s) — コンセンサス基底からのΔV (RFC-0001)
            temperature: 情報温度 T

        Returns:
            非正規化ボルツマン重み
        """
        return float(np.exp(-energy / (self.k_b * temperature)))

    def estimate_prediction_error(self, temperature: float) -> float:
        """
        RFC-0009 §4: 揺動散逸定理による予測誤差 ε の理論的推定

        ⟨ε²⟩ ~ 2 k_B T / γ

        Args:
            temperature: 情報温度 T

        Returns:
            ε = √(2 k_B T / γ) — 予測誤差の標準偏差
        """
        variance = (2 * self.k_b * temperature) / self.gamma
        return float(np.sqrt(variance))

    def calculate_entropy(self, probabilities: list | np.ndarray) -> float:
        """
        RFC-0009 §5.1: ナラティブ・エントロピー S

        S = −k_B Σ P(s) ln P(s)

        Args:
            probabilities: 各状態の確率分布 (正規化前でも可)

        Returns:
            S ≥ 0
        """
        p = np.array(probabilities, dtype=float)
        p = p / p.sum()
        return float(-self.k_b * np.sum(p * np.log(p + 1e-12)))

    # ──────────────────────────────────────────────
    # RFC-0008: Principle of Narrative Least Action
    # ──────────────────────────────────────────────

    def compute_action(self, trajectory_vectors: list, temperature: float = 1.0) -> float:
        """
        RFC-0008 §4 & RFC-0009 §7: 自由エネルギー最小化としての作用 S[Φ]

        S[Φ] = Σ_t ℒ_t · Δt_t
        ℒ_t  = K_t − V_t
        F    = E − T·S  (RFC-0009 §7 との接続)

        温度が低い場合: 決定論的な最小作用経路 (PNLA)
        温度が高い場合: エントロピー最大化 (熱揺らぎ) が支配的

        Args:
            trajectory_vectors: 軌道を構成するステートベクトルのリスト
            temperature:        情報温度 T

        Returns:
            S[Φ] — 作用スカラー値 (小さいほど物理的に許容される経路)
        """
        action = 0.0
        for i in range(1, len(trajectory_vectors)):
            v_i = np.array(trajectory_vectors[i])
            v_prev = np.array(trajectory_vectors[i - 1])
            kinetic = 0.5 * np.linalg.norm(v_i - v_prev) ** 2
            potential = float(np.var(v_i))
            action += (kinetic - potential) / temperature
        return action

    # ──────────────────────────────────────────────
    # RFC-0006 (QFOM): Interference Term
    # ──────────────────────────────────────────────

    def detect_interference(self, psi1: np.ndarray, psi2: np.ndarray) -> float:
        """
        RFC-0006 §4: 量子干渉項 2Re(Ψ₁* Ψ₂) の算出

        |Ψ_total|² = |Ψ₁|² + |Ψ₂|² + 2Re(Ψ₁*Ψ₂)

        古典確率論 (P₁ + P₂) を超えたエントロピー増大 (励起状態) の検出に使用。
        QMNSO v3.1 F4: H_pair > H_noise (p=0.0002) の理論的根拠。

        Args:
            psi1, psi2: ナラティブ波動関数ベクトル (35TAGステートベクトル)

        Returns:
            干渉項スカラー値 (正: 建設的干渉 / 負: 破壊的干渉)
        """
        return float(2 * np.dot(psi1, psi2))


# ──────────────────────────────────────────────
# CLI / Quick Test
# ──────────────────────────────────────────────

if __name__ == "__main__":
    engine = NarrativePhysicsEngine()

    temp = engine.calculate_temperature(influx_rate=5.0, interaction_strength=0.8)
    epsilon = engine.estimate_prediction_error(temp)

    print("Acta-AIIE Physics Engine v1.1.0 Initialized.")
    print(f"  RFC-0008 (PNLA) + RFC-0009 (Statistical Mechanics) + RFC-0006 (QFOM)")
    print(f"  Local Field Temperature T : {temp:.4f}")
    print(f"  Prediction Error Limit ε  : {epsilon:.4f}")
