import { test, expect } from "@playwright/test";

test("music player renders controls", async ({ page }) => {
  await page.goto("/");

  const player = page.locator("div.fixed.bottom-0.left-0");
  await expect(player).toBeVisible();

  const sliders = player.locator("input[type='range']");
  await expect(sliders).toHaveCount(2);

  await expect(player.locator("button.bg-white")).toBeVisible();
});
