import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricSummary } from '@/components/MetricSummary';
import { Metric } from '@/lib/types';

// Mock MetricIcon component
vi.mock('@/components/MetricIcon', () => ({
  MetricIcon: ({ icon, className, 'aria-label': ariaLabel }: { icon: string; className?: string; 'aria-label'?: string }) => (
    <span data-testid="metric-icon" className={className} aria-label={ariaLabel}>{icon}</span>
  ),
}));

// Mock FontAwesomeIcon
vi.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, className }: { icon: { iconName: string }; className?: string }) => (
    <span data-testid={`fa-icon-${icon?.iconName || 'unknown'}`} className={className} />
  ),
}));

const mockMetric: Metric = {
  id: 'test-metric',
  title: 'Test Metric',
  icon: 'wallet',
  value: 2.5,
  format: 'percent',
  trendDirection: 'up',
  positiveDirection: 'up',
  lastUpdated: '2025-01-15T09:00:00-05:00',
  summary: 'This is a test summary.',
  description: 'Test description.',
  whyItMatters: 'Test why it matters.',
  commonMisinterpretation: 'Test misinterpretation.',
  howToRead: 'This explains how to read the chart.',
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
    expect(screen.getByTestId('metric-icon')).toBeInTheDocument();
  });

  it('shows upward trend indicator for positive trend', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByTestId('fa-icon-arrow-up')).toBeInTheDocument();
  });

  it('shows downward trend indicator for negative trend', () => {
    const negativeMetric = { ...mockMetric, trendDirection: 'down' as const };
    render(<MetricSummary metric={negativeMetric} />);
    expect(screen.getByTestId('fa-icon-arrow-down')).toBeInTheDocument();
  });

  it('applies neutral data color class for value display', () => {
    render(<MetricSummary metric={mockMetric} />);
    const valueElement = screen.getByText('+2.5%');
    // Now using neutral data color to avoid value judgments
    expect(valueElement).toHaveClass('text-data');
  });

  it('displays value with neutral styling regardless of trend direction', () => {
    const negativeMetric = {
      ...mockMetric,
      value: -1.5,
      trendDirection: 'down' as const,
    };
    render(<MetricSummary metric={negativeMetric} />);
    const valueElement = screen.getByText('-1.5%');
    // All values use neutral data color
    expect(valueElement).toHaveClass('text-data');
  });

  it('shows fallback indicator when isFallback is true', () => {
    const fallbackMetric = { ...mockMetric, isFallback: true };
    render(<MetricSummary metric={fallbackMetric} />);
    expect(screen.getByText('Cached data')).toBeInTheDocument();
  });

  it('does not show fallback indicator when isFallback is false', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.queryByText('Cached data')).not.toBeInTheDocument();
  });

  it('renders a link to details section', () => {
    render(<MetricSummary metric={mockMetric} />);
    const link = screen.getByText('Details');
    expect(link).toHaveAttribute('href', '#test-metric');
  });

  it('renders formatted date', () => {
    render(<MetricSummary metric={mockMetric} />);
    expect(screen.getByText('Jan 15, 2025')).toBeInTheDocument();
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
