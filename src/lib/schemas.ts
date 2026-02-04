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

// Type exports
export type PurchasingPower = z.infer<typeof PurchasingPowerSchema>;
export type EssentialsInflation = z.infer<typeof EssentialsInflationSchema>;
export type FinancialCushion = z.infer<typeof FinancialCushionSchema>;

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
