import fs from 'fs';
import path from 'path';
import { z } from 'zod';

const BLS_API_URL = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';

// Validation schemas (inline to avoid import issues with tsx runner)
const ChartDataPointSchema = z.object({
  date: z.string().min(1),
  value: z.number(),
});

const PurchasingPowerSchema = z.object({
  value: z.number().min(-50).max(50),
  data: z.array(ChartDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

const EssentialsInflationDataPointSchema = z.object({
  date: z.string().min(1),
  essentials: z.number(),
  headline: z.number(),
});

const EssentialsInflationSchema = z.object({
  value: z.number().min(-20).max(50),
  headlineCPI: z.number().min(-20).max(50),
  data: z.array(EssentialsInflationDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

function validateAndWrite<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  filePath: string,
  metricName: string
): boolean {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    console.error(`Validation failed for ${metricName}:\n${errors}`);
    return false;
  }

  fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2));
  console.log(`${metricName} data validated and saved.`);
  return true;
}
const BLS_API_KEY = process.env.BLS_API_KEY;

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;
const MAX_DELAY_MS = 10000;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === MAX_RETRIES) {
        console.error(`${operationName} failed after ${MAX_RETRIES} attempts`);
        throw lastError;
      }

      const delay = Math.min(INITIAL_DELAY_MS * Math.pow(2, attempt - 1), MAX_DELAY_MS);
      console.warn(
        `${operationName} attempt ${attempt} failed: ${lastError.message}. ` +
        `Retrying in ${delay}ms...`
      );
      await sleep(delay);
    }
  }

  throw lastError;
}

// BLS Series IDs
const SERIES = {
  MEDIAN_WEEKLY_EARNINGS: 'LEU0252881500',
  CPI_ALL_ITEMS: 'CUUR0000SA0',
  CPI_SHELTER: 'CUUR0000SAH1',
  CPI_FOOD_AT_HOME: 'CUUR0000SAF11',
  CPI_ENERGY: 'CUUR0000SA0E',
  CPI_TRANSPORTATION: 'CUUR0000SAT1',
  CPI_MEDICAL_CARE: 'CUUR0000SAM',
};

interface BLSResponse {
  status: string;
  responseTime: number;
  message: string[];
  Results: {
    series: {
      seriesID: string;
      data: {
        year: string;
        period: string;
        periodName: string;
        value: string;
        footnotes: { code: string; text: string }[];
      }[];
    }[];
  };
}

async function fetchBLSSeries(
  seriesIds: string[],
  startYear: number,
  endYear: number
): Promise<BLSResponse> {
  return withRetry(async () => {
    const body = {
      seriesid: seriesIds,
      startyear: startYear.toString(),
      endyear: endYear.toString(),
      registrationkey: BLS_API_KEY,
    };

    const response = await fetch(BLS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const isRetryable = response.status >= 500 || response.status === 429;
      const error = new Error(
        `BLS API error: ${response.status} ${response.statusText}`
      );
      if (!isRetryable) {
        // Don't retry client errors (4xx except 429)
        throw Object.assign(error, { noRetry: true });
      }
      throw error;
    }

    const data = await response.json();

    if (data.status !== 'REQUEST_SUCCEEDED') {
      throw new Error(`BLS API request failed: ${data.message?.join(', ') || 'Unknown error'}`);
    }

    return data;
  }, 'BLS API fetch');
}

function parseQuarterlyData(
  data: BLSResponse['Results']['series'][0]['data']
): { date: string; value: number }[] {
  // Filter to Q1 data points (M01, M02, M03 average or just use quarterly)
  const quarterlyData: { date: string; value: number }[] = [];

  // Group by year and quarter
  const grouped = new Map<string, number[]>();

  for (const point of data) {
    const year = point.year;
    const month = parseInt(point.period.replace('M', ''));
    const quarter = Math.ceil(month / 3);
    const key = `Q${quarter} ${year}`;

    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(parseFloat(point.value));
  }

  // Average each quarter
  for (const [key, values] of grouped) {
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    quarterlyData.push({ date: key, value: avg });
  }

  // Sort by date
  return quarterlyData.sort((a, b) => {
    const [aq, ay] = a.date.split(' ');
    const [bq, by] = b.date.split(' ');
    const yearDiff = parseInt(ay) - parseInt(by);
    if (yearDiff !== 0) return yearDiff;
    return parseInt(aq.replace('Q', '')) - parseInt(bq.replace('Q', ''));
  });
}

function parseMonthlyData(
  data: BLSResponse['Results']['series'][0]['data']
): { date: string; value: number }[] {
  return data
    .map((point) => ({
      date: `${point.periodName} ${point.year}`,
      value: parseFloat(point.value),
    }))
    .reverse();
}

