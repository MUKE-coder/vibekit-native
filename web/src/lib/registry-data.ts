export type RegistryFileType =
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:page"
  | "registry:block"
  | "registry:ui";

export type RegistryComponentType =
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:page"
  | "registry:block"
  | "registry:ui";

export interface RegistryFile {
  path: string;
  type: RegistryFileType;
  content?: string;
  sourcePath?: string;
  target?: string;
}

export interface RegistryComponent {
  $schema?: string;
  name: string;
  type: RegistryComponentType;
  title?: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
}

export interface RegistryIndexEntry {
  name: string;
  type: RegistryComponentType;
  description: string;
  files: string[];
}

const registryComponents: RegistryComponent[] = [
  // ─── UI Primitives ───────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "button",
    type: "registry:component",
    title: "Button",
    description: "Dark-only pressable button with primary, secondary, ghost, destructive, and text variants.",
    dependencies: ["@expo/vector-icons", "clsx", "tailwind-merge"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/button.tsx",
        target: "components/ui/button.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "input",
    type: "registry:component",
    title: "Input",
    description: "Dark-only text input with label, error, leading icon, and password visibility toggle.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "ui/input.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/input.tsx",
        target: "components/ui/input.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "badge",
    type: "registry:component",
    title: "Badge",
    description: "Compact status badge with solid, outline, and subtle variants for tags, counts, and labels.",
    dependencies: [],
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/badge.tsx",
        target: "components/ui/badge.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "avatar",
    type: "registry:component",
    title: "Avatar",
    description: "Circular avatar with image, fallback initials, and online status dot.",
    dependencies: ["expo-image"],
    files: [
      {
        path: "ui/avatar.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/avatar.tsx",
        target: "components/ui/avatar.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "card",
    type: "registry:component",
    title: "Card",
    description: "Elevated dark card container with optional header, body, and footer sections.",
    dependencies: [],
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/card.tsx",
        target: "components/ui/card.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "bottom-sheet",
    type: "registry:component",
    title: "Bottom Sheet",
    description: "Modal bottom sheet with backdrop, drag handle, snap points, and smooth open/close animation.",
    dependencies: [],
    files: [
      {
        path: "ui/bottom-sheet.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/bottom-sheet.tsx",
        target: "components/ui/bottom-sheet.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "empty-state",
    type: "registry:component",
    title: "Empty State",
    description: "Empty state with icon, title, message, and optional action button for zero-data screens.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "ui/empty-state.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/empty-state.tsx",
        target: "components/ui/empty-state.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "loading-spinner",
    type: "registry:component",
    title: "Loading Spinner",
    description: "Full-screen or inline loading spinner with ActivityIndicator and optional overlay message.",
    dependencies: [],
    files: [
      {
        path: "ui/loading-spinner.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/loading-spinner.tsx",
        target: "components/ui/loading-spinner.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "toast",
    type: "registry:component",
    title: "Toast",
    description: "Animated toast notifications with success, error, warning, and info variants.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "ui/toast.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/toast.tsx",
        target: "components/ui/toast.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "rating",
    type: "registry:component",
    title: "Rating",
    description: "Interactive star rating with half-star precision, touch selection, and display-only mode.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "ui/rating.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/rating.tsx",
        target: "components/ui/rating.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "custom-radio",
    type: "registry:component",
    title: "Custom Radio",
    description: "Styled radio button group with animated selection indicator and vertical/horizontal layout.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "ui/custom-radio.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/custom-radio.tsx",
        target: "components/ui/custom-radio.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "divider",
    type: "registry:component",
    title: "Divider",
    description: "Thin horizontal or vertical divider line with optional label inset.",
    dependencies: [],
    files: [
      {
        path: "ui/divider.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/divider.tsx",
        target: "components/ui/divider.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "skeleton",
    type: "registry:component",
    title: "Skeleton",
    description: "Pulsing placeholder shapes for card, text, avatar, and custom layouts during loading.",
    dependencies: [],
    files: [
      {
        path: "ui/skeleton.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/skeleton.tsx",
        target: "components/ui/skeleton.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "searchable-select",
    type: "registry:component",
    title: "Searchable Select",
    description: "Modal searchable picker with type-to-filter, label display, and multi-select support.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "ui/searchable-select.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/searchable-select.tsx",
        target: "components/ui/searchable-select.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "countdown-timer",
    type: "registry:component",
    title: "Countdown Timer",
    description: "Countdown timer displaying days, hours, minutes, and seconds with colon-separated format.",
    dependencies: [],
    files: [
      {
        path: "ui/countdown-timer.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/countdown-timer.tsx",
        target: "components/ui/countdown-timer.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "otp-input",
    type: "registry:component",
    title: "OTP Input",
    description: "One-time password input with individual digit boxes, auto-advance, and paste support.",
    dependencies: [],
    files: [
      {
        path: "ui/otp-input.tsx",
        type: "registry:component",
        sourcePath: "packages/components/ui/otp-input.tsx",
        target: "components/ui/otp-input.tsx",
      },
    ],
  },

  // ─── Commerce ────────────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "product-card",
    type: "registry:component",
    title: "Product Card",
    description: "Product card with optimized image, price, rating, badge overlay, and wishlist/add-to-cart actions.",
    dependencies: ["expo-image", "@expo/vector-icons"],
    registryDependencies: ["badge"],
    files: [
      {
        path: "commerce/product-card.tsx",
        type: "registry:component",
        sourcePath: "packages/components/commerce/product-card.tsx",
        target: "components/commerce/product-card.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "cart-item",
    type: "registry:component",
    title: "Cart Item",
    description: "Cart line item with image, title, quantity stepper, unit price, total, and remove action.",
    dependencies: ["expo-image", "@expo/vector-icons"],
    files: [
      {
        path: "commerce/cart-item.tsx",
        type: "registry:component",
        sourcePath: "packages/components/commerce/cart-item.tsx",
        target: "components/commerce/cart-item.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "price-display",
    type: "registry:component",
    title: "Price Display",
    description: "Price display with currency formatting, compare-at strikethrough, discount percentage badge, and configurable size.",
    dependencies: [],
    files: [
      {
        path: "commerce/price-display.tsx",
        type: "registry:component",
        sourcePath: "packages/components/commerce/price-display.tsx",
        target: "components/commerce/price-display.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "order-card",
    type: "registry:component",
    title: "Order Card",
    description: "Order summary card with ID, date, status badge, item previews, total, and reorder action.",
    dependencies: ["expo-image", "@expo/vector-icons"],
    files: [
      {
        path: "commerce/order-card.tsx",
        type: "registry:component",
        sourcePath: "packages/components/commerce/order-card.tsx",
        target: "components/commerce/order-card.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "order-timeline",
    type: "registry:component",
    title: "Order Timeline",
    description: "Vertical timeline showing order status progression with icons, dates, and completion states.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "commerce/order-timeline.tsx",
        type: "registry:component",
        sourcePath: "packages/components/commerce/order-timeline.tsx",
        target: "components/commerce/order-timeline.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "product-header",
    type: "registry:component",
    title: "Product Header",
    description: "Full product detail header with image gallery, color/size selector, wishlist, and sticky add-to-cart.",
    dependencies: ["expo-image", "@expo/vector-icons"],
    registryDependencies: ["badge", "rating", "divider"],
    files: [
      {
        path: "commerce/product-header.tsx",
        type: "registry:component",
        sourcePath: "packages/components/commerce/product-header.tsx",
        target: "components/commerce/product-header.tsx",
      },
    ],
  },

  // ─── Auth ─────────────────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "login-screen",
    type: "registry:component",
    title: "Login Screen",
    description: "Login screen with email/password form, validation, social buttons, and navigation links.",
    dependencies: [
      "@expo/vector-icons",
      "expo-router",
      "react-native-safe-area-context",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
    registryDependencies: ["input", "button"],
    files: [
      {
        path: "auth/login-screen.tsx",
        type: "registry:component",
        sourcePath: "packages/components/auth/login-screen.tsx",
        target: "components/auth/login-screen.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "register-screen",
    type: "registry:component",
    title: "Register Screen",
    description: "Registration screen with name, email, password fields, zod validation, and social sign-up options.",
    dependencies: [
      "@expo/vector-icons",
      "expo-router",
      "react-native-safe-area-context",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
    registryDependencies: ["input", "button"],
    files: [
      {
        path: "auth/register-screen.tsx",
        type: "registry:component",
        sourcePath: "packages/components/auth/register-screen.tsx",
        target: "components/auth/register-screen.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "verify-otp-screen",
    type: "registry:component",
    title: "Verify OTP Screen",
    description: "OTP verification screen with 6-digit code input, resend timer, and email display.",
    dependencies: ["@expo/vector-icons"],
    registryDependencies: ["otp-input"],
    files: [
      {
        path: "auth/verify-otp-screen.tsx",
        type: "registry:component",
        sourcePath: "packages/components/auth/verify-otp-screen.tsx",
        target: "components/auth/verify-otp-screen.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "forgot-password-screen",
    type: "registry:component",
    title: "Forgot Password Screen",
    description: "Forgot password screen with email input, validation, and submit action for reset link.",
    dependencies: [
      "@expo/vector-icons",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
    registryDependencies: ["input", "button"],
    files: [
      {
        path: "auth/forgot-password-screen.tsx",
        type: "registry:component",
        sourcePath: "packages/components/auth/forgot-password-screen.tsx",
        target: "components/auth/forgot-password-screen.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "new-password-screen",
    type: "registry:component",
    title: "New Password Screen",
    description: "New password creation screen with strength validation, confirm password, and submit.",
    dependencies: [
      "@expo/vector-icons",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
    registryDependencies: ["input", "button"],
    files: [
      {
        path: "auth/new-password-screen.tsx",
        type: "registry:component",
        sourcePath: "packages/components/auth/new-password-screen.tsx",
        target: "components/auth/new-password-screen.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "complete-profile-screen",
    type: "registry:component",
    title: "Complete Profile Screen",
    description: "Post-registration profile completion with avatar upload, username, phone, and date of birth fields.",
    dependencies: [
      "@expo/vector-icons",
      "expo-image-picker",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
    registryDependencies: ["input", "custom-radio"],
    files: [
      {
        path: "auth/complete-profile-screen.tsx",
        type: "registry:component",
        sourcePath: "packages/components/auth/complete-profile-screen.tsx",
        target: "components/auth/complete-profile-screen.tsx",
      },
    ],
  },

  // ─── Home ─────────────────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "hero-banner",
    type: "registry:component",
    title: "Hero Banner",
    description: "Full-width hero banner with autoplay carousel, gradient overlays, action buttons, and dot indicators.",
    dependencies: ["expo-image", "@expo/vector-icons"],
    files: [
      {
        path: "home/hero-banner.tsx",
        type: "registry:component",
        sourcePath: "packages/components/home/hero-banner.tsx",
        target: "components/home/hero-banner.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "section-header",
    type: "registry:component",
    title: "Section Header",
    description: "Section header with title, optional subtitle, and see-all action link.",
    dependencies: [],
    files: [
      {
        path: "home/section-header.tsx",
        type: "registry:component",
        sourcePath: "packages/components/home/section-header.tsx",
        target: "components/home/section-header.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "category-circles",
    type: "registry:component",
    title: "Category Circles",
    description: "Horizontal scrollable row of circular category icons with labels.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "home/category-circles.tsx",
        type: "registry:component",
        sourcePath: "packages/components/home/category-circles.tsx",
        target: "components/home/category-circles.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "flash-sale-timer",
    type: "registry:component",
    title: "Flash Sale Timer",
    description: "Flash sale section header with live countdown timer and product preview strip.",
    dependencies: ["expo-image"],
    registryDependencies: ["countdown-timer"],
    files: [
      {
        path: "home/flash-sale-timer.tsx",
        type: "registry:component",
        sourcePath: "packages/components/home/flash-sale-timer.tsx",
        target: "components/home/flash-sale-timer.tsx",
      },
    ],
  },

  // ─── Shared ───────────────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "screen-header",
    type: "registry:component",
    title: "Screen Header",
    description: "App screen header with back button, title, and optional right action buttons.",
    dependencies: [
      "@expo/vector-icons",
      "expo-router",
      "react-native-safe-area-context",
    ],
    files: [
      {
        path: "shared/screen-header.tsx",
        type: "registry:component",
        sourcePath: "packages/components/shared/screen-header.tsx",
        target: "components/shared/screen-header.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "filter-sheet",
    type: "registry:component",
    title: "Filter Sheet",
    description: "Bottom sheet filter panel with multi-select options, clear all, and apply actions.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "shared/filter-sheet.tsx",
        type: "registry:component",
        sourcePath: "packages/components/shared/filter-sheet.tsx",
        target: "components/shared/filter-sheet.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "filter-sort-bar",
    type: "registry:component",
    title: "Filter & Sort Bar",
    description: "Horizontal toolbar with filter and sort buttons, active filter count badge, and modal pickers.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "shared/filter-sort-bar.tsx",
        type: "registry:component",
        sourcePath: "packages/components/shared/filter-sort-bar.tsx",
        target: "components/shared/filter-sort-bar.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "search-bar",
    type: "registry:component",
    title: "Search Bar",
    description: "Rounded search input with clear button, optional camera/scanner icon, and submit handler.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "shared/search-bar.tsx",
        type: "registry:component",
        sourcePath: "packages/components/shared/search-bar.tsx",
        target: "components/shared/search-bar.tsx",
      },
    ],
  },

  // ─── Chat ─────────────────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "chat-bubble",
    type: "registry:component",
    title: "Chat Bubble",
    description: "Chat message bubble with own/other alignment, text, time, and read status.",
    dependencies: [],
    files: [
      {
        path: "chat/chat-bubble.tsx",
        type: "registry:component",
        sourcePath: "packages/components/chat/chat-bubble.tsx",
        target: "components/chat/chat-bubble.tsx",
      },
    ],
  },

  // ─── Profile ──────────────────────────────────
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "points-card",
    type: "registry:component",
    title: "Points Card",
    description: "Loyalty points card with balance, tier progress bar, tier name, and history action.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "profile/points-card.tsx",
        type: "registry:component",
        sourcePath: "packages/components/profile/points-card.tsx",
        target: "components/profile/points-card.tsx",
      },
    ],
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "coupon-card",
    type: "registry:component",
    title: "Coupon / Voucher Card",
    description: "Discount coupon card with left accent bar, code, description, expiry, and apply action.",
    dependencies: ["@expo/vector-icons"],
    files: [
      {
        path: "profile/coupon-card.tsx",
        type: "registry:component",
        sourcePath: "packages/components/profile/coupon-card.tsx",
        target: "components/profile/coupon-card.tsx",
      },
    ],
  },
];

export function getRegistryComponent(slug: string): RegistryComponent | undefined {
  return registryComponents.find((c) => c.name === slug);
}

export function getRegistryIndex(): RegistryIndexEntry[] {
  return registryComponents.map(({ name, type, description, files }) => ({
    name,
    type,
    description,
    files: files.map((f) => f.path),
  }));
}

export function getAllRegistrySlugs(): string[] {
  return registryComponents.map((c) => c.name);
}
