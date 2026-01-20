import { expect, type Page } from "@playwright/test";

export async function e2eLogin(page: Page, email: string) {
  await page.goto("/e2e/login");
  await page.getByLabel("Email").fill(email);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/\/app/);
}

export async function getPublicPageHrefFromDashboard(page: Page) {
  const link = page.getByRole("link", { name: "View public page" }).first();
  const href = await link.getAttribute("href");
  expect(href).toBeTruthy();
  return href as string;
}
