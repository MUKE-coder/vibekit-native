import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section } from "@/components/section";
import { ComponentsBrowser } from "@/components/components-browser";
import { components } from "@/lib/components-data";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Components — React Native component registry",
  description:
    "Browse the VibeKit Native component registry: 65 production-ready React Native components for auth, commerce, chat, profile, home, and UI. Install with one npx command.",
  alternates: { canonical: "/components" },
  openGraph: {
    title: "VibeKit Native Components — React Native registry",
    description:
      "65 production-ready React Native components for Expo apps. Auth, commerce, chat, profile, and UI primitives. Install with npx.",
    url: `${SITE.url}/components`,
    images: ["/vibekit_thumbnail_hero.png"],
  },
};

export default function ComponentsPage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <Section
          eyebrow={`THE REGISTRY · ${components.length} COMPONENTS`}
          title={<>The catalog your AI agent <em className="not-italic gradient-text">installs from</em>.</>}
          description="When you follow the framework workflow, your AI agent reads vibekit-native-components.md and picks the matching component for every screen — installing it instead of writing from scratch. You can also browse here and run npx vibekit-native install <name> directly."
          containerClassName="max-w-6xl"
        >
          <ComponentsBrowser />
        </Section>
      </main>
      <Footer />

      {/* JSON-LD: ItemList for AEO */}
      <Script
        id="ld-components"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "VibeKit Component Registry",
            url: `${SITE.url}/components`,
            numberOfItems: components.length,
            itemListElement: components.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              description: c.tagline,
              url: `${SITE.url}/components/${c.slug}`,
            })),
          }),
        }}
      />
    </>
  );
}
