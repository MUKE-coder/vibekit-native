"use client";

import {
  ArrowRight,
  FileDown,
  Smartphone,
  Terminal,
  Wrench,
} from "lucide-react";
import RadialOrbitalTimeline, { type TimelineItem } from "@/components/ui/radial-orbital-timeline";
import { Section } from "./section";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Install CLI",
    date: "Step 01",
    content: "Run npx vibekit-native in your Expo project. No global install needed — npx handles everything. The interactive CLI shows all available components grouped by category.",
    category: "Setup",
    icon: Terminal,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Pick a component",
    date: "Step 02",
    content: "Browse the registry with npx vibekit-native list or install directly: npx vibekit-native install <name>. Each component has a clear description, prerequisites, and registry dependencies listed.",
    category: "Setup",
    icon: FileDown,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Customize",
    date: "Step 03",
    content: "Every installed component is a plain TypeScript file at src/components/<category>/<name>.tsx. Edit the JSX, tweak NativeWind classes, wire your data. It's your code — zero vendor lock-in.",
    category: "Build",
    icon: Wrench,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 70,
  },
  {
    id: 4,
    title: "Wire the backend",
    date: "Step 04",
    content: "Connect components to your backend with TanStack Query hooks. Auth screens use react-hook-form + Zod validation built in. Commerce screens expect standard data shapes. Chat bubbles work with any WebSocket or REST backend.",
    category: "Build",
    icon: Wrench,
    relatedIds: [3, 5],
    status: "pending",
    energy: 50,
  },
  {
    id: 5,
    title: "Build binary",
    date: "Step 05",
    content: "Run eas build --profile production to compile native binaries. EAS handles iOS signing, Android keystores, and version management automatically.",
    category: "Build",
    icon: Smartphone,
    relatedIds: [4, 6],
    status: "pending",
    energy: 30,
  },
  {
    id: 6,
    title: "Ship to stores",
    date: "Step 06",
    content: "Submit to the App Store and Google Play with eas submit. Push OTA updates with eas update for quick iterations that skip store review.",
    category: "Deploy",
    icon: Smartphone,
    relatedIds: [5],
    status: "pending",
    energy: 10,
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="THE WORKFLOW"
      title={<span>Install. Customize. <em className="not-italic gradient-text">Ship to stores.</em></span>}
      description="Six steps from zero to a production React Native app. No boilerplate, no provider wrappers, no config — just components that work."
      containerClassName="max-w-6xl"
    >
      <RadialOrbitalTimeline timelineData={timelineData} />
      <p className="reveal mt-6 text-center font-mono text-[12px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
        Click a node to expand · Click empty space to resume rotation
      </p>
    </Section>
  );
}
