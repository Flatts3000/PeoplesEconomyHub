import { Metric, MetricData } from './types';
import purchasingPowerData from '@/data/metrics/purchasing-power.json';
import essentialsInflationData from '@/data/metrics/essentials-inflation.json';
import financialCushionData from '@/data/metrics/financial-cushion.json';
import consumerSentimentData from '@/data/metrics/consumer-sentiment.json';
import sahmRuleData from '@/data/metrics/sahm-rule.json';
import householdDebtData from '@/data/metrics/household-debt.json';

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
      icon: 'wallet',
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
      howToRead:
        'The line shows year-over-year change in real (inflation-adjusted) median wages. Above zero (green zone) means paychecks buy more than last year. Below zero (red zone) means purchasing power is falling. Look for sustained trends rather than single quarters.',
      chartData: data.purchasingPower.data.map((d) => ({
        label: d.date,
        value: d.value,
      })),
      chartType: 'line',
      isFallback: data.purchasingPower.isFallback,
      cumulativeData: data.purchasingPower.cumulativeData && data.purchasingPower.baselineDate ? {
        value: data.purchasingPower.cumulativeValue ?? 0,
        data: data.purchasingPower.cumulativeData.map((d) => ({
          label: d.date,
          value: d.value,
        })),
        baselineDate: data.purchasingPower.baselineDate,
      } : undefined,
    },
    {
      id: 'essentials-inflation',
      title: 'Essentials Cost Pressure',
      icon: 'cart-shopping',
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
      howToRead:
        'The line shows the year-over-year inflation rate for essential goods. Higher values mean prices are rising faster. Compare to headline CPI (shown in methodology) to see if essentials are outpacing overall inflation. Values above 3% indicate significant cost pressure on household budgets.',
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
      icon: 'piggy-bank',
      value: data.financialCushion.canCover400,
      format: 'percentage',
      trendDirection:
        data.financialCushion.canCover400 >= 80 ? 'up' : 'down',
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
      howToRead:
        'Each bar shows the percentage of adults who could cover a $400 emergency with cash or savings. Taller bars indicate greater financial resilience. Look for year-over-year trends: rising bars suggest improving household finances, while falling bars indicate growing financial vulnerability.',
      chartData: data.financialCushion.data.map((d) => ({
        label: d.year.toString(),
        value: d.canCover400,
      })),
      chartType: 'bar',
      isFallback: data.financialCushion.isFallback,
    },
    {
      id: 'consumer-sentiment',
      title: 'Consumer Sentiment',
      icon: 'face-smile',
      value: consumerSentimentData.value,
      format: 'percentage',
      trendDirection: consumerSentimentData.value >= 80 ? 'up' : consumerSentimentData.value >= 60 ? 'flat' : 'down',
      positiveDirection: 'up',
      lastUpdated: consumerSentimentData.lastUpdated,
      summary:
        'How optimistic or pessimistic Americans feel about the economy.',
      description:
        'The University of Michigan Consumer Sentiment Index measures how confident people feel about their personal finances and the broader economy. It surveys households about current conditions and expectations for the future.',
      whyItMatters:
        'Consumer sentiment drives spending decisions. When people feel pessimistic, they cut back on purchases, which can slow the economy. It often predicts economic turning points before they show up in other data.',
      commonMisinterpretation:
        'This measures feelings, not facts. Sentiment can diverge from actual economic conditions due to media coverage, political views, or recent experiences.',
      howToRead:
        'Values above 80 indicate optimism; below 60 suggests pessimism. The index is calibrated so that 100 represents 1966 sentiment levels. Watch for sustained trends rather than single-month moves.',
      chartData: consumerSentimentData.data.map((d) => ({
        label: d.date,
        value: d.value,
      })),
      chartType: 'line',
      isFallback: consumerSentimentData.isFallback,
    },
    {
      id: 'sahm-rule',
      title: 'Recession Risk Indicator',
      icon: 'triangle-exclamation',
      value: sahmRuleData.value,
      format: 'percent',
      trendDirection: sahmRuleData.value >= 0.5 ? 'up' : 'down',
      positiveDirection: 'down',
      lastUpdated: sahmRuleData.lastUpdated,
      summary:
        sahmRuleData.isRecessionSignal
          ? 'The Sahm Rule is currently signaling elevated recession risk.'
          : 'The Sahm Rule is not currently signaling a recession.',
      description:
        'The Sahm Rule triggers when the 3-month average unemployment rate rises 0.5 percentage points above its low from the prior 12 months. Created by economist Claudia Sahm, it has accurately identified every U.S. recession since 1970.',
      whyItMatters:
        'This is an early warning signal. Unlike GDP (which is reported with a lag), the Sahm Rule uses real-time unemployment data to detect recessions as they begin, not months later.',
      commonMisinterpretation:
        'A trigger does not guarantee a deep recession. It signals that labor market conditions are deteriorating in a way historically consistent with recessions.',
      howToRead:
        'The threshold is 0.50. When the indicator crosses above this line, it signals recession risk. Values below 0.30 suggest a healthy labor market. The 2024 spike above 0.50 was unusual as it did not lead to a declared recession.',
      chartData: sahmRuleData.data.map((d) => ({
        label: d.date,
        value: d.value,
      })),
      chartType: 'line',
      isFallback: sahmRuleData.isFallback,
    },
    {
      id: 'household-debt',
      title: 'Household Debt Burden',
      icon: 'credit-card',
      value: householdDebtData.value,
      format: 'percent',
      trendDirection: householdDebtData.value > 10 ? 'up' : 'down',
      positiveDirection: 'down',
      lastUpdated: householdDebtData.lastUpdated,
      summary:
        'What share of household income goes to paying debts.',
      description:
        'The Household Debt Service Ratio shows the percentage of disposable income that goes toward mortgage and consumer debt payments. It indicates how stretched household budgets are by debt obligations.',
      whyItMatters:
        'High debt burdens leave families vulnerable to income shocks. If job loss or unexpected expenses hit, there is less room in the budget to absorb them. Rising debt service ratios can also constrain consumer spending.',
      commonMisinterpretation:
        'This measures required debt payments, not total debt. Low interest rates can reduce debt service even as total debt rises. It also excludes rent, which is a major expense for non-homeowners.',
      howToRead:
        'Values around 10% are historically normal. Above 12% indicates significant debt stress (like the 2007-2008 period). Below 9% suggests households have more financial flexibility. Current low rates reflect both deleveraging since 2008 and low interest rates.',
      chartData: householdDebtData.data.map((d) => ({
        label: d.date,
        value: d.value,
      })),
      chartType: 'line',
      isFallback: householdDebtData.isFallback,
    },
  ];
}
