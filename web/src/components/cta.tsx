"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Terminal } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { SITE } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    <section id="get-started" ref={root} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="cta-card relative overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-10 sm:p-16 text-center">
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[color:var(--border)] bg-[color:var(--bg)] px-3 py-1.5 text-xs font-medium text-[color:var(--text-secondary)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
              MIT licensed · Open source
            </div>
            <h2 className="font-display mt-6 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-tight text-[color:var(--text-primary)]">
              Ship mobile apps with AI.<br />
              <em className="not-italic gradient-text">One npx command at a time.</em>
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
