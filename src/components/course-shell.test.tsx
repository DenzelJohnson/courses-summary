import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CourseShell } from "./course-shell";

const { useSearchParams } = vi.hoisted(() => ({
  useSearchParams: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useSearchParams,
}));

describe("CourseShell", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses the URL selection and renders the selected blank section", () => {
    useSearchParams.mockReturnValue(new URLSearchParams("course=2DA4&section=notes"));

    render(<CourseShell />);

    expect(screen.getByRole("link", { name: "2DA4" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Notes" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.queryByRole("region", { name: "Grade calculator" })).not.toBeInTheDocument();
  });

  it("defaults to the 2Z03 syllabus calculator", () => {
    useSearchParams.mockReturnValue(new URLSearchParams());

    render(<CourseShell />);

    expect(screen.getByRole("link", { name: "2Z03" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "Syllabus" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("region", { name: "Grade calculator" })).toBeInTheDocument();
  });
});
