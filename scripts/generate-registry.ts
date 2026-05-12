import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const COMPONENT_META: Record<string, {
  category: string;
  description: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
}> = {
  // UI
  'ui/button.tsx': {
    category: 'ui',
    description: 'Dark-only pressable button with primary/secondary/ghost/destructive/text variants. Built-in haptic feedback on press (configurable via the haptic prop).',
    dependencies: ['@expo/vector-icons', 'expo-haptics', 'clsx', 'tailwind-merge'],
  },
  'ui/input.tsx': {
    category: 'ui',
    description: 'Dark-only text input with label, error, leading icon, and password visibility toggle.',
    dependencies: ['@expo/vector-icons'],
  },
  'ui/badge.tsx': { category: 'ui', description: 'Compact status badge with solid, outline, and subtle variants.' },
  'ui/avatar.tsx': { category: 'ui', description: 'Circular avatar with image, fallback initials, and online status dot.', dependencies: ['expo-image'] },
  'ui/card.tsx': { category: 'ui', description: 'Elevated dark card container with optional header, body, and footer sections.' },
  'ui/bottom-sheet.tsx': { category: 'ui', description: 'Modal bottom sheet with backdrop, drag handle, snap points, and smooth animation.' },
  'ui/empty-state.tsx': { category: 'ui', description: 'Empty state with icon, title, message, and optional action button.', dependencies: ['@expo/vector-icons'] },
  'ui/loading-spinner.tsx': { category: 'ui', description: 'Full-screen or inline loading spinner with ActivityIndicator.' },
  'ui/toast.tsx': {
    category: 'ui',
    description: 'Reanimated toast notifications with success, error, warning, info variants — runs on UI thread, respects reduced-motion.',
    dependencies: ['@expo/vector-icons', 'react-native-reanimated'],
  },
  'ui/rating.tsx': { category: 'ui', description: 'Interactive star rating with half-star precision and touch selection.', dependencies: ['@expo/vector-icons'] },
  'ui/custom-radio.tsx': { category: 'ui', description: 'Styled radio button group with animated selection indicator.', dependencies: ['@expo/vector-icons'] },
  'ui/divider.tsx': { category: 'ui', description: 'Thin horizontal or vertical divider line with optional label inset.' },
  'ui/skeleton.tsx': {
    category: 'ui',
    description: 'Pulsing placeholder shapes (Reanimated, UI-thread, reduced-motion-aware) for card, text, avatar, and custom layouts.',
    dependencies: ['react-native-reanimated'],
  },
  'ui/searchable-select.tsx': {
    category: 'ui',
    description: 'Modal searchable picker with type-to-filter (FlashList-backed for fast scroll through long option lists).',
    dependencies: ['@expo/vector-icons', '@shopify/flash-list'],
  },
  'ui/countdown-timer.tsx': { category: 'ui', description: 'Countdown timer with days, hours, minutes, seconds display.' },
  'ui/otp-input.tsx': { category: 'ui', description: 'One-time password input with individual digit boxes and auto-advance.' },

  // Commerce
  'commerce/product-card.tsx': {
    category: 'commerce',
    description: 'Product card with image, price, rating, badge overlay, wishlist, and add-to-cart.',
    dependencies: ['expo-image', '@expo/vector-icons'],
    registryDependencies: ['badge'],
  },
  'commerce/cart-item.tsx': {
    category: 'commerce',
    description: 'Cart line item with image, title, quantity stepper, price, total, and remove.',
    dependencies: ['expo-image', '@expo/vector-icons'],
  },
  'commerce/price-display.tsx': { category: 'commerce', description: 'Price display with currency formatting, compare-at strikethrough, and discount badge.' },
  'commerce/order-card.tsx': {
    category: 'commerce',
    description: 'Order summary card with ID, date, status badge, item previews, total, and reorder.',
    dependencies: ['expo-image', '@expo/vector-icons'],
  },
  'commerce/order-timeline.tsx': { category: 'commerce', description: 'Vertical timeline showing order status progression with icons and dates.', dependencies: ['@expo/vector-icons'] },
  'commerce/product-header.tsx': {
    category: 'commerce',
    description: 'Product detail header with image gallery, color/size selector, wishlist, and sticky add-to-cart.',
    dependencies: ['expo-image', '@expo/vector-icons'],
    registryDependencies: ['badge', 'rating', 'divider'],
  },
  'commerce/wishlist-button.tsx': {
    category: 'commerce',
    description: 'Animated heart toggle (Reanimated bounce + haptic selection) for wishlists — floating variant for over-image overlay, three sizes, full a11y state.',
    dependencies: ['@expo/vector-icons', 'react-native-reanimated', 'expo-haptics'],
  },
  'commerce/review-card.tsx': {
    category: 'commerce',
    description: 'Customer review card with avatar, verified badge, half-star rating, title/body, and helpful CTA.',
    dependencies: ['@expo/vector-icons'],
    registryDependencies: ['avatar'],
  },
  'commerce/order-summary.tsx': {
    category: 'commerce',
    description: 'Line items + subtotal / shipping / tax / discount breakdown and grand total. Drop into cart, checkout, or order confirmation.',
    dependencies: ['expo-image'],
  },
  'commerce/checkout-form.tsx': {
    category: 'commerce',
    description: 'Full checkout flow — contact + shipping address + payment method picker (mobile money / card / COD). Zod-validated.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'button', 'screen-header'],
  },

  // Auth
  'auth/login-screen.tsx': {
    category: 'auth',
    description: 'Login screen with email/password form, validation, social buttons, and navigation links.',
    dependencies: ['@expo/vector-icons', 'expo-router', 'react-native-safe-area-context', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'button'],
  },
  'auth/register-screen.tsx': {
    category: 'auth',
    description: 'Registration screen with name, email, password fields, zod validation, and social sign-up.',
    dependencies: ['@expo/vector-icons', 'expo-router', 'react-native-safe-area-context', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'button'],
  },
  'auth/verify-otp-screen.tsx': {
    category: 'auth',
    description: 'OTP verification screen with 6-digit code input, resend timer, and email display.',
    dependencies: ['@expo/vector-icons'],
    registryDependencies: ['otp-input'],
  },
  'auth/forgot-password-screen.tsx': {
    category: 'auth',
    description: 'Forgot password screen with email input, validation, and submit action.',
    dependencies: ['@expo/vector-icons', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'button'],
  },
  'auth/new-password-screen.tsx': {
    category: 'auth',
    description: 'New password creation screen with strength validation, confirm password, and submit.',
    dependencies: ['@expo/vector-icons', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'button'],
  },
  'auth/complete-profile-screen.tsx': {
    category: 'auth',
    description: 'Profile completion with avatar upload, username, phone, and date of birth fields.',
    dependencies: ['@expo/vector-icons', 'expo-image-picker', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'custom-radio'],
  },

  // Home
  'home/hero-banner.tsx': {
    category: 'home',
    description: 'Full-width hero banner with autoplay carousel, gradient overlays, action buttons, and dots.',
    dependencies: ['expo-image', '@expo/vector-icons'],
  },
  'home/section-header.tsx': { category: 'home', description: 'Section header with title, optional subtitle, and see-all action link.' },
  'home/category-circles.tsx': { category: 'home', description: 'Horizontal scrollable row of circular category icons with labels.', dependencies: ['@expo/vector-icons'] },
  'home/flash-sale-timer.tsx': {
    category: 'home',
    description: 'Flash sale section header with live countdown timer and product preview strip.',
    dependencies: ['expo-image'],
    registryDependencies: ['countdown-timer'],
  },

  // Shared
  'shared/screen-header.tsx': {
    category: 'shared',
    description: 'App screen header with back button, title, and optional right action buttons.',
    dependencies: ['@expo/vector-icons', 'expo-router', 'react-native-safe-area-context'],
  },
  'shared/filter-sheet.tsx': { category: 'shared', description: 'Bottom sheet filter panel with multi-select options, clear all, and apply.', dependencies: ['@expo/vector-icons'] },
  'shared/filter-sort-bar.tsx': { category: 'shared', description: 'Horizontal toolbar with filter/sort buttons and active filter count badge.', dependencies: ['@expo/vector-icons'] },
  'shared/search-bar.tsx': { category: 'shared', description: 'Rounded search input with clear button, optional camera icon, and submit handler.', dependencies: ['@expo/vector-icons'] },

  // Chat
  'chat/chat-bubble.tsx': { category: 'chat', description: 'Chat message bubble with own/other alignment, text, time, and read status.' },
  'chat/chat-input.tsx': {
    category: 'chat',
    description: 'Chat message composer with multiline input, attach button, send button, and KeyboardAvoidingView.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context'],
  },
  'chat/chat-list.tsx': {
    category: 'chat',
    description: 'Inverted FlashList of chat messages with pull-to-refresh, pagination, recycled rows (different recycling pool for own vs other bubbles), and empty state.',
    dependencies: ['@shopify/flash-list'],
    registryDependencies: ['chat-bubble'],
  },
  'chat/chat-header.tsx': {
    category: 'chat',
    description: 'Chat screen header with avatar, name, online/typing status, back, call, video, and more actions.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context'],
    registryDependencies: ['avatar'],
  },

  // Profile
  'profile/points-card.tsx': { category: 'profile', description: 'Loyalty points card with balance, tier progress bar, and history action.', dependencies: ['@expo/vector-icons'] },
  'profile/coupon-card.tsx': { category: 'profile', description: 'Discount coupon card with left accent bar, code, description, expiry, and apply.', dependencies: ['@expo/vector-icons'] },

  // Payments — DGateway integration (East Africa mobile money + Stripe)
  'payments/use-payment-status.ts': {
    category: 'payments',
    description: 'Hook for foreground 5-second status polling with 5-minute ceiling, AppState pause, and cleanup. Pair with dgateway.',
    registryDependencies: ['dgateway'],
  },
  'payments/mobile-money-pay-screen.tsx': {
    category: 'payments',
    description: 'Mobile-money payment screen: amount, phone, currency switcher (UGX/KES/TZS/RWF). Starts a DGateway STK push via your backend.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context', 'react-hook-form', '@hookform/resolvers', 'zod'],
    registryDependencies: ['input', 'button', 'screen-header', 'dgateway'],
  },
  'payments/payment-status-screen.tsx': {
    category: 'payments',
    description: 'Post-STK-push status screen with "Check your phone" UX, 5s polling, success/failure terminal states, and cancel.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context'],
    registryDependencies: ['button', 'screen-header', 'use-payment-status', 'dgateway'],
  },
  'payments/subscription-plan-card.tsx': {
    category: 'payments',
    description: 'Selectable subscription plan card with price, interval, trial badge, feature list, and highlight variant.',
    dependencies: ['@expo/vector-icons'],
    registryDependencies: ['dgateway'],
  },
  'payments/subscription-manage-screen.tsx': {
    category: 'payments',
    description: 'Active subscription management — plan summary, state badge, past-due banner, next-charge details, cancel flow.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context'],
    registryDependencies: ['button', 'badge', 'screen-header', 'dgateway'],
  },
  'payments/stripe-pay-button.tsx': {
    category: 'payments',
    description: 'Stripe one-time PaymentSheet — mints a PaymentIntent via your backend, opens the native sheet. Requires <StripeProvider> at app root.',
    dependencies: ['@stripe/stripe-react-native'],
    registryDependencies: ['button'],
  },
  'payments/stripe-subscription-button.tsx': {
    category: 'payments',
    description: 'Stripe subscription PaymentSheet — handles both SetupIntent (trial) and PaymentIntent (charge now) flows behind one button.',
    dependencies: ['@stripe/stripe-react-native'],
    registryDependencies: ['button'],
  },

  // Nav
  'nav/bottom-tabs.tsx': {
    category: 'nav',
    description: 'Custom bottom tab bar with active state, icon swap, badges, and safe-area inset. Works standalone or with expo-router <Tabs>.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context'],
  },
  'nav/app-drawer.tsx': {
    category: 'nav',
    description: 'Reanimated left-edge drawer (UI-thread translate + opacity, reduced-motion aware) with header, items with icons + badges, dividers, destructive variant, backdrop tap-to-close.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context', 'react-native-reanimated'],
  },

  // Dashboard
  'dashboard/stat-card.tsx': {
    category: 'dashboard',
    description: 'KPI card with label, value, unit, delta % (up/down), optional sparkline, and accent variant.',
    dependencies: ['@expo/vector-icons'],
  },
  'dashboard/dashboard-shell.tsx': {
    category: 'dashboard',
    description: 'Scrollable dashboard layout with eyebrow + title + actions header, optional greeting strip, stats row, and pull-to-refresh.',
    dependencies: ['@expo/vector-icons', 'react-native-safe-area-context'],
  },
  'dashboard/data-table.tsx': {
    category: 'dashboard',
    description: 'Horizontally scrollable, sortable data table with custom cell renderers, alignment, and empty state.',
    dependencies: ['@expo/vector-icons'],
  },
  'dashboard/chart-line.tsx': {
    category: 'dashboard',
    description: 'Smooth area-fill line chart with comparison series, pointer tooltip, and themed dark palette.',
    dependencies: ['react-native-gifted-charts'],
  },
  'dashboard/chart-bar.tsx': {
    category: 'dashboard',
    description: 'Vertical bar chart with rounded tops, gradient fill, value-on-top labels, and optional rotated x labels.',
    dependencies: ['react-native-gifted-charts'],
  },
  'dashboard/chart-pie.tsx': {
    category: 'dashboard',
    description: 'Donut or pie chart with center label, rotating accent palette, and right-side legend showing percentages.',
    dependencies: ['react-native-gifted-charts'],
  },
};

