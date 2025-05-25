import zod from 'zod'

export const createLocalizationSchema = <T extends zod.ZodTypeAny>(
  featureSchema: T,
) => {
  return zod.object({
    common: zod.object({
      back: zod.string(),
      loading: zod.string(),
    }),
    feature: featureSchema,
  })
}
