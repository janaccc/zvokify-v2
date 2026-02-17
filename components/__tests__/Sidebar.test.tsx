import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Sidebar from "../Sidebar";

const useUserSessionMock = vi.fn();

vi.mock("@/custom-hooks/useUserSession", () => ({
  default: () => useUserSessionMock(),
}));

beforeEach(() => {
  useUserSessionMock.mockReset();
});

test("shows login prompt when session is missing", () => {
  useUserSessionMock.mockReturnValue({ session: null, loading: false });

  render(<Sidebar />);

  expect(
    screen.getByRole("link", { name: "Prijavite se" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Prijavi se da vidiš svoje pesmi/i)
  ).toBeInTheDocument();
});

test("shows loading state", () => {
  useUserSessionMock.mockReturnValue({ session: null, loading: true });

  render(<Sidebar />);

  expect(screen.getByText("Nalaganje...")).toBeInTheDocument();
});
