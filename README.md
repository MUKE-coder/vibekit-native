# VibeKit Native

**The dark-only React Native / Expo component library — install components via CLI, zero boilerplate.**

VibeKit Native is a registry of **61 production-ready components across 10 categories** for React Native & Expo. Every component is built with NativeWind v4, dark-themed by default, and installable with a single `npx` command. No config, no provider wrappers, no lengthy setup — just `npx vibekit-native install` and start building.

Includes DGateway mobile-money integration (UGX/KES/TZS/RWF), Stripe Payment Sheet, charts, dashboards, navigation, auth flows, chat, commerce, and more. See the full registry at [native.desishub.com/components](https://native.desishub.com/components).

---

## What is VibeKit Native?

Building a React Native app from scratch means re-inventing the same screens — auth forms, profile layouts, chat bubbles, product cards — every single time. VibeKit Native solves this by shipping each component as an **individually installable file** that drops directly into your project.

- **No dependencies bloat** — you only install what you use.
- **No context providers or registry wrappers** — components import cleanly from your local file system.
- **Opinionated, not rigid** — every component is a starting point you can edit immediately.

---

## Quick Start

```bash
# 1. Install the CLI
npx vibekit-native

# 2. Install any component
npx vibekit-native install login-form
```

To see every available component:

```bash
npx vibekit-native list
```

---

## Components

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

Install any single component or an entire category:

```bash
# Single component
npx vibekit-native install mobile-money-pay-screen

# Whole category
npx vibekit-native install payments
```

---

## Usage Examples

### Auth — Login Form

```tsx
import { LoginForm } from "@/components/vibekit/login-form";

export default function SignInScreen() {
  return (
    <LoginForm
      onLogin={(data) => console.log(data.email, data.password)}
    />
  );
}
```

### Commerce — Product Grid

```tsx
import { ProductGrid } from "@/components/vibekit/product-grid";
import { ProductCard } from "@/components/vibekit/product-card";

const products = [
  { id: "1", name: "Wireless Headphones", price: 79.99, image: "..." },
  { id: "2", name: "Sneakers",          price: 129.99, image: "..." },
];

export default function ShopScreen() {
  return (
    <ProductGrid>
      {products.map((p) => (
        <ProductCard key={p.id} {...p} onPress={() => {}} />
      ))}
    </ProductGrid>
  );
}
```

### Profile — Settings

```tsx
import { ProfileSettings } from "@/components/vibekit/profile-settings";

const settings = [
  { label: "Notifications", type: "toggle", value: true },
  { label: "Privacy",       type: "chevron" },
  { label: "Logout",        type: "danger" },
];

export default function SettingsScreen() {
  return <ProfileSettings items={settings} />;
}
```

---

## DGateway: Mobile Money Payments

VibeKit Native ships first-class **DGateway** integration for East African mobile money payments — Iotec for UGX, Relworx for KES/TZS/RWF — plus Stripe routing for USD. The mobile components never touch the DGateway API key directly; they call **your** backend, which proxies the requests.

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

   or via env: `EXPO_PUBLIC_API_URL=https://api.yourdomain.com`

2. Install the DGateway client + screens:
   ```bash
   npx vibekit-native install dgateway
   npx vibekit-native install mobile-money-pay-screen
   npx vibekit-native install payment-status-screen
   ```

3. Wire them up:
   ```tsx
   import { MobileMoneyPayScreen } from "@/components/payments/mobile-money-pay-screen";
   import { useRouter } from "expo-router";

   export default function CheckoutScreen() {
     const router = useRouter();
     return (
       <MobileMoneyPayScreen
         defaultAmount={5000}
         description="Order #1234"
         metadata={{ orderId: "1234" }}
         onStarted={(reference) =>
           router.push(`/payment-status?ref=${reference}`)
         }
       />
     );
   }
   ```

### Server-side setup (Node / Express example)

Environment variables (server-side only — never bundle into the mobile app):

```env
DGATEWAY_API_KEY=dgw_test_xxxxxxxxxxxxxxxx       # from dgatewayadmin.desispay.com
DGATEWAY_API_URL=https://dgatewayapi.desispay.com
DGATEWAY_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
APP_URL=https://api.yourdomain.com
```

Proxy route:

```ts
// /api/checkout/start
app.post("/api/checkout/start", async (req, res) => {
  const { amount, currency, phoneNumber, description, metadata } = req.body;
  const r = await fetch(`${process.env.DGATEWAY_API_URL}/v1/payments/collect`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.DGATEWAY_API_KEY!,
    },
    body: JSON.stringify({
      amount,
      currency,
      phone_number: phoneNumber,
      description,
      metadata,
      callback_url: `${process.env.APP_URL}/api/webhooks/dgateway`,
    }),
  });
  const json = await r.json();
  res.status(r.ok ? 200 : r.status).json(json);
});
```

Webhook with HMAC-SHA256 verification:

```ts
import crypto from "node:crypto";

// IMPORTANT: read the raw body BEFORE any JSON parsing
app.post(
  "/api/webhooks/dgateway",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.header("X-DGateway-Signature");
    const expected = crypto
      .createHmac("sha256", process.env.DGATEWAY_WEBHOOK_SECRET!)
      .update(req.body)
      .digest("hex");

    if (
      !signature ||
      !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return res.status(401).send("Invalid signature");
    }

    const event = JSON.parse(req.body.toString());

    // Idempotency: skip duplicate deliveries
    if (await alreadyProcessed(event.reference)) return res.status(200).end();

    switch (event.event) {
      case "transaction.updated":
        await updateOrder(event.reference, event.status, event.provider_ref);
        break;
      case "subscription.payment_succeeded":
        await markSubscriptionPaid(event.reference);
        break;
      case "subscription.past_due":
        await markSubscriptionPastDue(event.reference);
        break;
    }

    res.status(200).end();
  }
);
```

### Testing

DGateway provides deterministic sandbox phone numbers when you use a `dgw_test_*` key:

| Phone number     | Result                |
| ---------------- | --------------------- |
| `256111777111`   | Always succeeds       |
| `256111777222`   | Always fails          |
| `256111777333`   | Times out (expired)   |

Live docs are the source of truth: <https://dgateway.com/docs>

### Hard rules

- **Never** put `DGATEWAY_API_KEY` in `EXPO_PUBLIC_*` or any client-side env var.
- **Always** verify the `X-DGateway-Signature` HMAC on every webhook delivery.
- **Persist** the DGateway `reference` and `provider_ref` against your local order/subscription row — webhooks can be missed or retried.
- **Treat only** `completed`, `failed`, `cancelled`, and `expired` as terminal statuses.

---

## Stripe (one-time & subscriptions)

For card payments, install the Stripe components:

```bash
npx vibekit-native install stripe-pay-button
npx vibekit-native install stripe-subscription-button
```

Wrap your app root with `<StripeProvider publishableKey="pk_test_…">` from `@stripe/stripe-react-native`. Your backend must mint a PaymentIntent (one-time) or Subscription (recurring) and return the client secret. See [docs.stripe.com/payments/accept-a-payment?platform=react-native](https://docs.stripe.com/payments/accept-a-payment?platform=react-native) for the canonical server-side flow.

---

## Design System

Dark-only, minimal, and consistent. Every component uses these tokens:

| Token | Value |
|---|---|
| `background` | `#0A0A0A` |
| `surface` (elevated) | `#121212` |
| `accent` | `#6366F1` (Indigo) |
| `text-primary` | `#FFFFFF` |
| `text-secondary` | `#A1A1AA` |
| `border` | `#27272A` |
| `border-radius` | `12` (default), `8` (small), `16` (large) |

Components are dark-only by design — no light mode, no theme switching, no conditional style branches.

---

## Tech Stack

- **Framework** — [React Native](https://reactnative.dev) + [Expo](https://expo.dev)
- **Styling** — [NativeWind v4](https://www.nativewind.dev) (Tailwind CSS for RN)
- **Icons** — [`@expo/vector-icons`](https://docs.expo.dev/guides/icons/) (Ionicons)
- **Interactions** — React Native `Pressable`
- **Forms** — [`react-hook-form`](https://react-hook-form.com) + [`zod`](https://zod.dev)

---

## Contributing

Contributions are welcome. Open an issue or pull request at [github.com/MUKE-coder/vibekit-native](https://github.com/MUKE-coder/vibekit-native).

---

## License

MIT © [JB (Muke Johnbaptist)](https://github.com/MUKE-coder)
