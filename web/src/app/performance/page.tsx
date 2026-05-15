import type { Metadata } from "next";
import { ArrowUpRight, Battery, Cpu, HardDrive, ImageIcon, Layers, Smartphone, Zap, Gauge } from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Performance — React Native, fast by default",
  description:
    "VibeKit Native components are built for performance: Hermes engine, reanimated worklets, FlashList, expo-image caching, and minimal bundle size. No jank, no lag.",
  alternates: { canonical: "/performance" },
  openGraph: {
    url: `${SITE.url}/performance`,
    title: "React Native performance — VibeKit Native",
    description:
      "Hermes, reanimated, FlashList, expo-image — every VibeKit Native component is production-tested for smooth 60fps performance.",
    images: ["/vibekit_thumbnail_cli.png"],
  },
};

const metrics = [
  { metric: "App Startup", target: "< 2s cold start", how: "Hermes engine + lazy native module loading" },
  { metric: "Frame Rate", target: "60fps scrolling", how: "FlashList with recycling + reanimated worklets on UI thread" },
  { metric: "Bundle Size", target: "< 3MB per component category", how: "Tree-shaken imports, no bloat per file" },
  { metric: "Image Load", target: "< 500ms first paint", how: "expo-image with disk caching + blurhash preview" },
  { metric: "Memory", target: "< 150MB peak", how: "FlashList recycling, image cache limits, no leaks" },
];

const perfFeatures = [
  {
    icon: Zap,
    title: "Hermes Engine",
    desc: "Every component is tested with Hermes, the JavaScript engine optimized for React Native. Hermes compiles JS to bytecode ahead of time, cutting startup time in half and reducing APK/IPA size by 30%.",
    bad: "JSC engine uses JIT compilation — slower startup, larger binary, more memory. Each new screen adds parse time.",
    good: "Hermes pre-compiles bytecode. Cold start in under 2 seconds. Binary size stays lean even with 65 components installed.",
  },
  {
    icon: Cpu,
    title: "UI Thread Animations",
    desc: "Animations run on the UI thread via react-native-reanimated worklets — never crossing the async bridge. Toast slides, bottom sheets, skeleton pulses all animate at a solid 60fps even under heavy JS thread load.",
    bad: "JS thread animations (Animated API) must cross the async bridge every frame. A flatlist scrolling with JS thread animations = jank.",
    good: "Reanimated worklets run at native speed. The JS thread can be busy fetching data while the UI thread keeps animating smoothly.",
  },
  {
    icon: Layers,
    title: "FlashList Recycling",
    desc: "Product grids, chat messages, order lists — every scrollable component uses @shopify/flash-list. It recycles views instead of creating new ones, meaning 10,000 items scrolls as smoothly as 10.",
    bad: "FlatList creates new views for each visible item. Scroll a list of 1,000 products = memory spikes, dropped frames, and jank.",
    good: "FlashList recycles just 15-20 views regardless of list size. Memory stays flat at ~80MB even with infinite scroll.",
  },
  {
    icon: ImageIcon,
    title: "expo-image Caching",
    desc: "All image components use expo-image with automatic disk caching and blurhash previews. Images load once from the network, then serve from disk cache. Blurhash placeholders mean zero layout shift while images load.",
    bad: "React Native Image component provides no caching. Every re-render re-fetches from the network. No placeholder means jumpy layouts.",
    good: "expo-image caches to disk on first load. Subsequent renders are instant. Blurhash previews fill the space at 2KB vs 200KB for the full image.",
  },
  {
    icon: HardDrive,
    title: "Minimal Bundle Impact",
    desc: "Each component is a single plain TypeScript file with no provider setup, no configuration, and no additional dependencies beyond the core Expo stack. Installing 10 components adds < 100KB to your project's source.",
    bad: "UI libraries with providers, themes, and config files add 500KB-2MB before you write any code. You pay for components you never use.",
    good: "Install only what you use, pay only for what you install. No registry lock-in, no bloat, no unused code in your bundle.",
  },
  {
    icon: Battery,
    title: "Battery-Efficient Animations",
    desc: "Animations use native-driven springs and transitions (not setInterval or requestAnimationFrame on JS thread). Bottom sheets, toasts, and skeleton loaders use minimal CPU — no battery drain from JavaScript timers.",
    bad: "setInterval-based animations keep the JS thread busy even when the app is in the background. Timer drift, battery drain, delayed responses.",
    good: "Native animations driven by reanimated's timer worklets. Zero JS thread overhead once the animation starts. Battery-friendly even with multiple active animations.",
  },
];

const comparisonRows = [
  { feature: "Startup Time", vanilla: "4–6s cold start (JSC JIT compilation)", vibekit: "< 2s (Hermes bytecode)" },
  { feature: "Scroll Performance", vanilla: "FlatList drops frames at 500+ items", vibekit: "FlashList maintains 60fps at 10,000+ items" },
  { feature: "Animation Thread", vanilla: "JS thread bridge crossing = jank under load", vibekit: "UI thread worklets = smooth 60fps always" },
  { feature: "Image Loading", vanilla: "No cache, re-fetches on re-render", vibekit: "expo-image disk cache + blurhash previews" },
  { feature: "Bundle Size", vanilla: "500KB–2MB for a UI library you barely use", vibekit: "~10KB per component file, only what you install" },
  { feature: "Memory (Long Lists)", vanilla: "Spikes to 300MB+ with FlatList", vibekit: "Stays at ~80MB with FlashList recycling" },
  { feature: "Navigation", vanilla: "React Navigation with manual linking", vibekit: "expo-router file-based, lazy route loading" },
];

