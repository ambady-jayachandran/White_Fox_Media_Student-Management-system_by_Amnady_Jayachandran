import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AppRoutes from "./AppRoutes.jsx";

vi.mock("../context/AuthContext.jsx", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
    user: null,
  }),
}));

describe("AppRoutes", () => {
  it("renders login page for unauthenticated users", () => {
    render(
      <MemoryRouter initialEntries={["/students"]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });
});
