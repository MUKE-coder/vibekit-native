import type { Metadata } from "next";
import Script from "next/script";
import {
  ArrowUpRight,
  Boxes,
  ChartLine,
  Clock,
  Code,
  Layers,
  PackageCheck,
  Receipt,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { CopyBlock } from "@/components/copy-block";
import { VideoEmbed } from "@/components/video-embed";
import { AgentInstallTabs } from "@/components/agent-install-tabs";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "VibeKit Native Crash Course — build a Hardware POS mobile app in one afternoon",
  description:
    "Step-by-step crash course: build HardwarePOS Mobile, a real Expo / React Native point-of-sale for a hardware shop in Uganda, with DGateway mobile money. From idea to App Store and Play Store in ~4 hours.",
  alternates: { canonical: "/tutorial" },
  openGraph: {
    url: `${SITE.url}/tutorial`,
    images: ["/vibekit_thumbnail_cli.png"],
    type: "article",
  },
};

const hardwarePosIdea = `I want to build HardwarePOS Mobile — an Expo / React Native point-of-sale app for
a small hardware shop in Uganda. The shop owner uses it on a phone or tablet to
ring up sales of items like nails, paint, plumbing fittings, electrical supplies,
and hand tools. Single user (the shop owner / cashier) — no team features, no
customer-facing storefront, no online ordering. Strictly in-shop POS that works
even on a slow connection.

Platforms: iOS + Android (Expo Web optional for testing).

Core flows:

1. POS Sale (the main screen): search products by name or SKU, tap to add to
   cart, adjust quantities with steppers, see live total. Pick payment method
   (Cash / Mobile Money via DGateway / Card via Stripe). For mobile money,
   the customer's phone number is captured and an STK push prompt is sent;
   the cashier sees a "Check your customer's phone" screen until payment
   completes. Complete sale, then offer a printable / shareable receipt.

2. Inventory: list products with name, SKU, category, price (UGX), and stock
   quantity. Add new products, edit price/stock, delete. Low-stock alerts when
   stock falls below a configurable threshold per product.

3. Sales history: list of past sales with date, total, payment method, items
   count, customer (if captured). Filter by date range and payment method. View
   a single sale's full line items.

4. Dashboard: today's sales total + transaction count, top 5 products this week,
   low-stock alert count, weekly revenue chart (last 7 days).

Seed the database with these categories on first run: Tools, Hardware, Paint,
Plumbing, Electrical, Other.

Auth: email + password via Better Auth. Single user role for now.

Payments:
- DGateway (mobile money — UGX) for the Ugandan market — required.
- Stripe (cards / Apple Pay / Google Pay) for tourists / card customers — optional.

No image uploads — text-only products (name + SKU + category is enough).
Currency: UGX with comma-separated formatting and no decimals (25,000 not 25,000.00).

Dark mode only (faster to ship; the cashier works in dim shop light anyway).
Push notifications: Yes (low-stock alerts at end of day).
Deep linking: No (single-user, no shared content).
Offline support: reads work offline (TanStack Query persister); writes need
connectivity (sales can't be recorded without confirming payment).

Aesthetic: clean dashboard like Linear / Vercel — bold large numbers so the
cashier can read totals at a glance. Brand color: indigo (#6366F1).

Deployment: EAS Build production for both iOS + Android, EAS Submit to App
Store + Google Play, EAS Update for OTA JS-only patches, EAS Hosting for the
Expo API Routes backend.`;

const modules = [
  {
    Icon: PackageCheck,
    eyebrow: "MODULE 01",
    title: "Set up the accounts you'll need",
    time: "8 min",
    intro: "All free tiers cover the entire course. Sign up first so you don't break flow later.",
  },
  {
    Icon: Sparkles,
    eyebrow: "MODULE 02",
    title: "Plan with Claude (claude.ai)",
    time: "15 min",
    intro: "Paste the VibeKit Native planning prompt + the HardwarePOS Mobile brief into Claude. Walk away with 4 files that define the entire build.",
  },
  {
    Icon: Layers,
    eyebrow: "MODULE 03",
    title: "Initialize the project",
    time: "10 min",
    intro: "Drop the framework files into the project root. Install the agent rules. Paste prompt.md and let your AI agent take over.",
  },
  {
    Icon: Code,
    eyebrow: "MODULE 04",
    title: "Phase 1 — Foundation",
    time: "30 min",
    intro: "Expo + NativeWind + expo-router + Prisma v7 + Neon + Better Auth + Expo plugin + EAS init + Sentry. Sign-in works; you're on a dev build.",
  },
  {
    Icon: Boxes,
    eyebrow: "MODULE 05",
    title: "Phase 2 — Inventory + POS screens",
    time: "35 min",
    intro: "Install registry categories (commerce, ui, shared). Build inventory list, product create/edit, POS sale screen with cart — all with mock data.",
  },
  {
    Icon: Receipt,
    eyebrow: "MODULE 06",
    title: "Phase 3 — API Routes + DGateway",
    time: "50 min",
    intro: "CRUD API routes per entity (Prisma + Zod). Wire DGateway mobile money proxy + HMAC webhook. Atomic stock decrements inside a Prisma transaction.",
  },
  {
    Icon: ChartLine,
    eyebrow: "MODULE 07",
    title: "Phase 4 — Dashboard + Polish",
    time: "30 min",
    intro: "Stat cards, weekly revenue chart, push notifications for low stock, Reanimated entrance animations, expo-haptics on every CTA.",
  },
  {
    Icon: Rocket,
    eyebrow: "MODULE 08",
    title: "Phase 5 — Pre-deploy + ship",
    time: "45 min",
    intro: "Run pre-deploy-review.md. Deploy API routes to EAS Hosting. EAS Build production. EAS Submit to App Store + Play. EAS Update for OTA.",
  },
];

