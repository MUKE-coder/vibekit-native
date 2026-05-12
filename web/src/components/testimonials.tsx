"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Testimonial = {
  name: string;
  role: string;
  location?: string;
  initial: string;
  quote: string;
  highlight?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Bigirwa Bruce",
    role: "Indie Hacker",
    location: "Kampala",
    initial: "BB",
    quote:
      "Skeleton loading, toast notifications, and a login form in three commands. Never writing a modal from scratch again. This is what RN should have shipped with.",
    highlight: "3 commands = 3 screens",
  },
  {
    name: "Amanya Solomon",
    role: "Founder, agritech startup",
    location: "Mbarara",
    initial: "AS",
    quote:
      "We built our farmer marketplace app in 5 days. Product cards, chat, checkout — all from the registry. The dark design system saved us weeks of UI decisions.",
    highlight: "Marketplace in 5 days",
  },
  {
    name: "Kitmirike Moses",
    role: "Senior Engineer",
    initial: "KM",
    quote:
      "I've been writing React Native for 4 years. The expo-router setup + Better Auth integration alone would've taken me a full weekend. VibeKit Native did it in 20 minutes.",
  },
  {
    name: "Nakato Patricia",
    role: "Indie Maker",
    location: "Kampala",
    initial: "NP",
    quote:
      "The dark-only design system finally killed the light mode bugs in my apps. Every component just fits. No theme switching, no broken contrast ratios.",
    highlight: "Zero theme bugs",
  },
  {
    name: "Wasswa Collin",
    role: "Freelance Developer",
    location: "Entebbe",
    initial: "WC",
    quote:
      "I used to dread building chat UIs in Expo. Now I install chat-bubble, chat-list, and chat-input — wire them to my Supabase backend — done. Three hours saved.",
    highlight: "Chat UI in 20 min",
  },
  {
    name: "Sam Mukasa",
    role: "Bootcamp Graduate",
    initial: "SM",
    quote:
      "First time I built a mobile app solo. Auth, profile, and a product grid installed in under 10 commands. Published to the App Store on day 7.",
    highlight: "First app on App Store",
  },
  {
    name: "Kato Jordan",
    role: "Product Engineer",
    initial: "KJ",
    quote:
      "The login-form component ships with react-hook-form and Zod baked in. No wiring, no boilerplate. Our AI agent reads the pattern and extends it immediately.",
  },
  {
    name: "Waturo Richard",
    role: "Full-stack Developer",
    location: "Jinja",
    initial: "WR",
    quote:
      "Switched from hand-rolling NativeWind classes to VibeKit Native components. The design consistency across screens is night and day. Same radius, same spacing, same indigo.",
  },
  {
    name: "Owen Mugisha",
    role: "Tech Lead",
    initial: "OM",
    quote:
      "Onboarded two junior devs with VibeKit Native instead of a 30-page style guide. They shipped a settings screen on day one. The components ARE the documentation.",
  },
  {
    name: "Daniel Kibirige",
    role: "Solo Founder",
    initial: "DK",
    quote:
      "Shipped my social app's chat feature in an afternoon. Four components, one backend hook, zero styling decisions. npx vibekit-native install chat — that's it.",
    highlight: "Chat shipped in 4 hrs",
  },
];

// Split into two rows for opposing marquees
const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

export function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".testimonials-header > *",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
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
    <section ref={root} id="testimonials" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Edge fade overlays so cards bleed off screen */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 sm:w-48"
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, var(--bg) 0%, var(--bg) 30%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 sm:w-48"
        aria-hidden
        style={{
          background:
            "linear-gradient(to left, var(--bg) 0%, var(--bg) 30%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <div className="testimonials-header">
          <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
            <Star className="h-3 w-3 text-[color:var(--accent)]" fill="currentColor" />
            From the people shipping with it
          </div>
          <h2 className="headline-display mt-6 text-[clamp(2rem,5vw,3.5rem)] headline-glow">
            Real builders. Real shipping.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
            VibeKit Native is used by indie hackers, founders, and agencies shipping React Native apps across East Africa and beyond — anyone who'd rather install than write from scratch.
          </p>
        </div>
      </div>

      {/* Row 1 — left to right */}
      <div className="mt-14 [--marquee-duration:55s]">
        <Marquee items={row1} direction="left" />
      </div>

      {/* Row 2 — right to left, slower */}
      <div className="mt-5 [--marquee-duration:70s]">
        <Marquee items={row2} direction="right" />
      </div>
    </section>
  );
}

function Marquee({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  // Duplicate items twice for seamless infinite scroll
  const doubled = [...items, ...items];

  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          "flex shrink-0 items-stretch gap-4 sm:gap-5 px-2",
          direction === "left" ? "marquee-left" : "marquee-right"
        )}
      >
        {doubled.map((t, idx) => (
          <TestimonialCard key={`${t.name}-${idx}`} t={t} />
        ))}
      </div>

      <style jsx>{`
        .marquee-left {
          animation: marquee-l var(--marquee-duration, 60s) linear infinite;
        }
        .marquee-right {
          animation: marquee-r var(--marquee-duration, 60s) linear infinite;
        }
        .group:hover .marquee-left,
        .group:hover .marquee-right {
          animation-play-state: paused;
        }
        @keyframes marquee-l {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-r {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className="relative flex w-[340px] sm:w-[400px] shrink-0 flex-col gap-4 rounded-md border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 transition-colors hover:border-[color:var(--border-strong)]"
    >
      {/* Quote icon */}
      <Quote className="absolute right-5 top-5 h-5 w-5 text-[color:var(--text-tertiary)]/50" aria-hidden />

      {/* Stars */}
      <div className="flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 text-[color:var(--accent)]"
            fill="currentColor"
            aria-hidden
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[14.5px] leading-relaxed text-[color:var(--text-primary)]">
        “{t.quote}”
      </p>

      {/* Highlight */}
      {t.highlight ? (
        <div className="inline-flex w-fit items-center gap-2 rounded border border-[color:var(--accent)]/30 bg-[color:var(--accent-soft)] px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-[color:var(--accent)]">
          <span className="h-1 w-1 rounded-full bg-[color:var(--accent)]" />
          {t.highlight}
        </div>
      ) : null}

      {/* Author */}
      <div className="mt-auto flex items-center gap-3 border-t border-[color:var(--border)] pt-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--bg-muted)] font-mono text-[12px] font-medium uppercase text-[color:var(--text-primary)]">
          {t.initial}
        </div>
        <div className="min-w-0">
          <div className="font-medium text-[14px] text-[color:var(--text-primary)]">
            {t.name}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
            {t.role}
            {t.location ? ` · ${t.location}` : ""}
          </div>
        </div>
      </div>
    </article>
  );
}
