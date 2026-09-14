import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { TWO_DA4_GRADE_STORAGE_KEY } from "@/lib/2da4-grade-calculator";
import { TwoDA4GradeCalculator } from "./2da4-grade-calculator";

describe("TwoDA4GradeCalculator", () => {
  beforeEach(() => localStorage.clear());

  it("renders five assignments, five labs, a midterm, and a final without MSAF controls", () => {
    render(<TwoDA4GradeCalculator />);

    expect(screen.getAllByRole("spinbutton")).toHaveLength(12);
    expect(screen.getAllByText("10% · 2% each")).toHaveLength(2);
    expect(screen.getByText("30%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.queryByText("MSAF")).not.toBeInTheDocument();
  });

  it("calculates and persists the weighted current grade", async () => {
    const first = render(<TwoDA4GradeCalculator />);

    fireEvent.change(screen.getByLabelText("Assignment 1"), { target: { value: "80" } });
    fireEvent.change(screen.getByLabelText("Midterm 1"), { target: { value: "70" } });
    fireEvent.change(screen.getByLabelText("Final exam"), { target: { value: "90" } });

    expect(screen.getByTestId("2da4-current-grade")).toHaveTextContent("82.4%");
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(TWO_DA4_GRADE_STORAGE_KEY) ?? "null");
      expect(saved.assignments[0]).toBe(80);
      expect(saved.midterm).toBe(70);
      expect(saved.finalExam).toBe(90);
    });

    first.unmount();
    render(<TwoDA4GradeCalculator />);
    await waitFor(() => expect(screen.getByLabelText("Final exam")).toHaveValue(90));
  });
});
