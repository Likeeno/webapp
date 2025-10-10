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

