export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface IncomeGroupValue {
  value: number;
  label: string;
}

export interface IncomeGroupDataPoint {
  date: string;
  lowIncome: number;
  middleIncome: number;
  highIncome: number;
}

export interface IncomeBreakdownData {
  lowIncome: IncomeGroupValue;
  middleIncome: IncomeGroupValue;
  highIncome: IncomeGroupValue;
  data: IncomeGroupDataPoint[];
  lastUpdated: string;
  isFallback?: boolean;
}

export interface CumulativeData {
  value: number;
  data: ChartDataPoint[];
  baselineDate: string;
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
  incomeBreakdown?: IncomeBreakdownData;
  cumulativeData?: CumulativeData;
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
    cumulativeValue?: number;
    cumulativeData?: { date: string; value: number }[];
    baselineDate?: string;
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
