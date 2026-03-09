#!/bin/bash
# ============================================================
# Step 5: narrative_generator デプロイ + Cloud Scheduler設定
# GemminAI Narrative Engine v1.2
# ============================================================

PROJECT_ID="gemminaai-a5169"
REGION="asia-northeast1"
FUNCTION_NAME="narrative_generator"
SA_EMAIL="${PROJECT_ID}@appspot.gserviceaccount.com"

# ── 1. デプロイ（pulse_meterと同じ構成）──────────────────
gcloud functions deploy ${FUNCTION_NAME} \
  --project=${PROJECT_ID} \
  --region=${REGION} \
  --runtime=python311 \
  --trigger-http \
  --allow-unauthenticated \
  --entry-point=narrative_generator \
  --set-env-vars="\
GEMMINA_SECRET=${GEMMINA_SECRET},\
GEMINI_API_KEY=${GEMINI_API_KEY},\
DB_HOST=${DB_HOST},\
DB_USER=${DB_USER},\
DB_PASSWORD=${DB_PASSWORD},\
DB_NAME=${DB_NAME}"

# デプロイ確認
echo "✅ Deployed: https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_NAME}"


# ── 2. Cloud Scheduler ジョブ追加（03:10 JST）────────────
# 注意: pulse_meter が 03:00 に完了してから10分バッファ
gcloud scheduler jobs create http narrative-generator-daily \
  --project=${PROJECT_ID} \
  --location=${REGION} \
  --schedule="10 18 * * *" \
  --uri="https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_NAME}" \
  --message-body='{"_secret":"'${GEMMINA_SECRET}'","fact_id":"auto","country_code":"JP"}' \
  --oidc-service-account-email=${SA_EMAIL} \
  --time-zone="UTC"

# JST 03:10 = UTC 18:10（前日）
# Cloud Schedulerはcron式でUTC指定のため 18:10 UTC

echo "✅ Scheduler set: 03:10 JST daily"


# ── 3. 疎通テスト ──────────────────────────────────────
FUNCTION_URL="https://${REGION}-${PROJECT_ID}.cloudfunctions.net/${FUNCTION_NAME}"

curl -X POST ${FUNCTION_URL} \
  -H "Content-Type: application/json" \
  -d '{
    "_secret":                   "'${GEMMINA_SECRET}'",
    "fact_id":                   "20260303-TEST",
    "country_code":              "JP",
    "calculation_date":          "2026-03-03",
    "structural_vector_version": "SIPRI_2025",
    "state_control":             0.55,
    "market_orientation":        0.65,
    "security_priority":         0.60,
    "liberal_norms":             0.70,
    "narrative_cohesion":        0.60,
    "information_openness":      0.75,
    "distortion_index":          0.50,
    "silence_topology":          0.50,
    "narrative_grafting":        0.50
  }'

# ── 4. DB確認クエリ（Hostinger MySQLで実行）─────────────
# SELECT fact_id, country_code, military_emphasis, economic_emphasis,
#        escalation_bias, system_stability, dpi_smooth, input_hash
# FROM narrative_state_vectors
# WHERE fact_id = '20260303-TEST';
