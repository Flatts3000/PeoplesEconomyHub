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
  const chartData = {
    labels: metric.chartData.map((d) => d.label),
    datasets: [
      {
        label: metric.title,
        data: metric.chartData.map((d) => d.value),
        borderColor:
          metric.positiveDirection === 'up' ? '#047857' : '#b91c1c',
        backgroundColor:
          metric.positiveDirection === 'up'
            ? 'rgba(4, 120, 87, 0.1)'
            : 'rgba(185, 28, 28, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

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
        beginAtZero: metric.format === 'percentage',
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
