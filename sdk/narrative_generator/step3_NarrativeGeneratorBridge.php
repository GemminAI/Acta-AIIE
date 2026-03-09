<?php

namespace App\Services;

use App\Models\NarrativeStateVector;
use App\Models\StructuralVector;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

/**
 * NarrativeGeneratorBridge
 *
 * 役割: DBからデータを読み、GCP Cloud Functions (narrative_generator) へ投げる。
 * ルール: このクラスは計算しない。写送のみ。
 */
class NarrativeGeneratorBridge
{
    // GCP Cloud Functions エンドポイント（.env で管理）
    private string $endpoint;
    private string $secret;

    public function __construct()
    {
        $this->endpoint = env('NARRATIVE_GENERATOR_URL');
        $this->secret   = env('GEMMINA_SECRET');
    }

    /**
     * 最新のpulse_readings から各国のペイロードを組み立ててPythonへ送る
     */
    public function dispatch(string $factId): array
    {
        $results = [];
        $countries = ['JP', 'US', 'CN', 'GB', 'EU', 'QA'];

        foreach ($countries as $countryCode) {

            $payload = $this->buildPayload($factId, $countryCode);

            if ($payload === null) {
                Log::warning("[Bridge] Skip {$countryCode}: payload build failed");
                continue;
            }

            $response = $this->sendToPython($payload);
            $results[$countryCode] = $response;
        }

        return $results;
    }

    // 国コード → source_id マッピング（pulse_readingsの実データに合わせる）
    private const COUNTRY_TO_SOURCE = [
        'JP' => 'KYODO',
        'US' => 'WSJ',
        'CN' => 'XINHUA',
        'QA' => 'ALJAZEERA',
        'RU' => 'TASS',
        // GB / EU は直接ソースなし → REUTERSで代替
        'GB' => 'REUTERS',
        'EU' => 'REUTERS',
    ];

    /**
     * 1カ国分のペイロードを構築（計算なし・写送のみ）
     */
    private function buildPayload(string $factId, string $countryCode): ?array
    {
        // Structural Vector（準固定）を取得
        $sv = StructuralVector::where('country_code', $countryCode)
            ->whereNull('valid_to')
            ->orderByDesc('valid_from')
            ->first();

        if (!$sv) {
            Log::error("[Bridge] StructuralVector not found: {$countryCode}");
            return null;
        }

        // 国コード → source_id に変換して最新のpulse_readingを取得
        $sourceId = self::COUNTRY_TO_SOURCE[$countryCode] ?? null;
        $pulse = null;

        if ($sourceId) {
            $pulse = \DB::table('pulse_readings')
                ->where('source_id', $sourceId)
                ->orderByDesc('measured_at')
                ->first();
        }

        if (!$pulse) {
            Log::warning("[Bridge] No pulse_reading for {$countryCode} (source: {$sourceId}), using defaults");
        }

        if (!$pulse) {
            Log::warning("[Bridge] No pulse_reading for {$countryCode}, using defaults");
        }

        // 写送のみ。数値変換なし。
        return [
            '_secret'                   => $this->secret,
            'fact_id'                   => $factId,
            'country_code'              => $countryCode,
            'calculation_date'          => now()->toDateString(),
            'structural_vector_version' => $sv->version,

            // Structural Vector（6軸）
            'state_control'             => (float) $sv->state_control,
            'market_orientation'        => (float) $sv->market_orientation,
            'security_priority'         => (float) $sv->security_priority,
            'liberal_norms'             => (float) $sv->liberal_norms,
            'narrative_cohesion'        => (float) $sv->narrative_cohesion,
            'information_openness'      => (float) $sv->information_openness,

            // Pulse（DPI計算の素材）
            'distortion_index'          => $pulse ? (float) $pulse->distortion_index : 0.5,
            'silence_topology'          => $pulse ? (float) $pulse->silence_topology : 0.5,
            'narrative_grafting'        => $pulse ? (float) $pulse->narrative_grafting ?? 0.5 : 0.5,
        ];
    }

    /**
     * GCP Cloud Functions へ POST
     */
    private function sendToPython(array $payload): array
    {
        try {
            $response = Http::timeout(30)->post($this->endpoint, $payload);

            if ($response->successful()) {
                return $response->json();
            }

            Log::error("[Bridge] Python returned {$response->status()}", [
                'country' => $payload['country_code'],
                'body'    => $response->body(),
            ]);
            return ['error' => $response->status()];

        } catch (\Exception $e) {
            Log::error("[Bridge] HTTP failed: " . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }
}
