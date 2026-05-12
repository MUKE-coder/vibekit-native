import React from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { Button } from '../ui/button';

/**
 * Stripe subscription button (Payment Sheet with SetupIntent / Subscription).
 *
 * Server requirements: your backend must expose
 *   POST /api/stripe/create-subscription
 *   → returns { clientSecret, ephemeralKey, customer, subscriptionId, type: 'setup' | 'payment' }
 *
 * "type" tells the sheet which secret you returned:
 *   - 'payment' — PaymentIntent (first invoice charged immediately)
 *   - 'setup'   — SetupIntent (trial; card saved without charge)
 *
 * Wrap your app root with <StripeProvider publishableKey="pk_test_…">.
 * https://docs.stripe.com/billing/subscriptions/build-subscriptions?platform=react-native
 */

interface StripeSubscriptionButtonProps {
  /** Stripe price id (e.g., price_1AbcD…). */
  priceId: string;
  /** Buyer email — required for Stripe Customer creation. */
  buyerEmail: string;
  /** Merchant display name. */
  merchantDisplayName: string;
  onSubscribed: (subscriptionId: string) => void;
  onError?: (error: { code: string; message: string }) => void;
  /** Backend endpoint to create the subscription. Default: /api/stripe/create-subscription */
  endpoint?: string;
  label?: string;
  disabled?: boolean;
}

export function StripeSubscriptionButton({
  priceId,
  buyerEmail,
  merchantDisplayName,
  onSubscribed,
  onError,
  endpoint = '/api/stripe/create-subscription',
  label = 'Subscribe',
  disabled = false,
}: StripeSubscriptionButtonProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = React.useState(false);

  async function handleSubscribe() {
    setLoading(true);
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, buyerEmail }),
      });
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);

      const {
        clientSecret,
        ephemeralKey,
        customer,
        subscriptionId,
        type,
      } = await res.json();
      if (!clientSecret || !subscriptionId) {
        throw new Error('Missing clientSecret or subscriptionId from backend');
      }

      const isSetup = type === 'setup';
      const init = await initPaymentSheet({
        merchantDisplayName,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: !isSetup ? clientSecret : undefined,
        setupIntentClientSecret: isSetup ? clientSecret : undefined,
        defaultBillingDetails: { email: buyerEmail },
        allowsDelayedPaymentMethods: false,
        returnURL: 'vibekit-native://stripe-redirect',
      });
      if (init.error) throw new Error(init.error.message);

      const result = await presentPaymentSheet();
      if (result.error) {
        if (result.error.code === 'Canceled') {
          onError?.({ code: 'cancelled', message: 'Subscription cancelled' });
        } else {
          onError?.({ code: result.error.code, message: result.error.message });
          Alert.alert('Subscription failed', result.error.message);
        }
        return;
      }

      onSubscribed(subscriptionId);
    } catch (err) {
      const message = (err as Error).message || 'Could not start subscription';
      onError?.({ code: 'init_failed', message });
      Alert.alert('Subscription unavailable', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      title={label}
      onPress={handleSubscribe}
      loading={loading}
      disabled={disabled}
      icon="repeat-outline"
      variant="primary"
      size="lg"
    />
  );
}
