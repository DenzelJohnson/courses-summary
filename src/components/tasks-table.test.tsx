import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TASK_COMPLETION_STORAGE_KEY } from "@/lib/course-tasks";
import { TasksTable } from "./tasks-table";

describe("TasksTable", () => {
  beforeEach(() => localStorage.clear());

  it("renders the four-column 51-row schedule and saves completion", async () => {
    render(<TasksTable />);

    expect(screen.getAllByRole("columnheader").map((cell) => cell.textContent)).toEqual([
      "Type",
      "Name",
      "Date",
      "Checklist",
    ]);
    expect(screen.getAllByRole("row")).toHaveLength(52);

    const button = screen.getByRole("button", { name: "Mark Assignment 1 completed" });
    fireEvent.click(button);
    expect(button).toHaveTextContent("Completed");
    await waitFor(() =>
      expect(localStorage.getItem(TASK_COMPLETION_STORAGE_KEY)).toContain('"assignment-1":true'),
    );
  });

  it("restores completion state after remounting", async () => {
    const first = render(<TasksTable />);
    fireEvent.click(screen.getByRole("button", { name: "Mark Lab 1 completed" }));
    first.unmount();

    render(<TasksTable />);
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Mark Lab 1 incomplete" })).toHaveTextContent(
        "Completed",
      ),
    );
  });

  it("emphasizes assessed work and marks the latest dated task", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 13));
    render(<TasksTable />);

    expect(screen.getByText("Assignment 1").closest("tr")).toHaveClass(
      "task-row--assessment",
    );
    expect(
      screen.getByText("Lecture 1 · 1 Introduction, 1.1 Definitions and terminology").closest("tr"),
    ).not.toHaveClass("task-row--assessment");
    expect(screen.getByText("Lecture 2 · 1.2 Initial value problems").closest("tr")).toHaveClass(
      "task-row--current",
    );
    vi.useRealTimers();
  });
});
