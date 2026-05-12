import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  Package,
  Terminal,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SetupTabs } from "@/components/setup-tabs";
import { readPrompt } from "@/lib/read-prompt";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Step 0 — check your environment for VibeKit",
  description:
    "Pre-flight environment check. Copy the OS-specific prompt into your AI coding agent — it scans for Node, pnpm, git, and gh, then tells you what (if anything) to install before starting VibeKit.",
  alternates: { canonical: "/setup" },
  openGraph: {
    title: "VibeKit Setup — pre-flight environment check",
    description: "Make sure your machine has Node, pnpm, git, and gh before starting.",
    url: `${SITE.url}/setup`,
    images: ["/og.png"],
  },
};

export default function SetupPage() {
  const prompts = {
    macos: readPrompt("setup-prompts/macos.md"),
    windows: readPrompt("setup-prompts/windows.md"),
    linux: readPrompt("setup-prompts/linux.md"),
  };

  const requirements = [
    { name: "Node.js", version: "≥ 20 (22 LTS preferred)", reason: "Next.js 16 runtime" },
    { name: "pnpm", version: "≥ 9", reason: "Package manager VibeKit projects use" },
    { name: "git", version: "any recent (Apple Git excluded on Mac)", reason: "Source control + cloning templates" },
    { name: "gh CLI", version: "any (optional)", reason: "Shortcuts for `gh repo create` during deploy" },
  ];

  return (
    <>
      <Nav />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative pb-12 sm:pb-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 grid-pattern opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 65%)",
            }}
          />

          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-secondary)]">
              <Terminal className="h-3 w-3 text-[color:var(--accent)]" />
              Step 00 · Pre-flight check · 2 min
            </div>

            <h1 className="font-display mt-6 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-tight text-[color:var(--text-primary)]">
              Check your environment <em className="not-italic gradient-text">before</em> you start.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
              Most "why isn't this working?" moments come from a missing tool. Copy the prompt for your OS, paste it into Claude Code (or Cursor / Cline / any agent), and let it tell you exactly what's installed and what to fix — without touching your system.
            </p>
          </div>
        </section>

        {/* Requirements summary */}
        <Section
          eyebrow="WHAT VIBEKIT NEEDS"
          title="Four tools. That's it."
          containerClassName="max-w-4xl"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {requirements.map((r) => (
              <div
                key={r.name}
                className="reveal flex items-start gap-4 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] text-[color:var(--accent)]">
                  <Package className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-mono text-[14px] uppercase tracking-tight text-[color:var(--text-primary)]">
                      {r.name}
                    </h3>
                    <span className="font-mono text-[11px] text-[color:var(--text-tertiary)]">
                      {r.version}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
                    {r.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* OS-specific prompts */}
        <Section
          eyebrow="THE PROMPT"
          title="Pick your OS, copy, paste."
          description="Open Claude Code (or any agent) inside a project folder. Paste the prompt below as your first message. The agent will run a single safe command, scan common install locations directly, and produce a report. It will NOT install anything."
          containerClassName="max-w-3xl"
        >
          <SetupTabs prompts={prompts} />

          <div className="reveal mt-10 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--accent)]" />
              <div>
                <h3 className="font-mono text-[12px] uppercase tracking-wider text-[color:var(--text-primary)]">
                  What you'll see back
                </h3>
                <ul className="mt-3 space-y-1.5 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                  <li>· A clean markdown table: tool, status (✅ / ⚠️ / ❌), version, absolute path</li>
                  <li>· One-line install commands for anything missing (uses brew / winget / apt-dnf-pacman as appropriate)</li>
                  <li>
                    · A final status line: <code className="font-mono text-[12px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">✅ Ready for VibeKit</code> or{" "}
                    <code className="font-mono text-[12px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">⚠️ Action required</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Why a check */}
        <Section
          eyebrow="WHY THIS MATTERS"
          title="The most common failure mode."
          containerClassName="max-w-3xl"
        >
          <div className="reveal space-y-5 text-[15.5px] leading-[1.75] text-[color:var(--text-secondary)]">
            <p>
              The #1 reason VibeKit (or any modern Node project) breaks isn't the framework — it's the user's machine. Wrong Node version. Apple Git instead of real git. pnpm not on PATH. Missing gh CLI when the deploy step needs it.
            </p>
            <p>
              These prompts are <strong className="font-medium text-[color:var(--text-primary)]">explicitly defensive</strong>: they don't trust <code className="font-mono text-[13px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">$PATH</code>, they probe common install locations directly, they invoke executables by absolute path. On macOS they avoid zsh's tied parameters (<code>path</code>, <code>status</code>) so they never accidentally clobber your shell. On Windows they account for PowerShell 5.1's quirks. On Linux they auto-detect the distro before suggesting a package manager.
            </p>
            <p>
              And critically — they <strong className="font-medium text-[color:var(--text-primary)]">never install anything</strong> without your explicit follow-up. You see the report, then you decide.
            </p>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/tutorial" className="contents">
              <Button variant="accent" size="md">
                Continue to the tutorial
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/docs/quickstart" className="contents">
              <Button variant="outline" size="md">
                <GitBranch className="h-4 w-4" />
                Read the quickstart
              </Button>
            </Link>
          </div>
        </Section>
      </main>
      <Footer />

      {/* HowTo schema for AEO */}
      <Script
        id="ld-setup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Check your environment for VibeKit",
            description:
              "Pre-flight environment check for VibeKit. OS-specific prompts that scan for Node, pnpm, git, and gh, then list any missing tools with install commands.",
            totalTime: "PT2M",
            tool: [
              { "@type": "HowToTool", name: "Claude Code, Cursor, or any AI coding agent" },
            ],
            step: [
              { "@type": "HowToStep", position: 1, name: "Open your AI coding agent", text: "Inside any project folder, open Claude Code, Cursor, Cline, or whichever agent you use." },
              { "@type": "HowToStep", position: 2, name: "Pick the prompt for your OS", text: "Tab between macOS, Windows, and Linux on this page and copy the matching prompt." },
              { "@type": "HowToStep", position: 3, name: "Paste and run", text: "Paste the prompt as your first message. The agent runs one safe shell command and reports a table of tools, versions, and paths." },
              { "@type": "HowToStep", position: 4, name: "Install anything missing", text: "For each missing tool the agent gives you a one-line install command. Run it manually." },
              { "@type": "HowToStep", position: 5, name: "Proceed to the tutorial", text: "Once you see Ready for VibeKit, jump to the tutorial or quickstart." },
            ],
          }),
        }}
      />
    </>
  );
}
