# VibeKit Native

**The dark-only React Native / Expo component library — install components via CLI, zero boilerplate.**

VibeKit Native is a registry of 29 production-ready components for React Native & Expo. Every component is built with NativeWind v4, dark-themed by default, and installable with a single `npx` command. No config, no provider wrappers, no lengthy setup — just `npx vibekit-native install` and start building.

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

| Component | Category | Description |
|---|---|---|
| `login-form` | Auth | Email & password form with validation |
| `signup-form` | Auth | Full registration form with confirm password |
| `forgot-password` | Auth | Reset password request screen |
| `otp-verify` | Auth | OTP / 2FA code input screen |
| `home-feed` | Home | Vertical scroll feed with cards |
| `home-header` | Home | Top bar with greeting and notifications |
| `search-bar` | Home | Animated search input with filters |
| `categories-scroll` | Home | Horizontal scrollable category chips |
| `featured-grid` | Home | 2-column grid of featured items |
| `product-card` | Commerce | Product card with image, price, rating |
| `product-grid` | Commerce | 2-column scrollable product grid |
| `product-detail` | Commerce | Full product detail with add-to-cart |
| `cart-view` | Commerce | Cart list with quantity controls & total |
| `checkout-form` | Commerce | Billing / shipping address form |
| `order-summary` | Commerce | Order review before purchase |
| `wishlist-button` | Commerce | Heart toggle with animation |
| `review-card` | Commerce | Star rating & review display |
| `chat-bubble` | Chat | Sent / received message bubble |
| `chat-input` | Chat | Text input with send button |
| `chat-list` | Chat | Scrollable conversation list |
| `chat-header` | Chat | Chat screen top bar with avatar & name |
| `profile-header` | Profile | Avatar, name, bio, stats row |
| `profile-settings` | Profile | Settings list with toggles and chevrons |
| `edit-profile` | Profile | Editable avatar, name, bio form |
| `avatar` | Shared | Circular image or initials fallback |
| `button` | Shared | Pressable with loading, variants, icons |
| `input` | Shared | TextInput with label, error, icon support |
| `card` | Shared | Elevated surface with optional image |
| `divider` | Shared | Horizontal line with optional label |
| `bottom-tab` | UI | Animated bottom navigation bar |
| `top-tab` | UI | Horizontal scrollable tab bar |
| `modal` | UI | Bottom-sheet style overlay modal |
| `toast` | UI | Slide-in notification banner |
| `skeleton` | UI | Animated placeholder loading blocks |
| `empty-state` | UI | Illustration + message for empty lists |

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