// All components implicitly depend on core (cn, theme tokens, etc.)
const IMPLICIT_CORE_DEP = 'core';

// Core lib files — bundled as a single "core" entry installed automatically as a dependency
const CORE_LIB_FILES = [
  { path: 'lib/theme.ts', description: 'Dark-only design tokens (colors, spacing, typography, shadows).' },
  { path: 'lib/utils.ts', description: 'Utility functions (cn helper with clsx + tailwind-merge).' },
  { path: 'lib/format-currency.ts', description: 'Currency formatting utilities.' },
];

const CORE_LIB_DEPENDENCIES = ['clsx', 'tailwind-merge'];

interface RegistryEntry {
  name: string;
  description: string;
  category: string;
  files: { path: string; content: string }[];
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
}

const PACKAGES_DIR = path.resolve(root, 'packages/components');
const CLI_REGISTRY_PATH = path.resolve(root, 'packages/cli/registry.json');

function getSourceFiles(relPath: string): string[] {
  const dir = path.resolve(PACKAGES_DIR, path.dirname(relPath));
  const base = path.basename(relPath);
  const fullPath = path.join(dir, base);
  return [fullPath];
}

function getNameFromPath(relPath: string): string {
  return path.basename(relPath, '.tsx').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function getSlugFromPath(relPath: string): string {
  const base = path.basename(relPath);
  return base.replace(/\.(tsx|ts)$/, '');
}

async function generateRegistry() {
  const entries: RegistryEntry[] = [];

  // Build component entries
  for (const [relPath, meta] of Object.entries(COMPONENT_META)) {
    const sourcePath = path.resolve(PACKAGES_DIR, relPath);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`WARN: Source file not found: ${sourcePath}`);
      continue;
    }

    let content: string;
    try {
      content = await fs.readFile(sourcePath, 'utf-8');
    } catch {
      console.warn(`WARN: Could not read: ${sourcePath}`);
      continue;
    }

    const slug = getSlugFromPath(relPath);

    const allRegistryDeps = [...(meta.registryDependencies || [])];
    if (!allRegistryDeps.includes(IMPLICIT_CORE_DEP)) {
      allRegistryDeps.unshift(IMPLICIT_CORE_DEP);
    }

    entries.push({
      name: slug,
      description: meta.description,
      category: meta.category,
      files: [{ path: relPath, content }],
      dependencies: meta.dependencies,
      registryDependencies: allRegistryDeps,
    });
  }

  // Core entry (lib files) — auto-installed as dependency of most components
  const coreFiles: { path: string; content: string }[] = [];
  for (const lib of CORE_LIB_FILES) {
    const sourcePath = path.resolve(PACKAGES_DIR, lib.path);
    if (fs.existsSync(sourcePath)) {
      coreFiles.push({ path: lib.path, content: await fs.readFile(sourcePath, 'utf-8') });
    }
  }
  if (coreFiles.length > 0) {
    entries.push({
      name: 'core',
      description: 'VibeKit Native core library (theme tokens, utilities, formatting helpers).',
      category: 'lib',
      files: coreFiles,
      dependencies: CORE_LIB_DEPENDENCIES,
    });
  }

  // api-client — TanStack Query provider with mobile-first defaults
  const apiClientPath = path.resolve(PACKAGES_DIR, 'lib/api-client.tsx');
  if (fs.existsSync(apiClientPath)) {
    entries.push({
      name: 'api-client',
      description: 'TanStack Query provider with mobile-first defaults — retries, focus-refetch, online/offline tracking via expo-network.',
      category: 'lib',
      files: [{ path: 'lib/api-client.tsx', content: await fs.readFile(apiClientPath, 'utf-8') }],
      dependencies: ['@tanstack/react-query', 'expo-network'],
    });
  }

  // dgateway — typed client for your backend proxy to DGateway (mobile money + Stripe via REST)
  const dgatewayLibPath = path.resolve(PACKAGES_DIR, 'lib/dgateway.ts');
  if (fs.existsSync(dgatewayLibPath)) {
    entries.push({
      name: 'dgateway',
      description: 'Typed DGateway client — talks to your backend proxy (never the gateway directly). Handles collect, status polling, subscriptions, cancel.',
      category: 'lib',
      files: [{ path: 'lib/dgateway.ts', content: await fs.readFile(dgatewayLibPath, 'utf-8') }],
      dependencies: ['expo-constants'],
    });
  }

  // storage — MMKV-backed fast key-value storage (30x faster than AsyncStorage)
  const storagePath = path.resolve(PACKAGES_DIR, 'lib/storage.ts');
  if (fs.existsSync(storagePath)) {
    entries.push({
      name: 'storage',
      description: 'Fast key-value storage backed by MMKV (~30x faster than AsyncStorage). Typed getters/setters for strings, booleans, numbers, and JSON objects.',
      category: 'lib',
      files: [{ path: 'lib/storage.ts', content: await fs.readFile(storagePath, 'utf-8') }],
      dependencies: ['react-native-mmkv'],
    });
  }

  // secure-storage — Keychain/EncryptedSharedPreferences for auth tokens + biometric secrets
  const secureStoragePath = path.resolve(PACKAGES_DIR, 'lib/secure-storage.ts');
  if (fs.existsSync(secureStoragePath)) {
    entries.push({
      name: 'secure-storage',
      description: 'Encrypted key-value storage for sensitive data — iOS Keychain + Android EncryptedSharedPreferences. Use for auth tokens (when not using Better Auth\'s built-in storage), biometric secrets, 2FA seeds.',
      category: 'lib',
      files: [{ path: 'lib/secure-storage.ts', content: await fs.readFile(secureStoragePath, 'utf-8') }],
      dependencies: ['expo-secure-store'],
    });
  }

  // haptics — wrapped expo-haptics with sensible mobile-first defaults
  const hapticsPath = path.resolve(PACKAGES_DIR, 'lib/haptics.ts');
  if (fs.existsSync(hapticsPath)) {
    entries.push({
      name: 'haptics',
      description: 'Typed wrapper around expo-haptics — tap / select / success / warning / error / medium / heavy. Swallows simulator errors. Use on every primary CTA + form completion.',
      category: 'lib',
      files: [{ path: 'lib/haptics.ts', content: await fs.readFile(hapticsPath, 'utf-8') }],
      dependencies: ['expo-haptics'],
    });
  }

  // push-notifications — hook that registers an Expo Push Token with your backend
  const pushPath = path.resolve(PACKAGES_DIR, 'lib/push-notifications.ts');
  if (fs.existsSync(pushPath)) {
    entries.push({
      name: 'push-notifications',
      description: 'usePushNotifications hook — requests permission post-signin (polite), gets Expo Push Token, registers with your backend, wires foreground + tap handlers. Device.isDevice guarded.',
      category: 'lib',
      files: [{ path: 'lib/push-notifications.ts', content: await fs.readFile(pushPath, 'utf-8') }],
      dependencies: ['expo-notifications', 'expo-device', 'expo-constants'],
    });
  }

  await fs.ensureDir(path.dirname(CLI_REGISTRY_PATH));
  await fs.writeJson(CLI_REGISTRY_PATH, { components: entries }, { spaces: 2 });

  console.log(`\n  ✓ Generated registry.json with ${entries.length} entries`);
  console.log(`  → ${CLI_REGISTRY_PATH}\n`);
}

generateRegistry().catch((err) => {
  console.error('Failed to generate registry:', err);
  process.exit(1);
});
