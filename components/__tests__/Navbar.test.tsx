import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Navbar from "../Navbar";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/custom-hooks/useUserSession", () => ({
  default: () => ({ session: null, loading: false }),
}));

vi.mock("@/context/PlayerContext", () => ({
  usePlayer: () => ({ searchTerm: "", setSearchTerm: vi.fn() }),
}));

test("renders login entrypoint when user is logged out", () => {
  render(<Navbar />);

  expect(screen.getByRole("link", { name: "Prijava" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
});