async function main() {
  if (!BLS_API_KEY) {
    console.warn('Warning: BLS_API_KEY not set. Using unauthenticated requests.');
  }

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 5;

  console.log(`Fetching BLS data from ${startYear} to ${currentYear}...`);

  try {
    // Fetch all series with automatic retry
    const response = await fetchBLSSeries(
      Object.values(SERIES),
      startYear,
      currentYear
    );

    // Parse series data
    const seriesData = new Map<string, BLSResponse['Results']['series'][0]['data']>();
    for (const series of response.Results.series) {
      seriesData.set(series.seriesID, series.data);
    }

    // Save raw data for processing
    const rawDataDir = path.join(process.cwd(), 'src', 'data', 'raw');
    if (!fs.existsSync(rawDataDir)) {
      fs.mkdirSync(rawDataDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(rawDataDir, 'bls-response.json'),
      JSON.stringify(response, null, 2)
    );

    console.log('BLS data fetched successfully!');
    console.log(`Series fetched: ${response.Results.series.length}`);

    // Process purchasing power data
    const earningsData = seriesData.get(SERIES.MEDIAN_WEEKLY_EARNINGS);
    const cpiData = seriesData.get(SERIES.CPI_ALL_ITEMS);

    if (earningsData && cpiData) {
      const earningsQuarterly = parseQuarterlyData(earningsData);
      const cpiQuarterly = parseQuarterlyData(cpiData);

      // Calculate real wages
      const realWages = earningsQuarterly.map((earning) => {
        const cpi = cpiQuarterly.find((c) => c.date === earning.date);
        const realValue = cpi ? earning.value / (cpi.value / 100) : earning.value;
        return { date: earning.date, value: realValue };
      });

      // Calculate YoY change
      const yoyChanges = realWages.slice(4).map((current, i) => {
        const prior = realWages[i];
        const change = ((current.value - prior.value) / prior.value) * 100;
        return { date: current.date, value: parseFloat(change.toFixed(1)) };
      });

      const latestValue = yoyChanges[yoyChanges.length - 1]?.value ?? 0;

      const purchasingPowerOutput = {
        value: latestValue,
        data: yoyChanges.slice(-20),
        lastUpdated: new Date().toISOString(),
        isFallback: false,
      };

      const purchasingPowerPath = path.join(
        process.cwd(),
        'src',
        'data',
        'metrics',
        'purchasing-power.json'
      );

      validateAndWrite(
        purchasingPowerOutput,
        PurchasingPowerSchema,
        purchasingPowerPath,
        'Purchasing Power'
      );
    }

    // Process essentials inflation data
    const shelterData = seriesData.get(SERIES.CPI_SHELTER);
    const foodData = seriesData.get(SERIES.CPI_FOOD_AT_HOME);
    const energyData = seriesData.get(SERIES.CPI_ENERGY);
    const transportData = seriesData.get(SERIES.CPI_TRANSPORTATION);
    const medicalData = seriesData.get(SERIES.CPI_MEDICAL_CARE);
    const headlineData = seriesData.get(SERIES.CPI_ALL_ITEMS);

    if (shelterData && foodData && energyData && transportData && medicalData && headlineData) {
      const weights = {
        shelter: 0.33,
        food: 0.13,
        energy: 0.07,
        transport: 0.17,
        medical: 0.08,
      };
      const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

      const shelterMonthly = parseMonthlyData(shelterData);
      const foodMonthly = parseMonthlyData(foodData);
      const energyMonthly = parseMonthlyData(energyData);
      const transportMonthly = parseMonthlyData(transportData);
      const medicalMonthly = parseMonthlyData(medicalData);
      const headlineMonthly = parseMonthlyData(headlineData);

      const calculateYoY = (data: { value: number }[], index: number) => {
        if (index < 12) return 0;
        const current = data[index].value;
        const prior = data[index - 12].value;
        return ((current - prior) / prior) * 100;
      };

      const essentialsData = shelterMonthly.slice(12).map((_, i) => {
        const idx = i + 12;
        const shelterYoY = calculateYoY(shelterMonthly, idx);
        const foodYoY = calculateYoY(foodMonthly, idx);
        const energyYoY = calculateYoY(energyMonthly, idx);
        const transportYoY = calculateYoY(transportMonthly, idx);
        const medicalYoY = calculateYoY(medicalMonthly, idx);
        const headlineYoY = calculateYoY(headlineMonthly, idx);

        const essentialsYoY =
          (weights.shelter * shelterYoY +
            weights.food * foodYoY +
            weights.energy * energyYoY +
            weights.transport * transportYoY +
            weights.medical * medicalYoY) /
          totalWeight;

        return {
          date: shelterMonthly[idx].date,
          essentials: parseFloat(essentialsYoY.toFixed(1)),
          headline: parseFloat(headlineYoY.toFixed(1)),
        };
      });

      const latestEssentials = essentialsData[essentialsData.length - 1];

      const essentialsOutput = {
        value: latestEssentials?.essentials ?? 0,
        headlineCPI: latestEssentials?.headline ?? 0,
        data: essentialsData.slice(-12),
        lastUpdated: new Date().toISOString(),
        isFallback: false,
      };

      const essentialsPath = path.join(
        process.cwd(),
        'src',
        'data',
        'metrics',
        'essentials-inflation.json'
      );

      validateAndWrite(
        essentialsOutput,
        EssentialsInflationSchema,
        essentialsPath,
        'Essentials Inflation'
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching BLS data:', errorMessage);

    // Check if fallback data exists
    const purchasingPowerPath = path.join(
      process.cwd(),
      'src',
      'data',
      'metrics',
      'purchasing-power.json'
    );
    const essentialsPath = path.join(
      process.cwd(),
      'src',
      'data',
      'metrics',
      'essentials-inflation.json'
    );

    if (fs.existsSync(purchasingPowerPath) && fs.existsSync(essentialsPath)) {
      console.log('Existing data files preserved. Using cached data.');
      // Mark existing data as potentially stale
      process.exit(0);
    }

    process.exit(1);
  }
}

main();
