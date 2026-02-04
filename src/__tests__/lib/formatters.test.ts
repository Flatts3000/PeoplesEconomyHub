import { describe, it, expect } from 'vitest';
import { formatValue, formatDate, formatCurrency, formatQuarter } from '@/lib/formatters';

describe('formatValue', () => {
  describe('percent format', () => {
    it('formats positive values with plus sign', () => {
      expect(formatValue(1.5, 'percent')).toBe('+1.5%');
    });

    it('formats negative values without plus sign', () => {
      expect(formatValue(-2.3, 'percent')).toBe('-2.3%');
    });

    it('formats zero without plus sign', () => {
      expect(formatValue(0, 'percent')).toBe('0.0%');
    });

    it('rounds to one decimal place', () => {
      expect(formatValue(1.567, 'percent')).toBe('+1.6%');
      expect(formatValue(1.234, 'percent')).toBe('+1.2%');
    });
  });

  describe('percentage format', () => {
    it('formats as whole number with percent sign', () => {
      expect(formatValue(63, 'percentage')).toBe('63%');
    });

    it('rounds to whole number', () => {
      expect(formatValue(63.7, 'percentage')).toBe('64%');
      expect(formatValue(63.2, 'percentage')).toBe('63%');
    });

    it('does not add plus sign for positive values', () => {
      expect(formatValue(50, 'percentage')).toBe('50%');
    });
  });
});

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2025-01-15T09:00:00-05:00');
    expect(result).toBe('Jan 15, 2025');
  });

  it('handles date without time', () => {
    const result = formatDate('2025-06-01');
    expect(result).toMatch(/Jun 1, 2025/);
  });

  it('returns original string for invalid date', () => {
    expect(formatDate('invalid-date')).toBe('invalid-date');
  });

  it('returns original string for empty string', () => {
    expect(formatDate('')).toBe('');
  });
});

describe('formatCurrency', () => {
  it('formats number as USD currency', () => {
    expect(formatCurrency(1000)).toBe('$1,000');
  });

  it('formats large numbers with commas', () => {
    expect(formatCurrency(1234567)).toBe('$1,234,567');
  });

  it('rounds to whole dollars', () => {
    expect(formatCurrency(1000.50)).toBe('$1,001');
    expect(formatCurrency(1000.49)).toBe('$1,000');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0');
  });
});

describe('formatQuarter', () => {
  it('formats year and quarter', () => {
    expect(formatQuarter(2025, 1)).toBe('Q1 2025');
    expect(formatQuarter(2024, 4)).toBe('Q4 2024');
  });

  it('handles all quarters', () => {
    expect(formatQuarter(2025, 1)).toBe('Q1 2025');
    expect(formatQuarter(2025, 2)).toBe('Q2 2025');
    expect(formatQuarter(2025, 3)).toBe('Q3 2025');
    expect(formatQuarter(2025, 4)).toBe('Q4 2025');
  });
});
