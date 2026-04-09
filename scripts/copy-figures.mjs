#!/usr/bin/env node
/**
 * `paper/figures/` の PNG / SVG を `public/figures/` に同期（Vite は public をそのまま配信）。
 * 論文 Markdown は `/figures/*.png` を参照するため、ビルド・開発前に実行する。
 */
import { copyFileSync, mkdirSync, readdirSync, existsSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const srcDir = join(root, "paper", "figures");
const destDir = join(root, "public", "figures");

mkdirSync(destDir, { recursive: true });

if (!existsSync(srcDir)) {
  console.warn("[copy-figures] paper/figures not found — skip");
  process.exit(0);
}

let n = 0;
for (const name of readdirSync(srcDir)) {
  if (!/\.(png|svg)$/i.test(name)) continue;
  const from = join(srcDir, name);
  if (!statSync(from).isFile()) continue;
  copyFileSync(from, join(destDir, name));
  n += 1;
  console.log("[copy-figures]", name);
}

if (n === 0) {
  console.warn("[copy-figures] no .png/.svg assets in paper/figures");
} else {
  console.log(`[copy-figures] synced ${n} file(s) → public/figures/`);
}
