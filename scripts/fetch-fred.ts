import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const FRED_API_URL = 'https://api.stlouisfed.org/fred/series/observations';
const FRED_API_KEY = process.env.FRED_API_KEY;

// FRED Series IDs
const SERIES = {
  CONSUMER_SENTIMENT: 'UMCSENT',
  SAHM_RULE: 'SAHMREALTIME',
  HOUSEHOLD_DEBT_SERVICE: 'TDSP',
};

// Validation schemas
const FredDataPointSchema = z.object({
  date: z.string().min(1),
  value: z.number(),
});

const ConsumerSentimentSchema = z.object({
  value: z.number().min(0).max(200),
  data: z.array(FredDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

const SahmRuleSchema = z.object({
  value: z.number().min(-5).max(10),
  isRecessionSignal: z.boolean(),
  data: z.array(FredDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

const HouseholdDebtSchema = z.object({
  value: z.number().min(0).max(30),
  data: z.array(FredDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

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

interface FredObservation {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
}

interface FredResponse {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  observations: FredObservation[];
}

async function fetchFredSeries(
  seriesId: string,
  startDate: string,
  endDate: string
): Promise<FredObservation[]> {
  return withRetry(async () => {
    const params = new URLSearchParams({
      series_id: seriesId,
      api_key: FRED_API_KEY || '',
      file_type: 'json',
      observation_start: startDate,
      observation_end: endDate,
      sort_order: 'asc',
    });

    const url = `${FRED_API_URL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`FRED API error: ${response.status} ${response.statusText}`);
    }

    const data: FredResponse = await response.json();
    return data.observations;
  }, `FRED API fetch (${seriesId})`);
}

function parseObservations(
  observations: FredObservation[]
): { date: string; value: number }[] {
  return observations
    .filter((obs) => obs.value !== '.' && obs.value !== '')
    .map((obs) => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }))
    .filter((d) => !isNaN(d.value));
}

function formatDateLabel(dateStr: string, frequency: 'monthly' | 'quarterly'): string {
  const date = new Date(dateStr);
  if (frequency === 'monthly') {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } else {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    return `Q${quarter} ${date.getFullYear()}`;
  }
}

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

async function main() {
  if (!FRED_API_KEY) {
    console.error('Error: FRED_API_KEY environment variable is required.');
    console.error('Get a free API key at: https://fred.stlouisfed.org/docs/api/api_key.html');
    process.exit(1);
  }

  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  console.log(`Fetching FRED data from ${startDate} to ${endDate}...`);

  const metricsDir = path.join(process.cwd(), 'src', 'data', 'metrics');

  try {
    // 1. Consumer Sentiment (UMCSENT) - Monthly
    console.log('\nFetching Consumer Sentiment (UMCSENT)...');
    const sentimentObs = await fetchFredSeries(SERIES.CONSUMER_SENTIMENT, startDate, endDate);
    const sentimentData = parseObservations(sentimentObs);

    const sentimentFormatted = sentimentData.map((d) => ({
      date: formatDateLabel(d.date, 'monthly'),
      value: parseFloat(d.value.toFixed(1)),
    }));

    const latestSentiment = sentimentFormatted[sentimentFormatted.length - 1];

    const consumerSentimentOutput = {
      value: latestSentiment?.value ?? 0,
      data: sentimentFormatted.slice(-36), // Last 3 years
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    validateAndWrite(
      consumerSentimentOutput,
      ConsumerSentimentSchema,
      path.join(metricsDir, 'consumer-sentiment.json'),
      'Consumer Sentiment'
    );

    // 2. Sahm Rule Recession Indicator (SAHMREALTIME) - Monthly
    console.log('\nFetching Sahm Rule (SAHMREALTIME)...');
    const sahmObs = await fetchFredSeries(SERIES.SAHM_RULE, startDate, endDate);
    const sahmData = parseObservations(sahmObs);

    const sahmFormatted = sahmData.map((d) => ({
      date: formatDateLabel(d.date, 'monthly'),
      value: parseFloat(d.value.toFixed(2)),
    }));

    const latestSahm = sahmFormatted[sahmFormatted.length - 1];
    // Sahm Rule triggers recession signal when value >= 0.5
    const isRecessionSignal = (latestSahm?.value ?? 0) >= 0.5;

    const sahmRuleOutput = {
      value: latestSahm?.value ?? 0,
      isRecessionSignal,
      data: sahmFormatted.slice(-36), // Last 3 years
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    validateAndWrite(
      sahmRuleOutput,
      SahmRuleSchema,
      path.join(metricsDir, 'sahm-rule.json'),
      'Sahm Rule'
    );

    // 3. Household Debt Service Ratio (TDSP) - Quarterly
    console.log('\nFetching Household Debt Service Ratio (TDSP)...');
    const debtObs = await fetchFredSeries(SERIES.HOUSEHOLD_DEBT_SERVICE, startDate, endDate);
    const debtData = parseObservations(debtObs);

    const debtFormatted = debtData.map((d) => ({
      date: formatDateLabel(d.date, 'quarterly'),
      value: parseFloat(d.value.toFixed(1)),
    }));

    const latestDebt = debtFormatted[debtFormatted.length - 1];

    const householdDebtOutput = {
      value: latestDebt?.value ?? 0,
      data: debtFormatted.slice(-24), // Last 6 years (quarterly)
      lastUpdated: new Date().toISOString(),
      isFallback: false,
    };

    validateAndWrite(
      householdDebtOutput,
      HouseholdDebtSchema,
      path.join(metricsDir, 'household-debt.json'),
      'Household Debt Service Ratio'
    );

    console.log('\nFRED data fetch complete!');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching FRED data:', errorMessage);
    process.exit(1);
  }
}

main();
