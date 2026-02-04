import purchasingPowerData from '@/data/metrics/purchasing-power.json';
import essentialsInflationData from '@/data/metrics/essentials-inflation.json';
import financialCushionData from '@/data/metrics/financial-cushion.json';

// Data is considered stale if older than 7 days
const STALE_THRESHOLD_DAYS = 7;

function getDaysSinceUpdate(isoString: string): number {
  const updateDate = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - updateDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function getOldestUpdate(): { date: string; daysSince: number } {
  const updates = [
    { name: 'Purchasing Power', date: purchasingPowerData.lastUpdated },
    { name: 'Essentials Inflation', date: essentialsInflationData.lastUpdated },
    { name: 'Financial Cushion', date: financialCushionData.lastUpdated },
  ];

  const oldest = updates.reduce((oldest, current) => {
    const currentTime = new Date(current.date).getTime();
    const oldestTime = new Date(oldest.date).getTime();
    return currentTime < oldestTime ? current : oldest;
  });

  return {
    date: oldest.date,
    daysSince: getDaysSinceUpdate(oldest.date),
  };
}

export function DataFreshness() {
  const { daysSince } = getOldestUpdate();
  const isStale = daysSince > STALE_THRESHOLD_DAYS;

  if (isStale) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-sm text-amber-800">
            <strong>Data may be outdated.</strong> Last updated {daysSince} days
            ago. We update metrics weekly from official sources.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span
        className="w-2 h-2 bg-positive rounded-full"
        aria-hidden="true"
      />
      <span>Data current</span>
    </div>
  );
}

export function DataFreshnessBadge() {
  const { daysSince } = getOldestUpdate();
  const isStale = daysSince > STALE_THRESHOLD_DAYS;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
        isStale
          ? 'bg-amber-100 text-amber-800'
          : 'bg-green-100 text-green-800'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isStale ? 'bg-amber-500' : 'bg-green-500'
        }`}
        aria-hidden="true"
      />
      {isStale ? `${daysSince}d old` : 'Current'}
    </span>
  );
}
