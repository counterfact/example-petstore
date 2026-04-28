import { defineConfig, devices } from "@playwright/test";
import { TEST_API_PORT, TEST_API_URL } from "./test/constants.js";

export default defineConfig({
  testDir: "./test",
  testMatch: "**/*.ui.test.ts",
  timeout: 30_000,
  retries: 1,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:8080",
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: `npm run start:test -- --port ${TEST_API_PORT}`,
      url: `${TEST_API_URL}/store/inventory`,
      reuseExistingServer: !process.env.CI,
      timeout: 20_000,
      stdout: "ignore",
      stderr: "pipe",
    },
    {
      command: "npx serve ui --listen 8080 --no-clipboard",
      url: "http://localhost:8080",
      reuseExistingServer: !process.env.CI,
      timeout: 10_000,
      stdout: "ignore",
      stderr: "pipe",
    },
  ],
});
