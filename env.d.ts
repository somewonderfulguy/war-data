import zod from 'zod'

const envSchema = zod.object({
  GITHUB_ID: zod.string(),
  GITHUB_SECRET: zod.string(),
  OPENAI_API_KEY: zod.string()
})

envSchema.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends zod.infer<typeof envSchema> {}
  }
}
