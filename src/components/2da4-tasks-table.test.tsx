import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { TWO_DA4_TASK_COMPLETION_STORAGE_KEY } from "@/lib/2da4-tasks";
import { TwoDA4TasksTable } from "./2da4-tasks-table";

describe("TwoDA4TasksTable", () => {
  beforeEach(() => localStorage.clear());

  it("renders 37 lectures and ten 2DA4 assessments, and persists checklist completion", async () => {
    render(<TwoDA4TasksTable />);

    expect(screen.getAllByRole("row")).toHaveLength(48);
    expect(screen.getByText("Lecture 37")).toBeInTheDocument();
    expect(screen.getByText("Midterm 1")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mark Assignment 4 completed" }));

    await waitFor(() =>
      expect(localStorage.getItem(TWO_DA4_TASK_COMPLETION_STORAGE_KEY)).toContain(
        '"assignment-4":true',
      ),
    );
  });

  it("marks assessments with the shared styling", () => {
    render(<TwoDA4TasksTable />);

    expect(screen.getByText("Lab 1").closest("tr")).toHaveClass("task-row--assessment");
    expect(screen.getByText("Assignment 1").closest("tr")).toHaveClass(
      "task-row--assessment",
    );
    expect(screen.getByText("Lecture 1").closest("tr")).not.toHaveClass(
      "task-row--assessment",
    );
  });

  it("uses 12-hour times in the date column", () => {
    render(<TwoDA4TasksTable />);

    expect(screen.getByText("Mon, Sep 21 · 2:30 PM–5:20 PM")).toBeInTheDocument();
    expect(screen.queryByText("Mon, Sep 21 · 14:30–17:20")).not.toBeInTheDocument();
  });
});
