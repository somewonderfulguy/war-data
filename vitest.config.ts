import viteTsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [viteTsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text', 'html'],
      include: ['src/**/*'],
      exclude: ['node_modules', '.next', 'dist'],
    },
  },
})
