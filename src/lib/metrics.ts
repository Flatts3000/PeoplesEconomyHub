import { Metric, MetricData } from './types';
import purchasingPowerData from '@/data/metrics/purchasing-power.json';
import essentialsInflationData from '@/data/metrics/essentials-inflation.json';
import financialCushionData from '@/data/metrics/financial-cushion.json';

export function getMetrics(): Metric[] {
  const data: MetricData = {
    purchasingPower: purchasingPowerData,
    essentialsInflation: essentialsInflationData,
    financialCushion: financialCushionData,
  };

  return [
    {
      id: 'purchasing-power',
      title: 'Purchasing Power of the Median Paycheck',
      icon: '💵',
      value: data.purchasingPower.value,
      format: 'percent',
      trendDirection: data.purchasingPower.value > 0 ? 'up' : 'down',
      positiveDirection: 'up',
      lastUpdated: data.purchasingPower.lastUpdated,
      summary:
        'How much more (or less) the typical paycheck buys compared to last year.',
      description:
        'This metric tracks how median take-home wages have changed after adjusting for inflation. It shows whether typical paychecks are gaining or losing real purchasing power.',
      whyItMatters:
        'While GDP and stock markets may rise, this metric shows whether ordinary workers are actually better off. It focuses on the median (middle) worker, not averages that can be skewed by high earners.',
      commonMisinterpretation:
        'This does not capture high-income households. GDP can rise even if this falls, because GDP includes corporate profits and investment gains.',
      chartData: data.purchasingPower.data.map((d) => ({
        label: d.date,
        value: d.value,
      })),
      chartType: 'line',
      isFallback: data.purchasingPower.isFallback,
    },
    {
      id: 'essentials-inflation',
      title: 'Essentials Cost Pressure',
      icon: '🏠',
      value: data.essentialsInflation.value,
      format: 'percent',
      trendDirection: data.essentialsInflation.value > 0 ? 'up' : 'down',
      positiveDirection: 'down',
      lastUpdated: data.essentialsInflation.lastUpdated,
      summary:
        'How fast prices are rising for things families cannot avoid: housing, food, energy, healthcare.',
      description:
        'This metric compares inflation on essential goods (housing, food at home, energy, transportation, healthcare) against headline CPI. It shows the gap between official inflation and what families actually feel.',
      whyItMatters:
        'Official inflation measures include things like electronics and entertainment that people can delay buying. This focuses on unavoidable expenses that consume most household budgets.',
      commonMisinterpretation:
        'This is not the official inflation rate. It specifically tracks necessities, which often rise faster than overall inflation.',
      chartData: data.essentialsInflation.data.map((d) => ({
        label: d.date,
        value: d.essentials,
      })),
      chartType: 'line',
      isFallback: data.essentialsInflation.isFallback,
    },
    {
      id: 'financial-cushion',
      title: 'Household Financial Cushion',
      icon: '🛡️',
      value: data.financialCushion.canCover400,
      format: 'percentage',
      trendDirection:
        data.financialCushion.canCover400 > 60 ? 'up' : 'down',
      positiveDirection: 'up',
      lastUpdated: data.financialCushion.lastUpdated,
      summary:
        'Share of households that could cover a $400 emergency without borrowing.',
      description:
        `In ${data.financialCushion.year}, ${data.financialCushion.canCover400}% of adults said they could cover a $400 emergency expense with cash or equivalent. ${data.financialCushion.cannotCover400}% said they could not cover such an expense at all. Only ${data.financialCushion.has3MonthSavings}% have emergency savings covering at least three months of expenses.`,
      whyItMatters:
        'Financial resilience determines whether a car repair or medical bill becomes a crisis. This metric shows how many families are one unexpected expense away from financial hardship.',
      commonMisinterpretation:
        'This measures liquid savings available for emergencies, not total wealth or retirement savings.',
      chartData: data.financialCushion.data.map((d) => ({
        label: d.year.toString(),
        value: d.canCover400,
      })),
      chartType: 'bar',
      isFallback: data.financialCushion.isFallback,
    },
  ];
}
