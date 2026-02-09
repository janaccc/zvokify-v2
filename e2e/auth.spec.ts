import { test, expect } from "@playwright/test";

test("login form validates required fields", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("button", { name: "Prijava" }).click();
  await expect(page.getByText("Izpolni vsa polja!")).toBeVisible();

  await expect(page.getByRole("link", { name: "Registriraj se" })).toBeVisible();
});

test("register form validates required fields", async ({ page }) => {
  await page.goto("/register");

  await page.getByRole("button", { name: "Registracija" }).click();
  await expect(page.getByText("Izpolni vsa polja!")).toBeVisible();

  await expect(page.getByRole("link", { name: "Prijavi se" })).toBeVisible();
});
