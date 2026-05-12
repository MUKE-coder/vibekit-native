"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Terminal } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { SITE } from "@/lib/utils";

export function CTA() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cta-card",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section id="get-started" ref={root} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Top spotlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(200, 215, 245, 0.16) 0%, transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="cta-card relative overflow-hidden rounded-3xl card-glass p-10 sm:p-16 text-center">
          {/* Lens flare behind heading */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[560px] lens-flare animate-lens-pulse"
            aria-hidden
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              MIT licensed · Open source
            </div>
            <h2 className="headline-display mt-6 text-[clamp(2.25rem,5vw,4rem)] headline-glow">
              Ship mobile apps with AI.
              <br />
              One npx command at a time.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
              Install production-ready React Native components into any Expo project. Dark-only, AI-optimized, and completely yours to edit.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href={SITE.github} variant="accent" size="lg">
                Get VibeKit Native on GitHub
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={`${SITE.github}#quick-start`} variant="outline" size="lg">
                <Terminal className="h-4 w-4" />
                Quick start guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