export default function TutorialPage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        {/* Hero */}
        <section className="relative pb-12 sm:pb-20 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 circuit-grid opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 65%)",
            }}
          />

          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              </span>
              Crash course · 8 modules · ~4 hours
            </div>

            <h1 className="headline-display mt-6 text-[clamp(2.25rem,6.5vw,4.5rem)] headline-glow-strong">
              Build a real <em className="not-italic gradient-text">Hardware POS</em> mobile app in one afternoon.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[color:var(--text-secondary)]">
              Follow this crash course and ship <strong className="font-medium text-[color:var(--text-primary)]">HardwarePOS Mobile</strong> — an Expo / React Native point-of-sale app a hardware shop in Kampala could install Monday morning. Inventory, sales, DGateway mobile money, dashboard. Submitted to the App Store + Play Store by sundown. Powered by VibeKit Native + your favourite AI coding agent.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#module-01" className="contents">
                <Button variant="accent" size="lg">
                  Start the course
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </a>
              <Button href={SITE.community} variant="outline" size="lg">
                Join the community
              </Button>
            </div>
          </div>

          {/* Video — full crash course companion */}
          <div className="mx-auto mt-16 max-w-4xl px-4 sm:px-6">
            <VideoEmbed
              videoId="TvGu_Tu-6UI"
              thumbnail="https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwf0VdAvuLtvnF3cx4uPCTU9aqg2f0oY8klybGQ"
              title="VibeKit Native Crash Course — full walkthrough"
              caption="Watch the full crash course on YouTube as you follow the modules below"
            />
          </div>
        </section>

        {/* What you'll build */}
        <Section
          eyebrow="WHAT YOU'LL BUILD"
          title="HardwarePOS Mobile — a real shop POS."
          description="Not a tutorial toy. Real auth, real database, real DGateway mobile money, real transactions, real OTA updates. A hardware shop owner could install this from the Play Store and start using it."
          containerClassName="max-w-5xl"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="reveal rounded-2xl card-glass p-6">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
                Features you'll ship
              </h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px] text-[color:var(--text-primary)]">
                {[
                  "Email + password sign-in (Better Auth + Expo plugin)",
                  "Inventory: products with SKU, price (UGX), stock, category",
                  "Six seeded categories: Tools, Hardware, Paint, Plumbing, Electrical, Other",
                  "Low-stock push notifications via expo-notifications",
                  "POS sale screen: product search, cart, live total",
                  "Three payment methods: Cash, DGateway mobile money, Stripe card",
                  "DGateway STK push flow: \"Check customer's phone\" status screen",
                  "Atomic stock decrement in Prisma transactions",
                  "Sales history with date-range filtering",
                  "Dashboard: today's revenue, top products, weekly chart",
                  "Dark-mode native UI, 60fps scrolling, haptic feedback",
                  "Shipped to App Store + Play Store via EAS Submit",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal rounded-2xl card-glass p-6">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
                Skills you'll learn
              </h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px] text-[color:var(--text-primary)]">
                {[
                  "Planning a real mobile product with Claude before any code",
                  "Reading a phase-by-phase mobile build plan",
                  "Bootstrapping Expo SDK 55 + NativeWind v4 + expo-router",
                  "Wiring Prisma v7 with Neon's HTTP serverless driver",
                  "Better Auth + @better-auth/expo (SecureStore session)",
                  "Expo API Routes — same repo, no separate backend",
                  "Modelling transactional data (Sale + SaleItem pattern)",
                  "Auth-guarded Expo API Routes with Zod validation",
                  "Installing VibeKit Native registry components on demand",
                  "DGateway server proxy + HMAC-verified webhook",
                  "Aggregating data with Prisma groupBy for dashboards",
                  "EAS Build + EAS Submit + EAS Update + EAS Hosting",
                  "Running a senior-level mobile pre-submission audit",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total time", value: "~4 hrs" },
              { label: "Modules", value: "8" },
              { label: "Lines you write", value: "~0" },
              { label: "Cost (free tiers)", value: "$0" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl card-glass p-4 text-center"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                  {s.label}
                </div>
                <div className="mt-1 font-mono text-[20px] font-semibold tabular-nums text-[color:var(--text-primary)]">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Module index */}
        <Section
          eyebrow="THE 8 MODULES"
          title="The full path."
          description="Click any module to jump in. They build on each other — follow them in order on your first run."
          containerClassName="max-w-4xl"
        >
          <ol className="grid gap-3 sm:grid-cols-2">
            {modules.map((m, i) => {
              const slug = `module-${String(i + 1).padStart(2, "0")}`;
              return (
                <li key={slug}>
                  <a
                    href={`#${slug}`}
                    className="group flex items-start gap-4 rounded-2xl card-glass p-4 transition-all hover:-translate-y-0.5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] text-[color:var(--text-secondary)] transition-colors group-hover:text-[color:var(--accent)]">
                      <m.Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                          {m.eyebrow}
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                          <Clock className="h-3 w-3" />
                          {m.time}
                        </span>
                      </div>
                      <h3 className="mt-1 font-mono text-[13.5px] uppercase tracking-tight text-[color:var(--text-primary)]">
                        {m.title}
                      </h3>
                    </div>
                  </a>
                </li>
              );
            })}
          </ol>
        </Section>

        {/* MODULE 00 — pre-flight environment check */}
        <ModuleSection slug="module-00" eyebrow="MODULE 00 · 5 min · OPTIONAL BUT RECOMMENDED" title="Check your environment first">
          <p>
            Before signing up for accounts, make sure your machine has the mobile toolchain VibeKit Native needs. The fastest way to check is to paste the OS-specific prompt at <a href="/setup">native.desishub.com/setup</a> into your AI coding agent — it scans your machine, reports what's installed, and gives you one-line install commands for anything missing.
          </p>

          <h3>Minimum tools</h3>
          <ul>
            <li><strong>Node 20+</strong>, <strong>pnpm 9+</strong>, <strong>git</strong></li>
            <li><strong>Expo CLI</strong> (no separate install — comes via <code>npx</code>)</li>
            <li><strong>EAS CLI</strong>: <code>pnpm add -g eas-cli</code></li>
            <li><strong>iOS only</strong>: Xcode 16+ with iOS Simulator (macOS only — Windows users skip iOS and use Android)</li>
            <li><strong>Android</strong>: Android Studio + an emulator OR a real Android phone with USB debugging</li>
            <li><strong>Optional</strong>: Expo Go app on your phone for quick QR-code testing</li>
          </ul>

          <p>If everything's installed, skip to Module 01.</p>

          <div className="not-prose mt-6 flex flex-wrap gap-3">
            <a
              href="/setup"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent)] px-5 py-2.5 font-medium text-[color:var(--accent-fg)] transition-all hover:-translate-y-0.5"
            >
              Open the setup check →
            </a>
          </div>
        </ModuleSection>

        {/* MODULE 01 */}
        <ModuleSection slug="module-01" eyebrow="MODULE 01 · 8 min" title="Set up the accounts you'll need">
          <p>All free tiers cover the entire course. Sign up first so you don't break flow later.</p>

          <Checklist
            items={[
              { name: "Anthropic Claude (chat)", url: "https://claude.ai", note: "Free tier works for the planning step" },
              { name: "Claude Code or Cursor", url: "https://www.anthropic.com/claude-code", note: "Pick whichever AI coding agent you prefer" },
              { name: "Expo account", url: "https://expo.dev", note: "Required for EAS Build / Submit / Update / Hosting — free tier covers dev" },
              { name: "Neon (Postgres)", url: "https://neon.tech", note: "Free tier (3 GB storage, autoscale)" },
              { name: "Resend (email)", url: "https://resend.com", note: "Transactional email — free tier 3,000/mo" },
              { name: "Sentry", url: "https://sentry.io", note: "Crash reporting — free tier 5K events/mo" },
              { name: "DGateway sandbox", url: "https://dgateway.com/docs", note: "Mobile money sandbox — request a dgw_test_ key" },
              { name: "Stripe (optional)", url: "https://stripe.com", note: "Card payments — test keys are free" },
              { name: "GitHub account", url: "https://github.com", note: "For source control + EAS auto-build hooks" },
              { name: "Apple Developer ($99/yr)", url: "https://developer.apple.com", note: "Only when you submit to App Store — defer until Module 08" },
              { name: "Google Play Console ($25 one-time)", url: "https://play.google.com/console", note: "Only when you submit to Play Store — defer until Module 08" },
            ]}
          />

          <Tip>
            <em>$0 to start.</em> Both store fees can wait until Module 08. You can build, test on simulators, and run dev builds with zero spend.
          </Tip>
        </ModuleSection>

        {/* MODULE 02 */}
        <ModuleSection slug="module-02" eyebrow="MODULE 02 · 15 min" title="Plan with Claude (claude.ai)">
          <p>
            Open <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a> and start a new conversation. Paste the contents of <a href={`${SITE.github}/blob/main/CLAUDE_PROMPT.md`} target="_blank" rel="noopener noreferrer"><code>CLAUDE_PROMPT.md</code></a> from the VibeKit Native repo. Then paste the HardwarePOS Mobile brief at the bottom.
          </p>

          <h3>The brief — paste this after CLAUDE_PROMPT.md</h3>
          <CopyBlock
            filename="MY IDEA"
            label="HardwarePOS Mobile brief"
            code={hardwarePosIdea}
          />

          <h3>What Claude does next</h3>
          <ol>
            <li>Confirms it has read the four reference URLs (README, design-style-guide, vibekit-native-components, master_prompt)</li>
            <li>Asks 6–10 mobile-specific questions: platforms, auth method, payment providers, push notifications, deep links, dark mode, visual reference</li>
            <li>Summarises what it's going to build and asks you to confirm</li>
            <li>Generates 4 Artifacts: <code>project-description.md</code>, <code>project-phases.md</code>, <code>design-style-guide.md</code>, <code>prompt.md</code></li>
          </ol>

          <Tip>
            <em>Visual reference is mandatory.</em> Claude asks for a Dribbble link / app screenshot / competitor app you want to match. Have one ready before you start — examples: <a href="https://dribbble.com/shots/popular/mobile" target="_blank" rel="noopener noreferrer">Dribbble mobile shots</a>, the Square POS app, the Stripe Terminal app, the Shopify POS app.
          </Tip>

          <p>Save all 4 generated files into a new project folder on your machine. Name the folder <code>hardware-pos-mobile</code>.</p>
        </ModuleSection>

        {/* MODULE 03 */}
        <ModuleSection slug="module-03" eyebrow="MODULE 03 · 10 min" title="Initialize the project">
          <h3>Step 1 — Create the folder + open in your editor</h3>
          <CopyBlock
            filename="terminal"
            label="Project folder"
            code={`mkdir hardware-pos-mobile && cd hardware-pos-mobile

# Move the 4 generated files (project-description, project-phases,
# design-style-guide, prompt) from Claude into this folder.`}
          />

          <h3>Step 2 — Copy the framework files</h3>
          <p>Clone the VibeKit Native repo to grab the framework files:</p>
          <CopyBlock
            filename="terminal"
            label="One-time clone (delete after copying)"
            code={`git clone https://github.com/MUKE-coder/vibekit-native.git /tmp/vibekit-native

cp /tmp/vibekit-native/master_prompt.md ./master_prompt.md
cp /tmp/vibekit-native/vibekit-native-components.md ./vibekit-native-components.md
cp /tmp/vibekit-native/pre-deploy-review.md ./pre-deploy-review.md`}
          />

          <h3>Step 3 — Install the VibeKit Native rules for your AI agent</h3>
          <p>
            VibeKit Native ships rules for every major AI coding agent. Pick your agent below and run the one-line install. The rules auto-load whenever you open the agent in this project — no need to paste long prompts every session.
          </p>

          <AgentInstallTabs />

          <Tip>
            <em>Switching between agents on the same project?</em> Install for all of them at once — see the "Multi-agent setup" section in <a href={`${SITE.github}/blob/main/skill/README.md`} target="_blank" rel="noopener noreferrer">skill/README.md</a>. One canonical file, symlinked to each agent's expected path.
          </Tip>

          <h3>Step 4 — Verify your project root</h3>
          <p>You should now have these 7 files in your project root:</p>
          <CopyBlock
            filename="ls -la"
            label="Expected files"
            code={`hardware-pos-mobile/
├── master_prompt.md                # framework — coding rules
├── vibekit-native-components.md    # framework — component registry
├── pre-deploy-review.md            # framework — pre-submission audit prompt
├── project-description.md          # generated by Claude
├── project-phases.md               # generated by Claude
├── design-style-guide.md           # generated by Claude
├── prompt.md                       # generated by Claude — paste this next
│
# ONE of these from Step 3 (depending on your agent):
├── .claude/skills/vibekit-native/SKILL.md   # Claude Code
├── .cursor/rules/vibekit-native.mdc         # Cursor
├── AGENTS.md                                # Codex CLI / universal
├── .clinerules                              # Cline
├── .windsurfrules                           # Windsurf
├── GEMINI.md                                # Gemini CLI
└── # No Expo scaffold yet — Phase 1 creates it`}
          />

          <h3>Step 5 — Open in your coding agent</h3>
          <p>
            Open the <code>hardware-pos-mobile</code> folder in Claude Code (<code>claude</code> in the project terminal), Cursor, Cline, or whichever agent you chose.
          </p>
        </ModuleSection>

        {/* MODULE 04 */}
        <ModuleSection slug="module-04" eyebrow="MODULE 04 · 30 min" title="Phase 1 — Foundation">
          <p>
            First big build moment. Your agent reads the framework files, then executes Phase 1: Expo init + NativeWind + expo-router + Prisma v7 + Neon HTTP adapter + Better Auth + Expo plugin + EAS init + Sentry. Sign-in works, you have a dev build running.
          </p>

          <h3>Step 1 — Get a Neon database URL</h3>
          <ol>
            <li>Go to <a href="https://console.neon.tech" target="_blank" rel="noopener noreferrer">console.neon.tech</a> and create a new project.</li>
            <li>Copy the connection string (starts with <code>postgresql://</code>). Use the <strong>pooled</strong> connection — the Neon HTTP serverless driver handles it.</li>
            <li>Keep the tab open — you'll paste this in a moment.</li>
          </ol>

          <h3>Step 2 — Get a DGateway sandbox key</h3>
          <ol>
            <li>Visit <a href="https://dgatewayadmin.desispay.com" target="_blank" rel="noopener noreferrer">dgatewayadmin.desispay.com</a> and create an app.</li>
            <li>Generate an API key. Use the <code>dgw_test_*</code> key for development.</li>
            <li>Save both the key and the webhook secret (shown once at generation).</li>
          </ol>

          <h3>Step 3 — Paste the build prompt</h3>
          <p>In your coding agent, paste the entire contents of <code>prompt.md</code> as your first message. The agent will:</p>
          <ol>
            <li>Read <code>master_prompt.md</code>, <code>design-style-guide.md</code>, <code>vibekit-native-components.md</code>, <code>project-description.md</code>, <code>project-phases.md</code></li>
            <li>Execute Phase 1 tasks (Expo init, NativeWind, expo-router, Prisma + Neon, Better Auth + Expo plugin, EAS init, root auth gate, .env files, Sentry)</li>
            <li>Stop after Phase 1 for your confirmation</li>
          </ol>

          <h3>Step 4 — Provide secrets when asked</h3>
          <p>The agent creates <code>.env.local</code> and asks for values. Provide:</p>
          <CopyBlock
            filename=".env.local"
            label="Phase 1 minimum env vars"
            code={`# Database (Neon — paste the pooled connection string)
DATABASE_URL=postgresql://user:pass@host-pooler.neon.tech/db?sslmode=require

# Better Auth (server-side)
BETTER_AUTH_SECRET=<run: openssl rand -base64 32>
BETTER_AUTH_URL=http://localhost:8081

# Mobile app config (safe to bundle — prefix EXPO_PUBLIC_)
EXPO_PUBLIC_API_URL=http://localhost:8081
EXPO_PUBLIC_APP_SCHEME=hardwarepos

# DGateway (server-side ONLY — never EXPO_PUBLIC_)
DGATEWAY_API_KEY=dgw_test_...
DGATEWAY_API_URL=https://dgatewayapi.desispay.com
DGATEWAY_WEBHOOK_SECRET=whsec_...
APP_URL=http://localhost:8081

# Sentry (DSN is safe to bundle)
EXPO_PUBLIC_SENTRY_DSN=https://...@sentry.io/...`}
          />

          <h3>Step 5 — Run the dev build</h3>
          <CopyBlock
            filename="terminal"
            label="Start the Metro bundler + simulator"
            code={`# Migrate the database
pnpm prisma migrate dev --name init

# Start Expo
pnpm expo start

# Then press 'i' to launch iOS simulator, or 'a' for Android emulator,
# or scan the QR with Expo Go on your physical phone.`}
          />

          <Tip>
            <em>Phase 1 confirms when you can sign up, sign in, and land on a placeholder tab screen.</em> If you can't, paste the error into your agent and ask it to fix before moving on.
          </Tip>
        </ModuleSection>

        {/* MODULE 05 */}
        <ModuleSection slug="module-05" eyebrow="MODULE 05 · 35 min" title="Phase 2 — Inventory + POS screens">
          <p>
            Your agent installs registry categories and builds every screen listed in <code>project-description.md</code> with mock data. No API calls yet — that's Phase 3.
          </p>

          <h3>Registry installs (your agent runs these)</h3>
          <CopyBlock
            filename="terminal"
            label="Phase 2 component installs"
            code={`# Foundation primitives
npx vibekit-native install ui

# Shared layouts (screen-header, search-bar, filter-sheet, filter-sort-bar)
npx vibekit-native install shared

# Commerce (product-card, cart-item, price-display, order-card,
#   order-summary, checkout-form, wishlist-button, review-card,
#   order-timeline, product-header)
npx vibekit-native install commerce

# Bottom tabs + drawer
npx vibekit-native install nav

# Stat cards + chart-line / chart-bar / chart-pie + dashboard shell + data-table
npx vibekit-native install dashboard

# Payments (DGateway mobile money + Stripe)
npx vibekit-native install payments`}
          />

          <h3>Screens your agent builds</h3>
          <ul>
            <li><code>(tabs)/index.tsx</code> — POS sale screen (search bar, product grid, cart drawer)</li>
            <li><code>(tabs)/inventory.tsx</code> — product list with low-stock badges</li>
            <li><code>(tabs)/history.tsx</code> — sales history with date filter</li>
            <li><code>(tabs)/dashboard.tsx</code> — stat cards, top products, weekly chart</li>
            <li><code>inventory/new.tsx</code> + <code>inventory/[id].tsx</code> — product create / edit</li>
            <li><code>sale/[id].tsx</code> — single sale detail with line items</li>
            <li><code>checkout.tsx</code> — payment method picker → DGateway / Stripe / Cash</li>
          </ul>

          <Tip>
            <em>Mock data is in <code>src/lib/mocks/</code>.</em> Hardcoded arrays of products and sales — enough to verify every screen renders before wiring real APIs.
          </Tip>
        </ModuleSection>

        {/* MODULE 06 */}
        <ModuleSection slug="module-06" eyebrow="MODULE 06 · 50 min" title="Phase 3 — API Routes + DGateway">
          <p>
            Every entity gets a CRUD <code>+api.ts</code> route under <code>app/api/</code>. Zod-validated, cursor-paginated, auth-gated. Then the DGateway proxy + HMAC-verified webhook. Then every screen swaps its mock data for a TanStack Query hook.
          </p>

          <h3>API routes your agent creates</h3>
          <ul>
            <li><code>app/api/products/+api.ts</code> — GET (list with cursor + search), POST (create)</li>
            <li><code>app/api/products/[id]+api.ts</code> — GET / PATCH / DELETE single product</li>
            <li><code>app/api/sales/+api.ts</code> — GET (list with date filter), POST (atomic stock decrement inside a Prisma transaction)</li>
            <li><code>app/api/sales/[id]+api.ts</code> — GET single sale + line items</li>
            <li><code>app/api/dashboard/+api.ts</code> — aggregations via Prisma groupBy</li>
            <li><code>app/api/checkout/start+api.ts</code> — DGateway STK push proxy</li>
            <li><code>app/api/checkout/status/[reference]+api.ts</code> — payment status proxy</li>
            <li><code>app/api/webhooks/dgateway+api.ts</code> — HMAC-SHA256 verified webhook with idempotent dedupe</li>
          </ul>

          <h3>The atomic stock decrement pattern</h3>
          <CopyBlock
            filename="app/api/sales/+api.ts (POST)"
            label="Prisma transaction — never sell what you don't have"
            code={`export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = CreateSaleSchema.safeParse(await request.json());
  if (!parsed.success) return Response.json({ error: 'Invalid input' }, { status: 400 });

  const { items, paymentMethod, customerName, customerPhone, total } = parsed.data;

  // Single transaction: check stock + decrement + create sale, all-or-nothing
  const sale = await prisma.$transaction(async (tx) => {
    for (const item of items) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error('Product not found');
      if (product.stock < item.quantity) throw new Error(\`Insufficient stock for \${product.name}\`);
    }

    // Decrement in one shot
    await Promise.all(
      items.map((item) =>
        tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        }),
      ),
    );

    return tx.sale.create({
      data: {
        userId: session.user.id,
        total,
        paymentMethod,
        customerName,
        customerPhone,
        items: { create: items.map((i) => ({ productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice })) },
      },
      include: { items: true },
    });
  });

  return Response.json({ data: sale }, { status: 201 });
}`}
          />

          <h3>The DGateway webhook with HMAC verification</h3>
          <CopyBlock
            filename="app/api/webhooks/dgateway+api.ts"
            label="Constant-time HMAC compare + idempotent dedupe"
            code={`import crypto from 'node:crypto';
import { prisma } from '@/src/lib/prisma';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('X-DGateway-Signature') ?? '';

  const expected = crypto
    .createHmac('sha256', process.env.DGATEWAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest('hex');

  if (
    !signature ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Dedupe — DGateway retries up to 3 times
  const existing = await prisma.paymentEvent.findUnique({
    where: { reference: event.reference },
  });
  if (existing) return new Response(null, { status: 200 });

  await prisma.$transaction([
    prisma.paymentEvent.create({
      data: {
        reference: event.reference,
        status: event.status,
        provider: event.provider,
        providerRef: event.provider_ref,
        payload: event,
      },
    }),
    prisma.sale.updateMany({
      where: { paymentReference: event.reference },
      data: { paymentStatus: event.status },
    }),
  ]);

  return new Response(null, { status: 200 });
}`}
          />

          <h3>Test with DGateway sandbox phone numbers</h3>
          <p>DGateway provides deterministic phone numbers when you use a <code>dgw_test_*</code> key:</p>
          <ul>
            <li><code>256111777111</code> — always succeeds (use this for the happy path)</li>
            <li><code>256111777222</code> — always fails (test the error UX)</li>
            <li><code>256111777333</code> — times out / expires (test the 5-minute ceiling)</li>
          </ul>

          <Tip>
            <em>Phase 3 confirms when:</em> you can create a product, ring up a sale with the test phone number, see the "Check customer's phone" screen, and watch the sale move from pending → completed in the history list when the webhook fires.
          </Tip>
        </ModuleSection>

        {/* MODULE 07 */}
        <ModuleSection slug="module-07" eyebrow="MODULE 07 · 30 min" title="Phase 4 — Dashboard + Polish">
          <p>
            Wire the dashboard with real aggregations. Add Reanimated entrance animations to lists. Wire <code>expo-haptics</code> on every CTA. Configure <code>expo-notifications</code> for the end-of-day low-stock push.
          </p>

          <h3>Dashboard aggregations</h3>
          <ul>
            <li>Today's revenue: <code>prisma.sale.aggregate({`{ _sum: { total: true }, where: { createdAt: { gte: startOfDay() } } }`})</code></li>
            <li>Top 5 products this week: <code>prisma.saleItem.groupBy({`{ by: ['productId'], _sum: { quantity: true }, orderBy: { _sum: { quantity: 'desc' } }, take: 5 }`})</code></li>
            <li>Low-stock count: <code>prisma.product.count({`{ where: { stock: { lte: prisma.product.fields.lowStockThreshold } } }`})</code></li>
            <li>Weekly revenue chart: 7-day cursor query → group by day → feed to <code>chart-line</code></li>
          </ul>

          <h3>Polish checklist</h3>
          <ul>
            <li>Reanimated <code>FadeIn</code> stagger on product list rows (respects <code>useReducedMotion</code>)</li>
            <li><code>Haptics.impactAsync(ImpactFeedbackStyle.Light)</code> on every primary button</li>
            <li><code>Haptics.notificationAsync(NotificationFeedbackType.Success)</code> on sale complete</li>
            <li>Pull-to-refresh on every list</li>
            <li>Empty states with custom illustration (image-first 80/20)</li>
            <li>Skeleton loaders matching each card's silhouette</li>
            <li><code>expo-notifications</code> permission request after first sign-in, not on cold start</li>
            <li>Background task that fires the low-stock push at 6 PM</li>
            <li>Splash screen, adaptive icon, status bar style</li>
          </ul>

          <Tip>
            <em>Test on a real device.</em> Simulators don't show haptics, simulators run hot (often hiding perf issues), and push notifications need a real device + APNs / FCM tokens. Plug in an iPhone or Android phone before signing off Phase 4.
          </Tip>
        </ModuleSection>

        {/* MODULE 08 */}
        <ModuleSection slug="module-08" eyebrow="MODULE 08 · 45 min" title="Phase 5 — Pre-deploy + ship">
          <p>
            Pre-deploy audit. Deploy the Expo API Routes to EAS Hosting. Build production binaries with EAS Build. Submit to TestFlight + Internal Testing. Promote to production.
          </p>

          <h3>Step 1 — Run the pre-deploy review</h3>
          <p>
            Open Claude Code (or your agent) and paste the contents of <a href={`${SITE.github}/blob/main/pre-deploy-review.md`} target="_blank" rel="noopener noreferrer"><code>pre-deploy-review.md</code></a>. It performs a 24-section senior audit covering cold-start perf, native correctness, auth, DB, API routes, webhooks, accessibility, env vars, Sentry, push, deep links, store-ready assets, EAS config.
          </p>

          <p>Fix every 🔴 Critical and 🟠 High before moving on.</p>

          <h3>Step 2 — Migrate the production database</h3>
          <CopyBlock
            filename="terminal"
            label="Apply Prisma migrations to the production Neon database"
            code={`# Switch DATABASE_URL to the production Neon URL temporarily
export DATABASE_URL="postgresql://..."

pnpm prisma migrate deploy
pnpm prisma db seed`}
          />

          <h3>Step 3 — Set production env vars in EAS</h3>
          <CopyBlock
            filename="terminal"
            label="Push secrets to EAS Secret (never commit them)"
            code={`eas secret:create --scope project --name DATABASE_URL --value "postgresql://..." --type string
eas secret:create --scope project --name BETTER_AUTH_SECRET --value "$(openssl rand -base64 32)" --type string
eas secret:create --scope project --name DGATEWAY_API_KEY --value "dgw_live_..." --type string
eas secret:create --scope project --name DGATEWAY_WEBHOOK_SECRET --value "whsec_..." --type string
# ... and any others`}
          />

          <h3>Step 4 — Deploy the API routes to EAS Hosting</h3>
          <CopyBlock
            filename="terminal"
            label="One command, returns a stable URL"
            code={`eas deploy --prod

# Copy the returned URL (e.g., https://hardware-pos-mobile.expo.app)
# Update app.json:
#   "extra": { "apiUrl": "https://hardware-pos-mobile.expo.app" }`}
          />

          <h3>Step 5 — Build production binaries</h3>
          <CopyBlock
            filename="terminal"
            label="EAS Build — iOS + Android together"
            code={`eas build --profile production --platform all

# Takes 20-30 minutes. EAS handles signing for both stores.
# When done you'll get .ipa (iOS) + .aab (Android) downloadable from the EAS dashboard.`}
          />

          <h3>Step 6 — Submit to the stores</h3>
          <CopyBlock
            filename="terminal"
            label="EAS Submit — push the latest build to TestFlight + Play Internal"
            code={`eas submit --profile production --platform ios
eas submit --profile production --platform android

# iOS goes to TestFlight Internal Testing first.
# Android goes to Play Console Internal Testing.
# Walk through both with 3+ humans before promoting to production.`}
          />

          <h3>Step 7 — OTA updates for the small stuff</h3>
          <CopyBlock
            filename="terminal"
            label="EAS Update — no store review for JS-only changes"
            code={`# Fixed a typo? Renamed a button?
eas update --branch production --message "Fix checkout button label"

# Users get the patch on next app open. No 24-72hr review wait.
# (Native changes — new permissions, new deps — still require a rebuild + resubmit.)`}
          />

          <Tip>
            <em>Apple review takes 24–72 hours.</em> Google Play Internal Testing is instant; promotion to production takes a few hours. Plan accordingly — the first submission is the slow one; after that, OTA + EAS Build covers 95% of changes.
          </Tip>

          <h3>You're live</h3>
          <p>
            Once approved, your app is in the App Store and Google Play. The hardware shop downloads it, signs in, starts ringing up sales. DGateway proceeds settle to the merchant account within 24 hours. You ship updates via OTA without ever waiting for review.
          </p>

          <p>Welcome to mobile dev.</p>
        </ModuleSection>
      </main>
      <Footer />

      {/* Structured data — HowTo */}
      <Script
        id="ld-howto-tutorial"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Build HardwarePOS Mobile with VibeKit Native",
            description:
              "8-module crash course on building a production-grade Expo / React Native point-of-sale app with DGateway mobile money, from idea to App Store + Play Store, in one afternoon.",
            totalTime: "PT4H",
            estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
            step: modules.map((m, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: m.title,
              text: m.intro,
              url: `${SITE.url}/tutorial#module-${String(i + 1).padStart(2, "0")}`,
            })),
          }),
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Local helpers                                               */
/* ─────────────────────────────────────────────────────────── */

