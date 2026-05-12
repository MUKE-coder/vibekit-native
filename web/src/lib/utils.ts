import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE = {
  name: "VibeKit",
  fullName: "VibeKit Native",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vibekit-native.desishub.com",
  tagline: "React Native components, one npx command",
  description:
    "VibeKit Native is a React Native / Expo component registry with a dark-only design system. Install production-ready components into any Expo project with a single npx command.",
  twitter: "@jbwebdeveloper",
  github: "https://github.com/MUKE-coder/vibekit-native",
  community: "https://chat.whatsapp.com/LKQUiM0dExJ60EiBDgoqRq",
  author: "JB (Muke Johnbaptist) · Desishub Technologies",
  authorUrl: "https://jb.desishub.com",
} as const;
