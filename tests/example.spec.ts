import { test, expect } from "@playwright/test";

test("should see '404'", async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto("http://localhost:3000/en/not-found");
  // The new page should contain an h1 with "Hello World!"
  await expect(page.locator("h1")).toContainText("404");
});
