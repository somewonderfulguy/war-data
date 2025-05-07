import { type Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './src/db/schemaDb.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  tablesFilter: ['war-data_*']
} satisfies Config
