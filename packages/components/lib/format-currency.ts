export function formatCurrencyInput(text: string): string {
  const digits = text.replace(/\D/g, '');
  if (!digits) return '';
  const num = parseInt(digits, 10);
  return num.toLocaleString('en-US');
}

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(amount);
}

export function formatPriceCompact(amount: number): string {
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1) + 'M';
  if (amount >= 1_000) return (amount / 1_000).toFixed(1) + 'K';
  return amount.toString();
}
