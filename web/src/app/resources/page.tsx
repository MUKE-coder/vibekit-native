import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section } from "@/components/section";
import { ResourcesBrowser } from "@/components/resources-browser";
import { resources } from "@/lib/resources-data";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resources — curated ecosystem for React Native builders",
  description:
    "Curated tools, libraries, registries, and resources for building React Native / Expo apps. Templates, UI kits, animation libraries, AI tools, and platforms — all production-ready.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "VibeKit Native Resources — curated React Native ecosystem",
    description: "Hand-picked tools, registries, templates, and platforms for Expo and React Native builders.",
    url: `${SITE.url}/resources`,
    images: ["/og.png"],
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="pt-28">
        <Section
          eyebrow={`THE ECOSYSTEM · ${resources.length} RESOURCES`}
          title={
            <>
              Everything that pairs well with <em className="not-italic gradient-text">VibeKit Native</em>.
            </>
          }
          description="Curated tools, libraries, and resources for building React Native / Expo apps — registries, templates, animation libraries, AI tools, and deployment platforms."
          containerClassName="max-w-6xl"
        >
          <ResourcesBrowser />

          <p className="mt-12 text-center text-[13px] text-[color:var(--text-tertiary)]">
            Spotted a missing resource? <a
              href={`${SITE.github}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--accent)] underline underline-offset-4"
            >Open an issue</a>.
          </p>
        </Section>
      </main>
      <Footer />

      {/* JSON-LD: ItemList for AEO */}
      <Script
        id="ld-resources"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "VibeKit Native — Curated Expo & React Native Resources",
            url: `${SITE.url}/resources`,
            numberOfItems: resources.length,
            itemListElement: resources.slice(0, 50).map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: r.name,
              description: r.description,
              url: r.url,
            })),
          }),
        }}
      />
    </>
  );
}
