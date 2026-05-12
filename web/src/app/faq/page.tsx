import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ — VibeKit Native",
  description:
    "Frequently asked questions about VibeKit Native: how the CLI works, what components are available, the tech stack, and how to contribute.",
  alternates: { canonical: "/faq" },
  openGraph: { url: `${SITE.url}/faq`, images: ["/og.png"] },
};

const faqs: { q: string; a: string }[] = [
  {
    q: "What is VibeKit Native?",
    a: "VibeKit Native is a registry of 61 production-ready React Native components for Expo apps. Each component installs with a single npx command (npx vibekit-native install <name>) and drops into your project as an editable TypeScript file. All components share a dark-only design system with NativeWind v4 styling — consistent out of the box.",
  },
  {
    q: "How is this different from a component library like NativeBase or Tamagui?",
    a: "Those are full UI libraries you install and import from node_modules. VibeKit Native installs each component as a plain file in your project — you own the code completely. No version lock-in, no breaking updates from upstream, no dependency on a CDN. And since each component is a single file, AI agents can read, understand, and extend them instantly.",
  },
  {
    q: "Does VibeKit Native work without Expo?",
    a: "No — the components are built for Expo SDK 55+ with expo-router and NativeWind v4. If you're using bare React Native CLI without Expo, you'd need to adapt the file structure and navigation patterns yourself. We recommend Expo for new projects.",
  },
  {
    q: "Is VibeKit Native free?",
    a: "Yes, MIT licensed and free to use forever. You'll pay for the services your app uses — EAS Build credits for store deployment, Neon for cloud database, Better Auth for authentication — most of which have generous free tiers.",
  },
  {
    q: "What tech stack does VibeKit Native expect?",
    a: "Expo SDK 55+, TypeScript, NativeWind v4, expo-router, TanStack React Query, Zod + react-hook-form, Zustand, @expo/vector-icons, react-native-reanimated, @shopify/flash-list, and EAS Build for deployment. Components follow these conventions but work with any stack — they're just files in your project.",
  },
  {
    q: "Do I need to set up a design system or theme first?",
    a: "No. Every component ships with the dark-only design system built in — indigo accent, zinc borders, 12px default radius, consistent spacing. Install any component and it matches every other component immediately. No ThemeProvider, no CSS variable setup, no theme switching.",
  },
  {
    q: "What categories of components are available?",
    a: "Seven categories: Auth (login-screen, register-screen, forgot-password-screen, verify-otp-screen, new-password-screen, complete-profile-screen), Home (hero-banner, section-header, category-circles, flash-sale-timer), Commerce (product-card, cart-item, price-display, order-card, order-timeline, product-header), Chat (chat-bubble), Profile (points-card, coupon-card), Shared (screen-header, filter-sheet, filter-sort-bar, search-bar), and UI (button, input, badge, avatar, card, bottom-sheet, toast, skeleton, rating, otp-input + more).",
  },
  {
    q: "Can I install multiple components at once?",
    a: "Yes — npx vibekit-native install auth installs all auth components. You can also pass multiple names: npx vibekit-native install login-screen product-card chat-bubble. Category names install everything in that category.",
  },
  {
    q: "How do I customize a component after installing it?",
    a: "Edit the file directly at src/components/<category>/<name>.tsx. It's a plain TypeScript file with NativeWind classes — tweak the JSX, change the styling, wire your API. No registry lock-in. Delete the file if you don't need it anymore. It's your code.",
  },
  {
    q: "Is there a dark mode or light mode?",
    a: "Dark-only by design. Every component ships with the complete dark palette — no light mode variants, no theme switching, no .dark conditional classes. This eliminates an entire class of bugs (wrong contrast, unreadable text, inconsistent backgrounds) and keeps every component predictable.",
  },
  {
    q: "How do database and ORM work in VibeKit Native?",
    a: "VibeKit Native components don't enforce a specific database — they're just UI files in your project. Use whatever data layer you prefer: TanStack Query with any backend, local state with Zustand, or a database with expo-sqlite, Supabase, or Firebase. The components are agnostic.",
  },
  {
    q: "Can I use VibeKit Native with Claude Code, Cursor, or other AI agents?",
    a: "Absolutely. Every component follows consistent patterns — Zod schemas, react-hook-form wrappers, NativeWind classes — so AI agents read and extend them instantly. Install a component, tell your agent to wire it to your backend, and it ships. The predictable structure means agents spend zero context guessing your conventions.",
  },
  {
    q: "How do I deploy an app built with VibeKit Native?",
    a: "Use EAS Build: eas build --profile production compiles your native binaries. Then eas submit sends to the App Store and Google Play. For frequent updates, eas update pushes OTA JavaScript updates that users get on next app open — most changes never need a store review cycle.",
  },
  {
    q: "What if a component doesn't do exactly what I need?",
    a: "Edit the installed file. Every component is a starting point — change the validation, swap the icons, adjust the layout. The dark design system tokens are consistent across all components, so your customizations still match the rest of the app. If you build something generally useful, open a PR to contribute it back.",
  },
  {
    q: "Where do I get help if something breaks?",
    a: "Open an issue on the GitHub repo (github.com/MUKE-coder/vibekit-native), reach out via the JB website (jb.desishub.com), or post in the Desishub WhatsApp community. For Expo-specific issues, the Expo Discord is more responsive than we are.",
  },
];

export default function FAQ() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <Section
          eyebrow="FREQUENTLY ASKED"
          title={<>Common questions, <em className="not-italic gradient-text">direct answers</em>.</>}
          description="Everything you might want to know about VibeKit Native, how the CLI works, and how it fits into your Expo workflow."
          containerClassName="max-w-3xl"
        >
          <ol className="reveal divide-y divide-[color:var(--border)] rounded-2xl card-glass">
            {faqs.map((f, i) => (
              <li key={f.q} className="p-6 sm:p-8">
                <div className="flex items-start gap-5">
                  <span className="font-mono text-[24px] font-light leading-none text-[color:var(--accent)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-mono text-[16px] uppercase tracking-tight text-[color:var(--text-primary)]">
                      {f.q}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--text-secondary)]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal mt-12 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] p-6 text-center">
            <h3 className="font-mono text-[12px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
              Still have a question?
            </h3>
            <p className="mt-2 text-[15px] text-[color:var(--text-primary)]">
              Open an issue on{" "}
              <a
                href={`${SITE.github}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--accent)] underline underline-offset-4"
              >
                GitHub
              </a>{" "}
              or read the{" "}
              <Link href="/docs" className="text-[color:var(--accent)] underline underline-offset-4">
                docs
              </Link>
              .
            </p>
          </div>
        </Section>
      </main>
      <Footer />

      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
