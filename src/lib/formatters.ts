import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/New_York';

export function formatValue(
  value: number,
  formatType: 'percent' | 'percentage'
): string {
  if (formatType === 'percent') {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  }
  return `${value.toFixed(0)}%`;
}

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    const zonedDate = toZonedTime(date, TIMEZONE);
    return format(zonedDate, 'MMM d, yyyy');
  } catch {
    return dateString;
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatQuarter(year: number, quarter: number): string {
  return `Q${quarter} ${year}`;
}
