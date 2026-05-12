Check whether these tools are installed on this Windows machine and ready for VibeKit:
node, pnpm, git, gh, npm, npx, winget.

Run a single PowerShell command (or here-string script). The shell is PowerShell 7+ if available, otherwise Windows PowerShell 5.1.

CRITICAL — PowerShell safety rules:
- Do not modify $env:Path during the check.
- If using PowerShell 5.1, avoid `&&` and `||` chain operators — use `if ($?) { ... }` or semicolons instead.
- Do not redirect a native exe's stderr with `2>&1` in PS 5.1 — it wraps each line in an ErrorRecord and sets `$?` to false even on success.
- Use `& "C:\full\path\to\tool.exe" --version` to invoke executables by absolute path safely.

CRITICAL — discovery rules:
- Do not install anything. This is read-only inspection.
- Do not trust $env:Path alone. Probe common install locations directly first, then fall back to `Get-Command`.
- For each tool, find the executable absolute path first, then run it BY ABSOLUTE PATH to get its version.
- Common install locations to probe before falling back:
  - Node: `C:\Program Files\nodejs\node.exe`
  - pnpm: `$env:LocalAppData\pnpm\pnpm.exe`, `$env:AppData\npm\pnpm.cmd`
  - npm/npx: `$env:AppData\npm\npm.cmd`, `$env:AppData\npm\npx.cmd`
  - git: `C:\Program Files\Git\bin\git.exe`, `C:\Program Files\Git\cmd\git.exe`
  - gh CLI: `C:\Program Files\GitHub CLI\gh.exe`, `$env:LocalAppData\GitHubCLI\gh.exe`
  - winget: `$env:LocalAppData\Microsoft\WindowsApps\winget.exe`, `$env:LocalAppData\Microsoft\WinGet\Links\winget.exe`
- For node: prefer the version managed by nvm-windows or fnm if either is installed.

Required versions for VibeKit:
- node: >= 20 (22 LTS preferred)
- pnpm: >= 9
- git: any recent
- gh: any (optional)
- winget: any (used for installs in the recommendations below)

OUTPUT FORMAT:

1. A markdown table with these columns: Tool | Status | Version | Path
   - Status is one of: ✅ Installed · ⚠️ Outdated · ❌ Missing
   - Version: the actual version string, or "—" if missing
   - Path: the absolute path to the executable, or "—" if missing

2. For each tool that's ❌ Missing or ⚠️ Outdated, give me the EXACT one-line install / upgrade command for Windows:
   - Prefer `winget install --id <package-id> -e --source winget` for everything if winget is available
   - Common winget IDs:
     - Node.js: `OpenJS.NodeJS.LTS`
     - Git: `Git.Git`
     - GitHub CLI: `GitHub.cli`
     - Visual Studio Code: `Microsoft.VisualStudioCode`
   - For pnpm: prefer `npm install -g pnpm` if node is installed
   - If winget is missing, link to https://aka.ms/getwinget (Microsoft Store → App Installer) and stop

3. End with a single status line:
   - "✅ Ready for VibeKit — proceed to https://vibekit.desishub.com/tutorial" if everything is installed and at the required version
   - "⚠️ Action required — install: <list>" otherwise

Do NOT run any install commands. Only check. After you show the report, wait for me to ask before doing anything else.
