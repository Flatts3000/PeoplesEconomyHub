import { Metric } from '@/lib/types';
import { formatValue } from '@/lib/formatters';

interface ChartFallbackProps {
  metric: Metric;
  error?: string;
}

export function ChartFallback({ metric, error }: ChartFallbackProps) {
  // Show data as a simple table when charts fail to render
  const recentData = metric.chartData.slice(-6);

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
          <p className="text-sm text-amber-800">
            Chart could not be displayed. Showing data table instead.
          </p>
        </div>
      )}

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-medium text-neutral">Period</th>
            <th className="text-right py-2 font-medium text-neutral">Value</th>
          </tr>
        </thead>
        <tbody>
          {recentData.map((point, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2 text-muted">{point.label}</td>
              <td className="py-2 text-right font-medium">
                {formatValue(point.value, metric.format)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-muted mt-4">
        Showing most recent {recentData.length} data points
      </p>
    </div>
  );
}
