import { z } from 'zod';

// Shared chart data point schema
export const ChartDataPointSchema = z.object({
  date: z.string().min(1),
  value: z.number(),
});

// Purchasing Power metric schema
export const PurchasingPowerSchema = z.object({
  value: z.number().min(-50).max(50),
  data: z.array(ChartDataPointSchema).min(1),
  cumulativeValue: z.number().min(-100).max(200).optional(),
  cumulativeData: z.array(ChartDataPointSchema).optional(),
  baselineDate: z.string().optional(),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Essentials Inflation data point schema
export const EssentialsInflationDataPointSchema = z.object({
  date: z.string().min(1),
  essentials: z.number(),
  headline: z.number(),
});

// Essentials Inflation metric schema
export const EssentialsInflationSchema = z.object({
  value: z.number().min(-20).max(50),
  headlineCPI: z.number().min(-20).max(50),
  data: z.array(EssentialsInflationDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Financial Cushion data point schema
export const FinancialCushionDataPointSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  canCover400: z.number().min(0).max(100),
});

// Financial Cushion metric schema
export const FinancialCushionSchema = z.object({
  canCover400: z.number().min(0).max(100),
  cannotCover400: z.number().min(0).max(100),
  has3MonthSavings: z.number().min(0).max(100),
  year: z.number().int().min(2000).max(2100),
  data: z.array(FinancialCushionDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Income group data point schema
export const IncomeGroupDataPointSchema = z.object({
  date: z.string().min(1),
  lowIncome: z.number(),
  middleIncome: z.number(),
  highIncome: z.number(),
});

// Purchasing Power by Income schema
export const PurchasingPowerByIncomeSchema = z.object({
  lowIncome: z.object({
    value: z.number().min(-50).max(50),
    label: z.string(),
  }),
  middleIncome: z.object({
    value: z.number().min(-50).max(50),
    label: z.string(),
  }),
  highIncome: z.object({
    value: z.number().min(-50).max(50),
    label: z.string(),
  }),
  data: z.array(IncomeGroupDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Consumer Sentiment metric schema
export const ConsumerSentimentSchema = z.object({
  value: z.number().min(0).max(200),
  data: z.array(ChartDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Sahm Rule recession indicator schema
export const SahmRuleSchema = z.object({
  value: z.number().min(-5).max(10),
  isRecessionSignal: z.boolean(),
  data: z.array(ChartDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Household Debt Service Ratio schema
export const HouseholdDebtSchema = z.object({
  value: z.number().min(0).max(30),
  data: z.array(ChartDataPointSchema).min(1),
  lastUpdated: z.string().min(1),
  isFallback: z.boolean().optional(),
});

// Type exports
export type PurchasingPower = z.infer<typeof PurchasingPowerSchema>;
export type EssentialsInflation = z.infer<typeof EssentialsInflationSchema>;
export type FinancialCushion = z.infer<typeof FinancialCushionSchema>;
export type PurchasingPowerByIncome = z.infer<typeof PurchasingPowerByIncomeSchema>;
export type IncomeGroupDataPoint = z.infer<typeof IncomeGroupDataPointSchema>;
export type ConsumerSentiment = z.infer<typeof ConsumerSentimentSchema>;
export type SahmRule = z.infer<typeof SahmRuleSchema>;
export type HouseholdDebt = z.infer<typeof HouseholdDebtSchema>;

// Validation helper
export function validateData<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  metricName: string
): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errorMessages = result.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('; ');

  return {
    success: false,
    error: `${metricName} validation failed: ${errorMessages}`,
  };
}
