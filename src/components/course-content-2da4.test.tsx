import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseContent } from "./course-content";

describe("CourseContent 2DA4 routes", () => {
  it("renders the 2DA4 calculator and task table", () => {
    const view = render(<CourseContent course="2DA4" section="syllabus" />);
    expect(screen.getByRole("region", { name: "2DA4 grade calculator" })).toBeInTheDocument();

    view.rerender(<CourseContent course="2DA4" section="lectures" />);
    expect(screen.getByRole("region", { name: "2DA4 Tasks" })).toBeInTheDocument();
  });
});
