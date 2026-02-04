import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricCard } from '@/components/MetricCard';
import { Metric } from '@/lib/types';

// Mock the MetricChartWrapper component since it uses Chart.js
vi.mock('@/components/MetricChartWrapper', () => ({
  MetricChartWrapper: ({ metric }: { metric: Metric }) => (
    <div data-testid="mock-chart">{metric.title} Chart</div>
  ),
}));

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
  description: 'This is the full description of the metric.',
  whyItMatters: 'This explains why the metric matters.',
  commonMisinterpretation: 'This is a common misinterpretation.',
  chartData: [
    { label: 'Q1 2024', value: 1.0 },
    { label: 'Q2 2024', value: 2.5 },
  ],
  chartType: 'line',
};

describe('MetricCard', () => {
  it('renders the metric title', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('Test Metric')).toBeInTheDocument();
  });

  it('renders the metric value', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('+2.5%')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('📊')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(
      screen.getByText('This is the full description of the metric.')
    ).toBeInTheDocument();
  });

  it('renders why it matters section', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('Why it matters')).toBeInTheDocument();
    expect(
      screen.getByText('This explains why the metric matters.')
    ).toBeInTheDocument();
  });

  it('renders common misinterpretation section', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('Common misinterpretation')).toBeInTheDocument();
    expect(
      screen.getByText('This is a common misinterpretation.')
    ).toBeInTheDocument();
  });

  it('renders the chart component', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  it('has correct section id for anchor links', () => {
    render(<MetricCard metric={mockMetric} />);
    const section = document.getElementById('test-metric');
    expect(section).toBeInTheDocument();
  });

  it('renders methodology link', () => {
    render(<MetricCard metric={mockMetric} />);
    const link = screen.getByText('View methodology →');
    expect(link).toHaveAttribute('href', '/methodology');
  });

  it('shows fallback warning when isFallback is true', () => {
    const fallbackMetric = {
      ...mockMetric,
      isFallback: true,
      fallbackDate: 'Q4 2024',
    };
    render(<MetricCard metric={fallbackMetric} />);
    expect(
      screen.getByText(/Live data temporarily unavailable/)
    ).toBeInTheDocument();
  });

  it('does not show fallback warning when isFallback is false', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(
      screen.queryByText(/Live data temporarily unavailable/)
    ).not.toBeInTheDocument();
  });

  it('applies positive color for positive trend', () => {
    render(<MetricCard metric={mockMetric} />);
    const valueElement = screen.getByText('+2.5%');
    expect(valueElement).toHaveClass('text-positive');
  });

  it('applies negative color for negative trend', () => {
    const negativeMetric = {
      ...mockMetric,
      value: -1.5,
      trendDirection: 'down' as const,
    };
    render(<MetricCard metric={negativeMetric} />);
    const valueElement = screen.getByText('-1.5%');
    expect(valueElement).toHaveClass('text-negative');
  });

  it('shows year-over-year label', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText('year-over-year')).toBeInTheDocument();
  });

  it('shows last updated date', () => {
    render(<MetricCard metric={mockMetric} />);
    expect(screen.getByText(/Last updated: Jan 15, 2025/)).toBeInTheDocument();
  });
});
