import { describe, it, expect } from 'vitest';
import { getMetrics } from '@/lib/metrics';

describe('getMetrics', () => {
  it('returns an array of six metrics', () => {
    const metrics = getMetrics();
    expect(metrics).toHaveLength(6);
  });

  it('returns purchasing power metric with required fields', () => {
    const metrics = getMetrics();
    const purchasingPower = metrics.find((m) => m.id === 'purchasing-power');

    expect(purchasingPower).toBeDefined();
    expect(purchasingPower?.title).toBe('Purchasing Power of the Median Paycheck');
    expect(purchasingPower?.format).toBe('percent');
    expect(purchasingPower?.chartType).toBe('line');
    expect(purchasingPower?.positiveDirection).toBe('up');
    expect(typeof purchasingPower?.value).toBe('number');
    expect(purchasingPower?.chartData.length).toBeGreaterThan(0);
  });

  it('returns essentials inflation metric with required fields', () => {
    const metrics = getMetrics();
    const essentials = metrics.find((m) => m.id === 'essentials-inflation');

    expect(essentials).toBeDefined();
    expect(essentials?.title).toBe('Essentials Cost Pressure');
    expect(essentials?.format).toBe('percent');
    expect(essentials?.chartType).toBe('line');
    expect(essentials?.positiveDirection).toBe('down');
    expect(typeof essentials?.value).toBe('number');
    expect(essentials?.chartData.length).toBeGreaterThan(0);
  });

  it('returns financial cushion metric with required fields', () => {
    const metrics = getMetrics();
    const cushion = metrics.find((m) => m.id === 'financial-cushion');

    expect(cushion).toBeDefined();
    expect(cushion?.title).toBe('Household Financial Cushion');
    expect(cushion?.format).toBe('percentage');
    expect(cushion?.chartType).toBe('bar');
    expect(cushion?.positiveDirection).toBe('up');
    expect(typeof cushion?.value).toBe('number');
    expect(cushion?.chartData.length).toBeGreaterThan(0);
  });

  it('returns consumer sentiment metric with required fields', () => {
    const metrics = getMetrics();
    const sentiment = metrics.find((m) => m.id === 'consumer-sentiment');

    expect(sentiment).toBeDefined();
    expect(sentiment?.title).toBe('Consumer Sentiment');
    expect(sentiment?.format).toBe('percentage');
    expect(sentiment?.chartType).toBe('line');
    expect(sentiment?.positiveDirection).toBe('up');
    expect(typeof sentiment?.value).toBe('number');
    expect(sentiment?.chartData.length).toBeGreaterThan(0);
  });

  it('returns sahm rule metric with required fields', () => {
    const metrics = getMetrics();
    const sahmRule = metrics.find((m) => m.id === 'sahm-rule');

    expect(sahmRule).toBeDefined();
    expect(sahmRule?.title).toBe('Recession Risk Indicator');
    expect(sahmRule?.format).toBe('percent');
    expect(sahmRule?.chartType).toBe('line');
    expect(sahmRule?.positiveDirection).toBe('down');
    expect(typeof sahmRule?.value).toBe('number');
    expect(sahmRule?.chartData.length).toBeGreaterThan(0);
  });

  it('returns household debt metric with required fields', () => {
    const metrics = getMetrics();
    const debt = metrics.find((m) => m.id === 'household-debt');

    expect(debt).toBeDefined();
    expect(debt?.title).toBe('Household Debt Burden');
    expect(debt?.format).toBe('percent');
    expect(debt?.chartType).toBe('line');
    expect(debt?.positiveDirection).toBe('down');
    expect(typeof debt?.value).toBe('number');
    expect(debt?.chartData.length).toBeGreaterThan(0);
  });

  it('all metrics have valid trend directions', () => {
    const metrics = getMetrics();
    const validDirections = ['up', 'down', 'flat'];

    metrics.forEach((metric) => {
      expect(validDirections).toContain(metric.trendDirection);
      expect(['up', 'down']).toContain(metric.positiveDirection);
    });
  });

  it('all metrics have valid chart data', () => {
    const metrics = getMetrics();

    metrics.forEach((metric) => {
      expect(Array.isArray(metric.chartData)).toBe(true);
      metric.chartData.forEach((point) => {
        expect(typeof point.label).toBe('string');
        expect(typeof point.value).toBe('number');
      });
    });
  });

  it('all metrics have required text content', () => {
    const metrics = getMetrics();

    metrics.forEach((metric) => {
      expect(metric.summary).toBeTruthy();
      expect(metric.description).toBeTruthy();
      expect(metric.whyItMatters).toBeTruthy();
      expect(metric.commonMisinterpretation).toBeTruthy();
      expect(metric.lastUpdated).toBeTruthy();
    });
  });

  it('all metrics have icons', () => {
    const metrics = getMetrics();

    metrics.forEach((metric) => {
      expect(metric.icon).toBeTruthy();
      expect(metric.icon.length).toBeGreaterThan(0);
    });
  });

  it('purchasing power trend matches value sign', () => {
    const metrics = getMetrics();
    const purchasingPower = metrics.find((m) => m.id === 'purchasing-power');

    if (purchasingPower) {
      if (purchasingPower.value > 0) {
        expect(purchasingPower.trendDirection).toBe('up');
      } else if (purchasingPower.value < 0) {
        expect(purchasingPower.trendDirection).toBe('down');
      }
    }
  });
});
