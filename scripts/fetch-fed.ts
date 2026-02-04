import fs from 'fs';
import path from 'path';

// Federal Reserve SHED data is published annually as a report.
// This script would typically download and parse the CSV/Excel data.
// For now, we provide a manual update mechanism.

interface SHEDData {
  year: number;
  canCover400: number;
  cannotCover400: number;
  has3MonthSavings: number;
}

// Historical SHED data (manually curated from Federal Reserve reports)
const SHED_HISTORICAL_DATA: SHEDData[] = [
  { year: 2019, canCover400: 61, cannotCover400: 12, has3MonthSavings: 52 },
  { year: 2020, canCover400: 64, cannotCover400: 14, has3MonthSavings: 54 },
  { year: 2021, canCover400: 68, cannotCover400: 11, has3MonthSavings: 58 },
  { year: 2022, canCover400: 63, cannotCover400: 13, has3MonthSavings: 54 },
  { year: 2023, canCover400: 63, cannotCover400: 13, has3MonthSavings: 54 },
  { year: 2024, canCover400: 63, cannotCover400: 13, has3MonthSavings: 55 },
];

async function main() {
  console.log('Updating Federal Reserve SHED data...');

  // Get the latest data
  const latestData = SHED_HISTORICAL_DATA[SHED_HISTORICAL_DATA.length - 1];

  const output = {
    canCover400: latestData.canCover400,
    cannotCover400: latestData.cannotCover400,
    has3MonthSavings: latestData.has3MonthSavings,
    year: latestData.year,
    data: SHED_HISTORICAL_DATA.map((d) => ({
      year: d.year,
      canCover400: d.canCover400,
    })),
    lastUpdated: new Date().toISOString(),
    isFallback: false,
  };

  const outputPath = path.join(
    process.cwd(),
    'src',
    'data',
    'metrics',
    'financial-cushion.json'
  );

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log('Financial cushion data updated.');
  console.log(`Latest year: ${latestData.year}`);
  console.log(`Can cover $400: ${latestData.canCover400}%`);
}

main();
