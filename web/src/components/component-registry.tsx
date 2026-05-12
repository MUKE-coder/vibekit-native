import { ExternalLink } from "lucide-react";
import { Section } from "./section";
import { Button } from "./ui/button";

const categories = [
  {
    name: "UI",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    count: 16,
    components: [
      { name: "Button", desc: "5 variants, loading, icons" },
      { name: "Input", desc: "Label, error, icon, password toggle" },
      { name: "Badge", desc: "Solid, outline, subtle variants" },
      { name: "Avatar", desc: "Image, initials, online status" },
      { name: "Card", desc: "Elevated container with sections" },
      { name: "Bottom Sheet", desc: "Animated modal with drag handle" },
      { name: "Empty State", desc: "Icon, message, action button" },
      { name: "Loading Spinner", desc: "Full-screen or inline" },
      { name: "Toast", desc: "4 variants, auto-dismiss" },
      { name: "Rating", desc: "Interactive stars, half-precision" },
      { name: "Custom Radio", desc: "Animated group, vertical/horizontal" },
      { name: "Divider", desc: "Horizontal/vertical with label" },
      { name: "Skeleton", desc: "Card, text, avatar placeholders" },
      { name: "Searchable Select", desc: "Modal picker with search" },
      { name: "Countdown Timer", desc: "DHMS format, auto-decrement" },
      { name: "OTP Input", desc: "Digit boxes, auto-advance, paste" },
    ],
  },
  {
    name: "Commerce",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    count: 6,
    components: [
      { name: "Product Card", desc: "Image, price, rating, actions" },
      { name: "Cart Item", desc: "Thumbnail, stepper, total" },
      { name: "Price Display", desc: "Currency, compare-at, discount" },
      { name: "Order Card", desc: "ID, status, item previews" },
      { name: "Order Timeline", desc: "Status progression with dates" },
      { name: "Product Header", desc: "Gallery, variants, add-to-cart" },
    ],
  },
  {
    name: "Auth",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    count: 6,
    components: [
      { name: "Login Screen", desc: "Email/password, social buttons" },
      { name: "Register Screen", desc: "Name, email, password fields" },
      { name: "Verify OTP Screen", desc: "6-digit code, resend timer" },
      { name: "Forgot Password", desc: "Email input, validation" },
      { name: "New Password", desc: "Strength validation, confirm" },
      { name: "Complete Profile", desc: "Avatar, username, phone, DOB" },
    ],
  },
  {
    name: "Home",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    count: 4,
    components: [
      { name: "Hero Banner", desc: "Autoplay carousel with CTAs" },
      { name: "Section Header", desc: "Title, subtitle, see-all link" },
      { name: "Category Circles", desc: "Scrollable icon row" },
      { name: "Flash Sale Timer", desc: "Countdown, product strip" },
    ],
  },
  {
    name: "Shared",
    color: "text-neutral-400",
    bg: "bg-neutral-500/10",
    border: "border-neutral-500/20",
    count: 4,
    components: [
      { name: "Screen Header", desc: "Back button, actions" },
      { name: "Filter Sheet", desc: "Multi-select bottom panel" },
      { name: "Filter & Sort Bar", desc: "Toolbar with badges" },
      { name: "Search Bar", desc: "Clear button, scanner icon" },
    ],
  },
  {
    name: "Chat",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    count: 1,
    components: [
      { name: "Chat Bubble", desc: "Own/other alignment, status" },
    ],
  },
  {
    name: "Profile",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    count: 2,
    components: [
      { name: "Points Card", desc: "Balance, tier, progress bar" },
      { name: "Coupon Card", desc: "Code, expiry, apply action" },
    ],
  },
];

export function ComponentRegistry() {
  return (
    <Section
      id="registry"
      eyebrow="Component registry"
      title={<span>Don't write what already exists. <em className="not-italic gradient-text">Install it.</em></span>}
      description="38 production-ready React Native components across 7 categories. Each one installs with a single npx command and shares the same dark design system."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="reveal rounded-[var(--radius-lg)] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-5 transition-all hover:border-[color:var(--border-strong)]"
          >
            <div className={`inline-flex items-center gap-2 rounded-full ${cat.bg} ${cat.border} ${cat.color} px-3 py-1 font-mono text-[10px] uppercase tracking-wider`}>
              <span className={`h-1.5 w-1.5 rounded-full ${cat.color.replace("text", "bg")}`} />
              {cat.name}
              <span className="ml-0.5 opacity-60">· {cat.count}</span>
            </div>
            <ul className="mt-4 space-y-2">
              {cat.components.map((comp) => (
                <li key={comp.name} className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[13px] text-[color:var(--text-primary)]">
                    {comp.name}
                  </span>
                  <span className="text-[11px] text-[color:var(--text-tertiary)] text-right shrink-0">
                    {comp.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="reveal mt-10 flex justify-center">
        <Button
          href="https://github.com/MUKE-coder/vibekit-native"
          variant="outline"
          size="md"
        >
          Browse the full registry on GitHub
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
