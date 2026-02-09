import { test, expect } from "@playwright/test";

test("home shows sidebar login prompt when unauthenticated", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Prijavite se" })).toBeVisible();
});

test("navbar search input accepts text", async ({ page }) => {
  await page.goto("/");

  const searchInput = page.locator("nav input[type='text']").first();
  await searchInput.fill("test");
  await expect(searchInput).toHaveValue("test");
});
