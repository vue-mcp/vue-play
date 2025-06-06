import { defineConfig, devices } from '@playwright/experimental-ct-vue'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  testDir: './tests',
  outputDir: './report',
  snapshotDir: './tests/__snapshots__',
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['list'],
    ['monocart-reporter', {
      name: 'Vue User Management CT Report',
      outputFile: 'report/index.html',
      coverage: {
        entryFilter: (entry) => true,
        sourceFilter: (sourcePath) => sourcePath.search(/src\//) !== -1,
        lcov: true,
        reports: ['v8', 'codecov']
      }
    }]
  ],
  use: {
    trace: 'on-first-retry',
    ctPort: 3100,
    ctViteConfig: {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': '/src'
        }
      }
    }
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
})