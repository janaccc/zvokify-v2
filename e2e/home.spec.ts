import { test, expect } from "@playwright/test";

test("home page loads and shows login entrypoint", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Prijava" })).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
});
