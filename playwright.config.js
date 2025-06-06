// npx playwright install

// npx playwright test -c playwright.config.js



import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    testMatch: '*.test.js',
    outputDir: './test-results',
    timeout: 60 * 1000, // 60s for slow playback
    expect: {
        timeout: 15000 // 15s for assertions
    },
    fullyParallel: false, // Sequential for playback visibility
    retries: 0,
    workers: 1, // Single worker for playback
    reporter: [
        ['list'],
        ['html', { outputFolder: 'e2e-report', open: 'never' }]
    ],
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'off',
        headless: false, // Visible browser
        slowMo: 500 // 500ms per action
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chromium']
            }
        }
    ]
});
