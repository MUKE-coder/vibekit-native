import React from 'react';
import { Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { Button } from '../ui/button';

/**
 * Stripe one-time payment button (Payment Sheet flow).
 *
 * Server requirements: your backend must expose
 *   POST /api/stripe/create-payment-intent
 *   → returns { clientSecret, ephemeralKey, customer, publishableKey? }
 *
 * Wrap your app root with <StripeProvider publishableKey="pk_test_…"> from
 * @stripe/stripe-react-native before rendering this button.
 *
 * https://docs.stripe.com/payments/accept-a-payment?platform=react-native
 */

interface StripePayButtonProps {
  amount: number;
  currency: string;
  /** Description shown on the buyer's statement. */
  description: string;
  /** Pre-filled buyer email — speeds up Payment Sheet. */
  buyerEmail?: string;
  /** Merchant display name. */
  merchantDisplayName: string;
  /** Callback hit when Stripe confirms the payment succeeded. */
  onSuccess: (paymentIntentId: string) => void;
  /** Callback hit when the buyer cancels or payment fails. */
  onError?: (error: { code: string; message: string }) => void;
  /** Backend endpoint to mint the PaymentIntent. Default: /api/stripe/create-payment-intent */
  endpoint?: string;
  label?: string;
  disabled?: boolean;
}

export function StripePayButton({
  amount,
  currency,
  description,
  buyerEmail,
  merchantDisplayName,
  onSuccess,
  onError,
  endpoint = '/api/stripe/create-payment-intent',
  label = 'Pay with card',
  disabled = false,
}: StripePayButtonProps) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = React.useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      // 1. Mint a PaymentIntent on your backend
      const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, description, buyerEmail }),
      });
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      const { clientSecret, ephemeralKey, customer } = await res.json();
      if (!clientSecret) throw new Error('Missing clientSecret from backend');

      // 2. Initialise the Payment Sheet
      const init = await initPaymentSheet({
        merchantDisplayName,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: clientSecret,
        defaultBillingDetails: buyerEmail ? { email: buyerEmail } : undefined,
        allowsDelayedPaymentMethods: true,
        returnURL: 'vibekit-native://stripe-redirect',
      });
      if (init.error) throw new Error(init.error.message);

      // 3. Present the sheet
      const result = await presentPaymentSheet();
      if (result.error) {
        if (result.error.code === 'Canceled') {
          onError?.({ code: 'cancelled', message: 'Payment cancelled' });
        } else {
          onError?.({ code: result.error.code, message: result.error.message });
          Alert.alert('Payment failed', result.error.message);
        }
        return;
      }

      // 4. Success — extract intent id (last segment of client_secret before _secret_)
      const intentId = clientSecret.split('_secret_')[0];
      onSuccess(intentId);
    } catch (err) {
      const message = (err as Error).message || 'Could not start payment';
      onError?.({ code: 'init_failed', message });
      Alert.alert('Payment unavailable', message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      title={label}
      onPress={handlePay}
      loading={loading}
      disabled={disabled}
      icon="card-outline"
      variant="primary"
      size="lg"
    />
  );
}
