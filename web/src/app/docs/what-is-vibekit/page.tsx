import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "What is VibeKit Native? — React Native component registry",
  description:
    "VibeKit Native is a React Native / Expo component registry with a dark-only design system. Install production-ready components into any Expo project with a single npx command.",
  alternates: { canonical: "/docs/what-is-vibekit" },
  openGraph: {
    url: `${SITE.url}/docs/what-is-vibekit`,
    images: ["/vibekit_thumbnail_abstract.png"],
    type: "article",
  },
};

export default function WhatIsVibeKit() {
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
              Guide
            </div>
            <h1 className="mt-5 headline-display text-[clamp(2.25rem,5vw,3.75rem)] headline-glow-strong">
              What is VibeKit Native?
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-[color:var(--text-secondary)]">
              A <strong className="text-[color:var(--text-primary)]">planning + build framework</strong> for vibe coders shipping production-grade Expo apps. Plan with claude.ai, then your AI agent (Claude Code, Cursor, Codex, Cline, Windsurf, Gemini, Aider) builds the app phase by phase — installing the right components from a 65-component registry as it goes.
            </p>
          </header>

          <Prose>
            <h2>The short version</h2>
            <p>
              VibeKit Native is a <strong>framework</strong>, not just a component library. The workflow:
            </p>
            <ol>
              <li>Paste <code>CLAUDE_PROMPT.md</code> into <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">claude.ai</a> with your app idea.</li>
              <li>Claude interviews you (6–10 questions: platforms, auth, payments, push, offline, visual reference) and generates 4 customized files.</li>
              <li>You drop those 4 files plus 2 framework files into your project root.</li>
              <li>You paste <code>prompt.md</code> into Claude Code (or any AI coding agent).</li>
              <li>The agent builds the app phase by phase — installing components from the registry instead of writing them from scratch.</li>
              <li>You confirm between phases. You ship.</li>
            </ol>
            <p>
              The 65-component registry is a <em>tool the agent uses</em>, not the headline product. The framework is what saves you tokens, time, and design decisions.
            </p>

            <h2>What problem does it solve?</h2>
            <p>
              Three problems compound on every React Native project:
            </p>
            <ol>
              <li><strong>Token waste:</strong> AI agents generate the same login form, chat UI, product card, payment screen on every project — burning your Anthropic / OpenAI bill.</li>
              <li><strong>Time waste:</strong> Even with AI, you spend hours wiring SafeAreaView, navigation, theme tokens, form validation, list virtualization, image caching — every project.</li>
              <li><strong>Design drift:</strong> Without a coherent design system, your AI agent picks different fonts, colors, spacing, and motion timings on every screen. The app looks AI-generated.</li>
            </ol>
            <p>
              VibeKit Native fixes all three. The planning step produces a <code>design-style-guide.md</code> tailored to your app + a <code>project-phases.md</code> blueprint. The framework files (<code>master_prompt.md</code> + <code>vibekit-native-components.md</code>) tell your AI agent which 65 production-tested components to install instead of generating, and pin the entire stack (Expo SDK 55+ · Neon Postgres · Prisma v7 · Better Auth · Expo API Routes · EAS).
            </p>

            <h2>Who is it for?</h2>
            <ul>
              <li><strong>Vibe coders</strong> shipping Expo apps with Claude Code, Cursor, Codex, Cline, Windsurf, Gemini, or Aider — who want a framework, not just prompts.</li>
              <li><strong>Indie hackers</strong> who'd rather spend their token budget on business logic than reinventing login forms.</li>
              <li><strong>Freelancers and agencies</strong> delivering multiple client apps — same locked stack, same design tokens, no per-project drift.</li>
              <li><strong>Teams in East Africa</strong> who need DGateway mobile-money payments (UGX/KES/TZS/RWF) baked in instead of bolted on.</li>
            </ul>

            <h2>What you get</h2>
            <p>65 components across 11 categories — every screen your app needs:</p>
            <ul>
              <li><strong>Auth:</strong> login-screen, register-screen, forgot-password-screen, verify-otp-screen, new-password-screen, complete-profile-screen — full auth flow with react-hook-form + Zod.</li>
              <li><strong>Commerce:</strong> product-card, cart-item, price-display, order-card, order-timeline, product-header — ship a store in an afternoon.</li>
              <li><strong>Chat:</strong> chat-bubble, chat-input, chat-list, chat-header — wire to any backend in under an hour.</li>
              <li><strong>Home:</strong> hero-banner, section-header, category-circles, flash-sale-timer — every app needs a home screen.</li>
              <li><strong>Profile:</strong> points-card, coupon-card — loyalty and vouchers done.</li>
              <li><strong>Shared:</strong> screen-header, filter-sheet, filter-sort-bar, search-bar — shared screen patterns.</li>
              <li><strong>UI:</strong> button, input, badge, avatar, card, bottom-sheet, toast, skeleton, rating, otp-input and more — interaction patterns that work.</li>
            </ul>

            <h2>The stack</h2>
            <p>Every component is built on a locked, AI-friendly stack:</p>
            <ul>
              <li><strong>Expo SDK 55+</strong> — universal native apps with OTA updates</li>
              <li><strong>NativeWind v4</strong> — Tailwind CSS for React Native</li>
              <li><strong>expo-router</strong> — file-based routing</li>
              <li><strong>TanStack React Query</strong> — server state and caching</li>
              <li><strong>Zod + react-hook-form</strong> — type-safe validation</li>
              <li><strong>Zustand</strong> — lightweight client state</li>
              <li><strong>react-native-reanimated</strong> — 60fps UI thread animations</li>
            </ul>

            <h2>How it works</h2>
            <ol>
              <li>Open your Expo project in the terminal.</li>
              <li>Run <code>npx vibekit-native install login-screen</code> — a ready-to-edit file drops into <code>src/components/auth/</code>.</li>
              <li>Import and use it. Edit the JSX, tweak the NativeWind classes, wire your API.</li>
              <li>Ship to the App Store and Play Store via EAS Build. Push OTA updates for the next iteration.</li>
            </ol>

            <h2>Why this beats writing from scratch</h2>
            <p>
              Every component ships with the same dark design system — indigo accent, zinc borders, 12px radius, consistent spacing. When you install LoginForm, it looks the same as ChatBubble and ProductCard. No theme drift, no style mismatches, no "this button has different radius on this screen" bugs.
            </p>
            <p>
              And because every component is a plain TypeScript file in your project, you own it completely. No registry lock-in, no black box, no dependency on a CDN. Delete the file, or edit it — it's your code.
            </p>

            <h2>Is it free?</h2>
            <p>
              Yes. MIT licensed, open source, and free to use. No paid tiers, no pro plan, no feature gating. You'll pay for the services your app uses (Expo EAS Build credits, Neon database, Better Auth — most have generous free tiers).
            </p>

            <h2>Where do I start?</h2>
            <p>
              Run <code>npx vibekit-native</code> in any Expo project to launch the interactive CLI, or read the <Link href="/docs/quickstart">quickstart guide</Link> for step-by-step setup.
            </p>
          </Prose>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-[color:var(--border)] pt-8">
            <Button href="/docs/quickstart" variant="accent" size="md">
              Read the quickstart
            </Button>
            <Button href={SITE.github} variant="outline" size="md">
              <Package className="h-4 w-4" />
              Open the GitHub repo
            </Button>
          </div>
        </article>
      </main>
      <Footer />

      <Script
        id="ld-article-what-is"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "What is VibeKit Native?",
            description: "A React Native / Expo component registry with dark-only design system. Install components with npx.",
            author: { "@type": "Person", name: "JB (Muke Johnbaptist)", url: SITE.authorUrl },
            publisher: { "@type": "Organization", name: "Desishub Technologies", url: "https://desishub.com" },
            mainEntityOfPage: `${SITE.url}/docs/what-is-vibekit`,
          }),
        }}
      />
    </>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-10 space-y-6 text-[16px] leading-[1.75] text-[color:var(--text-primary)]
        [&_h2]:font-mono [&_h2]:text-[20px] [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-[color:var(--text-primary)] [&_h2]:mt-12 [&_h2]:mb-2
        [&_p]:text-[color:var(--text-secondary)]
        [&_strong]:text-[color:var(--text-primary)] [&_strong]:font-medium
        [&_a]:text-[color:var(--accent)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline
        [&_code]:font-mono [&_code]:text-[13.5px] [&_code]:rounded [&_code]:border [&_code]:border-[color:var(--border)] [&_code]:bg-[color:var(--bg-elevated)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[color:var(--text-primary)]
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:my-2 [&_ol_li]:text-[color:var(--text-secondary)]
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:my-2 [&_ul_li]:text-[color:var(--text-secondary)]"
    >
      {children}
    </div>
  );
}
