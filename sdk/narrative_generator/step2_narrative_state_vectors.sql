-- ============================================================
-- Step 2: narrative_state_vectors テーブル作成
-- GemminAI Narrative Engine v1.2
-- ============================================================

CREATE TABLE IF NOT EXISTS narrative_state_vectors (
    id                              BIGINT PRIMARY KEY AUTO_INCREMENT,
    fact_id                         VARCHAR(20)     NOT NULL,
    country_code                    VARCHAR(5)      NOT NULL,
    calculation_date                DATE            NOT NULL,
    vector_version                  VARCHAR(20)     NOT NULL DEFAULT 'v1.0',

    -- Narrative出力ベクトル（7軸）
    military_emphasis               DECIMAL(5,4)    DEFAULT NULL,
    economic_emphasis               DECIMAL(5,4)    DEFAULT NULL,
    domestic_stability_emphasis     DECIMAL(5,4)    DEFAULT NULL,
    alliance_frame_strength         DECIMAL(5,4)    DEFAULT NULL,
    market_sensitivity              DECIMAL(5,4)    DEFAULT NULL,
    escalation_bias                 DECIMAL(5,4)    DEFAULT NULL,
    system_stability                DECIMAL(5,4)    DEFAULT NULL,

    -- DPI（監査用・計算には使わない）
    dpi_raw                         DECIMAL(5,4)    DEFAULT NULL,
    dpi_clipped                     DECIMAL(5,4)    DEFAULT NULL,
    dpi_smooth                      DECIMAL(5,4)    DEFAULT NULL,

    -- 異常検知（Context Window Composerで使う）
    anomaly_sigma                   DECIMAL(6,3)    DEFAULT NULL,
    state_code                      TINYINT         DEFAULT 0,
    -- state_code: 0=stable / 1=elevated / 2=warning / 3=structural_shift

    -- 監査ログ
    structural_vector_version       VARCHAR(20)     DEFAULT 'SIPRI_2025',
    input_hash                      VARCHAR(16)     DEFAULT NULL,
    output_hash                     VARCHAR(16)     DEFAULT NULL,

    created_at                      TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_fact_country  (fact_id, country_code),
    INDEX idx_date          (calculation_date),
    INDEX idx_state_code    (state_code)
);

-- 確認クエリ
DESCRIBE narrative_state_vectors;
