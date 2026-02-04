export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface Metric {
  id: string;
  title: string;
  icon: string;
  value: number;
  format: 'percent' | 'percentage';
  trendDirection: 'up' | 'down' | 'flat';
  positiveDirection: 'up' | 'down';
  lastUpdated: string;
  summary: string;
  description: string;
  whyItMatters: string;
  commonMisinterpretation: string;
  howToRead: string;
  chartData: ChartDataPoint[];
  chartType: 'line' | 'bar';
  isFallback?: boolean;
  fallbackDate?: string;
  fallbackReason?: string;
}

export interface BLSResponse {
  status: string;
  responseTime: number;
  message: string[];
  Results: {
    series: BLSSeries[];
  };
}

export interface BLSSeries {
  seriesID: string;
  data: BLSDataPoint[];
}

export interface BLSDataPoint {
  year: string;
  period: string;
  periodName: string;
  value: string;
  footnotes: { code: string; text: string }[];
}

export interface MetricData {
  purchasingPower: {
    value: number;
    data: { date: string; value: number }[];
    lastUpdated: string;
    isFallback?: boolean;
  };
  essentialsInflation: {
    value: number;
    headlineCPI: number;
    data: { date: string; essentials: number; headline: number }[];
    lastUpdated: string;
    isFallback?: boolean;
  };
  financialCushion: {
    canCover400: number;
    cannotCover400: number;
    has3MonthSavings: number;
    year: number;
    data: { year: number; canCover400: number }[];
    lastUpdated: string;
    isFallback?: boolean;
  };
}
