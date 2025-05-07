import zod from 'zod'

export const loginEmailSchema = zod.object({
  email: zod.string().trim().email('auth.emailWrong')
})

export type LoginEmailSchema = zod.infer<typeof loginEmailSchema>
