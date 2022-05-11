export function formatUsd(number: number | string): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(number));
}

export function roundNumber(number: number | string): string {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(Number(number));
}

export function formatPoolBalance(number: number | string): string {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(Number(number));
}

export function formatPercentage(number: number | string): string {
  return roundNumber(Number(number) * 100) + '%';
}
