"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Copy, Smartphone, Terminal } from "lucide-react";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function TerminalPhoneDemo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // 1) Terminal types out the install command
      tl.to(".demo-terminal-text", {
        width: "100%",
        duration: 1.8,
        ease: "steps(42)",
      })
        .to({}, { duration: 0.4 })
        // 2) Checkmark appears
        .from(".demo-check", { scale: 0, duration: 0.3, ease: "back.out(2)" })
        .to({}, { duration: 0.3 })
        // 3) Phone slides in
        .from(".demo-phone", { x: 60, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        // 4) Code editor slides in
        .from(".demo-code", { x: -60, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");

      // Cursor blink
      gsap.to(".demo-cursor", {
        opacity: 0,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="demo" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--accent)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            </span>
            See the flow
          </div>
          <h2 className="headline-display mt-6 text-[clamp(2rem,5vw,3.5rem)] headline-glow">
            Install. Import. Render.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-[color:var(--text-secondary)]">
            One command drops a production-ready component into your project. Import it, wire your data, and see it live.
          </p>
        </div>

        {/* Demo area */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-12 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 60%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Main card */}
          <div className="rounded-[var(--radius-2xl)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 sm:p-8 shadow-[var(--shadow-xl)]">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              {/* Left: Terminal + Code */}
              <div className="flex flex-col gap-4">
                {/* Terminal window */}
                <div className="rounded-[var(--radius-lg)] overflow-hidden border border-[color:var(--border)] bg-[#0A0A0A]">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-[#0D0D0D] px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <span className="ml-2 font-mono text-[11px] text-white/40">terminal</span>
                  </div>
                  <div className="px-4 py-4 font-mono text-[13px] leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">$</span>
                      <div className="flex-1">
                        <span className="demo-terminal-text inline-block overflow-hidden whitespace-nowrap text-white/90" style={{ width: 0 }}>
                          npx vibekit-native install login-screen
                        </span>
                        <span className="demo-cursor inline-block w-[2px] h-[1em] bg-white/70 align-middle ml-0.5" />
                      </div>
                    </div>
                    <div className="demo-check mt-2 flex items-center gap-2 text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      <span>✓ Installed login-screen to src/components/auth/</span>
                    </div>
                    <div className="mt-1 text-white/40">✓ Added 1 file (3.2 KB)</div>
                  </div>
                </div>

                {/* Code editor */}
                <div className="demo-code rounded-[var(--radius-lg)] overflow-hidden border border-[color:var(--border)] bg-[#0A0A0A]">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-[#0D0D0D] px-4 py-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    </div>
                    <span className="ml-2 font-mono text-[11px] text-white/40">src/app/sign-in.tsx</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.7] text-white/80">
                    <code>{`import { LoginScreen } from "@/src/components/auth/login-screen";

export default function SignInScreen() {
  return (
    &lt;LoginScreen
      onLogin={(data) =>
        console.log(data.email, data.password)
      }
    /&gt;
  );
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Right: Phone mockup */}
              <div className="demo-phone shrink-0">
                <div className="relative mx-auto h-[480px] w-[240px] rounded-[2.5rem] border-4 border-[color:var(--border-strong)] bg-[#0A0A0A] shadow-[var(--shadow-lg)] overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 inset-x-0 z-10 flex justify-center">
                    <div className="h-6 w-28 rounded-b-2xl bg-black" />
                  </div>
                  {/* Screen content */}
                  <div className="h-full bg-[#0D0D0D] pt-8">
                    {/* Status bar */}
                    <div className="flex justify-between px-6 py-2 text-[10px] font-mono text-white/50">
                      <span>9:41</span>
                      <span className="flex gap-1">
                        <span className="h-2.5 w-4 rounded-sm border border-white/40 relative overflow-hidden">
                          <span className="absolute inset-y-0.5 left-0.5 w-2.5 rounded-sm bg-emerald-400" />
                        </span>
                      </span>
                    </div>
                    {/* App content preview */}
                    <div className="px-4 mt-4 space-y-3">
                      {/* Mock LoginForm */}
                      <div className="text-center">
                        <div className="mx-auto h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                          <span className="text-indigo-400 text-sm font-bold">V</span>
                        </div>
                        <div className="mt-3 h-3 w-24 mx-auto rounded bg-white/10" />
                      </div>
                      <div className="space-y-2 mt-6">
                        <div className="h-2 w-12 rounded bg-white/10" />
                        <div className="h-9 w-full rounded-md border border-white/10 bg-white/5" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-12 rounded bg-white/10" />
                        <div className="h-9 w-full rounded-md border border-white/10 bg-white/5" />
                      </div>
                      <div className="h-10 w-full rounded-md bg-indigo-500/30 flex items-center justify-center">
                        <span className="text-[11px] font-medium text-indigo-200">Sign In</span>
                      </div>
                      <div className="flex justify-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-white/10" />
                        <div className="h-8 w-8 rounded-full border border-white/10" />
                        <div className="h-8 w-8 rounded-full border border-white/10" />
                      </div>
                    </div>
                    {/* Home indicator */}
                    <div className="absolute bottom-2 inset-x-0 flex justify-center">
                      <div className="h-1 w-28 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  Live on device
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
