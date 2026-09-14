import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseHeader } from "./course-header";

describe("CourseHeader", () => {
  it("renders both navigation levels and preserves the other selection", () => {
    render(<CourseHeader course="2DA4" section="notes" />);

    expect(screen.getByRole("heading", { name: "Courses" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Courses" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Course sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2DA4" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Notes" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "3BB4" })).toHaveAttribute(
      "href",
      "/?course=3BB4&section=notes",
    );
    expect(screen.getByRole("link", { name: "Tasks" })).toHaveAttribute(
      "href",
      "/?course=2DA4&section=lectures",
    );
  });
});
