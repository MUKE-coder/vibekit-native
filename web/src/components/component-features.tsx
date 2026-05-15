import { Coins, Palette, Workflow, Box, Layers, ShieldCheck, Zap, Cpu } from "lucide-react";
import { Section } from "./section";

const features = [
  {
    Icon: Coins,
    title: "Saves tokens",
    body: "Your AI agent installs from a 65-component registry instead of generating screens from scratch. The agent reads the registry reference, picks the matching component, runs npx vibekit-native install — done. 60–80% token reduction per build.",
  },
  {
    Icon: Workflow,
    title: "Plan-then-build workflow",
    body: "Paste the planning prompt into claude.ai, answer 6–10 questions, get 4 customized files (project-description, project-phases, design-style-guide, prompt). Then your AI agent builds phase by phase against that spec.",
  },
  {
    Icon: Palette,
    title: "Custom design per project",
    body: "Claude generates a fully tailored design-style-guide.md from your visual reference (Dribbble link, competitor app). Your AI agent enforces it across every screen — fonts, colors, spacing, motion, all consistent.",
  },
  {
    Icon: Box,
    title: "65-component registry",
    body: "Auth, commerce, chat, payments (DGateway + Stripe), dashboards, charts, navigation, biometrics, barcode scanner — every screen your app needs. Each installs as a single editable file. The agent picks; you can also browse manually.",
  },
  {
    Icon: ShieldCheck,
    title: "Locked production stack",
    body: "Expo SDK 55+ · Neon Postgres · Prisma v7 · Better Auth + Expo plugin · Expo API Routes · EAS Build/Submit/Update/Hosting. The framework keeps your AI agent on-stack via master_prompt.md + a dependency blocklist.",
  },
  {
    Icon: Cpu,
    title: "60fps by default",
    body: "Every component runs on Hermes, animates on the UI thread via Reanimated, recycles list rows via FlashList, and loads images through expo-image with disk cache + blurhash. Cold start under 2s on iPhone 12.",
  },
  {
    Icon: Zap,
    title: "Phase-by-phase, with stops",
    body: "5 phases: Foundation → Core screens → API Routes → Polish → Deploy. Your AI agent stops between phases and waits for your confirmation. You stay in control without writing the boilerplate.",
  },
  {
    Icon: Layers,
    title: "Works with every AI agent",
    body: "Claude Code, Cursor, Codex CLI, Cline, Windsurf, Gemini CLI, Aider — one-line install drops the framework rules into your agent's auto-load path. No copy-pasting prompts.",
  },
];

export function ComponentFeatures() {
  return (
    <Section
      id="features"
      eyebrow="Why VibeKit Native"
      title={<>Vibe code mobile apps. <em className="not-italic gradient-text">Ship in an afternoon.</em></>}
      description="VibeKit Native is a planning + build framework for AI-driven mobile development. The component registry is one tool the agent uses; the framework is what saves you the tokens, time, and design decisions."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="reveal group relative rounded-2xl card-glass p-6 transition-all hover:-translate-y-0.5"
          >
            <div className="relative inline-grid">
              <span
                aria-hidden
                className="absolute -inset-2 -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse at center, var(--accent-glow), transparent 70%)" }}
              />
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)] text-[color:var(--accent)]">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <h3 className="font-display mt-5 text-[20px] leading-tight text-[color:var(--text-primary)]">
              {title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
              {body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
