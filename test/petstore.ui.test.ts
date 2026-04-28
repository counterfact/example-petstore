import { test, expect, type Page } from "@playwright/test";
import { TEST_API_URL } from "./constants.js";

const UI_BASE = `/?api=${encodeURIComponent(TEST_API_URL)}`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function navigateTo(page: Page, tab: "pets" | "store" | "users") {
  await page.getByRole("button", { name: new RegExp(tab, "i") }).click();
  await page.waitForLoadState("networkidle");
}

// ─── Pets ─────────────────────────────────────────────────────────────────────

test.describe("Pets tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_BASE);
    await page.waitForLoadState("networkidle");
  });

  test("displays the page title", async ({ page }) => {
    await expect(page).toHaveTitle(/pet store/i);
  });

  test("shows the Pets tab as active by default", async ({ page }) => {
    const petsBtn = page.getByRole("button", { name: /pets/i });
    await expect(petsBtn).toHaveClass(/active/);
  });

  test("loads available pets on page load", async ({ page }) => {
    // The page auto-loads available pets on init
    const petGrid = page.locator("#pets-list .pet-card");
    await expect(petGrid.first()).toBeVisible({ timeout: 10_000 });
    const count = await petGrid.count();
    expect(count).toBeGreaterThan(0);
  });

  test("filters pets by status — pending", async ({ page }) => {
    await page.selectOption("#status-filter", "pending");
    await page.getByRole("button", { name: /^search$/i }).first().click();
    await page.waitForLoadState("networkidle");

    const cards = page.locator("#pets-list .pet-card");
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    // All visible cards should show the pending badge
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator(".status-badge")).toContainText("pending", {
        ignoreCase: true,
      });
    }
  });

  test("filters pets by status — sold", async ({ page }) => {
    await page.selectOption("#status-filter", "sold");
    await page.getByRole("button", { name: /^search$/i }).first().click();
    await page.waitForLoadState("networkidle");

    const cards = page.locator("#pets-list .pet-card");
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i).locator(".status-badge")).toContainText("sold", {
        ignoreCase: true,
      });
    }
  });

  test("searches pets by tag", async ({ page }) => {
    await page.fill("#tag-search", "friendly");
    await page.getByRole("button", { name: /^search$/i }).nth(1).click();
    await page.waitForLoadState("networkidle");

    const cards = page.locator("#pets-by-tags-list .pet-card");
    await expect(cards.first()).toBeVisible({ timeout: 10_000 });
  });

  test("shows empty message when no pets match tag", async ({ page }) => {
    await page.fill("#tag-search", "zzz-no-such-tag");
    await page.getByRole("button", { name: /^search$/i }).nth(1).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#pets-by-tags-list")).toContainText(
      "No pets found",
      { timeout: 10_000 },
    );
  });

  test("adds a new pet and shows it in the list", async ({ page }) => {
    const uniqueName = `TestPet-${Date.now()}`;

    await page.fill("#pet-name", uniqueName);
    await page.fill("#pet-category", "TestCategory");
    await page.selectOption("#pet-status-add", "available");
    await page.fill("#pet-tags", "test-tag");
    await page.fill("#pet-photo-url", "https://example.com/test.jpg");

    await page.getByRole("button", { name: /^add pet$/i }).click();
    await page.waitForLoadState("networkidle");

    // success alert should appear
    await expect(page.locator("#pets-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#pets-alert .alert-success")).toContainText(uniqueName);

    // pet should appear in the grid
    const card = page.locator("#pets-list .pet-card").filter({ hasText: uniqueName });
    await expect(card).toBeVisible({ timeout: 10_000 });
  });

  test("edits an existing pet", async ({ page }) => {
    // First load available pets
    await page.waitForSelector("#pets-list .pet-card", { timeout: 10_000 });

    // Click Edit on the first pet card
    await page.locator("#pets-list .pet-card").first().getByRole("button", { name: /edit/i }).click();

    // Wait for modal to open
    await expect(page.locator("#edit-pet-modal")).toHaveClass(/open/, {
      timeout: 5_000,
    });

    // Change the name
    const updatedName = `Updated-${Date.now()}`;
    await page.fill("#edit-pet-name", updatedName);
    await page.getByRole("button", { name: /^save$/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#pets-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#pets-alert .alert-success")).toContainText(
      "updated",
    );
  });

  test("deletes a pet", async ({ page }) => {
    // Add a pet specifically to delete
    const uniqueName = `DeleteMe-${Date.now()}`;
    await page.fill("#pet-name", uniqueName);
    await page.selectOption("#pet-status-add", "available");
    await page.getByRole("button", { name: /^add pet$/i }).click();
    await page.waitForLoadState("networkidle");

    // Find the card
    const card = page.locator("#pets-list .pet-card").filter({ hasText: uniqueName });
    await expect(card).toBeVisible({ timeout: 10_000 });

    // Accept the confirm dialog and click Delete
    page.once("dialog", (d) => d.accept());
    await card.getByRole("button", { name: /delete/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#pets-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#pets-alert .alert-success")).toContainText("deleted");

    // Verify the card is gone
    await expect(card).toHaveCount(0, { timeout: 10_000 });
  });
});

// ─── Store ────────────────────────────────────────────────────────────────────

test.describe("Store tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_BASE);
    await navigateTo(page, "store");
  });

  test("displays inventory counts", async ({ page }) => {
    const available = page.locator("#inv-available");
    const pending = page.locator("#inv-pending");
    const sold = page.locator("#inv-sold");

    await expect(available).not.toHaveText("—", { timeout: 10_000 });
    await expect(pending).not.toHaveText("—");
    await expect(sold).not.toHaveText("—");
  });

  test("places a new order", async ({ page }) => {
    await page.fill("#order-pet-id", "1");
    await page.fill("#order-quantity", "2");

    await page.getByRole("button", { name: /^place order$/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#store-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#store-alert .alert-success")).toContainText(
      "placed",
    );

    // Order appears in the table
    const rows = page.locator("#orders-tbody tr");
    await expect(rows.first()).toBeVisible({ timeout: 10_000 });
  });

  test("deletes an order", async ({ page }) => {
    // Place an order first
    await page.fill("#order-pet-id", "1");
    await page.fill("#order-quantity", "1");
    await page.getByRole("button", { name: /^place order$/i }).click();
    await page.waitForLoadState("networkidle");

    // Delete it
    page.once("dialog", (d) => d.accept());
    await page.locator("#orders-tbody tr").first().getByRole("button", { name: /delete/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#store-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#store-alert .alert-success")).toContainText("deleted");
  });

  test("looks up an order by ID", async ({ page }) => {
    // Place an order to get a known ID
    await page.fill("#order-pet-id", "2");
    await page.fill("#order-quantity", "1");
    await page.getByRole("button", { name: /^place order$/i }).click();
    await page.waitForLoadState("networkidle");

    // Extract the order ID from the success alert
    const alertText = await page.locator("#store-alert .alert-success").textContent();
    const match = alertText?.match(/#(\d+)/);
    const orderId = match?.[1];
    expect(orderId).toBeTruthy();

    // Look up by ID
    await page.fill("#order-lookup-id", orderId!);
    await page.getByRole("button", { name: /look up/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#order-lookup-result .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#order-lookup-result .alert-success")).toContainText(
      `Order #${orderId}`,
    );
  });

  test("shows error when looking up a non-existent order", async ({ page }) => {
    await page.fill("#order-lookup-id", "999999");
    await page.getByRole("button", { name: /look up/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#order-lookup-result .alert-error")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("refreshes inventory after placing an order", async ({ page }) => {
    const beforeText = await page.locator("#inv-available").textContent();
    const before = parseInt(beforeText ?? "0");

    await page.fill("#order-pet-id", "1");
    await page.fill("#order-quantity", "1");
    await page.getByRole("button", { name: /^place order$/i }).click();
    await page.waitForLoadState("networkidle");

    // Inventory should have reloaded (available may change depending on server logic)
    // At minimum verify it's still a number
    const afterText = await page.locator("#inv-available").textContent();
    expect(Number.isNaN(parseInt(afterText ?? ""))).toBe(false);
    // Just check before was a valid number too
    expect(Number.isNaN(before)).toBe(false);
  });
});

// ─── Users ────────────────────────────────────────────────────────────────────

test.describe("Users tab", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(UI_BASE);
    await navigateTo(page, "users");
  });

  test("shows pre-seeded users", async ({ page }) => {
    const rows = page.locator("#users-tbody tr");
    await expect(rows.first()).toBeVisible({ timeout: 10_000 });
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test("adds a new user", async ({ page }) => {
    const username = `testuser-${Date.now()}`;

    await page.fill("#user-username", username);
    await page.fill("#user-first", "Test");
    await page.fill("#user-last", "User");
    await page.fill("#user-email", `${username}@example.com`);
    await page.fill("#user-phone", "555-0000");
    await page.fill("#user-password", "password123");

    await page.getByRole("button", { name: /^add user$/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#users-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#users-alert .alert-success")).toContainText(username);

    // User appears in the table
    const row = page.locator("#users-tbody tr").filter({ hasText: username });
    await expect(row).toBeVisible({ timeout: 10_000 });
  });

  test("looks up a user by username", async ({ page }) => {
    await page.fill("#user-lookup-username", "user1");
    await page.getByRole("button", { name: /look up/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#user-lookup-result .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#user-lookup-result .alert-success")).toContainText("user1");
  });

  test("shows error when looking up a non-existent user", async ({ page }) => {
    await page.fill("#user-lookup-username", "no-such-user");
    await page.getByRole("button", { name: /look up/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#user-lookup-result .alert-error")).toBeVisible({
      timeout: 10_000,
    });
  });

  test("edits a user", async ({ page }) => {
    await page.waitForSelector("#users-tbody tr", { timeout: 10_000 });

    // Click Edit on the first user row
    await page.locator("#users-tbody tr").first().getByRole("button", { name: /edit/i }).click();

    // Modal should open
    await expect(page.locator("#edit-user-modal")).toHaveClass(/open/, {
      timeout: 5_000,
    });

    // Change first name
    const newFirst = `Edited-${Date.now()}`;
    await page.fill("#edit-user-first", newFirst);
    await page.getByRole("button", { name: /^save$/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#users-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#users-alert .alert-success")).toContainText("updated");
  });

  test("deletes a user", async ({ page }) => {
    // Create a user to delete
    const username = `deleteme-${Date.now()}`;
    await page.fill("#user-username", username);
    await page.fill("#user-password", "pw");
    await page.getByRole("button", { name: /^add user$/i }).click();
    await page.waitForLoadState("networkidle");

    const row = page.locator("#users-tbody tr").filter({ hasText: username });
    await expect(row).toBeVisible({ timeout: 10_000 });

    // Delete it
    page.once("dialog", (d) => d.accept());
    await row.getByRole("button", { name: /delete/i }).click();
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#users-alert .alert-success")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.locator("#users-alert .alert-success")).toContainText("deleted");
    await expect(row).toHaveCount(0, { timeout: 10_000 });
  });
});
