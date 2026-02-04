'use client';

import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import { Metric } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MetricChartProps {
  metric: Metric;
}

export function MetricChart({ metric }: MetricChartProps) {
  const isBarChart = metric.chartType === 'bar';

  // Use neutral blue to avoid value judgments
  const borderColor = '#1e40af'; // blue-800
  const backgroundColor = isBarChart
    ? '#3b82f6' // blue-500 solid for bars
    : 'rgba(30, 64, 175, 0.15)'; // blue-800 transparent for line fill

  const chartData = {
    labels: metric.chartData.map((d) => d.label),
    datasets: [
      {
        label: metric.title,
        data: metric.chartData.map((d) => d.value),
        borderColor,
        backgroundColor,
        tension: 0.3,
        fill: true,
        borderRadius: isBarChart ? 4 : 0,
      },
    ],
  };

  // Calculate smart Y-axis bounds for percentage data
  const values = metric.chartData.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // For percentage data (like financial cushion), use a tighter range
  // that shows variation while keeping context
  const isPercentageData = metric.format === 'percentage';
  const padding = isPercentageData ? 10 : 0;
  const suggestedMin = isPercentageData
    ? Math.max(0, Math.floor((minValue - padding) / 10) * 10)
    : undefined;
  const suggestedMax = isPercentageData
    ? Math.min(100, Math.ceil((maxValue + padding) / 10) * 10)
    : undefined;

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'> | TooltipItem<'bar'>) => {
            const value = context.parsed.y ?? 0;
            return metric.format === 'percent'
              ? `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
              : `${value.toFixed(0)}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin,
        suggestedMax,
        ticks: {
          callback: (value: string | number) => {
            const numValue = typeof value === 'string' ? parseFloat(value) : value;
            return metric.format === 'percent'
              ? `${numValue > 0 ? '+' : ''}${numValue}%`
              : `${numValue}%`;
          },
        },
      },
    },
  } as const;

  // Use bar chart for financial cushion (percentage), line chart for others
  if (metric.chartType === 'bar') {
    return (
      <div className="w-full max-w-md" role="img" aria-label={`Chart showing ${metric.title} over time`}>
        <Bar data={chartData} options={options} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md" role="img" aria-label={`Chart showing ${metric.title} over time`}>
      <Line data={chartData} options={options} />
    </div>
  );
}
