const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02
    }
  },
  use: {
    baseURL: 'http://127.0.0.1:4173/gallery',
    trace: 'retain-on-failure'
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  webServer: {
    command: 'npx http-server -p 4173 -c-1 .',
    url: 'http://127.0.0.1:4173/gallery/index.html',
    reuseExistingServer: !process.env.CI
  }
});
