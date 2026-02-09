import { test, expect } from "@playwright/test";

test("upload page redirects unauthenticated users to home", async ({ page }) => {
  await page.goto("/upload-song");

  await expect(page).toHaveURL("/");
});
