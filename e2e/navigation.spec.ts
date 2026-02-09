import { test, expect } from "@playwright/test";

test("navbar login link navigates to /login", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("link", { name: "Prijava" }).click();
  await expect(page).toHaveURL("/login");
});

test("login/register links navigate between auth pages", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("link", { name: "Registriraj se" }).click();
  await expect(page).toHaveURL("/register");

  await page.getByRole("link", { name: "Prijavi se" }).click();
  await expect(page).toHaveURL("/login");
});
