import { test, expect } from "@playwright/experimental-ct-react";
import LoginForm from "@/components/LoginForm";

test("renders inputs and button", async ({ mount }) => {
  const component = await mount(<LoginForm />);
  await expect(component.getByPlaceholder("Vnesi E-Mail")).toBeVisible();
  await expect(component.getByPlaceholder("Vnesi geslo")).toBeVisible();
  await expect(component.getByRole("button", { name: "Prijava" })).toBeVisible();
});

test("shows error when submitting empty form", async ({ mount }) => {
  const component = await mount(<LoginForm />);
  await component.getByRole("button", { name: "Prijava" }).click();
  await expect(component.getByText("Izpolni vsa polja!")).toBeVisible();
});