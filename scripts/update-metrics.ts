import fs from 'fs';
import path from 'path';

// This script orchestrates metric updates and validates the output

interface MetricFile {
  value: number;
  lastUpdated: string;
  isFallback?: boolean;
}

function validateMetricFile(filePath: string, name: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data: MetricFile = JSON.parse(content);

    // Check required fields
    if (typeof data.value !== 'number') {
      console.error(`${name}: Missing or invalid 'value' field`);
      return false;
    }

    if (!data.lastUpdated) {
      console.error(`${name}: Missing 'lastUpdated' field`);
      return false;
    }

    // Validate date format
    const date = new Date(data.lastUpdated);
    if (isNaN(date.getTime())) {
      console.error(`${name}: Invalid date format in 'lastUpdated'`);
      return false;
    }

    console.log(`${name}: Valid (value: ${data.value}, updated: ${data.lastUpdated})`);
    return true;
  } catch (error) {
    console.error(`${name}: Error reading file -`, error);
    return false;
  }
}

function checkDataFreshness(filePath: string, maxAgeDays: number): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data: MetricFile = JSON.parse(content);
    const lastUpdated = new Date(data.lastUpdated);
    const now = new Date();
    const ageDays = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

    if (ageDays > maxAgeDays) {
      console.warn(
        `Warning: Data is ${Math.round(ageDays)} days old (max: ${maxAgeDays})`
      );
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log('Validating metric files...\n');

  const metricsDir = path.join(process.cwd(), 'src', 'data', 'metrics');

  const metrics = [
    { file: 'purchasing-power.json', name: 'Purchasing Power', maxAge: 120 },
    { file: 'essentials-inflation.json', name: 'Essentials Inflation', maxAge: 45 },
    { file: 'financial-cushion.json', name: 'Financial Cushion', maxAge: 400 },
  ];

  let allValid = true;

  for (const metric of metrics) {
    const filePath = path.join(metricsDir, metric.file);

    if (!fs.existsSync(filePath)) {
      console.error(`${metric.name}: File not found at ${filePath}`);
      allValid = false;
      continue;
    }

    const isValid = validateMetricFile(filePath, metric.name);
    if (!isValid) {
      allValid = false;
    }

    checkDataFreshness(filePath, metric.maxAge);
  }

  console.log('\n---');

  if (allValid) {
    console.log('All metric files are valid.');
  } else {
    console.error('Some metric files have validation errors.');
    process.exit(1);
  }
}

main();
