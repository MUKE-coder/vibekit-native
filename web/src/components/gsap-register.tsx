"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single global registration of GSAP plugins.
 *
 * Mount once at the top of the layout. Replaces ~12 per-component
 * `gsap.registerPlugin(ScrollTrigger)` calls — those are idempotent
 * but each one imports the plugin module separately, bloating the
 * client bundle and slowing first paint.
 */
let registered = false;

export function GsapRegister() {
  useEffect(() => {
    if (registered) return;
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }, []);
  return null;
}
