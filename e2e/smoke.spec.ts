import { expect, test } from "@playwright/test";

test("renders E2E routes", async ({ page }) => {
  await page.goto("/e2e");
  await expect(page.getByRole("heading", { name: "E2E OK" })).toBeVisible();

  await page.goto("/e2e/login");
  await expect(page.getByRole("heading", { name: "E2E Login" })).toBeVisible();
});
