import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import './src/env'

const nextConfig: NextConfig = {}

const withNextIntl = createNextIntlPlugin('./src/features/localization/request.ts')
export default withNextIntl(nextConfig)
