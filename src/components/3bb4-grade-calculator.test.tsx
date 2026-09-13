import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { THREE_BB4_GRADE_STORAGE_KEY } from "@/lib/3bb4-grade-calculator";
import { ThreeBB4GradeCalculator } from "./3bb4-grade-calculator";

describe("ThreeBB4GradeCalculator", () => {
  beforeEach(() => localStorage.clear());

  it("shows a current mark and saves MSAF state", async () => {
    render(<ThreeBB4GradeCalculator />);

    fireEvent.change(screen.getByLabelText("Assignment 1"), { target: { value: "85" } });
    fireEvent.change(screen.getByLabelText("Midterm"), { target: { value: "70" } });

    expect(screen.getByTestId("3bb4-current-grade")).toHaveTextContent("75.0%");

    fireEvent.click(screen.getByLabelText("MSAF Assignment 2"));
    expect(screen.getByLabelText("Assignment 2")).toBeDisabled();
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(THREE_BB4_GRADE_STORAGE_KEY) ?? "null").missedAssignments[1]).toBe(true),
    );
  });

  it("restores saved 3BB4 marks after remounting", async () => {
    const first = render(<ThreeBB4GradeCalculator />);
    fireEvent.change(screen.getByLabelText("Final exam"), { target: { value: "80" } });
    first.unmount();

    render(<ThreeBB4GradeCalculator />);
    await waitFor(() => expect(screen.getByLabelText("Final exam")).toHaveValue(80));
  });
});
