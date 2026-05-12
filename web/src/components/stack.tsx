import { Section } from "./section";

const rows = [
  { layer: "Framework", tech: "Expo SDK 55+ / React Native 0.83", why: "Universal native apps with OTA updates and file-based routing" },
  { layer: "Language", tech: "TypeScript 5.9", why: "Type safety, better DX with AI agents" },
  { layer: "Styling", tech: "NativeWind v4", why: "Tailwind CSS for React Native — utility-first, AI-friendly" },
  { layer: "Navigation", tech: "expo-router", why: "File-based routing, same mental model as Next.js" },
  { layer: "Forms & Validation", tech: "react-hook-form + Zod", why: "Type-safe form validation on every input" },
  { layer: "Client State", tech: "Zustand", why: "Lightweight client state — no boilerplate" },
  { layer: "Server State", tech: "TanStack React Query", why: "Server state, caching, pagination, optimistic updates" },
  { layer: "Icons", tech: "@expo/vector-icons (Ionicons)", why: "5,000+ icons out of the box, zero setup" },
  { layer: "Images", tech: "expo-image", why: "Optimized image loading with caching" },
  { layer: "Animations", tech: "react-native-reanimated", why: "60fps animations on the UI thread" },
  { layer: "Lists", tech: "@shopify/flash-list", why: "High-performance lists for large data sets" },
  { layer: "Secure Storage", tech: "expo-secure-store", why: "Encrypted token storage" },
  { layer: "Push Notifications", tech: "expo-notifications", why: "Native push notifications, iOS and Android" },
  { layer: "Components", tech: "VibeKit Native Registry", why: "Install production-ready RN components via npx" },
  { layer: "Deployment", tech: "EAS Build + App Store / Play Store", why: "Build, sign, submit, and OTA update from one CLI" },
];

export function Stack() {
  return (
    <Section
      id="stack"
      eyebrow="The standard stack"
      title="Locked stack. Zero decisions. Maximum velocity."
      description="Every component ships with the same opinionated stack so AI never has to invent — and you never have to debug a dependency mismatch."
    >
      <div className="reveal overflow-hidden rounded-2xl card-glass">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[color:var(--bg-subtle)] text-[11px] font-mono uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
              <tr>
                <th className="px-5 py-3 font-medium">Layer</th>
                <th className="px-5 py-3 font-medium">Technology</th>
                <th className="px-5 py-3 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.layer}
                  className={i !== rows.length - 1 ? "border-b border-[color:var(--border)]" : ""}
                >
                  <td className="px-5 py-3.5 font-medium text-[color:var(--text-primary)]">
                    {r.layer}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[13px] text-[color:var(--text-primary)]">
                    {r.tech}
                  </td>
                  <td className="px-5 py-3.5 text-[color:var(--text-secondary)]">
                    {r.why}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="reveal mt-6 text-center text-[13px] text-[color:var(--text-secondary)]">
        All components use <span className="font-mono">NativeWind v4</span> with the shared dark design system tokens. Each component is a single plain TypeScript file that drops into your project — no provider wrappers, no config changes, no vendor lock-in.
      </p>
    </Section>
  );
}
