import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Documentation — VibeKit Native guides",
  description:
    "Documentation for VibeKit Native: getting started, component registry reference, CLI commands, and more.",
  alternates: { canonical: "/docs" },
  openGraph: { url: `${SITE.url}/docs`, images: ["/og.png"] },
};

const guides = [
  {
    slug: "what-is-vibekit",
    title: "What is VibeKit Native?",
    blurb: "An overview of the component registry: what problem it solves, how it works, and who it's for.",
  },
  {
    slug: "quickstart",
    title: "Quickstart",
    blurb: "From zero to a production React Native component in your Expo project — step by step.",
  },
];

const externalGuides = [
  { name: "Component Registry (GitHub)", href: SITE.github, blurb: "Browse all 61 components, see source code, and open issues." },
  { name: "CLI Documentation", href: `${SITE.github}#usage`, blurb: "Full CLI reference: every command, flag, and category install." },
  { name: "Contributing", href: `${SITE.github}/blob/main/CONTRIBUTING.md`, blurb: "Add your own components to the registry. Open a PR." },
  { name: "Design System", href: `${SITE.github}/blob/main/design-style-guide.md`, blurb: "Dark-only design tokens: colors, typography, spacing, radius." },
];

export default function DocsHub() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <Section
          eyebrow="DOCUMENTATION"
          title={<>Everything you need to ship.</>}
          description="VibeKit Native lives in two places: this site (guides you can read straight through), and the GitHub repo (component source code, CLI docs, and contribution guide)."
          containerClassName="max-w-5xl"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/docs/${g.slug}`}
                className="group flex flex-col rounded-2xl card-glass p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
                    Guide
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[color:var(--text-tertiary)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[color:var(--text-primary)]" />
                </div>
                <h2 className="mt-3 font-mono text-[18px] uppercase tracking-tight text-[color:var(--text-primary)]">
                  {g.title}
                </h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                  {g.blurb}
                </p>
              </Link>
            ))}
          </div>

          <div className="reveal mt-16">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
              Reference (on GitHub)
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {externalGuides.map((g) => (
                <a
                  key={g.name}
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 rounded-xl card-glass p-4 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex-1">
                    <div className="font-mono text-[13px] uppercase text-[color:var(--text-primary)]">
                      {g.name}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-[color:var(--text-secondary)]">
                      {g.blurb}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--text-tertiary)] transition-colors group-hover:text-[color:var(--text-primary)]" />
                </a>
              ))}
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
