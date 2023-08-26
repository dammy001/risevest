import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
    exclude: ['**/node_modules/**', '**/dist/**'],
    include: ['./**/*.test.ts'],
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
  },
})
