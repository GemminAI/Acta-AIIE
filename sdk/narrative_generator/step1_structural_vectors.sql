-- ============================================================
-- Step 1: structural_vectors テーブル作成 + 初期値投入
-- GemminAI Narrative Engine v1.2
-- ============================================================

CREATE TABLE IF NOT EXISTS structural_vectors (
    id                      BIGINT PRIMARY KEY AUTO_INCREMENT,
    country_code            VARCHAR(5)      NOT NULL,
    version                 VARCHAR(20)     NOT NULL DEFAULT 'SIPRI_2025',
    valid_from              DATE            NOT NULL,
    valid_to                DATE            DEFAULT NULL,
    source                  VARCHAR(50)     DEFAULT 'SIPRI_2025',

    -- 6軸定義（HEX Radar連携対応）
    state_control           DECIMAL(4,3)    NOT NULL,   -- 国家統制度
    market_orientation      DECIMAL(4,3)    NOT NULL,   -- 市場重視度
    security_priority       DECIMAL(4,3)    NOT NULL,   -- 安全保障優先度
    liberal_norms           DECIMAL(4,3)    NOT NULL,   -- 自由主義規範
    narrative_cohesion      DECIMAL(4,3)    NOT NULL,   -- 物語統制度
    information_openness    DECIMAL(4,3)    NOT NULL,   -- 情報開放度

    -- 成熟度管理
    vector_freeze_status    BOOLEAN         DEFAULT FALSE,
    hex_source_version      VARCHAR(20)     DEFAULT NULL,
    confidence_score        DECIMAL(3,2)    DEFAULT 0.50,

    created_at              TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY uk_country_version (country_code, version)
);

-- ============================================================
-- 初期値投入（手動設定軸: state_control / security_priority / liberal_norms）
-- 出典: Freedom House 2025 / SIPRI 2025 / V-Dem Index 2025
-- HEX Radar由来軸は暫定値（凍結予定: 2026-06-01）
-- ============================================================

INSERT INTO structural_vectors
    (country_code, version, valid_from, source,
     state_control, market_orientation, security_priority,
     liberal_norms, narrative_cohesion, information_openness,
     confidence_score)
VALUES
    ('JP', 'SIPRI_2025', '2026-03-03', 'SIPRI_2025',
     0.55, 0.65, 0.60, 0.70, 0.60, 0.75, 0.50),

    ('US', 'SIPRI_2025', '2026-03-03', 'SIPRI_2025',
     0.45, 0.85, 0.75, 0.65, 0.40, 0.80, 0.50),

    ('CN', 'SIPRI_2025', '2026-03-03', 'SIPRI_2025',
     0.90, 0.60, 0.85, 0.25, 0.90, 0.30, 0.50),

    ('GB', 'SIPRI_2025', '2026-03-03', 'SIPRI_2025',
     0.50, 0.75, 0.65, 0.75, 0.50, 0.85, 0.50),

    ('EU', 'SIPRI_2025', '2026-03-03', 'SIPRI_2025',
     0.65, 0.70, 0.60, 0.80, 0.55, 0.80, 0.50),

    ('QA', 'SIPRI_2025', '2026-03-03', 'SIPRI_2025',
     0.80, 0.70, 0.75, 0.40, 0.85, 0.50, 0.50);

-- 確認クエリ
SELECT country_code, state_control, market_orientation, security_priority,
       liberal_norms, narrative_cohesion, information_openness, confidence_score
FROM structural_vectors
ORDER BY country_code;
