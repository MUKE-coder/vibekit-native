# VibeKit Native — Agent Rules Installation

Drop the VibeKit Native rules into whichever AI coding agent you use. Once installed, the agent auto-loads the rules every session — no copy-pasting prompts.

There are two files in this folder:

- **`SKILL.md`** — Claude Code skill format (YAML frontmatter)
- **`AGENTS.md`** — Universal format for every other agent (Cursor, Codex, Cline, Windsurf, Gemini, Aider, Continue, Cody, Junie)

Pick your agent below and run the install.

---

## Claude Code

### Project-local (recommended)

```bash
mkdir -p .claude/skills/vibekit-native
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/SKILL.md \
  -o .claude/skills/vibekit-native/SKILL.md
```

Restart Claude Code. Type `/vibekit-native` to invoke, or it auto-loads when framework files are detected.

### Global (across every project)

```bash
mkdir -p ~/.claude/skills/vibekit-native
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/SKILL.md \
  -o ~/.claude/skills/vibekit-native/SKILL.md
```

---

## Cursor

```bash
mkdir -p .cursor/rules
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o .cursor/rules/vibekit-native.mdc
```

Restart Cursor or reload rules from Settings → Cursor Settings → Rules.

---

## OpenAI Codex CLI

Codex auto-loads `AGENTS.md` from the project root:

```bash
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o AGENTS.md
```

Auto-loads on next `codex` run. If you already have an `AGENTS.md`, append instead of overwriting.

---

## Cline

Cline auto-loads `.clinerules` from the project root:

```bash
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o .clinerules
```

Reload Cline.

---

## Windsurf

Windsurf auto-loads `.windsurfrules`:

```bash
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o .windsurfrules
```

Restart Windsurf.

---

## Gemini CLI

Gemini CLI auto-loads `GEMINI.md`:

```bash
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o GEMINI.md
```

---

## Aider

Aider doesn't auto-load — add `AGENTS.md` to the `read:` list in `.aider.conf.yml`:

```bash
# 1. Download the rules
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o AGENTS.md

# 2. Append to .aider.conf.yml
cat >> .aider.conf.yml << 'EOF'
read:
  - AGENTS.md
  - master_prompt.md
  - vibekit-native-components.md
EOF
```

---

## Continue / Cody / Junie

These agents read project-root rules files. Drop `AGENTS.md` at the root and configure the agent's "rules" or "context" setting to include it:

```bash
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o AGENTS.md
```

Then in each agent's settings:
- **Continue:** `~/.continue/config.json` → `"systemMessage": ${file:AGENTS.md}`
- **Cody:** `.vscode/cody.json` → `"context.codebaseContext": ["AGENTS.md"]`
- **Junie:** project-level instruction file (varies by JetBrains version)

---

## Multi-agent setup

If you switch between agents on the same project, symlink one canonical file to every target:

```bash
# Download once
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o AGENTS.md

# Symlink for every agent
ln -sf ../../AGENTS.md .claude/skills/vibekit-native/SKILL.md
ln -sf ../../AGENTS.md .cursor/rules/vibekit-native.mdc
ln -sf AGENTS.md .clinerules
ln -sf AGENTS.md .windsurfrules
ln -sf AGENTS.md GEMINI.md
```

Update once → every agent sees the new rules.

> **Note:** Claude Code's `SKILL.md` has YAML frontmatter the others don't need. If you symlink it across all agents, the frontmatter shows up as inert text — harmless.

---

## Updating the rules

The rules in this repo update as VibeKit Native evolves. To re-pull the latest:

```bash
# Claude Code
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/SKILL.md \
  -o .claude/skills/vibekit-native/SKILL.md

# Everything else
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/AGENTS.md \
  -o AGENTS.md
```

Commit the updated file with a clear message: `chore: bump VibeKit Native rules to latest`.

---

## Where this fits in the VibeKit Native workflow

The skill files are **STEP 0** of the [7-step VibeKit Native workflow](https://github.com/MUKE-coder/vibekit-native#how-to-use-the-7-step-workflow):

1. Install agent rules (this folder) — once per project / once globally
2. Copy `CLAUDE_PROMPT.md` into claude.ai
3. Paste your app idea
4. Answer Claude's 6–10 questions
5. Get your 4 generated files (`project-description.md`, `project-phases.md`, `design-style-guide.md`, `prompt.md`)
6. Copy `master_prompt.md` + `vibekit-native-components.md` into your project root
7. Open your AI agent, paste `prompt.md`, build phase by phase

The rules ensure the agent enforces the locked tech stack (Expo SDK 55+ / Neon + Prisma v7 / Better Auth + Expo plugin / Expo API Routes / EAS) and uses VibeKit Native registry components before writing from scratch.
