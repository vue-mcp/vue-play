import { defineConfig } from '@playwright/experimental-ct-vue'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  testDir: './tests',
  snapshotDir: './tests/__snapshots__',
  timeout: 10 * 1000,
  fullyParallel: true,
  workers: 2,
  use: {
    ctViteConfig: {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': '/src'
        }
      }
    }
  }
})