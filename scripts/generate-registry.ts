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
    description: 'Dark-only pressable button with primary, secondary, ghost, destructive, and text variants.',
    dependencies: ['@expo/vector-icons', 'clsx', 'tailwind-merge'],
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
  'ui/toast.tsx': { category: 'ui', description: 'Animated toast notifications with success, error, warning, info variants.', dependencies: ['@expo/vector-icons'] },
  'ui/rating.tsx': { category: 'ui', description: 'Interactive star rating with half-star precision and touch selection.', dependencies: ['@expo/vector-icons'] },
  'ui/custom-radio.tsx': { category: 'ui', description: 'Styled radio button group with animated selection indicator.', dependencies: ['@expo/vector-icons'] },
  'ui/divider.tsx': { category: 'ui', description: 'Thin horizontal or vertical divider line with optional label inset.' },
  'ui/skeleton.tsx': { category: 'ui', description: 'Pulsing placeholder shapes for card, text, avatar, and custom layouts.' },
  'ui/searchable-select.tsx': { category: 'ui', description: 'Modal searchable picker with type-to-filter and multi-select support.', dependencies: ['@expo/vector-icons'] },
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
    description: 'Inverted FlatList of chat messages with pull-to-refresh, pagination, and empty state.',
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

  await fs.ensureDir(path.dirname(CLI_REGISTRY_PATH));
  await fs.writeJson(CLI_REGISTRY_PATH, { components: entries }, { spaces: 2 });

  console.log(`\n  ✓ Generated registry.json with ${entries.length} entries`);
  console.log(`  → ${CLI_REGISTRY_PATH}\n`);
}

generateRegistry().catch((err) => {
  console.error('Failed to generate registry:', err);
  process.exit(1);
});
