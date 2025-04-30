import { env } from '~/env'

export const isDevelopment = env.NEXT_PUBLIC_NODE_ENV === 'development'
export const isStorybook = env.NEXT_PUBLIC_STORYBOOK
