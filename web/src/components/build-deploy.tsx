import { AppWindow, Cloud, Smartphone, TabletSmartphone } from "lucide-react";
import { Section } from "./section";

const steps = [
  {
    icon: Smartphone,
    title: "Development build",
    body: "Run your app with EAS dev builds on a real device or simulator. Hot reload, native modules, and full Expo SDK access — no cloud build needed for day-to-day work.",
  },
  {
    icon: TabletSmartphone,
    title: "App Store + Play Store",
    body: "EAS Submit handles the entire store submission flow — screenshots, metadata, signing, and review. One command deploys to both stores simultaneously.",
  },
  {
    icon: Cloud,
    title: "OTA updates",
    body: "Push JavaScript updates instantly with expo-updates. Fix bugs, ship new screens, update dependencies — all without going through app store review. Users get updates on next app open.",
  },
  {
    icon: AppWindow,
    title: "EAS Build pipeline",
    body: "Configure builds once in eas.json — development, preview, and production profiles. Auto-increment build numbers, manage Android keystores and iOS certificates from the CLI.",
  },
];

export function BuildDeploy() {
  return (
    <Section
      id="deploy"
      eyebrow="Build & deploy"
      title={<>From code to <em className="not-italic gradient-text">store</em> in one pipeline.</>}
      description="EAS Build handles everything from native compilation to store submission. OTA updates mean most changes never need a store review cycle."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="reveal rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 transition-all hover:border-[color:var(--border-strong)]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-[var(--radius)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display mt-4 text-[20px] leading-tight text-[color:var(--text-primary)]">
              {title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
              {body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
