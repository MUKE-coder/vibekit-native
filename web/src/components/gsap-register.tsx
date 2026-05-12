"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single global registration of GSAP plugins.
 *
 * Registers SYNCHRONOUSLY at module load (not in a useEffect). This matters
 * because:
 *   - React fires effects bottom-up. Child components' useGSAP hooks run
 *     BEFORE a parent's useEffect.
 *   - If registration happens in a parent useEffect, child useGSAP hooks
 *     find ScrollTrigger unregistered → scrollTrigger config is silently
 *     dropped → .from({ opacity: 0 }) leaves elements invisible forever.
 *
 * Importing this module anywhere in the client tree registers the plugin
 * once and only once (the file is evaluated a single time).
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Exported as a no-op component so it can still be mounted in the layout
// for explicitness — but the work happens at import time, above.
export function GsapRegister() {
  return null;
}
