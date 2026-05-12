"use client";

import { useState } from "react";
import { CopyBlock } from "./copy-block";
import { cn } from "@/lib/utils";

type OS = "macos" | "windows" | "linux";

type SetupTabsProps = {
  prompts: Record<OS, string>;
};

const tabs: { value: OS; label: string; icon: string }[] = [
  { value: "macos", label: "macOS", icon: "" },
  { value: "windows", label: "Windows", icon: "⊞" },
  { value: "linux", label: "Linux", icon: "🐧" },
];

export function SetupTabs({ prompts }: SetupTabsProps) {
  const [active, setActive] = useState<OS>("macos");

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-[color:var(--border)] pb-0">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setActive(t.value)}
            className={cn(
              "relative px-5 py-2.5 font-mono text-[12px] uppercase tracking-wider transition-colors",
              active === t.value
                ? "text-[color:var(--text-primary)]"
                : "text-[color:var(--text-tertiary)] hover:text-[color:var(--text-secondary)]"
            )}
          >
            <span className="mr-1.5 opacity-70">{t.icon}</span>
            {t.label}
            {active === t.value ? (
              <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-[color:var(--accent)]" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <CopyBlock
          filename={`setup-prompts/${active}.md`}
          label={`Paste into your AI coding agent (${tabs.find((t) => t.value === active)?.label})`}
          code={prompts[active]}
        />
      </div>
    </div>
  );
}
