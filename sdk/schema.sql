-- ============================================================
-- AIIE Protocol v5.0 — GemminAI Infrastructure Schema
-- Gemmina Intelligence LLC. — Tomohiko Nakamura
-- License: MIT
-- Repository: https://github.com/GemminAI/Acta-AIIE
-- Paper: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6419019
-- ============================================================
--
-- This schema is the physical implementation of the AIIE Protocol v5.0.
-- Each table maps directly to a layer of the Narrative Crystallization Pipeline:
--
--   geopolitics_articles   → Layer 0: Raw OSINT ingestion
--   narrative_states        → Layer 1: Phase A crystallization (24TAG + state_hash)
--   long_content_queue      → Layer 2: Phase A → B job bridge
--   narrative_content       → Layer 3: Phase B long-form content
--   narrative_variants      → Layer 3: Phase B perspective variants (N.O.)
--   pulse_readings          → Layer 4: OSINT pulse monitoring
--   v_structural_vectors    → View:    6-dimensional SIV manifold projection
--
-- state_hash = SHA-256( JCS( T01..T24 ) ) per RFC 8785
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- Layer 0: Raw OSINT
-- ────────────────────────────────────────────────────────────

CREATE TABLE `geopolitics_articles` (
  `id`                   INT AUTO_INCREMENT PRIMARY KEY,
  `title`                TEXT NOT NULL,
  `title_ja`             VARCHAR(255),
  `region`               VARCHAR(10) DEFAULT 'jp',
  `intelligence_status`  ENUM('raw', 'crystallized', 'failed') DEFAULT 'raw',
  `event_id`             VARCHAR(64),
  `created_at`           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `crystallized_at`      TIMESTAMP NULL,
  INDEX `idx_status` (`intelligence_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Layer 0: Raw OSINT ingestion. intelligence_status tracks crystallization lifecycle.';

-- ────────────────────────────────────────────────────────────
-- Layer 1: Narrative Crystals (Phase A output)
-- The 24TAG structure. Each row is a deterministic narrative state.
-- ────────────────────────────────────────────────────────────

CREATE TABLE `narrative_states` (
  `state_hash`              BINARY(32) PRIMARY KEY COMMENT 'SHA-256( JCS( T01..T24 ) ) per RFC 8785',
  `event_id`                VARCHAR(64) NOT NULL,

  -- Category I: Identification & Base Context
  `t02_subject_origin`      CHAR(2) NOT NULL     COMMENT '§0: Perspective constraint. jp|us|cn|gb|eu|qa',
  `t03_predicate_type`      VARCHAR(20),
  `t04_object_entity`       VARCHAR(255),
  `t05_location`            VARCHAR(255),
  `t06_time_frame`          DATETIME NOT NULL    COMMENT '§2: Temporal anchor. ISO 8601 UTC/Z',
  `t07_actor_role`          VARCHAR(20),

  -- Category II: Dynamics & Structure
  `t08_causality_direction` ENUM('upstream','midstream','downstream') COMMENT '§3: Causal direction',
  `t09_siv_security`        DECIMAL(4,3),        -- Strategic Interest Vector (6 dims, -1.0 to 1.0)
  `t09_siv_economy`         DECIMAL(4,3),
  `t09_siv_tech`            DECIMAL(4,3),
  `t09_siv_resource`        DECIMAL(4,3),
  `t09_siv_ideology`        DECIMAL(4,3),
  `t09_siv_environment`     DECIMAL(4,3),
  `t10_epistemic_confidence` DECIMAL(3,2),       -- 0.0 to 1.0

  -- Category III: Bias & Audit
  `t11_emotional_load`      DECIMAL(3,2),
  `t11_perspective_center`  VARCHAR(100),
  `t13_global_synthesis`    VARCHAR(400),
  `t15_source_credibility`  DECIMAL(3,2),

  -- Category IV: Spillover & Risk
  `t19_conflict_factuality_index` DECIMAL(3,2),

  -- Category V: Expression & Provenance
  `t22_audit_aura`          ENUM('White','SkyBlue','PaleGreen','Amber','Red'),
  `t24_schema_version`      VARCHAR(10),

  -- Geometric analysis
  `embedding`               BLOB                 COMMENT '3072-dim vector (gemini-embedding-001)',

  `created_at`              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX `idx_origin`    (`t02_subject_origin`),
  INDEX `idx_time`      (`t06_time_frame`),
  INDEX `idx_causality` (`t08_causality_direction`),
  INDEX `idx_aura`      (`t22_audit_aura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Layer 1: Crystallized narrative states. Primary key is the tamper-evident state_hash.';

-- ────────────────────────────────────────────────────────────
-- Layer 2: Phase A → B Job Queue
-- ────────────────────────────────────────────────────────────

CREATE TABLE `long_content_queue` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `state_hash`   BINARY(32) NOT NULL,
  `job_type`     ENUM(
                   'backbone_history','deep_dive',
                   'variant_jp','variant_cn','variant_us',
                   'variant_uk','variant_qa','variant_eu'
                 ),
  `status`       ENUM('pending','processing','done','failed') DEFAULT 'pending',
  `retry_count`  INT DEFAULT 0,
  `error_log`    TEXT,
  `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `processed_at` TIMESTAMP NULL,
  UNIQUE KEY `unq_job` (`state_hash`, `job_type`),
  CONSTRAINT `fk_queue_state`
    FOREIGN KEY (`state_hash`) REFERENCES `narrative_states` (`state_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Layer 2: Phase B job queue. Processing order: backbone→deep_dive→variants.';

-- ────────────────────────────────────────────────────────────
-- Layer 3: Long-form Content (Phase B output)
-- ────────────────────────────────────────────────────────────

CREATE TABLE `narrative_content` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `state_hash`   BINARY(32) NOT NULL,
  `content_type` ENUM('backbone_history','deep_dive') NOT NULL,
  `body`         TEXT NOT NULL,
  `generated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unq_content` (`state_hash`, `content_type`),
  CONSTRAINT `fk_content_state`
    FOREIGN KEY (`state_hash`) REFERENCES `narrative_states` (`state_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Layer 3: Long-form content. backbone_history (~1000 chars) and deep_dive (~1400 chars).';

CREATE TABLE `narrative_variants` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `state_hash`   BINARY(32) NOT NULL,
  `lang`         CHAR(2) NOT NULL     COMMENT 'jp|cn|us|gb|eu|qa',
  `body`         TEXT NOT NULL        COMMENT '~1400 chars. Perspective re-generation, NOT translation.',
  `generated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `unq_variant` (`state_hash`, `lang`),
  CONSTRAINT `fk_variant_state`
    FOREIGN KEY (`state_hash`) REFERENCES `narrative_states` (`state_hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Layer 3: Narrative Observer variants. 6 geopolitical perspectives per event.';

-- ────────────────────────────────────────────────────────────
-- Layer 4: OSINT Pulse Monitoring
-- ────────────────────────────────────────────────────────────

CREATE TABLE `pulse_readings` (
  `id`                  INT AUTO_INCREMENT PRIMARY KEY,
  `source_id`           VARCHAR(20) NOT NULL   COMMENT 'e.g. TASS, WSJ, XINHUA',
  `region`              VARCHAR(20) NOT NULL,
  `bias_axis`           VARCHAR(40) NOT NULL,
  `lexical_shift`       DECIMAL(5,4) NOT NULL,
  `silence_topology`    DECIMAL(5,4) NOT NULL,
  `narrative_grafting`  DECIMAL(5,4) NOT NULL,
  `distortion_index`    DECIMAL(5,4) NOT NULL,
  `delta`               DECIMAL(6,4)           COMMENT 'Change from previous reading',
  `article_count`       INT DEFAULT 0,
  `provenance_hash`     VARCHAR(16) NOT NULL,
  `measured_at`         TIMESTAMP NOT NULL,
  `created_at`          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_source`    (`source_id`),
  INDEX `idx_measured`  (`measured_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Layer 4: Real-time OSINT pulse. Powers Global HEX RADAR.';

-- ────────────────────────────────────────────────────────────
-- View: Structural Manifold Projection
-- T09 Strategic Interest Vector → 6-dimensional coordinate space
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW `v_structural_vectors` AS
SELECT
  HEX(state_hash)       AS state_hash_hex,
  event_id,
  t02_subject_origin    AS observer,
  t09_siv_security      AS v_sec,
  t09_siv_economy       AS v_eco,
  t09_siv_tech          AS v_tec,
  t09_siv_resource      AS v_res,
  t09_siv_ideology      AS v_ide,
  t09_siv_environment   AS v_env,
  -- L2 norm: narrative "impact magnitude"
  SQRT(
    POW(t09_siv_security,    2) +
    POW(t09_siv_economy,     2) +
    POW(t09_siv_tech,        2) +
    POW(t09_siv_resource,    2) +
    POW(t09_siv_ideology,    2) +
    POW(t09_siv_environment, 2)
  )                     AS magnitude,
  t22_audit_aura        AS confidence_color,
  t24_schema_version
FROM narrative_states;

-- Usage:
--   SELECT * FROM v_structural_vectors WHERE observer = 'jp';
--   SELECT * FROM v_structural_vectors WHERE observer = 'cn';
--   -- Narrative Distance (CDC) between two observers:
--   SELECT a.state_hash_hex,
--          SQRT(POW(a.v_sec-b.v_sec,2) + POW(a.v_eco-b.v_eco,2) + ...) AS cdc
--   FROM v_structural_vectors a
--   JOIN v_structural_vectors b ON a.event_id = b.event_id
--   WHERE a.observer='jp' AND b.observer='cn';
