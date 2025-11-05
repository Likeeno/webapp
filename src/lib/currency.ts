// Currency conversion utilities for Iranian Toman/Rial

/**
 * Convert Toman to Rial
 * 1 Toman = 10 Rials
 */
export function tomanToRial(toman: number): number {
  return toman * 10;
}

/**
 * Convert Rial to Toman
 * 10 Rials = 1 Toman
 */
export function rialToToman(rial: number): number {
  return rial / 10;
}

/**
 * Convert USD to Toman
 * Default: 1 USD = 120,000 Toman
 * Can be configured via USD_TO_TOMAN_RATE environment variable
 */
export function usdToToman(usd: number): number {
  const rate = parseFloat(process.env.USD_TO_TOMAN_RATE || '120000');
  return Math.ceil(usd * rate);
}

/**
 * Convert Toman to USD
 * Default: 120,000 Toman = 1 USD
 * Can be configured via USD_TO_TOMAN_RATE environment variable
 */
export function tomanToUsd(toman: number): number {
  const rate = parseFloat(process.env.USD_TO_TOMAN_RATE || '120000');
  return toman / rate;
}

/**
 * Format amount in Toman with Persian numerals
 */
export function formatToman(amount: number): string {
  return `${new Intl.NumberFormat('fa-IR').format(amount)} تومان`;
}

/**
 * Format amount in Rial with Persian numerals
 */
export function formatRial(amount: number): string {
  return `${new Intl.NumberFormat('fa-IR').format(amount)} ریال`;
}

/**
 * Display both Toman and Rial
 */
export function formatTomanWithRial(toman: number): string {
  return `${formatToman(toman)} (${formatRial(tomanToRial(toman))})`;
}

