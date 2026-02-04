import fs from 'fs';
import path from 'path';

interface PurchasingPowerData {
  value: number;
  data: { date: string; value: number }[];
  lastUpdated: string;
  isFallback?: boolean;
}

interface EssentialsInflationData {
  value: number;
  headlineCPI: number;
  data: { date: string; essentials: number; headline: number }[];
  lastUpdated: string;
  isFallback?: boolean;
}

interface FinancialCushionData {
  canCover400: number;
  cannotCover400: number;
  has3MonthSavings: number;
  year: number;
  data: { year: number; canCover400: number }[];
  lastUpdated: string;
  isFallback?: boolean;
}

function validatePurchasingPower(data: PurchasingPowerData): string[] {
  const errors: string[] = [];

  if (typeof data.value !== 'number') {
    errors.push('value must be a number');
  } else if (data.value < -50 || data.value > 50) {
    errors.push('value seems unrealistic (should be between -50% and +50%)');
  }

  if (!Array.isArray(data.data)) {
    errors.push('data must be an array');
  } else {
    for (const point of data.data) {
      if (!point.date || typeof point.value !== 'number') {
        errors.push('data points must have date and value');
        break;
      }
    }
  }

  return errors;
}

function validateEssentialsInflation(data: EssentialsInflationData): string[] {
  const errors: string[] = [];

  if (typeof data.value !== 'number') {
    errors.push('value must be a number');
  } else if (data.value < -10 || data.value > 30) {
    errors.push('value seems unrealistic (should be between -10% and +30%)');
  }

  if (typeof data.headlineCPI !== 'number') {
    errors.push('headlineCPI must be a number');
  }

  if (!Array.isArray(data.data)) {
    errors.push('data must be an array');
  }

  return errors;
}

function validateFinancialCushion(data: FinancialCushionData): string[] {
  const errors: string[] = [];

  if (typeof data.canCover400 !== 'number') {
    errors.push('canCover400 must be a number');
  } else if (data.canCover400 < 0 || data.canCover400 > 100) {
    errors.push('canCover400 must be between 0 and 100');
  }

  if (typeof data.cannotCover400 !== 'number') {
    errors.push('cannotCover400 must be a number');
  }

  if (typeof data.has3MonthSavings !== 'number') {
    errors.push('has3MonthSavings must be a number');
  }

  if (typeof data.year !== 'number') {
    errors.push('year must be a number');
  } else if (data.year < 2010 || data.year > 2030) {
    errors.push('year seems unrealistic');
  }

  return errors;
}

async function main() {
  console.log('Validating data files...\n');

  const metricsDir = path.join(process.cwd(), 'src', 'data', 'metrics');
  let hasErrors = false;

  // Validate purchasing power
  const ppPath = path.join(metricsDir, 'purchasing-power.json');
  if (fs.existsSync(ppPath)) {
    const ppData: PurchasingPowerData = JSON.parse(fs.readFileSync(ppPath, 'utf-8'));
    const ppErrors = validatePurchasingPower(ppData);
    if (ppErrors.length > 0) {
      console.error('Purchasing Power errors:', ppErrors);
      hasErrors = true;
    } else {
      console.log('Purchasing Power: Valid');
    }
  } else {
    console.error('Purchasing Power: File not found');
    hasErrors = true;
  }

  // Validate essentials inflation
  const eiPath = path.join(metricsDir, 'essentials-inflation.json');
  if (fs.existsSync(eiPath)) {
    const eiData: EssentialsInflationData = JSON.parse(fs.readFileSync(eiPath, 'utf-8'));
    const eiErrors = validateEssentialsInflation(eiData);
    if (eiErrors.length > 0) {
      console.error('Essentials Inflation errors:', eiErrors);
      hasErrors = true;
    } else {
      console.log('Essentials Inflation: Valid');
    }
  } else {
    console.error('Essentials Inflation: File not found');
    hasErrors = true;
  }

  // Validate financial cushion
  const fcPath = path.join(metricsDir, 'financial-cushion.json');
  if (fs.existsSync(fcPath)) {
    const fcData: FinancialCushionData = JSON.parse(fs.readFileSync(fcPath, 'utf-8'));
    const fcErrors = validateFinancialCushion(fcData);
    if (fcErrors.length > 0) {
      console.error('Financial Cushion errors:', fcErrors);
      hasErrors = true;
    } else {
      console.log('Financial Cushion: Valid');
    }
  } else {
    console.error('Financial Cushion: File not found');
    hasErrors = true;
  }

  console.log('\n---');

  if (hasErrors) {
    console.error('Validation failed.');
    process.exit(1);
  } else {
    console.log('All data files are valid.');
  }
}

main();
