import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Documentation — VibeKit Native (the framework for vibe coders)",
  description:
    "Documentation for VibeKit Native: the planning + build framework for AI-driven Expo apps. Quickstart, what-is-vibekit, framework files, and the registry reference your AI agent installs from.",
  alternates: { canonical: "/docs" },
  openGraph: { url: `${SITE.url}/docs`, images: ["/vibekit_thumbnail_abstract.png"] },
};

const guides = [
  {
    slug: "what-is-vibekit",
    title: "What is VibeKit Native?",
    blurb: "Why a planning + build framework, not just a component library. Who it's for, what problem it solves, how it works.",
  },
  {
    slug: "quickstart",
    title: "Quickstart — the 8-step framework workflow",
    blurb: "Plan with claude.ai → 4 generated files → drop in 2 framework files → AI agent builds phase by phase → run pre-deploy review → ship.",
  },
];

const externalGuides = [
  { name: "CLAUDE_PROMPT.md (paste into claude.ai)", href: `${SITE.github}/blob/main/CLAUDE_PROMPT.md`, blurb: "The planning prompt. Pasting it into claude.ai turns the chat into a planning assistant for your specific app." },
  { name: "master_prompt.md (your AI agent reads this)", href: `${SITE.github}/blob/main/master_prompt.md`, blurb: "Coding standards, tech stack rules, Prisma v7 + Better Auth + Expo Router patterns, performance budget, dependency blocklist. Rename to CLAUDE.md for auto-loading." },
  { name: "vibekit-native-components.md (registry reference)", href: `${SITE.github}/blob/main/vibekit-native-components.md`, blurb: "The catalog your AI agent installs from. Quick decision matrix mapping needs → 65 components." },
  { name: "pre-deploy-review.md (run before submitting)", href: `${SITE.github}/blob/main/pre-deploy-review.md`, blurb: "24-section senior-level audit: cold-start TTI, accessibility, EAS Build, store-ready assets, webhook security, env vars." },
  { name: "Agent rules install (skill/)", href: `${SITE.github}/blob/main/skill/README.md`, blurb: "One-line install per AI agent: Claude Code, Cursor, Codex CLI, Cline, Windsurf, Gemini CLI, Aider." },
  { name: "Component registry (browse)", href: "/components", blurb: "Browse all 65 components by category. The framework workflow is recommended; manual install via npx vibekit-native install <name> is also supported." },
];

export default function DocsHub() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <Section
          eyebrow="DOCUMENTATION"
          title={<>Plan, build, ship — with the framework.</>}
          description="VibeKit Native is a planning + build framework for AI-driven Expo apps. Read the quickstart for the 8-step workflow, then drop the framework files into your project and let your AI agent build phase by phase."
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
