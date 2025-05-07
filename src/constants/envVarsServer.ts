import { env } from '@/env'

export const isDevelopment = env.NODE_ENV === 'development'
export const isStorybook = env.STORYBOOK
