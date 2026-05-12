"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  command: string;
  className?: string;
};

export function CopyableCommand({ command, className }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — silently no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy command: ${command}`}
      className={cn(
        "group flex w-full items-center gap-2 sm:gap-3 rounded-full pill-chip px-4 sm:px-5 py-2.5 sm:py-3 text-left font-mono text-[12px] sm:text-[13px] min-w-0 transition-colors hover:bg-[color:var(--bg-muted)] focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
        className,
      )}
    >
      <span className="text-[color:var(--accent)] shrink-0" aria-hidden>
        $
      </span>
      <code className="flex-1 truncate text-[color:var(--text-primary)]">{command}</code>
      <span
        className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)] shrink-0 transition-colors group-hover:text-[color:var(--text-secondary)]"
        aria-hidden
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-[color:var(--accent)]" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" /> Copy
          </>
        )}
      </span>
    </button>
  );
}
