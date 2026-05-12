import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Package, Terminal } from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Setup — prerequisites for VibeKit Native",
  description:
    "Pre-flight environment check for VibeKit Native. Make sure your machine has Node.js, npm, Expo CLI, and git before installing components.",
  alternates: { canonical: "/setup" },
  openGraph: {
    title: "VibeKit Native Setup — pre-flight check",
    description: "Make sure your machine has Node.js, npm, git, and Expo CLI before starting.",
    url: `${SITE.url}/setup`,
    images: ["/og.png"],
  },
};

const requirements = [
  { name: "Node.js", version: "≥ 20 (22 LTS preferred)", reason: "Expo SDK 55+ runtime" },
  { name: "npm or pnpm", version: "≥ 10 (npm) / ≥ 9 (pnpm)", reason: "Install Expo and VibeKit Native CLI" },
  { name: "git", version: "any recent", reason: "Source control + Expo workflow" },
  { name: "EAS CLI", version: "latest (optional)", reason: "Build and submit to stores" },
];

export default function SetupPage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
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
              Pre-flight check · 2 min
            </div>

            <h1 className="font-display mt-6 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.04] tracking-tight text-[color:var(--text-primary)]">
              Check your environment <em className="not-italic gradient-text">before</em> you start.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
              Make sure Node.js, npm, and git are installed. If you&apos;re new to Expo, we recommend creating a test project first to verify your setup works end-to-end.
            </p>
          </div>
        </section>

        <Section eyebrow="WHAT YOU NEED" title="Three tools. That's it." containerClassName="max-w-4xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {requirements.map((r) => (
              <div key={r.name} className="reveal flex items-start gap-4 rounded-2xl card-glass p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] text-[color:var(--accent)]">
                  <Package className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-mono text-[14px] uppercase tracking-tight text-[color:var(--text-primary)]">{r.name}</h3>
                    <span className="font-mono text-[11px] text-[color:var(--text-tertiary)]">{r.version}</span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">{r.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="VERIFY YOUR SETUP" title="Quick verification" containerClassName="max-w-3xl">
          <div className="reveal space-y-4">
            <p className="text-[15.5px] leading-relaxed text-[color:var(--text-secondary)]">
              Run these commands in your terminal to verify everything is installed:
            </p>
            <div className="rounded-md border border-[color:var(--border)] bg-[#0A0A0A] p-4 font-mono text-[13px] leading-relaxed text-white/80">
              <code>{`node --version    # Should show v20.x or higher
npm --version     # Should show 10.x or higher
git --version     # Should show any recent version
npx --version     # Should show any version (npx ships with npm)`}</code>
            </div>
          </div>

          <div className="reveal mt-10 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--accent)]" />
              <div>
                <h3 className="font-mono text-[12px] uppercase tracking-wider text-[color:var(--text-primary)]">Need an Expo project?</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                  If you don&apos;t have an Expo project yet, create one with{" "}
                  <code className="font-mono text-[12px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">npx create-expo-app@latest my-app</code>{" "}
                  and <code className="font-mono text-[12px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">cd my-app</code>. Then run{" "}
                  <code className="font-mono text-[12px] rounded border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-1.5 py-0.5">npx vibekit-native</code> to start browsing components.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs/quickstart" className="contents">
              <Button variant="accent" size="md">
                Read the quickstart
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Section>
      </main>
      <Footer />

      <Script id="ld-setup" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Set up VibeKit Native",
          description: "Pre-flight environment check for VibeKit Native.",
          totalTime: "PT2M",
          step: [
            { "@type": "HowToStep", position: 1, name: "Check Node.js version", text: "Run node --version. Must be v20 or higher." },
            { "@type": "HowToStep", position: 2, name: "Check npm version", text: "Run npm --version. Must be 10 or higher." },
            { "@type": "HowToStep", position: 3, name: "Create an Expo project", text: "Run npx create-expo-app@latest my-app if you don't have one." },
            { "@type": "HowToStep", position: 4, name: "Run the CLI", text: "Run npx vibekit-native to install your first component." },
          ],
        }),
      }} />
    </>
  );
}
