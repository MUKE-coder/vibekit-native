# VibeKit Native Component Registry — Reference Guide

> A decision guide for Claude Code. Before building any screen, hook, or layout from scratch, check this file to see if a VibeKit Native component already covers it. Using a registry component saves 60–80% of the tokens and produces battle-tested code that already follows the design system.

**Registry CLI:** `npx vibekit-native install <component>`
**Browse online:** [native.desishub.com/components](https://native.desishub.com/components)
**Source:** [github.com/MUKE-coder/vibekit-native](https://github.com/MUKE-coder/vibekit-native)

---

## How To Use This File

1. When planning a feature, scan the **Quick Decision Matrix** below for a matching component.
2. If one exists — **install it first**, read the installed files, then build on top. Do NOT write from scratch.
3. Copy the exact install command. The CLI auto-installs every native dependency via `npx expo install`.
4. Before installing, check **Registry dependencies** — some components require other components first (e.g., `mobile-money-pay-screen` requires `input`, `button`, `screen-header`, and the `dgateway` lib).
5. Install whole categories at once with: `npx vibekit-native install <category>` (e.g., `install payments` pulls all 7 payments components).

The installed file lands at `src/components/<category>/<name>.tsx`. It's a plain TypeScript file you own and can edit freely — no vendor lock-in.

---

## Quick Decision Matrix

| Need | Component(s) | Install After |
|---|---|---|
| Login / sign up / OTP / forgot password | `auth` (whole category) | `core`, `input`, `button`, `otp-input` |
| Mobile money payment (UGX/KES/TZS/RWF) | `mobile-money-pay-screen` + `payment-status-screen` | `dgateway`, `input`, `button`, `screen-header` |
| Stripe card payment (one-time) | `stripe-pay-button` | `button` (+ `<StripeProvider>` at app root) |
| Stripe subscription / recurring | `stripe-subscription-button` | `button` |
| Manage active subscription | `subscription-manage-screen` | `button`, `badge`, `screen-header`, `dgateway` |
| Product listing / e-commerce | `commerce` (whole category) | `core`, `badge`, `rating`, `avatar` |
| Chat / messaging UI | `chat` (whole category) | `core`, `avatar` |
| Dashboard with stats + charts | `dashboard-shell` + `stat-card` + `chart-line`/`chart-bar`/`chart-pie` | `core` |
| Sortable data table | `data-table` | `core` |
| Bottom tab navigation | `bottom-tabs` | `core` |
| Drawer / hamburger menu | `app-drawer` | `core` |
| Searchable dropdown (>5 options) | `searchable-select` | `core`, `input` |
| Bottom sheet modal | `bottom-sheet` | `core` |
| Toast notifications | `toast` | `core` |
| OTP / verification code input | `otp-input` | `core` |
| Pull-to-refresh list | (use `FlashList` + `RefreshControl` directly) | — |
| Local storage (preferences, cache) | `storage` (lib) | — |
| API calls + caching + offline | `api-client` (lib) | — |
| Loyalty / rewards | `points-card`, `coupon-card` | `core` |
| Hero banner (carousel) | `hero-banner` | `core` |
| Category circles strip | `category-circles` | `core` |
| Filter bottom sheet | `filter-sheet` + `filter-sort-bar` | `core` |
| Empty state placeholder | `empty-state` | `core` |
| Skeleton loading shapes | `skeleton` | `core` |

---

## Common Composition Patterns

### Full auth flow (sign-in + sign-up + forgot + OTP + complete profile)

```bash
npx vibekit-native install auth
```

Installs all 6 auth screens + their deps. Wire them to Better Auth endpoints (`/api/auth/sign-in/email`, `/api/auth/sign-up/email`, `/api/auth/forget-password`, etc.). See `master_prompt.md` → Better Auth Patterns for the canonical wiring.

### Full e-commerce checkout (browse → cart → pay)

```bash
npx vibekit-native install commerce payments
```

`product-card` → `cart-item` → `checkout-form` → `mobile-money-pay-screen` (or `stripe-pay-button`) → `payment-status-screen`. The `checkout-form` accepts an `OrderSummary` slot via `footerContent`.

### Dashboard with stats + charts + table

```bash
npx vibekit-native install dashboard
```

`dashboard-shell` wraps the screen, `stat-card` for KPIs, `chart-line`/`chart-bar`/`chart-pie` for visuals, `data-table` for tabular records.

### Chat screen end-to-end

```bash
npx vibekit-native install chat
```

`chat-header` (top) → `chat-list` (FlashList) → `chat-input` (bottom). Provide an array of `ChatMessage` objects; the components render the rest.

---

## 1. UI Primitives (16)

The foundation layer — buttons, inputs, cards, badges, etc. Every other category depends on most of these. Install `core` first (auto-installed as a dep) — it ships `lib/theme.ts`, `lib/utils.ts` (`cn` helper), and `lib/format-currency.ts`.

| Component | Use case | Native deps |
|---|---|---|
| `button` | All pressable actions (primary, secondary, ghost, destructive, text) | `@expo/vector-icons`, `clsx`, `tailwind-merge` |
| `input` | All text fields (standard, password, search, currency) | `@expo/vector-icons` |
| `badge` | Status pills, count indicators | — |
| `avatar` | User avatars with image or initials fallback | `expo-image` |
| `card` | Generic elevated container | — |
| `bottom-sheet` | Modal sheets sliding from bottom | — |
| `empty-state` | Lists with no results | `@expo/vector-icons` |
| `loading-spinner` | Inline / full-screen loaders | — |
| `toast` | Non-blocking notifications | `@expo/vector-icons` |
| `rating` | Interactive star ratings with half-star precision | `@expo/vector-icons` |
| `custom-radio` | Styled radio group (replaces ugly native radios) | `@expo/vector-icons` |
| `divider` | Section separators with optional label | — |
| `skeleton` | Pulsing placeholder shapes | — |
| `searchable-select` | Filter-as-you-type picker for >5 options (replaces native `<Picker>`) | `@expo/vector-icons` |
| `countdown-timer` | Days/hours/min/sec countdown | — |
| `otp-input` | 6-digit code with auto-advance | — |

**Install individually:** `npx vibekit-native install button`
**Install all:** `npx vibekit-native install ui`

---

## 2. Authentication (6 screens)

Full auth flow with `react-hook-form` + `zod` validation. Pair with **Better Auth + Expo plugin** for the backend.

| Component | Use case | Backend endpoint (Better Auth) |
|---|---|---|
| `login-screen` | Email + password sign-in + social buttons | `POST /api/auth/sign-in/email`, `/api/auth/sign-in/social` |
| `register-screen` | Name + email + password sign-up | `POST /api/auth/sign-up/email` |
| `verify-otp-screen` | 6-digit code from email or SMS | `POST /api/auth/email-otp/verify-otp` |
| `forgot-password-screen` | Email input → reset link | `POST /api/auth/forget-password` |
| `new-password-screen` | New password with strength meter | `POST /api/auth/reset-password` |
| `complete-profile-screen` | Avatar + username + phone + DOB | Your custom `POST /api/users/me` route |

**Native deps:** `@expo/vector-icons`, `expo-router`, `react-native-safe-area-context`, `react-hook-form`, `@hookform/resolvers`, `zod`, `expo-image-picker` (complete-profile only)

**Registry deps:** `input`, `button`, `otp-input` (verify-otp), `custom-radio` (complete-profile)

**Install all:** `npx vibekit-native install auth`

> **Prerequisites:** Better Auth set up with the Expo plugin. See `master_prompt.md` → Better Auth Patterns.

---

## 3. Payments (7) — DGateway + Stripe

### DGateway (East Africa mobile money — UGX, KES, TZS, RWF)

DGateway routes mobile money through Iotec (UGX) and Relworx (KES/TZS/RWF) behind one REST API. The mobile components NEVER call DGateway directly — they call **your** backend API route, which proxies with the secret key. See `master_prompt.md` → DGateway Pattern.

| Component | Use case |
|---|---|
| `dgateway` (lib) | Typed client for your backend's `/api/checkout/*` routes |
| `use-payment-status` | Hook: 5s polling, 5-minute ceiling, `AppState` pause |
| `mobile-money-pay-screen` | Amount + phone + currency switcher → starts STK push |
| `payment-status-screen` | "Check your phone" UX while polling |
| `subscription-plan-card` | Selectable plan tile (trial badge, features, price) |
| `subscription-manage-screen` | Plan summary + state badge + cancel flow |

### Stripe (global cards, Apple Pay, Google Pay)

For non-EA markets or USD pricing. Uses `@stripe/stripe-react-native`'s **Payment Sheet** flow.

| Component | Use case |
|---|---|
| `stripe-pay-button` | One-time PaymentSheet — your backend mints a PaymentIntent |
| `stripe-subscription-button` | Subscription PaymentSheet — handles both trial (SetupIntent) and charge-now (PaymentIntent) |

**Native deps:** `@expo/vector-icons`, `react-native-safe-area-context`, `react-hook-form`, `@hookform/resolvers`, `zod`, `expo-constants`, `@stripe/stripe-react-native` (Stripe only)

**Install all:** `npx vibekit-native install payments`

> **Prerequisites:**
> - DGateway: server-side proxy + webhook handler with HMAC verification. See [DGateway docs](https://dgateway.com/docs) and `README.md` → DGateway section.
> - Stripe: `<StripeProvider publishableKey="pk_test_…">` at app root + backend route to mint `PaymentIntent` / subscriptions.

---

## 4. Commerce (10)

Full e-commerce stack — product browsing, cart, checkout, orders, reviews.

| Component | Use case |
|---|---|
| `product-card` | Tile in product lists (image, price, rating, wishlist, add-to-cart) |
| `product-header` | Detail page header (gallery, size/color picker, sticky add-to-cart) |
| `product-grid` | (use `FlashList` with `numColumns={2}` + `product-card`) |
| `cart-item` | Cart line with quantity stepper + remove |
| `price-display` | Currency formatting, compare-at strikethrough, discount badge |
| `order-card` | Order summary in lists |
| `order-summary` | Line items + subtotal/shipping/tax/discount/total |
| `order-timeline` | Vertical status timeline |
| `wishlist-button` | Animated heart toggle (floating variant for image overlays) |
| `review-card` | Customer review (verified badge, half-star rating, body, helpful) |
| `checkout-form` | Contact + shipping + payment-method picker (Zod-validated) |

**Native deps:** `expo-image`, `@expo/vector-icons`, `react-native-safe-area-context`, `react-hook-form`, `@hookform/resolvers`, `zod`

**Install all:** `npx vibekit-native install commerce`

---

## 5. Chat (4)

Drop-in chat UI. Wire to your messaging backend (Pusher, Ably, Supabase Realtime, or polling).

| Component | Use case |
|---|---|
| `chat-header` | Avatar + name + online/typing status + back/call/video/more |
| `chat-list` | Inverted `FlatList` with pull-to-refresh + pagination |
| `chat-bubble` | Own / other message bubble |
| `chat-input` | Multi-line composer + attach + send + `KeyboardAvoidingView` |

**Install all:** `npx vibekit-native install chat`

---

## 6. Dashboard (6)

KPI cards, charts, tables, and a scroll shell — for admin / analytics / overview screens.

| Component | Use case |
|---|---|
| `dashboard-shell` | Header (eyebrow + title + actions) + greeting + stats row + pull-to-refresh |
| `stat-card` | KPI with label, value, unit, delta %, optional sparkline |
| `data-table` | Horizontally scrollable sortable table with custom cell renderers |
| `chart-line` | Smooth area-fill line chart + comparison series + pointer tooltip |
| `chart-bar` | Vertical bars, gradient fill, value labels |
| `chart-pie` | Donut or pie + center label + auto-percentage legend |

**Native deps:** `react-native-gifted-charts` (charts), `@expo/vector-icons`, `react-native-safe-area-context`

**Install all:** `npx vibekit-native install dashboard`

---

## 7. Navigation (2)

Use these only if `expo-router`'s built-in `<Tabs>` and `<Drawer>` don't give you enough customization.

| Component | Use case |
|---|---|
| `bottom-tabs` | Custom tab bar with badges, icon swap, safe-area inset |
| `app-drawer` | Animated left-edge drawer with header (avatar + name) + items + badges |

**Install all:** `npx vibekit-native install nav`

---

## 8. Home (4)

App-home / landing-screen sections.

| Component | Use case |
|---|---|
| `hero-banner` | Full-width carousel (autoplay, gradient, action buttons) |
| `section-header` | "Title + see all →" row |
| `category-circles` | Horizontal scrollable circle icons + labels |
| `flash-sale-timer` | Section header with live countdown + preview strip |

**Install all:** `npx vibekit-native install home`

---

## 9. Shared (4)

Reusable bits that show up across many screens.

| Component | Use case |
|---|---|
| `screen-header` | Top bar with back button + title + right actions |
| `search-bar` | Rounded search input with clear button |
| `filter-sort-bar` | Horizontal toolbar with filter/sort buttons + active count |
| `filter-sheet` | Bottom sheet filter panel (multi-select + clear all + apply) |

**Install all:** `npx vibekit-native install shared`

---

## 10. Profile (2)

| Component | Use case |
|---|---|
| `points-card` | Loyalty points balance + tier progress |
| `coupon-card` | Discount code with left accent bar + expiry + apply |

**Install all:** `npx vibekit-native install profile`

---

## 11. Library / Infrastructure (4)

These don't render UI — they're typed helpers you import. Install once per project.

### `core` (auto-installed by every other component)

Ships `lib/theme.ts` (colors, spacing, typography tokens), `lib/utils.ts` (`cn` helper), `lib/format-currency.ts`. Every other registry component depends on this.

### `api-client`

TanStack Query provider with mobile-first defaults — retries with exponential backoff, refetch on app foreground (via `AppState`), online/offline tracking via `expo-network`.

```tsx
import { ApiProvider } from '@/components/lib/api-client';

export default function RootLayout() {
  return (
    <ApiProvider>
      <Slot />
    </ApiProvider>
  );
}
```

**Native deps:** `@tanstack/react-query`, `expo-network`

### `dgateway`

Typed client for your backend's DGateway proxy. Exposes `dgateway.startPayment(...)`, `getStatus(...)`, `startSubscription(...)`, `cancelSubscription(...)`. Reads backend URL from `app.json` `extra.apiUrl` or `EXPO_PUBLIC_API_URL`.

**Native deps:** `expo-constants`

### `storage`

MMKV-backed key-value storage. ~30× faster than `AsyncStorage`, runs on the JS thread without bridge crossings, supports encryption.

```ts
import { storage } from '@/components/lib/storage';

storage.setObject('user', { id: 1, name: 'Jane' });
const user = storage.getObject<User>('user');
```

**Native deps:** `react-native-mmkv`

> **For sensitive data (auth tokens, biometric secrets), use `expo-secure-store` directly**, not `storage`. Better Auth's Expo plugin already wires `expo-secure-store` for session storage.

---

## What This Registry Does NOT Cover

If you need any of these, build them — but follow the patterns in `master_prompt.md`:

- **Custom business logic screens** (your dashboard, your settings, your specific workflows)
- **Custom forms with non-standard fields** (file pickers, date ranges, map markers — Composite from `input` + `button` + `bottom-sheet`)
- **Realtime sync layer** (subscribe to WebSocket / Pusher / Supabase Realtime — wire to `chat-list` etc.)
- **Maps / geolocation** (use `react-native-maps` directly)
- **Camera / barcode scanner** (use `expo-camera` directly)
- **Audio / video** (use `expo-av`)

When you build a screen from scratch, **use the same patterns** as the registry components — `react-hook-form` + Zod for forms, `theme.ts` colors via NativeWind classes, `cn` for class merging, `Pressable` with accessibility props.

---

## Versioning + Upgrades

The registry is **install-time only** — once a component lands in your project, it's yours. The CLI never overwrites your edits.

To get the latest version of a component, delete the local file and re-install:

```bash
rm src/components/auth/login-screen.tsx
npx vibekit-native install login-screen
```

Diff your local copy against the new one before committing.

---

## Common Mistakes To Avoid

- ❌ Building a login screen from scratch when `login-screen` already exists.
- ❌ Wiring `AsyncStorage` for preferences — use `storage` (MMKV) instead.
- ❌ Calling DGateway's API directly from the mobile app — always proxy via your backend route. The API key NEVER ships to the device.
- ❌ Writing a custom `<Picker>` for >5 options — use `searchable-select`.
- ❌ Building a custom toast — use `toast`.
- ❌ Using `FlatList` for >100 items — use `@shopify/flash-list` (already a registry pattern).
- ❌ Re-implementing a TanStack Query provider — install `api-client`.

---

## Reporting Bugs / Requesting Components

Open an issue at [github.com/MUKE-coder/vibekit-native](https://github.com/MUKE-coder/vibekit-native/issues) with:
- What you tried to build
- Which component(s) you used
- What didn't work (with screenshots if visual)

Component requests are welcome — describe the use case, point at any references, and JB (the maintainer) will triage.
