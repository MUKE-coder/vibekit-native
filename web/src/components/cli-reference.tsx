import { Section } from "./section";

const commands = [
  { command: "npx vibekit-native", desc: "Launch the interactive CLI menu" },
  { command: "npx vibekit-native list", desc: "View all 42 available components grouped by category" },
  { command: "npx vibekit-native install <name>", desc: "Install a component into your Expo project" },
  { command: "npx vibekit-native install auth", desc: "Install all auth components (login-screen, register-screen, forgot-password-screen, etc.)" },
  { command: "npx vibekit-native install commerce", desc: "Install all commerce components (product-card, cart-item, order-card, etc.)" },
  { command: "npx vibekit-native install chat", desc: "Install all chat components (chat-bubble, chat-input, chat-list, chat-header)" },
  { command: "npx vibekit-native install profile", desc: "Install all profile components (points-card, coupon-card)" },
  { command: "npx vibekit-native install ui", desc: "Install all UI primitives (button, input, card, toast, skeleton, etc.)" },
  { command: "npx vibekit-native install home", desc: "Install all home screen components (hero-banner, section-header, etc.)" },
  { command: "npx vibekit-native install payments", desc: "Install DGateway payment + subscription screens (mobile money UGX/KES/TZS/RWF + Stripe)" },
  { command: "npx vibekit-native install nav", desc: "Install bottom-tabs and app-drawer navigation" },
  { command: "npx vibekit-native install dashboard", desc: "Install dashboard primitives (stat-card, dashboard-shell, data-table)" },
];

const categories = [
  { name: "UI", count: 16, desc: "button, input, badge, avatar, card, bottom-sheet, toast, rating, skeleton, otp-input, and more" },
  { name: "Commerce", count: 6, desc: "product-card, cart-item, price-display, order-card, order-timeline, product-header" },
  { name: "Auth", count: 6, desc: "login-screen, register-screen, verify-otp-screen, forgot-password-screen, new-password-screen, complete-profile-screen" },
  { name: "Home", count: 4, desc: "hero-banner, section-header, category-circles, flash-sale-timer" },
  { name: "Shared", count: 4, desc: "screen-header, filter-sheet, filter-sort-bar, search-bar" },
  { name: "Chat", count: 4, desc: "chat-bubble, chat-input, chat-list, chat-header" },
  { name: "Payments", count: 5, desc: "mobile-money-pay-screen, payment-status-screen, subscription-plan-card, subscription-manage-screen, use-payment-status (DGateway)" },
  { name: "Nav", count: 2, desc: "bottom-tabs, app-drawer" },
  { name: "Dashboard", count: 3, desc: "stat-card, dashboard-shell, data-table" },
  { name: "Profile", count: 2, desc: "points-card, coupon-card" },
];

export function CLIReference() {
  return (
    <Section
      id="cli"
      eyebrow="CLI reference"
      title={<span>One CLI. <em className="not-italic gradient-text">All the components.</em></span>}
      description="npx vibekit-native is the only command you need. Install individual components or entire categories — each one drops into your project as a ready-to-edit file."
    >
      <div className="reveal overflow-hidden rounded-2xl card-glass">
        <div className="flex items-center gap-2 border-b border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--text-tertiary)]/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--text-tertiary)]/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--text-tertiary)]/40" />
          <span className="ml-3 font-mono text-[12px] text-[color:var(--text-tertiary)]">
            CLI commands
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[color:var(--bg-subtle)] text-[11px] font-mono uppercase tracking-wider text-[color:var(--text-tertiary)]">
              <tr>
                <th className="px-5 py-3 font-medium w-[45%]">Command</th>
                <th className="px-5 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {commands.map((c, i) => (
                <tr
                  key={c.command}
                  className={i !== commands.length - 1 ? "border-b border-[color:var(--border)]" : ""}
                >
                  <td className="px-5 py-3.5 font-mono text-[13px] text-[color:var(--accent)]">
                    {c.command}
                  </td>
                  <td className="px-5 py-3.5 text-[color:var(--text-secondary)]">
                    {c.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="reveal mt-10 rounded-2xl card-glass p-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[color:var(--text-tertiary)]">
          10 categories · 52 components
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.name} className="rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] font-medium text-[color:var(--text-primary)]">
                  {cat.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--text-tertiary)]">
                  {cat.count} components
                </span>
              </div>
              <p className="mt-1.5 text-[12px] text-[color:var(--text-secondary)]">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[13px] text-[color:var(--text-tertiary)]">
          Install categories with <code className="font-mono">npx vibekit-native install &lt;category&gt;</code> or pick individual components. Files are written to <code className="font-mono">src/components/&lt;category&gt;/</code>.
        </p>
      </div>
    </Section>
  );
}
