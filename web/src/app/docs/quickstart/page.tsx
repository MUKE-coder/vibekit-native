import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quickstart — install your first VibeKit Native component",
  description:
    "Step-by-step quickstart for VibeKit Native: install the CLI, browse components, add them to your Expo project, and ship to stores.",
  alternates: { canonical: "/docs/quickstart" },
  openGraph: {
    url: `${SITE.url}/docs/quickstart`,
    images: ["/og.png"],
    type: "article",
  },
};

const prerequisites = [
  "Node.js 20+ and npm (or pnpm, yarn)",
  "An Expo project (create one with npx create-expo-app@latest)",
  "NativeWind v4 set up in your project (npx expo install nativewind tailwindcss)",
];

const steps = [
  {
    n: 1,
    title: "Run the CLI",
    body: 'Open your Expo project in the terminal and run <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">npx vibekit-native</code>. This launches the interactive menu where you can browse all 38 components, see descriptions, and install what you need. No global install required — npx handles everything.',
  },
  {
    n: 2,
    title: "Browse available components",
    body: 'Run <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">npx vibekit-native list</code> to see every component grouped by category. Each entry shows the component name, category, and a short description so you know exactly what you\'re installing.',
  },
  {
    n: 3,
    title: "Install a component",
    body: 'Run <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">npx vibekit-native install &lt;component-name&gt;</code>. For example: <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">npx vibekit-native install login-screen</code>. The component drops into <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">src/components/auth/login-screen.tsx</code> as a single editable file. Install multiple components at once to build complete screens.',
  },
  {
    n: 4,
    title: "Install a category",
    body: 'Need a full auth flow? Run <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">npx vibekit-native install auth</code> to install all auth components (login-screen, register-screen, forgot-password-screen, verify-otp-screen) at once. Categories available: auth, commerce, chat, profile, home, shared, ui.',
  },
  {
    n: 5,
    title: "Import and use it",
    body: 'Import the component into your screen: <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">import { LoginScreen } from "@/src/components/auth/login-screen"</code>. Every component works with NativeWind classes out of the box — you can style it immediately without any theme configuration.',
  },
  {
    n: 6,
    title: "Customize and wire your data",
    body: "Edit the installed file directly — it's your code. Tweak the JSX, adjust NativeWind classes, add your TanStack Query hooks, or wire Better Auth. Zero vendor lock-in: the file lives in your project with no registry dependency.",
  },
  {
    n: 7,
    title: "Ship to stores",
    body: 'Run <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">eas build --profile production</code> to compile your native binaries, then <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">eas submit</code> to send to the App Store and Google Play. Push future updates as OTA bundles with <code class="font-mono text-[13.5px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5 text-[color:var(--text-primary)]">eas update</code> — most changes never need a store review.',
  },
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
            <div className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--accent)]">
              Guide · 7 steps · ~5 min read
            </div>
            <h1 className="mt-3 font-mono text-[clamp(2rem,5vw,3.5rem)] font-bold uppercase tracking-tight text-[color:var(--text-primary)]">
              Quickstart
            </h1>
            <p className="mt-5 text-[18px] leading-relaxed text-[color:var(--text-secondary)]">
              From zero to a production React Native component in your Expo project — step by step. No config, no providers, no boilerplate.
            </p>
          </header>

          {/* Prerequisites */}
          <div className="mt-8 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--accent)]">
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
          </div>

          {/* Steps */}
          <ol className="mt-10 space-y-10">
            {steps.map((s) => (
              <li key={s.n} className="grid gap-5 sm:grid-cols-[auto_1fr]">
                <div className="font-mono text-[40px] font-light leading-none text-[color:var(--accent)] tabular-nums">
                  {String(s.n).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <h2 className="font-mono text-[18px] uppercase tracking-tight text-[color:var(--text-primary)]">
                    {s.title}
                  </h2>
                  <p
                    className="mt-3 text-[15.5px] leading-[1.75] text-[color:var(--text-secondary)]"
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
              </li>
            ))}
          </ol>

          {/* Example install block */}
          <div className="mt-14 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6">
            <h3 className="font-mono text-[12px] uppercase tracking-wider text-[color:var(--accent)]">
              One-command example
            </h3>
            <div className="mt-4 flex items-center gap-3 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-4 py-3 font-mono text-[13px]">
              <span className="text-[color:var(--text-tertiary)]">$</span>
              <code className="text-[color:var(--text-primary)]">npx vibekit-native install login-screen register-screen product-card chat-bubble</code>
            </div>
            <p className="mt-3 text-[13px] text-[color:var(--text-tertiary)]">
              Four components, four features, one command. Each file drops into your project ready to edit and ship.
            </p>
          </div>

          <div className="mt-14 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6">
            <h3 className="font-mono text-[12px] uppercase tracking-wider text-[color:var(--accent)]">
              That's it
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--text-primary)]">
              Seven steps from zero to a production component in your Expo app. You'll repeat this flow every time you need a new screen — and it only takes seconds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/components" variant="accent" size="md">
                Browse all 38 components
              </Button>
              <Button href="/faq" variant="outline" size="md">
                Read the FAQ
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
            name: "Set up VibeKit Native",
            description: "Install VibeKit Native components into your Expo project in 7 steps.",
            totalTime: "PT5M",
            step: steps.map((s) => ({
              "@type": "HowToStep",
              position: s.n,
              name: s.title,
              text: s.body.replace(/<[^>]*>/g, ""),
            })),
          }),
        }}
      />
    </>
  );
}
