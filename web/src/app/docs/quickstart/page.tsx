import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CopyableCommand } from "@/components/copy-command";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quickstart — plan with Claude, build with your AI agent, ship to stores",
  description:
    "The VibeKit Native workflow: paste the planning prompt into claude.ai, answer 6–10 questions, then hand the generated files to Claude Code (or Cursor / Codex / Cline / Windsurf / Gemini / Aider). Your agent installs registry components and builds phase by phase.",
  alternates: { canonical: "/docs/quickstart" },
  openGraph: {
    url: `${SITE.url}/docs/quickstart`,
    images: ["/vibekit_thumbnail_cli.png"],
    type: "article",
  },
};

const prerequisites = [
  "Node.js 20+, pnpm 9+, git, gh CLI",
  "Expo CLI + EAS CLI (npm install -g eas-cli)",
  "Xcode 16+ (iOS, macOS only) OR Android Studio + emulator",
  "An AI coding agent: Claude Code, Cursor, Codex CLI, Cline, Windsurf, Gemini CLI, or Aider",
  "Free accounts: Anthropic Claude (claude.ai), Expo, Neon Postgres, Resend, Sentry — all have free tiers that cover the entire build",
];

interface Step {
  n: number | string;
  title: string;
  body: string;          // HTML allowed
  command?: string;      // optional copyable command
  optional?: boolean;
}

const steps: Step[] = [
  {
    n: "0",
    optional: true,
    title: "Install agent rules (optional, recommended)",
    body: `Drop the VibeKit Native rules into your AI agent so it auto-loads the framework conventions every session — no copy-pasting prompts. One-line install per agent (Claude Code, Cursor, Codex CLI, Cline, Windsurf, Gemini CLI, Aider). See <a href="https://github.com/MUKE-coder/vibekit-native/blob/main/skill/README.md" target="_blank" rel="noopener noreferrer">skill/README.md</a> for every agent's install command.`,
    command: `mkdir -p .claude/skills/vibekit-native
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/SKILL.md \\
  -o .claude/skills/vibekit-native/SKILL.md`,
  },
  {
    n: 1,
    title: "Copy the planning prompt",
    body: `Copy the contents of <a href="https://github.com/MUKE-coder/vibekit-native/blob/main/CLAUDE_PROMPT.md" target="_blank" rel="noopener noreferrer"><code>CLAUDE_PROMPT.md</code></a> from the repo. This is a meta-prompt that turns claude.ai into a <strong>planning assistant</strong> for your specific app.`,
  },
  {
    n: 2,
    title: "Open Claude",
    body: `Go to <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a> and start a new conversation.`,
  },
  {
    n: 3,
    title: "Paste and add your idea",
    body: `Paste the contents of <code>CLAUDE_PROMPT.md</code> into Claude, then add your app idea at the bottom. Be specific about <strong>users</strong>, <strong>core flows</strong>, <strong>auth method</strong>, <strong>payment provider</strong>, and the <strong>target market</strong> (especially if you need DGateway for East African mobile money).`,
    command: `[CLAUDE_PROMPT.md contents pasted here]

MY IDEA: I want to build a delivery driver app where drivers receive jobs,
navigate to the pickup location, mark the delivery as complete, and get paid
weekly via mobile money. Customers track their order in real time.`,
  },
  {
    n: 4,
    title: "Answer Claude's questions",
    body: `Claude asks 6–10 mobile-specific questions one at a time: iOS / Android / both? Auth method? DGateway mobile money or Stripe? Push notifications? Offline support? <strong>Visual reference</strong> (Dribbble link, competitor app, screenshot)? Answer honestly and completely. Skipping questions = vague output.`,
  },
  {
    n: 5,
    title: "Get your 4 project files",
    body: `Once you confirm, Claude generates four files as Artifacts. Save all four into your project root.`,
  },
  {
    n: 6,
    title: "Copy the 2 framework files",
    body: `Drop these two repo files into your project root:
<ul class="mt-3 space-y-2">
  <li>• <a href="https://github.com/MUKE-coder/vibekit-native/blob/main/master_prompt.md" target="_blank" rel="noopener noreferrer"><code>master_prompt.md</code></a> — coding standards, tech stack rules, Prisma v7 + Neon HTTP adapter pattern, Better Auth + Expo plugin wiring, Expo Router structure, mobile performance budget, form rules, DGateway + Stripe patterns, EAS Build / Submit / Update / Hosting templates, dependency blocklist.</li>
  <li>• <a href="https://github.com/MUKE-coder/vibekit-native/blob/main/vibekit-native-components.md" target="_blank" rel="noopener noreferrer"><code>vibekit-native-components.md</code></a> — the registry reference. Your AI agent checks this <em>before</em> writing any screen from scratch and installs from the registry instead.</li>
</ul>
<p class="mt-3 text-[14px] text-[color:var(--text-tertiary)]"><strong>Pro tip:</strong> Claude Code auto-loads <code>CLAUDE.md</code>. Rename (or symlink) <code>master_prompt.md → CLAUDE.md</code> and it auto-loads every session.</p>`,
    command: `# Quick clone + copy
git clone https://github.com/MUKE-coder/vibekit-native.git /tmp/vk-native
cp /tmp/vk-native/master_prompt.md ./master_prompt.md
cp /tmp/vk-native/vibekit-native-components.md ./vibekit-native-components.md
cp /tmp/vk-native/pre-deploy-review.md ./pre-deploy-review.md`,
  },
  {
    n: 7,
    title: "Start building with Claude Code",
    body: `Open your AI agent (Claude Code, Cursor, etc.) in the project directory and paste the contents of <code>prompt.md</code>. The agent will:
<ul class="mt-3 space-y-2">
  <li>• Read <code>master_prompt.md</code> (or <code>CLAUDE.md</code>), <code>design-style-guide.md</code>, <code>vibekit-native-components.md</code>, <code>project-description.md</code>, <code>project-phases.md</code></li>
  <li>• Start with <strong>Phase 1 (Foundation)</strong> — Expo + NativeWind + expo-router + Prisma v7 + Neon + Better Auth + EAS init + Sentry</li>
  <li>• <strong>Install VibeKit Native components first</strong> (<code>npx vibekit-native install &lt;name&gt;</code>) before writing anything from scratch — this is where the framework saves you the most tokens, time, and design decisions</li>
  <li>• Stop after each phase for your confirmation</li>
  <li>• Follow the design system and coding standards exactly</li>
</ul>`,
  },
  {
    n: 8,
    title: "Run the pre-deploy review (before submitting)",
    body: `Once Phase 5 is done, paste <a href="https://github.com/MUKE-coder/vibekit-native/blob/main/pre-deploy-review.md" target="_blank" rel="noopener noreferrer"><code>pre-deploy-review.md</code></a> into your AI agent. It performs a 24-section senior-level audit (cold-start TTI, accessibility, EAS Build, store-ready assets, webhook security, env vars) before you submit to the App Store or Play Store. Fix every 🔴 Critical and 🟠 High before submitting.`,
  },
];

