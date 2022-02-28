/**
 *
 * @function formatCurrency
 * Format number as currency (US Dollars)
 *
 * @example
 *  formatCurrency(0)
 *  // => $0.00
 *
 * @example
 *  formatCurrency(1.5)
 *  // => $1.50
 *
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
