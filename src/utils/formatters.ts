/**
 * Utility to convert English numbers to Persian digits consistently
 */
export const toPersianDigits = (input: number | string | undefined | null): string => {
  if (input === undefined || input === null) return '';
  const str = input.toString();
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
};

/**
 * Format currency in Tomans
 */
export const formatToman = (amount: number): string => {
  return toPersianDigits(amount.toLocaleString('en-US')) + ' تومان';
};
