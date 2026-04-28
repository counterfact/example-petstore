/**
 * Shared test configuration constants.
 *
 * Import these in both playwright.config.ts and UI test files
 * to ensure the API URL is defined in a single place.
 */

export const TEST_API_PORT = parseInt(process.env.TEST_API_PORT ?? "3101", 10);
export const TEST_API_URL = `http://localhost:${TEST_API_PORT}`;
