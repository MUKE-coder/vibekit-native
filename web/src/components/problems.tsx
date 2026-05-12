import { Section } from "./section";

const problems = [
  {
    pain: "Setting up Expo from scratch",
    looks: "Every new project means re-building the same screens — login, profile, product cards, chat bubbles — one painful file at a time.",
    solution: "npx vibekit-native install drops production-ready components into your project. Auth, commerce, chat — all pre-built, all dark-themed.",
  },
  {
    pain: "Endless boilerplate",
    looks: "Hours of copying SafeAreaView, StatusBar, NavigationContainer, ThemeProvider — before writing a single line of actual app code.",
    solution: "Every component handles its own providers, safe areas, and theme tokens. Import and go. Zero boilerplate.",
  },
  {
    pain: "Inconsistent design",
    looks: "Cards, buttons, and inputs look different on every screen. Font sizes drift. Spacing is a mess.",
    solution: "A unified dark-only design system with CSS variables. Every component uses the same tokens — install any component, it fits your app instantly.",
  },
  {
    pain: "Auth takes forever",
    looks: "Building login, signup, password reset, OTP verification, and social auth from scratch — each with edge cases you'll miss.",
    solution: "Pre-built auth components (login-form, signup-form, forgot-password, otp-verify) with react-hook-form + Zod validation built in. Install in one command.",
  },
  {
    pain: "No AI-friendly stack",
    looks: "AI agents don't know your project structure. Every session starts with context-building instead of actual feature work.",
    solution: "A locked Expo stack with clear conventions. AI agents read the registry, understand the patterns, and ship features without guessing.",
  },
  {
    pain: "Mobile API confusion",
    looks: "Setting up tRPC, REST endpoints, secure token storage, and cache invalidation — across iOS, Android, and web.",
    solution: "Better Auth for auth, TanStack Query for data, Expo API Routes for backend, expo-secure-store for tokens. Installed and wired in minutes.",
  },
  {
    pain: "Dark mode from scratch",
    looks: "Writing color tokens, theme context, persistent preferences, and system-preference detection — for every project.",
    solution: "Dark-only by design. Every component ships with the complete dark palette. No theme switching, no light mode bugs, no conditional styles.",
  },
  {
    pain: "Building storefront UIs",
    looks: "Product cards, grids, detail pages, cart views, checkout forms, order summaries — a full e-commerce UI from zero.",
    solution: "Eight commerce components — product-card, product-grid, product-detail, cart-view, checkout-form, order-summary, wishlist-button, review-card. Ship a store in an afternoon.",
  },
  {
    pain: "Chat UI complexity",
    looks: "Message bubbles, input bars, conversation lists, typing indicators, scroll-to-bottom — every chat needs the same 5 components.",
    solution: "chat-bubble, chat-input, chat-list, chat-header — install all four and wire them to your backend in under an hour.",
  },
  {
    pain: "No database layer",
    looks: "AsyncStorage for everything — tokens, user data, product catalogs, chat history. No queries, no relations, no migrations. Data lost on reinstall.",
    solution: "VibeKit Native components are agnostic to your data layer. Use TanStack Query with any REST/GraphQL API, Zustand for local state, or bring your own database — Supabase, Firebase, or a custom backend. The components just render UI.",
  },
  {
    pain: "Deploying to stores",
    looks: "EAS Build config, app signing, store listings, review guidelines, OTA updates — the barrier between finished code and shipped app.",
    solution: "Build-deploy guide with EAS configuration files included. PnP dev builds, app store submission checklists, and OTA update setup ready to go.",
  },
];

export function Problems() {
  return (
    <Section
      id="problems"
      eyebrow="The problems we solve"
      title={<>Building mobile apps with AI shouldn't<br className="hidden sm:block" /> mean rebuilding the same screens.</>}
      description="Eleven specific pains that slow down every React Native project — and how VibeKit Native makes each one disappear with a single npx command."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p) => (
          <article
            key={p.pain}
            className="reveal group relative overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 transition-all hover:border-[color:var(--border-strong)] hover:shadow-[var(--shadow-md)]"
          >
            <div className="text-[11px] font-mono uppercase tracking-wider text-[color:var(--text-tertiary)]">
              Pain
            </div>
            <h3 className="font-display mt-1 text-[22px] leading-tight text-[color:var(--text-primary)]">
              {p.pain}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
              {p.looks}
            </p>
            <div className="my-5 h-px bg-[color:var(--border)]" />
            <div className="text-[11px] font-mono uppercase tracking-wider text-[color:var(--accent)]">
              VibeKit Native fix
            </div>
            <p className="mt-1 text-[14px] leading-relaxed text-[color:var(--text-primary)]">
              {p.solution}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
