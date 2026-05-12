# VibeKit Native

**The dark-only React Native / Expo component registry + framework — go from idea to App Store in one afternoon.**

VibeKit Native is **two things in one repo**:

1. **A registry of 61 production-ready components** for React Native + Expo — auth screens, mobile-money payments (DGateway for UGX / KES / TZS / RWF), Stripe Payment Sheet, charts, dashboards, navigation, chat, commerce, and primitives — installable with a single `npx vibekit-native install <name>` command.
2. **A complete planning + build framework** — a planning prompt for `claude.ai` that interviews you, generates 4 project files, then hands you a `prompt.md` you paste into Claude Code (or Cursor / Codex / Cline / Windsurf / Gemini / Aider) to build phase-by-phase against a locked production stack (Expo SDK 55+ · Neon Postgres · Prisma v7 · Better Auth + Expo plugin · Expo API Routes · EAS Build / Submit / Update / Hosting).

Browse the registry at [native.desishub.com](https://native.desishub.com) · Read the [tutorial](https://native.desishub.com/tutorial) · See [all components](https://native.desishub.com/components).

---

## Why VibeKit Native exists

Every React Native app starts the same way — rebuilding the same screens: auth forms, profile layouts, product cards, chat bubbles, payment flows. AI agents waste context inventing patterns that should already exist.

VibeKit Native fixes both:

- **For humans** — Each component is an individually installable file. No dependency bloat, no provider wrappers, no vendor lock-in. You own the code from the first install.
- **For AI agents** — Every component follows predictable patterns (Zod schemas, `react-hook-form`, NativeWind classes, mobile-first defaults). Agents read the registry once and ship features instantly.

---

## Quick Start

```bash
# Install any single component
npx vibekit-native install login-screen

# Install a whole category
npx vibekit-native install payments

# List every available component
npx vibekit-native list
```

Each install writes a single editable file to `src/components/<category>/<name>.tsx`, auto-installs the native dependencies via `npx expo install`, and writes nothing else. No global config, no wrapper provider, no registry lock-in.

---

## How To Use — the 7-step workflow

VibeKit Native pairs a **planning prompt** with a **build prompt**. You go from idea → shipped app in a single coding session, with components installed on demand.

### Step 0 (optional) — install agent rules

Install the VibeKit Native rules into your AI agent so it auto-loads the framework conventions every session. One-line install for Claude Code, Cursor, Codex, Cline, Windsurf, Gemini, Aider — see [`skill/README.md`](./skill/README.md).

```bash
# Claude Code (project-local)
mkdir -p .claude/skills/vibekit-native
curl -fsSL https://raw.githubusercontent.com/MUKE-coder/vibekit-native/main/skill/SKILL.md \
  -o .claude/skills/vibekit-native/SKILL.md
```

### Step 1 — Copy the planning prompt

Copy the contents of [`CLAUDE_PROMPT.md`](./CLAUDE_PROMPT.md).

### Step 2 — Open Claude

Go to [claude.ai](https://claude.ai) and start a new conversation.

### Step 3 — Paste and add your idea

Paste the contents of `CLAUDE_PROMPT.md` into Claude, then add your app idea at the bottom:

```
[CLAUDE_PROMPT.md contents pasted here]

MY IDEA: I want to build a delivery driver app where drivers receive jobs,
navigate to the pickup location, mark the delivery as complete, and get paid
weekly via mobile money. Customers track their order in real time.
```

### Step 4 — Answer Claude's questions

Claude asks 6–10 mobile-specific questions: iOS / Android / both? Auth method? Mobile money (DGateway) or Stripe? Push notifications? Offline support? Visual reference (Dribbble link, competitor app)? Answer honestly and completely.

### Step 5 — Get your 4 project files

Claude generates:

| File | Purpose |
|---|---|
| `project-description.md` | Complete description of your app — features, data model, screens, API routes, integrations |
| `project-phases.md` | 5-phase build blueprint with concrete tasks + install commands |
| `design-style-guide.md` | Fully customized visual design system (color tokens, typography scale, mobile component specs, motion timings) |
| `prompt.md` | The prompt you paste into Claude Code to start building |

Save all 4 into your project root.

### Step 6 — Copy the framework files

Drop these two files from this repo into your project root:

- [`master_prompt.md`](./master_prompt.md) — Coding standards, tech stack rules, Prisma v7 + Neon HTTP adapter pattern, Better Auth + Expo plugin wiring, Expo Router structure, mobile performance budget, form rules, DGateway + Stripe patterns, EAS Build / Submit / Update / Hosting templates, dependency blocklist.
- [`vibekit-native-components.md`](./vibekit-native-components.md) — The registry reference. Claude checks this before writing any screen from scratch and installs from the registry instead.

> **Pro tip:** Claude Code auto-loads `CLAUDE.md`. Rename (or symlink) `master_prompt.md` → `CLAUDE.md` and it auto-loads every session — no more copy-pasting.

### Step 7 — Start building with Claude Code

Open your AI agent in the project directory and paste the contents of `prompt.md`. The agent will:

- Read `master_prompt.md` (or `CLAUDE.md`), `design-style-guide.md`, `vibekit-native-components.md`, `project-description.md`, `project-phases.md`
- Start with **Phase 1 (Foundation)** — Expo + NativeWind + expo-router + Prisma v7 + Neon + Better Auth + EAS init + Sentry
- **Install VibeKit Native components first** (`npx vibekit-native install <name>`) before writing anything from scratch
- Stop after each phase for your confirmation
- Follow the design system and coding standards exactly

### Step 8 (before submitting) — Run the pre-deploy review

Once Phase 5 is done, paste [`pre-deploy-review.md`](./pre-deploy-review.md) into your AI agent. It performs a 24-section senior-level audit (cold-start TTI, accessibility, EAS Build, store-ready assets, webhook security, env vars) before you submit to the App Store or Play Store.

---

## Components — 61 across 10 categories

| Category | Count | Components |
|---|---|---|
| **UI** | 16 | `button`, `input`, `badge`, `avatar`, `card`, `bottom-sheet`, `toast`, `rating`, `custom-radio`, `divider`, `skeleton`, `searchable-select`, `countdown-timer`, `otp-input`, `empty-state`, `loading-spinner` |
| **Commerce** | 10 | `product-card`, `cart-item`, `price-display`, `order-card`, `order-timeline`, `product-header`, `wishlist-button`, `review-card`, `order-summary`, `checkout-form` |
| **Payments** | 7 | `mobile-money-pay-screen`, `payment-status-screen`, `subscription-plan-card`, `subscription-manage-screen`, `stripe-pay-button`, `stripe-subscription-button`, `use-payment-status` |
| **Auth** | 6 | `login-screen`, `register-screen`, `verify-otp-screen`, `forgot-password-screen`, `new-password-screen`, `complete-profile-screen` |
| **Dashboard** | 6 | `stat-card`, `dashboard-shell`, `data-table`, `chart-line`, `chart-bar`, `chart-pie` |
| **Home** | 4 | `hero-banner`, `section-header`, `category-circles`, `flash-sale-timer` |
| **Shared** | 4 | `screen-header`, `filter-sheet`, `filter-sort-bar`, `search-bar` |
| **Chat** | 4 | `chat-bubble`, `chat-input`, `chat-list`, `chat-header` |
| **Nav** | 2 | `bottom-tabs`, `app-drawer` |
| **Profile** | 2 | `points-card`, `coupon-card` |

Plus 7 **library** modules (auto-installed as dependencies of other components, or installable individually):

| Module | Purpose |
|---|---|
| `core` | Theme tokens (`theme.ts`), utilities (`cn` helper), formatting helpers — every other component depends on this |
| `api-client` | TanStack Query provider with mobile-first defaults (retries, focus-refetch, online/offline tracking via `expo-network`) |
| `dgateway` | Typed DGateway client (talks to YOUR backend proxy, never the gateway directly) |
| `storage` | MMKV-backed key-value storage — 30× faster than `AsyncStorage` |
| `secure-storage` | Encrypted key-value storage (iOS Keychain + Android EncryptedSharedPreferences) for auth tokens, biometric secrets |
| `haptics` | Typed `expo-haptics` wrapper — tap / select / success / warning / error |
| `push-notifications` | `usePushNotifications` hook — permission flow, Expo Push Token registration, foreground/tap handlers |

Install individually or by category:

```bash
# Single component
npx vibekit-native install mobile-money-pay-screen

# Whole category
npx vibekit-native install payments

# Multiple in one go
npx vibekit-native install login-screen product-card chat-bubble
```

---

## Usage Examples

### Auth — wire `login-screen` to Better Auth

```tsx
// app/(auth)/sign-in.tsx
import { LoginScreen } from "@/src/components/auth/login-screen";
import { signIn } from "@/src/lib/auth-client";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();
  return (
    <LoginScreen
      onSubmit={async ({ email, password }) => {
        const { error } = await signIn.email({ email, password });
        if (error) throw new Error(error.message);
        router.replace("/(tabs)");
      }}
    />
  );
}
```

### Commerce — product list with `product-card`

```tsx
// app/(tabs)/index.tsx
import { FlashList } from "@shopify/flash-list";
import { ProductCard } from "@/src/components/commerce/product-card";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Shop() {
  const { data } = useInfiniteQuery({ queryKey: ["products"], queryFn: fetchProducts });
  const items = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <FlashList
      data={items}
      numColumns={2}
      estimatedItemSize={240}
      renderItem={({ item }) => <ProductCard {...item} onPress={() => {}} />}
    />
  );
}
```

### Payments — DGateway mobile money checkout

```tsx
// app/checkout.tsx
import { MobileMoneyPayScreen } from "@/src/components/payments/mobile-money-pay-screen";
import { useRouter } from "expo-router";

export default function Checkout() {
  const router = useRouter();
  return (
    <MobileMoneyPayScreen
      defaultAmount={5000}
      description="Order #1234"
      metadata={{ orderId: "1234" }}
      onStarted={(reference) => router.push(`/payment-status?ref=${reference}`)}
    />
  );
}
```

### Dashboard — stat card + line chart

```tsx
// app/(tabs)/dashboard.tsx
import { DashboardShell } from "@/src/components/dashboard/dashboard-shell";
import { StatCard } from "@/src/components/dashboard/stat-card";
import { ChartLine } from "@/src/components/dashboard/chart-line";
import { View } from "react-native";

export default function Dashboard() {
  return (
    <DashboardShell title="Overview" subtitle="Last 7 days">
      <View className="grid grid-cols-2 gap-3">
        <StatCard label="Today's revenue" value={420_000} unit="UGX" delta={12.4} />
        <StatCard label="Sales today" value={47} delta={-3.2} />
      </View>
      <ChartLine
        className="mt-4"
        title="Revenue this week"
        data={weeklyRevenue}
      />
    </DashboardShell>
  );
}
```

See [native.desishub.com/components](https://native.desishub.com/components) for the full per-component API.

---

## DGateway: Mobile Money Payments (UGX / KES / TZS / RWF)

VibeKit Native ships first-class **DGateway** integration for East African mobile money — Iotec for UGX, Relworx for KES / TZS / RWF — plus Stripe routing for USD. The mobile components **never touch the DGateway API key directly**; they call **your** backend, which proxies the requests.

### Architecture

```
Mobile app          Your backend                     DGateway
─────────────       ────────────────                 ──────────
Pay screen   ─POST→ /api/checkout/start    ─X-API-Key→ /v1/payments/collect
Poll status  ─GET ─→ /api/checkout/status/:ref ─────→ /v1/transactions/:ref/status
                                                       │
Webhook      ←────  /api/webhooks/dgateway  ─verify──── X-DGateway-Signature
```

### Mobile-side setup

1. Configure your backend URL in `app.json`:
   ```json
   { "expo": { "extra": { "apiUrl": "https://api.yourdomain.com" } } }
   ```

   …or via env: `EXPO_PUBLIC_API_URL=https://api.yourdomain.com`

2. Install the DGateway client + screens:
   ```bash
   npx vibekit-native install dgateway
   npx vibekit-native install mobile-money-pay-screen
   npx vibekit-native install payment-status-screen
   ```

3. Wire to your screens (see the [Usage Examples](#payments--dgateway-mobile-money-checkout) above).

### Server-side setup (Expo API Routes — same repo)

Environment variables (server-side only — **never** bundle into the mobile binary):

```env
DGATEWAY_API_KEY=dgw_test_xxxxxxxxxxxxxxxx       # from dgatewayadmin.desispay.com
DGATEWAY_API_URL=https://dgatewayapi.desispay.com
DGATEWAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
APP_URL=https://api.yourdomain.com
```

Proxy route — `app/api/checkout/start+api.ts`:

```ts
import { auth } from "@/src/lib/auth";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const r = await fetch(`${process.env.DGATEWAY_API_URL}/v1/payments/collect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.DGATEWAY_API_KEY!,
    },
    body: JSON.stringify({
      amount: body.amount,
      currency: body.currency,
      phone_number: body.phoneNumber,
      description: body.description,
      metadata: { ...body.metadata, userId: session.user.id },
      callback_url: `${process.env.APP_URL}/api/webhooks/dgateway`,
    }),
  });

  return Response.json(await r.json(), { status: r.ok ? 200 : r.status });
}
```

Webhook with HMAC-SHA256 verification — `app/api/webhooks/dgateway+api.ts`:

```ts
import crypto from "node:crypto";
import { prisma } from "@/src/lib/prisma";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("X-DGateway-Signature") ?? "";

  const expected = crypto
    .createHmac("sha256", process.env.DGATEWAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (
    !signature ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Idempotency: skip duplicate deliveries
  const existing = await prisma.paymentEvent.findUnique({ where: { reference: event.reference } });
  if (existing) return new Response(null, { status: 200 });

  await prisma.paymentEvent.create({
    data: {
      reference: event.reference,
      status: event.status,
      provider: event.provider,
      providerRef: event.provider_ref,
      payload: event,
    },
  });

  // Update your local Order / Subscription row…

  return new Response(null, { status: 200 });
}
```

### Testing

DGateway provides deterministic sandbox phone numbers when you use a `dgw_test_*` key:

| Phone number     | Result                |
| ---------------- | --------------------- |
| `256111777111`   | Always succeeds       |
| `256111777222`   | Always fails          |
| `256111777333`   | Times out (expires after 90s) |

Live docs are the source of truth: <https://dgateway.com/docs>

### Hard rules

- **Never** put `DGATEWAY_API_KEY` in `EXPO_PUBLIC_*` or any client-side env var.
- **Always** verify `X-DGateway-Signature` with a constant-time HMAC compare on every webhook.
- **Persist** the DGateway `reference` and `provider_ref` against your local order/subscription row — webhooks can be missed or retried up to 3 times.
- **Treat only** `completed`, `failed`, `cancelled`, and `expired` as terminal statuses. `pending` and `processing` are not terminal — keep polling.

---

## Stripe (one-time + subscriptions)

For card payments (Apple Pay, Google Pay, cards), install the Stripe components:

```bash
npx vibekit-native install stripe-pay-button
npx vibekit-native install stripe-subscription-button
```

Wrap your app root with `<StripeProvider publishableKey="pk_test_…">` from `@stripe/stripe-react-native`. Your backend mints a `PaymentIntent` (one-time) or a `Subscription` (recurring) and returns the client secret. The `master_prompt.md` has the canonical server-side templates; the Stripe docs cover platform-specific setup: [docs.stripe.com/payments/accept-a-payment?platform=react-native](https://docs.stripe.com/payments/accept-a-payment?platform=react-native).

---

## The locked tech stack

| Layer | Pick | Why |
|---|---|---|
| **Framework** | Expo SDK 55+ · React Native 0.83+ | Largest mobile community, OTA via EAS Update, single codebase iOS + Android + web |
| **Language** | TypeScript 5.9+ strict | Type safety end-to-end (shared Zod schemas between mobile + API) |
| **Routing** | expo-router (file-based) | Same mental model as Next.js App Router — agents already know it |
| **Backend** | Expo API Routes (`app/api/**/+api.ts`) | Same repo, same deploy. Web-standard Request/Response. |
| **Database** | Neon Postgres (HTTP serverless driver) | No connection-pool issues on cold-start |
| **ORM** | Prisma v7 with `@prisma/adapter-pg` + `@neondatabase/serverless` | New `prisma-client` generator + driver adapters |
| **Auth** | Better Auth + `@better-auth/expo` plugin | Native OAuth via `expo-web-browser`, sessions in `expo-secure-store` |
| **Server state** | TanStack Query v5 + offline persister | Retries, refetch-on-focus, offline-read |
| **Client state** | Zustand | Lightweight, no boilerplate |
| **Storage (fast)** | `react-native-mmkv` | 30× faster than `AsyncStorage`, encryption-capable |
| **Storage (sensitive)** | `expo-secure-store` | Encrypted; Better Auth session storage |
| **Forms** | `react-hook-form` + Zod | Shared schemas mobile ↔ API route |
| **Styling** | NativeWind v4 (Tailwind for RN) | Reuses Tailwind muscle memory; same design tokens as web Vibekit |
| **Animations** | `react-native-reanimated` 3 + Moti | UI thread, 60fps guaranteed |
| **Gestures** | `react-native-gesture-handler` | Native gesture detection |
| **Lists** | `@shopify/flash-list` | Way faster than `FlatList` for long lists |
| **Images** | `expo-image` + Cloudinary / R2 | Cached, blurhash transitions, never resize at render |
| **Icons** | `@expo/vector-icons` (Ionicons) | Bundled with Expo, zero linking |
| **Payments — EA** | DGateway via server proxy | UGX / KES / TZS / RWF mobile money |
| **Payments — global** | `@stripe/stripe-react-native` | Cards, Apple Pay, Google Pay |
| **Push** | `expo-notifications` + Expo Push Service | Free, works on iOS + Android |
| **Email** | Resend (server-side via API route) | Transactional only |
| **Deep links** | `expo-linking` + Universal Links / App Links | Required for OAuth callbacks |
| **OTA updates** | EAS Update | Ship JS-only fixes without store review |
| **Monitoring** | Sentry React Native + Sentry Node | Crashes + errors + performance, source maps via EAS post-build |
| **Analytics** | PostHog React Native (optional) | Self-hostable, event funnels |
| **Build / Deploy** | EAS Build · Submit · Update · Hosting | Native binaries + store submission + OTA + API routes — all one CLI |

The `master_prompt.md` includes a **dependency blocklist** (no `AsyncStorage` for primary data, no `react-native-vector-icons`, no `axios`, no `moment`, no raw `react-navigation`, no `Animated` from `react-native`, etc.) so the AI agent doesn't drift off-stack.

---

## Design system

Dark-only by default, minimal, consistent. Every component pulls from `src/components/lib/theme.ts`:

| Token | Value (default — `design-style-guide.md` tailors per project) |
|---|---|
| `bg` | `#0A0A0A` (base screen background) |
| `bgSubtle` | `#121212` (section dividers, list rows) |
| `bgElevated` | `#1A1A1A` (cards, sheets, modals) |
| `bgHover` | `#222222` (pressed / hover state) |
| `textPrimary` | `#FFFFFF` |
| `textSecondary` | `#A0A0A0` |
| `textTertiary` | `#666666` |
| `border` | `#2A2A2A` |
| `borderStrong` | `#333333` |
| `accent` | `#6366F1` (Indigo — one accent per project, no rainbow gradients) |
| `accentLight` | `#1E1B4B` (selected backgrounds, 10% opacity over dark) |
| Radius | `8` (small), `12` (default cards), `16` (hero / sheets), `24` (bottom sheets) |
| Touch targets | **44 × 44pt minimum** — use `hitSlop` when visual size is smaller |

Components are dark-only by design — no light mode, no theme switching, no conditional `.dark` classes. The `design-style-guide.md` template generated during planning replaces these defaults with the accent / typography / spacing tailored to YOUR app.

---

## Repo file inventory

What each file at the repo root does — and which ones you copy into your project:

| File | Role | Goes into your project? |
|---|---|---|
| `README.md` | This file — overview + workflow | ❌ |
| [`CLAUDE_PROMPT.md`](./CLAUDE_PROMPT.md) | Planning prompt — paste into claude.ai | Copied content, not the file |
| [`master_prompt.md`](./master_prompt.md) | Coding standards + tech stack rules + patterns | ✅ → rename to `CLAUDE.md` |
| [`vibekit-native-components.md`](./vibekit-native-components.md) | Registry reference for AI agents | ✅ |
| [`design-style-guide.md`](./design-style-guide.md) | Visual design system template | Tailored per project, then placed at root |
| [`pre-deploy-review.md`](./pre-deploy-review.md) | Pre-submission audit prompt | ✅ |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Contribution guidelines | ❌ |
| [`skill/`](./skill/) | Agent-rules install targets (Claude Code / Cursor / Codex / Cline / Windsurf / Gemini / Aider) | One file per agent — see [`skill/README.md`](./skill/README.md) |
| [`packages/cli/`](./packages/cli/) | The `npx vibekit-native` CLI source | ❌ |
| [`packages/components/`](./packages/components/) | The source-of-truth `.tsx` files for every registry component | Files install one-by-one via CLI |
| [`web/`](./web/) | The marketing site at [native.desishub.com](https://native.desishub.com) | ❌ |

Generated per-project (by Claude in Step 5):

- `project-description.md` — full spec
- `project-phases.md` — 5-phase build plan
- `design-style-guide.md` — tailored from the template above
- `prompt.md` — Claude Code hand-off

---

## Contributing

Contributions are very welcome — new components, bug fixes, doc improvements. Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a PR.

Issues + feature requests: [github.com/MUKE-coder/vibekit-native/issues](https://github.com/MUKE-coder/vibekit-native/issues).

Community + support: [WhatsApp group](https://chat.whatsapp.com/LKQUiM0dExJ60EiBDgoqRq).

---

## License

MIT © [JB (Muke Johnbaptist)](https://github.com/MUKE-coder) · [Desishub Technologies](https://desishub.com)
