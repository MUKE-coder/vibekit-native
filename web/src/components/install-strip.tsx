"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { CopyableCommand } from "./copy-command";

type ComponentItem = { name: string; desc: string };

const popular: ComponentItem[] = [
  { name: "login-screen", desc: "Auth" },
  { name: "register-screen", desc: "Auth" },
  { name: "hero-banner", desc: "Home" },
  { name: "product-card", desc: "Commerce" },
  { name: "chat-bubble", desc: "Chat" },
  { name: "points-card", desc: "Profile" },
  { name: "button", desc: "UI" },
  { name: "skeleton", desc: "UI" },
  { name: "bottom-sheet", desc: "UI" },
  { name: "input", desc: "UI" },
  { name: "avatar", desc: "UI" },
  { name: "toast", desc: "UI" },
];

export function InstallStrip() {
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

      tl.from(".install-eyebrow", { y: 14, opacity: 0, duration: 0.5 })
        .from(".install-headline", { y: 18, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".install-sub", { y: 14, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".install-command", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".component-cell", {
          y: 16,
          opacity: 0,
          stagger: 0.04,
          duration: 0.45,
          ease: "power2.out",
        }, "-=0.3");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="install"
      className="relative isolate overflow-hidden border-y border-[color:var(--border)] bg-[color:var(--bg)] py-20 sm:py-28"
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
          <div className="install-eyebrow inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            65 components · One npx command
          </div>
          <h2 className="install-headline headline-display mt-6 text-[clamp(2rem,4.5vw,3rem)] headline-glow">
            65 production components. Mobile money, Stripe, charts, and biometrics built in.
          </h2>
          <p className="install-sub mt-5 text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
            No provider wrappers. No config files. No dependency bloat. Every component is a single editable file that drops into your Expo project.
          </p>
        </div>

        {/* Component grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px overflow-hidden rounded-lg border border-[color:var(--border)] bg-[color:var(--border)]">
          {popular.map((c) => (
            <div
              key={c.name}
              className="component-cell group relative flex flex-col items-center justify-center gap-1.5 bg-[color:var(--bg-elevated)] p-5 text-center transition-colors hover:bg-[color:var(--bg-muted)]"
            >
              <span className="font-mono text-[12px] font-medium text-[color:var(--text-primary)] truncate max-w-full">
                {c.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                {c.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
           65 components across 11 categories · Install individually, all compatible together
        </p>
      </div>
    </section>
  );
}
