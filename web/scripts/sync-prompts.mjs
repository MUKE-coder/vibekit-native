#!/usr/bin/env node
// Copies VibeKit prompt files from the repo root into web/ so the build can
// embed them even when deployed from web/ as the project root directory.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const webRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(webRoot, "..");

const filesToSync = ["CLAUDE_PROMPT.md", "pre-deploy-review.md"];

let copied = 0;
for (const file of filesToSync) {
  const source = path.join(repoRoot, file);
  const dest = path.join(webRoot, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    copied++;
    console.log(`  ✓ synced ${file}`);
  } else {
    console.warn(`  ! missing ${file} at ${source}`);
  }
}

// Sync setup-prompts/ folder (mac/windows/linux env-check prompts)
const setupSrcDir = path.join(repoRoot, "setup-prompts");
const setupDestDir = path.join(webRoot, "setup-prompts");
if (fs.existsSync(setupSrcDir)) {
  fs.mkdirSync(setupDestDir, { recursive: true });
  const setupFiles = fs.readdirSync(setupSrcDir).filter((f) => f.endsWith(".md"));
  for (const file of setupFiles) {
    fs.copyFileSync(path.join(setupSrcDir, file), path.join(setupDestDir, file));
    copied++;
    console.log(`  ✓ synced setup-prompts/${file}`);
  }
} else {
  console.warn(`  ! setup-prompts/ folder missing at ${setupSrcDir}`);
}

console.log(`Synced ${copied} prompt file(s) into web/`);
