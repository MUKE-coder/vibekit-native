import * as Haptics from 'expo-haptics';

/**
 * VibeKit Native — haptic feedback helpers.
 *
 * Wraps expo-haptics with sensible defaults + swallows errors (simulators
 * and the iOS Settings → Sounds & Haptics toggle can both make these throw).
 *
 * Usage:
 *   import { haptics } from '@/components/lib/haptics';
 *
 *   haptics.tap();        // primary CTA press
 *   haptics.select();     // picker / toggle change
 *   haptics.success();    // form submit success
 *   haptics.error();      // form submit failure
 *   haptics.warning();    // confirmation prompts
 *
 * Rule of thumb: every primary CTA gets a haptic. Pickers / segmented
 * controls get .select(). Form completion gets .success() or .error().
 * Avoid haptics on scroll, hover, or any high-frequency interaction.
 *
 * Honours the iOS Settings → Accessibility → Touch → Vibration toggle
 * automatically (Apple's CHHapticEngine respects it).
 */

function safe(fn: () => Promise<void>): void {
  fn().catch(() => {
    // Simulator / disabled haptics / unsupported device — silently no-op.
  });
}

export const haptics = {
  /** Light impact — primary buttons, taps. */
  tap(): void {
    safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
  },
  /** Medium impact — destructive buttons, swipe actions. */
  medium(): void {
    safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium));
  },
  /** Heavy impact — long-press confirmations, drag-end. */
  heavy(): void {
    safe(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy));
  },
  /** Selection change — pickers, toggles, segmented controls. */
  select(): void {
    safe(() => Haptics.selectionAsync());
  },
  /** Success — form submit, payment complete, achievement unlocked. */
  success(): void {
    safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
  },
  /** Warning — confirmation prompts, before destructive actions. */
  warning(): void {
    safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning));
  },
  /** Error — form validation failure, network error, payment declined. */
  error(): void {
    safe(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
  },
};
