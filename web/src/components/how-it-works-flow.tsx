"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Package, Smartphone, Wrench } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  icons: { label: string }[];
  caption: string;
};

const steps: Step[] = [
  {
    n: "01",
    eyebrow: "INSTALL",
    title: "npx vibekit-native install",
    body: "Browse the registry, pick a component, and install it with one command. Every component drops into your Expo project as a single editable file — no wrapper providers, no config changes, no bloat.",
    icons: [
      { label: "npx vibekit-native list" },
      { label: "npx vibekit-native install login-form" },
      { label: "Import and go" },
    ],
    caption: "Output: one file, zero config changes",
  },
  {
    n: "02",
    eyebrow: "CUSTOMIZE",
    title: "Edit. Style. Connect.",
    body: "Every installed component is a plain TypeScript file in your project — no black box, no registry lock-in. Edit the JSX, tweak the NativeWind classes, wire your API. It's your code from the first install.",
    icons: [
      { label: "Edit the source" },
      { label: "Wire TanStack Query" },
      { label: "Add your brand" },
    ],
    caption: "Your code. Your control. Zero vendor lock-in.",
  },
  {
    n: "03",
    eyebrow: "SHIP",
    title: "Build for stores.",
    body: "Run EAS Build, submit to the App Store and Google Play. Every component is production-tested on iOS and Android. Push OTA updates with expo-updates. No surprises at review time.",
    icons: [
      { label: "EAS Build" },
      { label: "App Store + Play Store" },
      { label: "OTA updates" },
    ],
    caption: "Production-ready in hours, not weeks",
  },
];

export function HowItWorksFlow() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".flow-eyebrow", { y: 14, opacity: 0, duration: 0.5 })
        .from(".flow-headline", { y: 18, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".flow-sub", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".flow-step", {
          y: 24,
          opacity: 0,
          stagger: 0.18,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.2")
        .from(".flow-arrow", {
          opacity: 0,
          x: -8,
          stagger: 0.18,
          duration: 0.4,
        }, "-=0.9");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="how-it-works"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Circuit grid background */}
      <div className="pointer-events-none absolute inset-0 circuit-grid opacity-50" aria-hidden />
      {/* Top spotlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flow-eyebrow inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            How it works
          </div>
          <h2 className="flow-headline headline-display mt-6 text-[clamp(2rem,4.5vw,3.25rem)] headline-glow">
            Install. Customize. Ship.
          </h2>
          <p className="flow-sub mt-5 text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
            Three steps from zero to a production React Native app. No boilerplate, no config, no context providers to wrap.
          </p>
        </div>

        {/* 3-step flow */}
        <div className="mt-14 sm:mt-20 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
          {steps.map((s, i) => (
            <FlowFragment key={s.n} step={s} isLast={i === steps.length - 1} />
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
          See the terminal demo below for what step 1 looks like in real time
        </p>
      </div>
    </section>
  );
}

function FlowFragment({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <>
      {/* Step card */}
      <article className="flow-step relative flex flex-col rounded-2xl card-glass p-6 sm:p-7 transition-all hover:-translate-y-0.5">
        {/* Step number + eyebrow */}
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[36px] sm:text-[48px] font-light leading-none text-[color:var(--accent)] tabular-nums">
            {step.n}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
            {step.eyebrow}
          </span>
        </div>

        <h3 className="font-display mt-6 text-[22px] sm:text-[26px] leading-tight tracking-tight text-[color:var(--text-primary)]">
          {step.title}
        </h3>

        <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[color:var(--text-secondary)]">
          {step.body}
        </p>

        {/* Icon row */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {step.icons.map(({ label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--text-secondary)]"
            >
              <Package className="h-3 w-3 text-[color:var(--accent)]" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-[color:var(--border)] pt-4 font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
          {step.caption}
        </div>
      </article>

      {/* Arrow between cards */}
      {!isLast ? (
        <div
          className="flow-arrow flex items-center justify-center text-[color:var(--text-tertiary)] lg:px-2"
          aria-hidden
        >
          <ArrowRight className="hidden h-5 w-5 lg:inline" />
          <ArrowRight className="inline h-4 w-4 rotate-90 lg:hidden" />
        </div>
      ) : null}
    </>
  );
}
