Check whether these tools are installed on this Mac and ready for VibeKit:
brew, node, pnpm, git, gh, npm, npx.

Run a single shell command. The shell is zsh.

CRITICAL — zsh safety rules:
- Do not use `path` or `status` as variable names — they are tied parameters in zsh and will corrupt PATH or process status.
- Use prefixed variable names instead: `tool_exe`, `tool_rc`, `candidate_exe`, `version_text`.
- Make the command robust for zsh (works whether the user runs `set -u` or not).

CRITICAL — discovery rules:
- Do not install anything. This is read-only inspection.
- Do not trust $PATH alone. Check common install locations directly first, then fall back to `command -v`.
- For each tool, find the executable absolute path first, then run it BY ABSOLUTE PATH to get its version. Do not call bare `node`, `git`, etc.
- Common install locations to probe before falling back:
  - Apple Silicon Homebrew: `/opt/homebrew/bin/`
  - Intel Homebrew: `/usr/local/bin/`
  - System: `/usr/bin/`, `/bin/`
  - pnpm: `$HOME/Library/pnpm/`, `$HOME/.local/share/pnpm/`
  - Node via nvm: `$HOME/.nvm/versions/node/*/bin/`
  - Node via fnm: `$HOME/Library/Application Support/fnm/aliases/default/bin/`
- For git: Apple Git does NOT count. If `git --version` output contains "Apple Git", report git as **not installed** and recommend the user install Homebrew git.
- If brew is missing, do not propose installing other things via brew. Stop after the table and tell the user to install Homebrew first from https://brew.sh.

Required versions for VibeKit:
- node: >= 20 (22 LTS preferred)
- pnpm: >= 9
- git: any recent (Apple Git excluded)
- gh: any (optional, only needed for `gh repo create` shortcuts)

OUTPUT FORMAT:

1. A markdown table with these columns: Tool | Status | Version | Path
   - Status is one of: ✅ Installed · ⚠️ Outdated · ❌ Missing
   - Version: the actual version string, or "—" if missing
   - Path: the absolute path to the executable, or "—" if missing

2. For each tool that's ❌ Missing or ⚠️ Outdated, give me the EXACT one-line install / upgrade command for macOS:
   - Use brew for everything if brew exists
   - For pnpm specifically, prefer `npm install -g pnpm` if node is installed and brew is not
   - If brew is missing, link to https://brew.sh and stop

3. End with a single status line:
   - "✅ Ready for VibeKit — proceed to https://vibekit.desishub.com/tutorial" if everything is installed and at the required version
   - "⚠️ Action required — install: <list>" otherwise

Do NOT run any install commands. Only check. After you show the report, wait for me to ask before doing anything else.
