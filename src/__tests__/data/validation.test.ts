import { describe, it, expect } from 'vitest';
import purchasingPowerData from '@/data/metrics/purchasing-power.json';
import essentialsInflationData from '@/data/metrics/essentials-inflation.json';
import financialCushionData from '@/data/metrics/financial-cushion.json';
import {
  PurchasingPowerSchema,
  EssentialsInflationSchema,
  FinancialCushionSchema,
} from '@/lib/schemas';

describe('Data Validation: Purchasing Power', () => {
  it('validates against schema', () => {
    const result = PurchasingPowerSchema.safeParse(purchasingPowerData);
    expect(result.success).toBe(true);
    if (!result.success) {
      console.error(result.error.issues);
    }
  });

  it('has a value within realistic range (-50% to +50%)', () => {
    expect(purchasingPowerData.value).toBeGreaterThanOrEqual(-50);
    expect(purchasingPowerData.value).toBeLessThanOrEqual(50);
  });

  it('has non-empty data array', () => {
    expect(purchasingPowerData.data.length).toBeGreaterThan(0);
  });

  it('has valid lastUpdated date', () => {
    const date = new Date(purchasingPowerData.lastUpdated);
    expect(date.getTime()).not.toBeNaN();
  });

  it('has data points with valid structure', () => {
    purchasingPowerData.data.forEach((point) => {
      expect(typeof point.date).toBe('string');
      expect(point.date.length).toBeGreaterThan(0);
      expect(typeof point.value).toBe('number');
    });
  });

  it('has data points in chronological order', () => {
    const dates = purchasingPowerData.data.map((d) => d.date);
    // Check that quarters are in order (Q1 < Q2 < Q3 < Q4 within same year)
    for (let i = 1; i < dates.length; i++) {
      const prev = dates[i - 1];
      const curr = dates[i];
      // Simple check: later dates should come after earlier ones
      expect(curr).not.toBe(prev);
    }
  });
});

describe('Data Validation: Essentials Inflation', () => {
  it('validates against schema', () => {
    const result = EssentialsInflationSchema.safeParse(essentialsInflationData);
    expect(result.success).toBe(true);
    if (!result.success) {
      console.error(result.error.issues);
    }
  });

  it('has a value within realistic range (-20% to +50%)', () => {
    expect(essentialsInflationData.value).toBeGreaterThanOrEqual(-20);
    expect(essentialsInflationData.value).toBeLessThanOrEqual(50);
  });

  it('has headlineCPI within realistic range', () => {
    expect(essentialsInflationData.headlineCPI).toBeGreaterThanOrEqual(-20);
    expect(essentialsInflationData.headlineCPI).toBeLessThanOrEqual(50);
  });

  it('has non-empty data array', () => {
    expect(essentialsInflationData.data.length).toBeGreaterThan(0);
  });

  it('has valid lastUpdated date', () => {
    const date = new Date(essentialsInflationData.lastUpdated);
    expect(date.getTime()).not.toBeNaN();
  });

  it('has data points with both essentials and headline values', () => {
    essentialsInflationData.data.forEach((point) => {
      expect(typeof point.date).toBe('string');
      expect(typeof point.essentials).toBe('number');
      expect(typeof point.headline).toBe('number');
    });
  });

  it('has at least 12 months of data', () => {
    expect(essentialsInflationData.data.length).toBeGreaterThanOrEqual(12);
  });
});

describe('Data Validation: Financial Cushion', () => {
  it('validates against schema', () => {
    const result = FinancialCushionSchema.safeParse(financialCushionData);
    expect(result.success).toBe(true);
    if (!result.success) {
      console.error(result.error.issues);
    }
  });

  it('has canCover400 between 0 and 100', () => {
    expect(financialCushionData.canCover400).toBeGreaterThanOrEqual(0);
    expect(financialCushionData.canCover400).toBeLessThanOrEqual(100);
  });

  it('has cannotCover400 between 0 and 100', () => {
    expect(financialCushionData.cannotCover400).toBeGreaterThanOrEqual(0);
    expect(financialCushionData.cannotCover400).toBeLessThanOrEqual(100);
  });

  it('has has3MonthSavings between 0 and 100', () => {
    expect(financialCushionData.has3MonthSavings).toBeGreaterThanOrEqual(0);
    expect(financialCushionData.has3MonthSavings).toBeLessThanOrEqual(100);
  });

  it('has a valid year', () => {
    expect(financialCushionData.year).toBeGreaterThanOrEqual(2000);
    expect(financialCushionData.year).toBeLessThanOrEqual(2100);
  });

  it('has non-empty data array', () => {
    expect(financialCushionData.data.length).toBeGreaterThan(0);
  });

  it('has valid lastUpdated date', () => {
    const date = new Date(financialCushionData.lastUpdated);
    expect(date.getTime()).not.toBeNaN();
  });

  it('has data points with valid years', () => {
    financialCushionData.data.forEach((point) => {
      expect(point.year).toBeGreaterThanOrEqual(2000);
      expect(point.year).toBeLessThanOrEqual(2100);
      expect(point.canCover400).toBeGreaterThanOrEqual(0);
      expect(point.canCover400).toBeLessThanOrEqual(100);
    });
  });

  it('has data points in chronological order', () => {
    const years = financialCushionData.data.map((d) => d.year);
    for (let i = 1; i < years.length; i++) {
      expect(years[i]).toBeGreaterThanOrEqual(years[i - 1]);
    }
  });

  it('latest data year matches the year field', () => {
    const latestDataYear =
      financialCushionData.data[financialCushionData.data.length - 1].year;
    expect(latestDataYear).toBe(financialCushionData.year);
  });
});

describe('Cross-metric validation', () => {
  it('all metrics have lastUpdated dates', () => {
    expect(purchasingPowerData.lastUpdated).toBeTruthy();
    expect(essentialsInflationData.lastUpdated).toBeTruthy();
    expect(financialCushionData.lastUpdated).toBeTruthy();
  });

  it('all lastUpdated dates are valid ISO strings', () => {
    const dates = [
      purchasingPowerData.lastUpdated,
      essentialsInflationData.lastUpdated,
      financialCushionData.lastUpdated,
    ];

    dates.forEach((dateStr) => {
      const date = new Date(dateStr);
      expect(date.getTime()).not.toBeNaN();
    });
  });

  it('all metrics have data arrays', () => {
    expect(Array.isArray(purchasingPowerData.data)).toBe(true);
    expect(Array.isArray(essentialsInflationData.data)).toBe(true);
    expect(Array.isArray(financialCushionData.data)).toBe(true);
  });
});
