"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Github, Terminal, Layers } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { HeroEffects } from "./hero-effects";
import { CopyableCommand } from "./copy-command";

const stackChips = [
  "Expo SDK 55",
  "React Native 0.83",
  "NativeWind v4",
  "TanStack Query",
  "Zustand",
  "Reanimated",
  "FlashList",
];

const featureRow = [
  { label: "Expo", icon: "expo" },
  { label: "TypeScript", icon: "ts" },
  { label: "NativeWind", icon: "tw" },
  { label: "Reanimated", icon: "rn" },
  { label: "TanStack", icon: "tq" },
  { label: "Zustand", icon: "zs" },
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { y: 12, opacity: 0, duration: 0.5 })
        .from(".hero-headline", { y: 28, opacity: 0, duration: 0.9, ease: "expo.out" }, "-=0.2")
        .from(".hero-sub", { y: 14, opacity: 0, duration: 0.5 }, "-=0.6")
        .from(".hero-cta > *", { y: 10, opacity: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .from(".hero-card", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "expo.out" }, "-=0.4")
        .from(".hero-chip", { y: 6, opacity: 0, duration: 0.3, stagger: 0.03 }, "-=0.3")
        .from(".feature-row > *", { y: 8, opacity: 0, duration: 0.4, stagger: 0.06 }, "-=0.2");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden pt-32 sm:pt-40 pb-24 bg-[color:var(--bg)]"
    >
      {/* Circuit grid background */}
      <div className="pointer-events-none absolute inset-0 -z-20 circuit-grid opacity-60" aria-hidden />

      {/* Top conical spotlight — the AuthKit signature light source */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[680px] w-[1100px] -translate-x-1/2 animate-glow-breathe"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(200, 215, 245, 0.22) 0%, rgba(140, 170, 230, 0.10) 35%, transparent 70%)",
        }}
      />

      {/* Soft side haze */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 50% at 50% 100%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        }}
      />

      {/* Animated circuit lines + particles (kept from original) */}
      <HeroEffects />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
        {/* Eyebrow */}
        <div className="hero-eyebrow inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
          </span>
          Mobile money payments · One npx install
        </div>

        {/* Lens flare behind headline */}
        <div className="relative mt-10 sm:mt-12">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280px] w-[680px] -translate-x-1/2 -translate-y-1/2 lens-flare animate-lens-pulse"
            aria-hidden
          />

          {/* Glowing headline */}
          <h1 className="hero-headline headline-massive text-[clamp(3.5rem,15vw,11rem)]">
            <span className="block headline-glow-strong">VibeKit</span>
            <span className="-mt-1 sm:-mt-3 block headline-glow text-[clamp(2rem,8.5vw,6rem)] tracking-[0.02em]">
              Native
            </span>
          </h1>
        </div>

        <p className="hero-sub mx-auto mt-7 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
          Production-ready Expo components — auth, commerce, chat, dashboards,
          <br className="hidden sm:inline" /> and DGateway mobile-money payments (UGX, KES, TZS, RWF).
        </p>

        <div className="hero-cta mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/components" variant="accent" size="lg">
            Browse components
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button href="https://github.com/MUKE-coder/vibekit-native" variant="outline" size="lg">
            <Github className="h-4 w-4" />
            View on GitHub
          </Button>
        </div>

        {/* Floating card stack — AuthKit-style mockup row */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          <FloatingCardStack />
        </div>

        {/* Install command */}
        <div className="mx-auto mt-12 max-w-md px-2 sm:px-0">
          <CopyableCommand command="npx vibekit-native install button" />
        </div>

        {/* Stack chips */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {stackChips.map((chip) => (
            <span
              key={chip}
              className="hero-chip pill-chip rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* "Everything you need" feature row — like AuthKit's app row */}
        <div className="mt-20">
          <h2 className="text-center font-display text-[clamp(1.25rem,3vw,1.75rem)] font-medium tracking-tight text-[color:var(--text-primary)]">
            Everything you need. Batteries included.
          </h2>
          <div className="feature-row mt-8 flex flex-wrap items-start justify-center gap-x-6 gap-y-6 sm:gap-x-10">
            {featureRow.map((item, i) => (
              <div key={item.label} className="flex flex-col items-center gap-2.5 group">
                <FeatureGlyph kind={item.icon} />
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
                  {item.label}
                </span>
                {i < featureRow.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden sm:block absolute"
                    style={{ pointerEvents: "none" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Floating card stack — three glassy cards layered like the
 * AuthKit hero mock. Center card is brightest/largest.
 * ──────────────────────────────────────────────────────────── */
function FloatingCardStack() {
  return (
    <div className="hero-card-wrapper relative mx-auto flex justify-center items-center" style={{ perspective: "1200px" }}>
      {/* Left card — fades out */}
      <div
        className="hero-card hidden sm:block absolute card-glass rounded-2xl p-5 w-[280px] h-[340px]"
        style={{
          transform: "translateX(-180px) translateY(20px) rotate(-3deg)",
          opacity: 0.4,
          maskImage: "linear-gradient(to right, transparent 0%, black 60%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 60%)",
        }}
      >
        <CardMockSecondary variant="left" />
      </div>

      {/* Right card — fades out */}
      <div
        className="hero-card hidden sm:block absolute card-glass rounded-2xl p-5 w-[280px] h-[340px]"
        style={{
          transform: "translateX(180px) translateY(20px) rotate(3deg)",
          opacity: 0.4,
          maskImage: "linear-gradient(to left, transparent 0%, black 60%)",
          WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 60%)",
        }}
      >
        <CardMockSecondary variant="right" />
      </div>

      {/* Center card — the highlight */}
      <div className="hero-card relative card-glass rounded-2xl p-6 w-[300px] sm:w-[340px] h-[400px] z-10">
        <CardMockPrimary />
      </div>
    </div>
  );
}

function CardMockPrimary() {
  return (
    <div className="flex h-full flex-col">
      {/* Logo dot */}
      <div className="flex items-center justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] shadow-[0_0_8px_var(--accent)]" />
        </div>
      </div>

      <p className="mt-4 text-center text-[15px] font-medium text-[color:var(--text-primary)]">
        Install component
      </p>

      <label className="mt-6 block text-left font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
        Component name
      </label>
      <div className="mt-2 rounded-md border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-2.5 text-left font-mono text-[12px] text-[color:var(--text-secondary)]">
        login-screen
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)] py-2.5 text-[13px] font-medium text-[color:var(--text-primary)] transition hover:bg-[color:var(--bg-muted)]"
      >
        Continue
      </button>

      <div className="my-4 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
        <span className="h-px flex-1 bg-[color:var(--border)]" />
        OR
        <span className="h-px flex-1 bg-[color:var(--border)]" />
      </div>

      <button
        type="button"
        className="rounded-md border border-[color:var(--border)] bg-transparent py-2.5 text-[13px] text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-subtle)] flex items-center justify-center gap-2"
      >
        <span className="h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-[#FF6B6B] to-[#FFA940]" />
        Install with Expo
      </button>
      <button
        type="button"
        className="mt-2 rounded-md border border-[color:var(--border)] bg-transparent py-2.5 text-[13px] text-[color:var(--text-secondary)] transition hover:bg-[color:var(--bg-subtle)] flex items-center justify-center gap-2"
      >
        <span className="h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-[#3178C6] to-[#235A97]" />
        Install with TypeScript
      </button>

      <p className="mt-auto pt-4 text-center text-[11px] text-[color:var(--text-tertiary)]">
        Don&apos;t have an account?{" "}
        <span className="text-[color:var(--text-primary)]">Sign up</span>
      </p>
    </div>
  );
}

function CardMockSecondary({ variant }: { variant: "left" | "right" }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-center">
        <Layers className="h-6 w-6 text-[color:var(--text-tertiary)]" />
      </div>
      <p className="mt-4 text-center text-[14px] font-medium text-[color:var(--text-primary)]">
        {variant === "left" ? "Welcome to the kit" : "Pick a category"}
      </p>
      <p className="mt-1 text-center text-[11px] text-[color:var(--text-tertiary)]">
        {variant === "left" ? "Log in to continue" : "All 61 components"}
      </p>
      <div className="mt-6 space-y-3">
        <div className="h-9 rounded-md border border-[color:var(--border)] bg-[color:var(--bg)]" />
        <div className="h-9 rounded-md border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)]" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Feature glyph — small icon tile used in the "batteries included"
 * row, matching AuthKit's app icon strip.
 * ──────────────────────────────────────────────────────────── */
function FeatureGlyph({ kind }: { kind: string }) {
  const tile =
    "relative flex h-12 w-12 items-center justify-center rounded-xl border border-[color:var(--border-strong)] bg-[color:var(--bg-elevated)] transition-transform group-hover:-translate-y-0.5";

  const glow =
    "absolute -inset-2 -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100";

  return (
    <div className="relative">
      <span
        aria-hidden
        className={glow}
        style={{
          background:
            "radial-gradient(ellipse at center, var(--accent-glow), transparent 70%)",
        }}
      />
      <div className={tile}>
        <GlyphInner kind={kind} />
      </div>
    </div>
  );
}

function GlyphInner({ kind }: { kind: string }) {
  switch (kind) {
    case "expo":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--text-primary)]">
          <path d="M12 3 L20 19 H14 L12 14 L10 19 H4 Z" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "ts":
      return (
        <span className="font-mono text-[11px] font-bold tracking-tight text-[color:var(--text-primary)]">TS</span>
      );
    case "tw":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--text-primary)]">
          <path d="M3 12c2-4 4-6 8-6s5 3 8 3-2 4-4 4c-2 0-3-1-4-1m-8 5c2-4 4-6 8-6s5 3 8 3" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "rn":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--text-primary)]">
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth="1.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth="1.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" strokeWidth="1.2" transform="rotate(-60 12 12)" />
        </svg>
      );
    case "tq":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--text-primary)]">
          <rect x="4" y="4" width="7" height="7" rx="1" strokeWidth="1.4" />
          <rect x="13" y="4" width="7" height="7" rx="1" strokeWidth="1.4" />
          <rect x="4" y="13" width="7" height="7" rx="1" strokeWidth="1.4" />
          <rect x="13" y="13" width="7" height="7" rx="1" strokeWidth="1.4" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case "zs":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[color:var(--text-primary)]">
          <path d="M5 6 H19 L5 18 H19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return <Terminal className="h-5 w-5 text-[color:var(--text-primary)]" />;
  }
}