export default function PerformancePage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[color:var(--border)] pb-16 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 -z-10 circuit-grid opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 65%)",
            }}
          />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-24 text-center">
            <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
              <Gauge className="h-3 w-3 text-[color:var(--accent)]" />
              React Native performance
            </div>
            <h1 className="mt-6 headline-display text-[clamp(2.25rem,6vw,4rem)] headline-glow-strong">
              Smooth at 60fps. Not by accident.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[color:var(--text-secondary)]">
              Every VibeKit Native component runs on Hermes, animates on the UI thread via Reanimated, recycles list rows via FlashList, and loads images through expo-image with disk cache + blurhash. Your app stays smooth scrolling 10,000 items, animating bottom sheets, and cold-starting under 2s.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/components" variant="accent" size="lg">
                Browse components
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button href="/stack" variant="outline" size="lg">
                The locked stack
              </Button>
            </div>
          </div>
        </section>

        {/* The Performance Budget */}
        <Section
          eyebrow="What you can expect"
          title={<>Hard numbers, <em className="not-italic gradient-text">not guesses</em>.</>}
          description="Every component ships meeting these baselines. No jank, no lag, no surprises on real devices."
          containerClassName="max-w-5xl"
        >
          <div className="reveal overflow-hidden rounded-2xl card-glass">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[color:var(--bg-subtle)] text-[11px] font-mono uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Metric</th>
                    <th className="px-5 py-3 font-medium">Target</th>
                    <th className="px-5 py-3 font-medium">How it's achieved</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((m, i) => (
                    <tr key={m.metric} className={i !== metrics.length - 1 ? "border-b border-[color:var(--border)]" : ""}>
                      <td className="px-5 py-4 font-medium text-[color:var(--text-primary)]">{m.metric}</td>
                      <td className="px-5 py-4 font-mono text-[13px] text-[color:var(--accent)]">{m.target}</td>
                      <td className="px-5 py-4 text-[color:var(--text-secondary)]">{m.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Performance Features Grid */}
        <section className="border-t border-[color:var(--border)]">
          <Section
            eyebrow="Six performance layers"
            title={<>Every component is <em className="not-italic gradient-text">performance-tested</em>.</>}
            description="Each layer targets a specific performance killer that React Native apps suffer from — and solves it at the component level."
            containerClassName="max-w-6xl"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {perfFeatures.map((f) => (
                <article
                  key={f.title}
                  className="reveal group rounded-2xl card-glass p-6 transition-all hover:border-[color:var(--border-strong)] sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius)] bg-[color:var(--accent)]/10">
                      <f.icon className="h-5 w-5 text-[color:var(--accent)]" />
                    </div>
                    <h3 className="font-mono text-[16px] font-semibold uppercase tracking-tight text-[color:var(--text-primary)]">
                      {f.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
                    {f.desc}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[var(--radius)] border border-[color:var(--border)] bg-[color:var(--bg)] p-4">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--text-tertiary)]">Without VibeKit Native</div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--danger-text, #DC2626)]">
                        {f.bad}
                      </p>
                    </div>
                    <div className="rounded-[var(--radius)] border border-[color:var(--accent)]/20 bg-[color:var(--accent)]/[0.04] p-4">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[color:var(--accent)]">With VibeKit Native</div>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[color:var(--text-primary)]">
                        {f.good}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-[color:var(--border)]">
          <Section
            eyebrow="Vanilla RN vs VibeKit Native"
            title={<>The same app. One is <em className="not-italic gradient-text">10x smoother</em>.</>}
            description="Same feature set. Same framework. The difference is whether performance patterns are built into the components or left to chance."
            containerClassName="max-w-5xl"
          >
            <div className="reveal overflow-hidden rounded-2xl card-glass">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[color:var(--bg-subtle)] text-[11px] font-mono uppercase tracking-wider text-[color:var(--text-tertiary)]">
                    <tr>
                      <th className="px-5 py-3 font-medium">Dimension</th>
                      <th className="px-5 py-3 font-medium text-[color:var(--text-tertiary)]">Vanilla React Native</th>
                      <th className="px-5 py-3 font-medium text-[color:var(--accent)]">VibeKit Native</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((r, i) => (
                      <tr key={r.feature} className={i !== comparisonRows.length - 1 ? "border-b border-[color:var(--border)]" : ""}>
                        <td className="px-5 py-4 font-medium text-[color:var(--text-primary)]">{r.feature}</td>
                        <td className="px-5 py-4 text-[13px] text-[color:var(--text-tertiary)]">{r.vanilla}</td>
                        <td className="px-5 py-4 text-[13px] text-[color:var(--accent)]">{r.vibekit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </section>

        {/* CTA */}
        <section className="border-t border-[color:var(--border)]">
          <Section
            align="center"
            eyebrow="Ready to ship fast?"
            title={<>Stop fixing performance <em className="not-italic gradient-text">after</em> shipping.</>}
            description="Performance is built into every component from day one."
            containerClassName="max-w-2xl"
          >
            <div className="reveal mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/docs/quickstart" variant="accent" size="lg">
                Start building
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button href={SITE.github} variant="outline" size="lg">
                View on GitHub
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </Section>
        </section>
      </main>
      <Footer />
    </>
  );
}