const generatedFiles = [
  { file: "project-description.md", purpose: "Complete description of your app — features, data model, screens, API routes, integrations" },
  { file: "project-phases.md",     purpose: "5-phase build blueprint with concrete tasks + install commands (your agent stops between phases)" },
  { file: "design-style-guide.md", purpose: "Fully customized visual design system (color tokens, typography scale, mobile component specs, motion timings)" },
  { file: "prompt.md",             purpose: "The hand-off prompt you paste into Claude Code to start building" },
];

export default function Quickstart() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-[color:var(--text-tertiary)] transition-colors hover:text-[color:var(--text-primary)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Documentation
          </Link>

          <header className="mt-8 border-b border-[color:var(--border)] pb-10">
            <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              Guide · 8 steps · ~30 min planning + 1 build session
            </div>
            <h1 className="mt-5 headline-display text-[clamp(2.25rem,5vw,3.75rem)] headline-glow-strong">
              Quickstart
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-[color:var(--text-secondary)]">
              VibeKit Native is a <strong className="text-[color:var(--text-primary)]">planning + build framework</strong> for vibe coders shipping production-grade Expo apps. Plan with claude.ai, then your AI agent (Claude Code, Cursor, Codex, Cline, Windsurf, Gemini, Aider) builds the app phase by phase — installing components from the registry as it goes. You write zero boilerplate; you confirm between phases.
            </p>
            <p className="mt-3 text-[15px] text-[color:var(--text-tertiary)]">
              The component registry is a tool the agent uses, not the headline product. The framework is what saves you tokens, time, and design decisions.
            </p>
          </header>

          {/* Prerequisites */}
          <div className="mt-8 rounded-2xl card-glass p-5">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
              Prerequisites
            </h2>
            <ul className="mt-3 space-y-2">
              {prerequisites.map((p) => (
                <li key={p} className="flex items-start gap-2 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-[color:var(--text-tertiary)]">
              Need help installing the toolchain? Run the <Link href="/setup" className="text-[color:var(--accent)] underline underline-offset-4">env-check prompt</Link> in your AI agent — it scans your machine and gives you the exact one-line installs for anything missing.
            </p>
          </div>

          {/* Steps */}
          <ol className="mt-12 space-y-12">
            {steps.map((s) => (
              <li key={s.n} className="grid gap-5 sm:grid-cols-[auto_1fr]">
                <div className="font-mono text-[40px] font-light leading-none text-[color:var(--accent)] tabular-nums">
                  {String(s.n).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-mono text-[18px] uppercase tracking-tight text-[color:var(--text-primary)]">
                      {s.title}
                    </h2>
                    {s.optional ? (
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] rounded-full px-2 py-0.5">
                        Optional
                      </span>
                    ) : null}
                  </div>
                  <div
                    className="mt-3 text-[15.5px] leading-[1.75] text-[color:var(--text-secondary)]
                      [&_a]:text-[color:var(--accent)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline
                      [&_strong]:text-[color:var(--text-primary)] [&_strong]:font-medium
                      [&_code]:font-mono [&_code]:text-[13.5px] [&_code]:rounded [&_code]:border [&_code]:border-[color:var(--border)] [&_code]:bg-[color:var(--bg-elevated)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[color:var(--text-primary)]
                      [&_ul]:list-none [&_ul]:pl-0"
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />

                  {s.command ? (
                    <div className="mt-4">
                      <CopyableCommand command={s.command} />
                    </div>
                  ) : null}

                  {/* Step 5: show the 4 generated files inline */}
                  {s.n === 5 ? (
                    <div className="mt-5 rounded-2xl card-glass overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[color:var(--bg-subtle)] text-[10.5px] font-mono uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                          <tr>
                            <th className="px-4 py-2.5 font-medium">File</th>
                            <th className="px-4 py-2.5 font-medium">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          {generatedFiles.map((f, i) => (
                            <tr
                              key={f.file}
                              className={i !== generatedFiles.length - 1 ? "border-b border-[color:var(--border)]" : ""}
                            >
                              <td className="px-4 py-3 font-mono text-[12.5px] text-[color:var(--accent)] align-top whitespace-nowrap">
                                {f.file}
                              </td>
                              <td className="px-4 py-3 text-[13.5px] text-[color:var(--text-secondary)]">
                                {f.purpose}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-2xl card-glass p-6">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
              That&apos;s the whole framework
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--text-primary)]">
              You planned your app in claude.ai (~15 min), wired up the framework files (~10 min), and then your AI agent built the app phase by phase — installing the right registry components as it went. You confirmed between phases. You ran the pre-deploy audit. You shipped.
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[color:var(--text-secondary)]">
              You can also <Link href="/components" className="text-[color:var(--accent)] underline underline-offset-4">browse the registry directly</Link> and install components manually with <code className="font-mono text-[13px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">npx vibekit-native install &lt;name&gt;</code> if you have an existing Expo project. The framework workflow above is the recommended path for new builds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/tutorial" variant="accent" size="md">
                Walk through a real build (Hardware POS)
              </Button>
              <Button href="/components" variant="outline" size="md">
                Browse all 65 components
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />

      <Script
        id="ld-howto-quickstart"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Plan + build a mobile app with VibeKit Native",
            description:
              "8-step workflow: install agent rules → plan with claude.ai → answer 6-10 questions → get 4 generated files → copy 2 framework files → paste prompt.md into Claude Code → AI builds phase by phase → run pre-deploy review.",
            totalTime: "PT4H",
            step: steps.map((s) => ({
              "@type": "HowToStep",
              position: typeof s.n === "number" ? s.n : 0,
              name: s.title,
              text: s.body.replace(/<[^>]*>/g, ""),
            })),
          }),
        }}
      />
    </>
  );
}
