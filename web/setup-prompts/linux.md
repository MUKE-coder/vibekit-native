Check whether these tools are installed on this Linux machine and ready for VibeKit:
node, pnpm, git, gh, npm, npx, curl.

Run a single bash command. The shell is bash (or zsh — write the command to be portable across both).

CRITICAL — shell safety rules:
- Do not modify $PATH during the check.
- Do not use `path` or `status` as variable names if the user's shell is zsh — they are tied parameters and will corrupt PATH.
- Use prefixed variable names: `tool_exe`, `candidate_exe`, `version_text`.
- Use `command -v` (POSIX) for fallback lookup, not `which` (which behaves differently across distros).

CRITICAL — discovery rules:
- Do not install anything. This is read-only inspection.
- Detect the distro first by reading `/etc/os-release` (ID and ID_LIKE fields). Map to the right package manager:
  - debian, ubuntu, linuxmint, pop → apt
  - fedora, rhel, centos, rocky, almalinux → dnf (fall back to yum if dnf missing)
  - arch, manjaro, endeavouros → pacman
  - alpine → apk
  - opensuse* → zypper
- Do not trust $PATH alone. Probe common install locations directly first, then fall back to `command -v`.
- For each tool, find the executable absolute path first, then run it BY ABSOLUTE PATH to get its version.
- Common install locations to probe before falling back:
  - System: /usr/bin/, /usr/local/bin/, /bin/
  - Snap: /snap/bin/
  - Flatpak: /var/lib/flatpak/exports/bin/
  - User-local: $HOME/.local/bin/, $HOME/.local/share/pnpm/
  - Node via nvm: $HOME/.nvm/versions/node/*/bin/
  - Node via fnm: $HOME/.local/share/fnm/aliases/default/bin/
  - Node via asdf: $HOME/.asdf/shims/

Required versions for VibeKit:
- node: >= 20 (22 LTS preferred)
- pnpm: >= 9
- git: any recent
- gh: any (optional, only needed for `gh repo create` shortcuts)
- curl: any (used by install scripts)

OUTPUT FORMAT:

1. The detected distro + package manager on its own line, e.g. `Detected: Ubuntu 24.04 (apt)`.

2. A markdown table with these columns: Tool | Status | Version | Path
   - Status is one of: ✅ Installed · ⚠️ Outdated · ❌ Missing
   - Version: the actual version string, or "—" if missing
   - Path: the absolute path to the executable, or "—" if missing

3. For each tool that's ❌ Missing or ⚠️ Outdated, give me the EXACT install / upgrade command for the detected distro:
   - apt: `sudo apt update && sudo apt install -y <pkg>`
   - dnf: `sudo dnf install -y <pkg>`
   - pacman: `sudo pacman -S --noconfirm <pkg>`
   - apk: `sudo apk add <pkg>`
   - zypper: `sudo zypper install -y <pkg>`
   - For Node specifically, prefer the NodeSource setup script for stable LTS:
     `curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs` (Debian/Ubuntu)
   - For pnpm: `npm install -g pnpm` if node is installed, otherwise `curl -fsSL https://get.pnpm.io/install.sh | sh -`
   - For gh: use the official repo from https://cli.github.com (give the exact 3-line setup for the detected distro)

4. End with a single status line:
   - "✅ Ready for VibeKit — proceed to https://vibekit.desishub.com/tutorial" if everything is installed and at the required version
   - "⚠️ Action required — install: <list>" otherwise

Do NOT run any install commands. Only check. After you show the report, wait for me to ask before doing anything else.
