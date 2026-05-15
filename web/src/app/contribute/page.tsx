import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { ArrowUpRight, Check, GitBranch, Github } from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contribute — add your component to VibeKit Native",
  description:
    "Add a React Native component to the VibeKit Native registry. Open a pull request — we review and merge weekly.",
  alternates: { canonical: "/contribute" },
  openGraph: { url: `${SITE.url}/contribute`, images: ["/vibekit_thumbnail_abstract.png"] },
};

const whyItems = [
  {
    title: "Distribution",
    body: "Your component ships with every npx vibekit-native install and gets a permanent entry on the registry page — indexed by search engines and AI agents.",
  },
  {
    title: "Credibility",
    body: "VibeKit Native is opinionated — making the cut signals your component is production-ready on iOS and Android, not a weekend prototype.",
  },
  {
    title: "Ecosystem",
    body: "Every developer using the registry installs your component. It becomes part of the default toolkit for building Expo apps with AI.",
  },
];

const steps = [
  {
    title: "Build the component",
    body: "Create a React Native component using NativeWind v4 with the dark design system. It must work on both iOS and Android. Use TypeScript, Zod for validation if applicable, and follow the existing component patterns (see any file in packages/components/ for reference).",
  },
  {
    title: "Test it in a real Expo project",
    body: "Create a fresh Expo project, install the component manually, and verify it renders correctly on iOS simulator and Android emulator. Test dark backgrounds, long content, and edge cases (empty states, loading, errors).",
  },
  {
    title: "Open a PR",
    body: "Fork the repo, add your component file to packages/components/ in the right category folder, update scripts/generate-registry.ts with the entry, run the script to regenerate registry.json, and open a pull request. The PR template walks you through the checklist.",
  },
  {
    title: "Review & merge",
    body: "We review weekly. Most PRs need one or two iterations on code quality or design consistency. Once merged, your component ships in the next CLI release.",
  },
];

export default function ContributePage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <Section
          eyebrow="OPEN SOURCE · MIT"
          title={
            <>
              Got a React Native component? <em className="not-italic gradient-text">Add it to the registry.</em>
            </>
          }
          description="VibeKit Native is community-driven. If you've built a reusable auth screen, chat UI, commerce component, or UI primitive — anything that works across Expo projects — open a PR. We merge weekly."
          containerClassName="max-w-4xl"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href={`${SITE.github}/blob/main/CONTRIBUTING.md`} variant="accent" size="md">
              <GitBranch className="h-4 w-4" />
              Read the contribution guide
            </Button>
            <Button href={`${SITE.github}/compare`} variant="outline" size="md">
              <Github className="h-4 w-4" />
              Open a new-component PR
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Section>

        <Section eyebrow="WHY CONTRIBUTE" title="Build once. Ship in every project." description="A merged component ships with every npx vibekit-native install — not just yours." containerClassName="max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {whyItems.map((c) => (
              <div key={c.title} className="reveal rounded-2xl card-glass p-6">
                <h3 className="font-mono text-[13px] uppercase tracking-tight text-[color:var(--text-primary)]">{c.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="THE PROCESS" title="From idea to merged in 4 steps." description="No bureaucracy. Just a component that works on both platforms." containerClassName="max-w-3xl">
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal grid gap-5 sm:grid-cols-[auto_1fr]">
                <div className="font-mono text-[36px] font-light leading-none text-[color:var(--accent)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <h3 className="font-mono text-[16px] uppercase tracking-tight text-[color:var(--text-primary)]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-[color:var(--text-secondary)]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section eyebrow="DESIGN REQUIREMENTS" title="Must match the system." description="Every component must follow the dark-only design tokens. See the reference guide on GitHub for exact colors, spacing, and radius." containerClassName="max-w-3xl">
          <div className="reveal rounded-2xl card-glass p-6">
            <ul className="space-y-3">
              {[
                "Dark background (#0A0A0A), elevated surface (#121212), indigo accent (#6366F1)",
                "NativeWind v4 for all styling — no StyleSheet.create, no inline style objects",
                "TypeScript with strict types — no any, no unsafe casts",
                "Zod validation for any form or input component",
                "Works on iOS and Android — test both before submitting",
                "Handles loading, error, and empty states where applicable",
                "Expo SDK 55+ compatible — no bare RN-only dependencies",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--text-primary)]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section title="Ready to ship?" description="Fork the repo, add your component, open a PR. We'll review within a week." containerClassName="max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href={`${SITE.github}/fork`} variant="accent" size="lg">
              <Github className="h-4 w-4" />
              Fork on GitHub
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="reveal mt-12 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-6 text-center">
            <p className="text-[14px] text-[color:var(--text-secondary)]">
              Not ready to PR? Join the{" "}
              <a href={SITE.community} target="_blank" rel="noopener noreferrer" className="text-[color:var(--accent)] underline underline-offset-4">WhatsApp community</a>
              , star the{" "}
              <Link href={SITE.github} className="text-[color:var(--accent)] underline underline-offset-4">GitHub repo</Link>
              , or open a{" "}
              <a href={`${SITE.github}/discussions`} target="_blank" rel="noopener noreferrer" className="text-[color:var(--accent)] underline underline-offset-4">GitHub Discussion</a>.
            </p>
          </div>
        </Section>
      </main>
      <Footer />

      <Script id="ld-contribute" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Contribute a component to VibeKit Native",
          description: "Add a React Native component to the VibeKit Native registry.",
          totalTime: "PT30M",
          step: steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.title,
            text: s.body,
          })),
        }),
      }} />
    </>
  );
}
