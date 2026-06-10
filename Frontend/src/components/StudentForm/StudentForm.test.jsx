import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import StudentForm from "./StudentForm.jsx";

describe("StudentForm", () => {
  it("validates required fields", async () => {
    const onSubmit = vi.fn();
    render(<StudentForm onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: /save student/i }));

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
