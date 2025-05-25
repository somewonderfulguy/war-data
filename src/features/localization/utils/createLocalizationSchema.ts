import zod from 'zod'

/**
 * Reusable schema creator to extend with common translations
 */
export const createLocalizationSchema = <T extends zod.ZodRawShape>(
  featureSchema: T,
) => {
  return zod
    .object({
      common: zod.object({
        toggleSidebar: zod.string(),
      }),
    })
    .extend(featureSchema)
}
