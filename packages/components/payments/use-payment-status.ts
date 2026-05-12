import { useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import {
  dgateway,
  isTerminalStatus,
  type PaymentStatus,
  type PaymentStatusResponse,
} from '../lib/dgateway';

interface UsePaymentStatusOptions {
  /** Transaction reference returned by `dgateway.startPayment`. */
  reference: string | null | undefined;
  /** Poll interval in ms (default 5000 — matches DGateway recommendations). */
  intervalMs?: number;
  /** Hard ceiling in ms before stopping (default 5 minutes). */
  ceilingMs?: number;
  /** Pause polling when the app is backgrounded (default true). */
  pauseWhenBackground?: boolean;
  /** Called once when status transitions to a terminal state. */
  onTerminal?: (status: PaymentStatusResponse) => void;
}

interface UsePaymentStatusResult {
  status: PaymentStatus;
  data: PaymentStatusResponse | null;
  error: Error | null;
  /** True while polling is active and status is not terminal. */
  isPolling: boolean;
  /** True when the 5-minute ceiling has been reached. */
  timedOut: boolean;
  /** Stop polling early (e.g., user cancelled). */
  cancel: () => void;
  /** Manually force a status check. */
  refetch: () => Promise<void>;
}

/**
 * Foreground 5-second poll of /api/checkout/status/:ref with a 5-minute ceiling.
 * Cancels on unmount, pauses on background. Designed for mobile money STK push UX.
 */
export function usePaymentStatus({
  reference,
  intervalMs = 5_000,
  ceilingMs = 5 * 60_000,
  pauseWhenBackground = true,
  onTerminal,
}: UsePaymentStatusOptions): UsePaymentStatusResult {
  const [data, setData] = useState<PaymentStatusResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [isPolling, setIsPolling] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  const startedAtRef = useRef<number | null>(null);
  const cancelledRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appStateRef = useRef<AppStateStatus>('active');
  const onTerminalRef = useRef(onTerminal);

  useEffect(() => {
    onTerminalRef.current = onTerminal;
  }, [onTerminal]);

  const stop = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPolling(false);
  };

  const cancel = () => {
    cancelledRef.current = true;
    stop();
  };

  const tick = async () => {
    if (!reference || cancelledRef.current) return;

    if (pauseWhenBackground && appStateRef.current !== 'active') {
      intervalRef.current = setTimeout(tick, intervalMs);
      return;
    }

    if (startedAtRef.current !== null && Date.now() - startedAtRef.current >= ceilingMs) {
      setTimedOut(true);
      stop();
      return;
    }

    try {
      const res = await dgateway.getStatus(reference);
      if (cancelledRef.current) return;

      setData(res);
      setStatus(res.status);

      if (isTerminalStatus(res.status)) {
        stop();
        onTerminalRef.current?.(res);
        return;
      }
    } catch (err) {
      // Don't terminate on transient network errors — keep polling.
      setError(err as Error);
    }

    if (!cancelledRef.current) {
      intervalRef.current = setTimeout(tick, intervalMs);
    }
  };

  const refetch = async () => {
    await tick();
  };

  useEffect(() => {
    if (!reference) return;

    cancelledRef.current = false;
    startedAtRef.current = Date.now();
    setIsPolling(true);
    setTimedOut(false);
    setError(null);

    const sub = AppState.addEventListener('change', (next) => {
      appStateRef.current = next;
    });

    tick();

    return () => {
      cancelledRef.current = true;
      stop();
      sub.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference, intervalMs, ceilingMs, pauseWhenBackground]);

  return { status, data, error, isPolling, timedOut, cancel, refetch };
}
