# HextAI / Acta-AIIE 残作業日報

日付: 2026-03-31

## 今日の進捗

- `.hxt` 仕様ページ `src/app/pages/HxtFormat.tsx` が追加済み
- 今日のコミットとして `feat: add /protocol/hxt-format page` が入っている
- ローカルでは以下の接続作業も実施済み
  - `src/app/routes.ts` に `HxtFormat` の import と `/protocol/hxt-format` ルート追加
  - `src/app/components/Sidebar.tsx` の Protocol セクションに `.hxt Format` を追加
- `Acta-AIIE` 側では論文ファイル群の更新作業を実施
  - `paper/narrative_quantification.md` の最新版差し替え
  - `paper/narrative_quantification.pdf` の最新版差し替え
  - `paper/figures/` に図版一式を追加
  - 図参照付きの論文版を GitHub に push 済み

## Acta-AIIE 側の作業メモ

### 実施済み

- `paper/` 配下の論文を最新版に差し替え済み
- 論文図版として以下を整備済み
  - `fig1_llm_vs_lcm`
  - `fig2_pipeline`
  - `fig3_geometry`
  - `fig4_inference`
- `svg` だけでなく、Markdown 参照用に `png` も用意済み
- 最新版論文の export 反映は GitHub に push 済み

### Acta-AIIE 側の残作業

- `paper/narrative_quantification.md` と実際の図版参照整合を再確認したい
  - 現在は最新版 export に合わせて `png` 参照を成立させている
- 論文 PDF の生成手順をローカルで再現可能にする整備が残っている
  - `xelatex`
  - SVG 変換ツール
- `paper` 更新フローを固定化したい
  - 原稿差し替え
  - 図版生成
  - PDF 再生成
  - push
- ドキュメントポータル上で論文ページと `.hxt` 仕様ページの導線が自然か見直したい

## 今日時点の残作業

### 1. ルート接続分のコミット整理

- `routes.ts` と `Sidebar.tsx` の変更はローカル反映済みだが、まだコミットされていない
- HextAI ページ追加コミットとは別に、接続作業を commit / push する必要がある

### 2. 画面確認

- `/protocol/hxt-format` が実際に表示されるかブラウザ確認
- サイドバーから遷移できるか確認
- アクティブ状態のハイライトが正しく出るか確認
- レイアウト崩れがないか確認
  - PC幅
  - サイドバー固定時
  - 長文セクション表示時

### 3. サイドバー文言の最終調整

- 現在は `.hxt Format` を追加済み
- `sub` が空文字のため、必要なら補足表記を入れる
  - 例: `Draft v0.1.0`
  - 例: `Open Spec`

### 4. 一時ファイルの整理

- 以下の未追跡ファイルが残っているため、不要なら削除判断が必要
  - `src/app/pages/routes_addition.txt`
  - `src/app/pages/sidebar_addition.txt`

### 5. HextAI 仕様ページの内容レビュー

- `HxtFormat.tsx` は `status="Draft"`、`version="v0.1.0"` になっている
- 実装ロードマップの表記確認が必要
  - JavaScript / Browser: `Completed`
  - Python 3.8+: `Completed`
  - Chrome Extension: `In Development`
  - Obsidian Plugin: `Planned`
  - VS Code Extension: `Planned`
- この状態表示が実際の開発状況と一致しているか確認したい

### 6. リポジトリ参照先の整合確認

- ページ内に `hextai/hxt-spec` と `hextai.com` の記載あり
- 公開先の命名、URL、実在リポジトリ名と一致しているか確認が必要

## 現在の懸念点

- HextAI ページ本体は作られているが、導線の最終反映がまだ未確定
- UI 上で未確認のため、実際の見え方と遷移挙動に未検証部分がある
- 一時ファイルが残っているため、そのままコミットするとノイズが入る可能性がある
- `Acta-AIIE` の論文更新は反映済みだが、ローカル PDF 生成環境はまだ不安定
- `paper` 更新と HextAI 仕様更新が並走しているため、次回は作業単位ごとの整理が必要

## 次アクション案

1. `routes.ts` と `Sidebar.tsx` をコミットして push
2. `/protocol/hxt-format` をブラウザで実機確認
3. サイドバー補足文言を必要なら調整
4. 一時ファイルを整理
5. HextAI の実装ステータス表記をプロダクト実態に合わせて確定
6. `Acta-AIIE` 論文更新フローの再生成手順を固定
