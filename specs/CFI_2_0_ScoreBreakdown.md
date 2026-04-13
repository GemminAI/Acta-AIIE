# CFI 2.0 定義と ScoreBreakdown 構造

**Related:** `GemminAI_Public/scripts/benchmark_v2.py`, 35TAG T19 `conflict_factuality_index`, RFC-0005 / RFC-0006（T22 `informational_entropy`）

---

## 7. CFI 2.0 定義と ScoreBreakdown 構造

### 7.1 CFI 2.0 計算式

Conflict Factuality Index（CFI）は、情報の物理的・論理的矛盾を定量化するペナルティスコアである。  
満点を `1.0` とし、矛盾の種類ごとにペナルティを減算する。

$$\text{CFI} = 1.0 - \sum_{k} p_k \cdot w_k$$

| ペナルティ種別 $k$ | 重み $w_k$ | 定義 |
|--------------------|------------|------|
| Temporal Anomaly | 0.30 | 時系列の矛盾（過去の事象を現在形で記述等） |
| Spatial Anomaly | 0.25 | 地理的矛盾（発生地と関与国の不整合等） |
| Metadata Anomaly | 0.20 | 情報源・著者・日付の不整合 |
| Logical Contradiction | 0.15 | 同一文書内の論理的矛盾 |
| Entity Mismatch | 0.10 | T04（object_entity）と本文記述の不一致 |

複数の矛盾が同時に検出された場合、ペナルティは加算される（下限 `0.0`）。

### 7.2 ScoreBreakdown 構造

`benchmark_v2.py` の出力に含まれる `ScoreBreakdown` は以下の JSON 構造を持つ：

```json
{
  "cfi_score": 0.85,
  "score_breakdown": {
    "temporal_anomaly":     { "detected": false, "penalty": 0.0 },
    "spatial_anomaly":      { "detected": true,  "penalty": 0.25 },
    "metadata_anomaly":     { "detected": false, "penalty": 0.0 },
    "logical_contradiction": { "detected": false, "penalty": 0.0 },
    "entity_mismatch":      { "detected": false, "penalty": 0.0 }
  },
  "raw_penalty_sum": 0.25,
  "final_cfi": 0.75
}
```

`final_cfi = max(0.0, 1.0 - raw_penalty_sum)`

### 7.3 confidence / stability メタデータ

各ナラティブ記事には CFI に加えて以下のメタデータが付与される：

| フィールド | 型 | 定義 |
|------------|-----|------|
| `confidence` | float [0,1] | T10 `epistemic_confidence` と同値。エビデンスの強度 |
| `stability` | float [0,1] | `1.0 - informational_entropy`（T22）。情報の結晶化度 |
| `is_retroactive` | bool | 過去事象の遡及分析フラグ（`time_frame` が `created_at` より30日以上前の場合 `true`） |

### 7.4 T35 v2 における CFI の役割

CFI は T35 v2（熱力学的意思決定エンジン）において**斥力変数**として機能する：

$$w_i \propto P^{(i)} \cdot O^{(i)} \cdot H^{(i)} \cdot \exp(-0.1 \cdot T^{(i)}) \cdot \text{CFI}^{(i)}$$

CFI が低い世界線（矛盾を多く含む候補）は重みが小さくなり、Hard Collapse の対象から外れる。  
これにより「事実に矛盾する現実線」が選択される確率が物理的に抑制される。
