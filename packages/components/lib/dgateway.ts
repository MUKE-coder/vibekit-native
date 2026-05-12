import Constants from 'expo-constants';

/**
 * VibeKit Native — DGateway client.
 *
 * IMPORTANT: This module talks to YOUR backend, not directly to DGateway.
 * Never bundle the DGateway API key into the mobile app. Your backend
 * proxies these calls and adds the X-API-Key header server-side.
 *
 * Configure your backend URL via app.json `extra.apiUrl` or EXPO_PUBLIC_API_URL.
 * Your backend must expose:
 *   POST /api/checkout/start             → DGateway /v1/payments/collect
 *   GET  /api/checkout/status/:reference → DGateway /v1/transactions/:ref/status
 *   POST /api/subscriptions/start        → DGateway /v1/subscriptions
 *   POST /api/subscriptions/:id/cancel   → DGateway cancel
 *
 * Live DGateway docs: https://dgateway.com/docs
 */

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ??
  process.env.EXPO_PUBLIC_API_URL ??
  'http://localhost:3000';

export type Currency = 'UGX' | 'KES' | 'TZS' | 'RWF' | 'USD';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'expired';

export interface CollectRequest {
  amount: number;            // whole units of currency (no decimals for mobile money)
  currency: Currency;
  phoneNumber: string;       // 07X / 2567X / +2567X — server normalises
  description: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface CollectResponse {
  reference: string;
  status: PaymentStatus;
  provider: 'iotec' | 'relworx' | 'stripe' | string;
}

export interface PaymentStatusResponse {
  reference: string;
  status: PaymentStatus;
  provider: string;
  providerRef?: string;
  amount: number;
  currency: Currency;
  phoneNumber?: string;
  completedAt?: string;
  failureReason?: string;
}

export interface SubscriptionRequest {
  planId: number;
  phoneNumber: string;
  buyerEmail: string;
  metadata?: Record<string, string | number | boolean>;
}

export type SubscriptionState =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired';

export interface SubscriptionResponse {
  id: number | string;
  reference: string;
  status: PaymentStatus;
  state: SubscriptionState;
  planId: number;
  planName: string;
  amount: number;
  currency: Currency;
  interval: 'day' | 'week' | 'month' | 'year';
  intervalCount: number;
  nextChargeAt?: string;
  trialEndsAt?: string;
  cancelledAt?: string;
}

class DGatewayError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
    this.name = 'DGatewayError';
  }
}

async function request<T>(
  path: string,
  init?: RequestInit & { timeoutMs?: number },
): Promise<T> {
  const url = `${API_URL.replace(/\/$/, '')}${path}`;
  const timeoutMs = init?.timeoutMs ?? 30_000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(init?.headers ?? {}),
      },
    });

    const text = await res.text();
    const body = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw new DGatewayError(
        res.status,
        body?.code ?? 'request_failed',
        body?.message ?? `Request failed with status ${res.status}`,
      );
    }

    return (body?.data ?? body) as T;
  } catch (err) {
    if (err instanceof DGatewayError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new DGatewayError(408, 'timeout', `Request timed out after ${timeoutMs}ms`);
    }
    throw new DGatewayError(0, 'network_error', (err as Error).message || 'Network error');
  } finally {
    clearTimeout(timer);
  }
}

export const dgateway = {
  startPayment(body: CollectRequest): Promise<CollectResponse> {
    return request<CollectResponse>('/api/checkout/start', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  getStatus(reference: string): Promise<PaymentStatusResponse> {
    return request<PaymentStatusResponse>(
      `/api/checkout/status/${encodeURIComponent(reference)}`,
    );
  },

  startSubscription(body: SubscriptionRequest): Promise<SubscriptionResponse> {
    return request<SubscriptionResponse>('/api/subscriptions/start', {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  cancelSubscription(id: number | string): Promise<{ id: number | string; state: SubscriptionState }> {
    return request<{ id: number | string; state: SubscriptionState }>(
      `/api/subscriptions/${encodeURIComponent(String(id))}/cancel`,
      { method: 'POST' },
    );
  },
};

export { DGatewayError };

export function isTerminalStatus(status: PaymentStatus): boolean {
  return status === 'completed' || status === 'failed' || status === 'cancelled' || status === 'expired';
}

export function statusLabel(status: PaymentStatus): string {
  switch (status) {
    case 'pending':
    case 'processing':
      return 'Check your phone and approve the prompt';
    case 'completed':
      return 'Payment successful';
    case 'failed':
      return 'Payment failed';
    case 'cancelled':
      return 'Payment cancelled';
    case 'expired':
      return 'Prompt expired — try again';
    default:
      return 'Processing…';
  }
}
