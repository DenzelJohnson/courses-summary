import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { GRADE_STORAGE_KEY } from "@/lib/grade-calculator";
import { CourseContent } from "./course-content";
import { GradeCalculator } from "./grade-calculator";

describe("GradeCalculator", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the normalized current mark and a muted unavailable Scheme II", () => {
    render(<GradeCalculator />);

    fireEvent.change(screen.getByLabelText("Assignment 1"), { target: { value: "85" } });
    fireEvent.change(screen.getByLabelText("Midterm 1"), { target: { value: "70" } });

    const result = screen.getByLabelText("Grade results");
    expect(within(result).getByTestId("current-grade")).toHaveTextContent("74.9%");
    expect(within(result).getByTestId("scheme-one")).toHaveTextContent("74.9%");
    expect(within(result).getByTestId("scheme-two")).toHaveTextContent("—");
    expect(within(result).getByTestId("scheme-two")).toHaveClass("scheme-result--muted");
  });

  it("calculates Scheme II after a final mark is entered", () => {
    render(<GradeCalculator />);

    fireEvent.change(screen.getByLabelText("Midterm 1"), { target: { value: "50" } });
    fireEvent.change(screen.getByLabelText("Final exam"), { target: { value: "80" } });

    expect(screen.getByTestId("scheme-two")).toHaveTextContent("80.0%");
    expect(screen.getByTestId("current-grade")).toHaveTextContent("80.0%");
  });

  it("disables a midterm input when it is marked missed", () => {
    render(<GradeCalculator />);

    fireEvent.click(screen.getByLabelText("Missed Midterm 2"));

    expect(screen.getByLabelText("Midterm 2")).toBeDisabled();
  });

  it("saves marks and restores them after remounting", async () => {
    const first = render(<GradeCalculator />);
    fireEvent.change(screen.getByLabelText("Assignment 1"), { target: { value: "85" } });

    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(GRADE_STORAGE_KEY) ?? "null");
      expect(saved.assignments[0]).toBe(85);
    });

    first.unmount();
    render(<GradeCalculator />);
    await waitFor(() => expect(screen.getByLabelText("Assignment 1")).toHaveValue(85));
  });

  it("keeps an invalid draft out of the saved state", async () => {
    render(<GradeCalculator />);
    const assignment = screen.getByLabelText("Assignment 1");

    fireEvent.change(assignment, { target: { value: "101" } });

    expect(assignment).toHaveAttribute("aria-invalid", "true");
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(GRADE_STORAGE_KEY) ?? "null");
      expect(saved.assignments[0]).toBeNull();
    });
  });
});

describe("CourseContent", () => {
  it("selects 3BB4 content without changing the 2Z03 views", () => {
    const calculator = render(<CourseContent course="2Z03" section="syllabus" />);
    expect(screen.getByRole("region", { name: "Grade calculator" })).toBeInTheDocument();

    calculator.rerender(<CourseContent course="2Z03" section="lectures" />);
    expect(screen.getByRole("region", { name: "Tasks" })).toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "Grade calculator" })).not.toBeInTheDocument();

    calculator.rerender(<CourseContent course="2GA3" section="syllabus" />);
    expect(screen.queryByRole("region", { name: "Grade calculator" })).not.toBeInTheDocument();
    expect(screen.getByRole("main", { name: "Course content" })).toBeInTheDocument();

    calculator.rerender(<CourseContent course="2GA3" section="lectures" />);
    expect(screen.queryByRole("region", { name: "Tasks" })).not.toBeInTheDocument();

    calculator.rerender(<CourseContent course="3BB4" section="syllabus" />);
    expect(screen.getByRole("region", { name: "3BB4 grade calculator" })).toBeInTheDocument();

    calculator.rerender(<CourseContent course="3BB4" section="lectures" />);
    expect(screen.getByRole("region", { name: "3BB4 Tasks" })).toBeInTheDocument();

    calculator.rerender(<CourseContent course="2Z03" section="syllabus" />);
    expect(screen.getByRole("region", { name: "Grade calculator" })).toBeInTheDocument();
  });

  it("renders the matching published document for every Notes view", () => {
    const content = render(<CourseContent course="2Z03" section="notes" />);

    expect(screen.getByTitle("2Z03 notes")).toHaveAttribute(
      "src",
      expect.stringContaining("2PACX-1vTPcjq"),
    );
    expect(screen.queryByRole("main", { name: "Course content" })).not.toBeInTheDocument();

    content.rerender(<CourseContent course="2GA3" section="notes" />);
    expect(screen.getByTitle("2GA3 notes")).toHaveAttribute(
      "src",
      expect.stringContaining("2PACX-1vRhv5D"),
    );

    content.rerender(<CourseContent course="3BB4" section="notes" />);
    expect(screen.getByTitle("3BB4 notes")).toHaveAttribute(
      "src",
      expect.stringContaining("2PACX-1vTzW8e"),
    );
  });
});