function ModuleSection({
  slug,
  eyebrow,
  title,
  children,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={slug}
      className="relative scroll-mt-24 border-t border-[color:var(--border)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="border-b border-[color:var(--border)] pb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
            {eyebrow}
          </div>
          <h2 className="mt-3 headline-display text-[clamp(1.75rem,4vw,2.5rem)] headline-glow">
            {title}
          </h2>
        </header>
        <div
          className="mt-8 space-y-5 text-[15.5px] leading-[1.75] text-[color:var(--text-secondary)]
            [&_h3]:font-mono [&_h3]:text-[14px] [&_h3]:uppercase [&_h3]:tracking-tight [&_h3]:text-[color:var(--text-primary)] [&_h3]:mt-10 [&_h3]:mb-2
            [&_strong]:text-[color:var(--text-primary)] [&_strong]:font-medium
            [&_a]:text-[color:var(--accent)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline
            [&_code]:font-mono [&_code]:text-[13.5px] [&_code]:rounded [&_code]:border [&_code]:border-[color:var(--border)] [&_code]:bg-[color:var(--bg-elevated)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[color:var(--text-primary)]
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:my-2
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:my-2"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-md border-l-2 border-[color:var(--accent)] bg-[color:var(--accent-soft)] p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--accent)]">
        Tip
      </div>
      <div className="mt-2 text-[14px] leading-relaxed text-[color:var(--text-primary)] [&_em]:not-italic [&_em]:rounded [&_em]:bg-[color:var(--bg-elevated)] [&_em]:px-1.5 [&_em]:py-0.5 [&_em]:font-mono [&_em]:text-[12.5px]">
        {children}
      </div>
    </div>
  );
}

function Checklist({
  items,
}: {
  items: { name: string; url: string; note?: string }[];
}) {
  return (
    <ul className="not-prose mt-4 grid gap-2 sm:grid-cols-2 list-none pl-0">
      {items.map((item) => (
        <li
          key={item.name}
          className="rounded-2xl card-glass p-4"
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--text-primary)] hover:text-[color:var(--accent)]"
          >
            {item.name}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          {item.note ? (
            <div className="mt-1 text-[12.5px] text-[color:var(--text-tertiary)]">
              {item.note}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
