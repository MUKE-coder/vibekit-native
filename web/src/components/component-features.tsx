import { Smartphone, Palette, Zap, Box, Code, Wifi, Terminal, Database } from "lucide-react";
import { Section } from "./section";

const features = [
  {
    Icon: Box,
    title: "38 production components",
    body: "Auth, commerce, chat, profile, home, UI, and shared — every screen your app needs, available as a single installable file.",
  },
  {
    Icon: Terminal,
    title: "CLI-first install",
    body: "npx vibekit-native install <component> drops a ready-to-use file into your Expo project. No config, no providers, no bloat.",
  },
  {
    Icon: Palette,
    title: "Dark-only design system",
    body: "Every component ships with the same dark palette. Indigo accent, zinc borders, 12px radius — consistent from login to checkout.",
  },
  {
    Icon: Code,
    title: "Your code, not a black box",
    body: "Every installed component is a plain TypeScript file. Edit the JSX, tweak the NativeWind classes, wire your API. Zero vendor lock-in.",
  },
  {
    Icon: Zap,
    title: "AI-optimized patterns",
    body: "Components follow predictable patterns with Zod schemas, react-hook-form wrappers, and TanStack Query hooks. AI agents read and extend them instantly.",
  },
  {
    Icon: Wifi,
    title: "Works offline, ships OTA",
    body: "Install components without internet. Push updates via EAS OTA. Your users get new features without app store delays. Every component is a local file — no CDN dependency.",
  },
  {
    Icon: Database,
    title: "Bring your own backend",
    body: "Components are agnostic to your data layer. Wire TanStack Query to any REST/GraphQL API, use Zustand for local state, or bring Supabase, Firebase, or a custom backend. No assumptions, no lock-in.",
  },
];

export function ComponentFeatures() {
  return (
    <Section
      id="features"
      eyebrow="Why VibeKit Native"
      title={<>Build mobile apps with AI.<br className="hidden sm:block" /> <em className="not-italic gradient-text">Ship in hours.</em></>}
      description="Every component is designed to work with AI coding agents — predictable patterns, zero boilerplate, and a consistent design system from day one."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="reveal group rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 transition-all hover:border-[color:var(--border-strong)] hover:shadow-[var(--shadow-md)]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[var(--radius)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-4 text-[20px] leading-tight text-[color:var(--text-primary)]">
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
