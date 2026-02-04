import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricSummary } from '@/components/MetricSummary';
import { Metric } from '@/lib/types';

const mockMetric: Metric = {
  id: 'test-metric',
  title: 'Test Metric',
  icon: '📊',
  value: 2.5,
  format: 'percent',
  trendDirection: 'up',
  positiveDirection: 'up',
  lastUpdated: '2025-01-15T09:00:00-05:00',
  summary: 'This is a test summary.',
  description: 'Test description.',
  whyItMatters: 'Test why it matters.',
  commonMisinterpretation: 'Test misinterpretation.',
  chartData: [
    { label: 'Q1 2024', value: 1.0 },
    { label: 'Q2 2024', value: 2.5 },
  ],
  chartType: 'line',
};

describe('MetricSummary', () => {
  it('renders the metric title', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
  });

  it('renders the metric value formatted correctly', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText('+2.5%')).toBeInTheDocument();
  });

  it('renders the summary text', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText('This is a test summary.')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('shows upward trend indicator for positive trend', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText('↑')).toBeInTheDocument();
  });

  it('shows downward trend indicator for negative trend', () => {
    const negativeMetric = { ...mockMetric, trendDirection: 'down' as const };
    render(<MetricSummary metric={negativeMetric} />);
    expect(screen.getByText('↓')).toBeInTheDocument();
  });

  it('applies positive color class when trend is positive', () => {
    render(<MetricSummary metric={mockMetric} />);
    const valueElement = screen.getByText('+2.5%');
    expect(valueElement).toHaveClass('text-positive');
  });

  it('applies negative color class when trend is negative', () => {
    const negativeMetric = {
      ...mockMetric,
      value: -1.5,
      trendDirection: 'down' as const,
    };
    render(<MetricSummary metric={negativeMetric} />);
    const valueElement = screen.getByText('-1.5%');
    expect(valueElement).toHaveClass('text-negative');
  });

  it('shows fallback indicator when isFallback is true', () => {
    const fallbackMetric = { ...mockMetric, isFallback: true };
    render(<MetricSummary metric={fallbackMetric} />);
    expect(screen.getByText('Cached')).toBeInTheDocument();
  });

  it('does not show fallback indicator when isFallback is false', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.queryByText('Cached')).not.toBeInTheDocument();
  });

  it('renders a link to details section', () => {
    render(<MetricSummary metric={mockMetric} />);
    const link = screen.getByText('Details →');
    expect(link).toHaveAttribute('href', '#test-metric');
  });

  it('renders formatted date', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText(/Updated Jan 15, 2025/)).toBeInTheDocument();
  });
});

describe('MetricSummary with percentage format', () => {
  const percentageMetric: Metric = {
    ...mockMetric,
    value: 63,
    format: 'percentage',
  };

  it('formats percentage values without plus sign', () => {
    render(<MetricSummary metric={percentageMetric} />);
    expect(screen.getByText('63%')).toBeInTheDocument();
  });
});
