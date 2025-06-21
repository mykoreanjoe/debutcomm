import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a Date object or a date string into a specified format.
 * @param date - The date to format.
 * @param formatStyle - 'default' for 'yyyy-MM-dd', 'long' for 'PPP' (e.g., Aug 21, 2024).
 * @returns The formatted date string.
 */
export function formatDate(
  date: Date | string,
  formatStyle: 'default' | 'long' = 'default'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (formatStyle === 'long') {
    return format(dateObj, 'PPP', { locale: ko }); // e.g., '2024년 8월 21일'
  }
  
  return format(dateObj, "yyyy-MM-dd");
}
