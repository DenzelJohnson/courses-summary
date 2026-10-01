import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TASK_COMPLETION_STORAGE_KEY } from "@/lib/course-tasks";
import { TWO_DA4_TASK_COMPLETION_STORAGE_KEY } from "@/lib/2da4-tasks";
import { THREE_BB4_TASK_COMPLETION_STORAGE_KEY } from "@/lib/3bb4-tasks";
import { TwoDA4TasksTable } from "./2da4-tasks-table";
import { AllDeliverablesTable } from "./all-deliverables-table";

describe("AllDeliverablesTable", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.useRealTimers());

  it("renders one five-column table with all 34 graded tasks", () => {
    render(<AllDeliverablesTable />);

    expect(screen.getAllByRole("row")).toHaveLength(35);
    expect(screen.getAllByRole("columnheader").map((cell) => cell.textContent)).toEqual([
      "Course", "Type", "Name", "Date", "Checklist",
    ]);
    expect(screen.queryByText("Lecture 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Tutorial 1")).not.toBeInTheDocument();
    expect(screen.getByText("Lab 1 - Part 2").closest("tr")).toHaveTextContent("2DA4");
    expect(screen.getByText("Lab 1 - Part 2").closest("tr")).toHaveClass("task-row--assessment");
    expect(screen.getByText("Thu, Sep 24 · 11:59 PM")).toBeInTheDocument();
  });

  it("uses the existing course completion keys without losing unrelated saved tasks", async () => {
    localStorage.setItem(TASK_COMPLETION_STORAGE_KEY, JSON.stringify({ "assignment-1": true, "lecture-1": true }));
    localStorage.setItem(TWO_DA4_TASK_COMPLETION_STORAGE_KEY, JSON.stringify({ "lab-1": true, "lecture-1": true }));
    localStorage.setItem(THREE_BB4_TASK_COMPLETION_STORAGE_KEY, JSON.stringify({ "tutorial-1": true }));

    const view = render(<AllDeliverablesTable />);

    const labPartOne = screen.getByText("Lab 1 - Part 1").closest("tr")!;
    await waitFor(() => expect(within(labPartOne).getByRole("button", { name: "Mark 2DA4 Lab 1 - Part 1 incomplete" })).toBeInTheDocument());
    expect(screen.getByRole("button", { name: "Mark 2Z03 Assignment 1 incomplete" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mark 2DA4 Lab 1 - Part 2 completed" }));
    fireEvent.click(screen.getByRole("button", { name: "Mark 3BB4 Assignment 1 completed" }));

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(TWO_DA4_TASK_COMPLETION_STORAGE_KEY) ?? "{}")).toMatchObject({
        "lab-1": true,
        "lab-1-part-2": true,
        "lecture-1": true,
      });
    });
    expect(JSON.parse(localStorage.getItem(TASK_COMPLETION_STORAGE_KEY) ?? "{}")).toMatchObject({
      "assignment-1": true,
      "lecture-1": true,
    });
    expect(JSON.parse(localStorage.getItem(THREE_BB4_TASK_COMPLETION_STORAGE_KEY) ?? "{}")).toMatchObject({
      "tutorial-1": true,
      "assignment-1": true,
    });

    view.unmount();
    render(<TwoDA4TasksTable />);
    await waitFor(() => expect(screen.getByRole("button", { name: "Mark Lab 1 - Part 2 incomplete" })).toBeInTheDocument());
  });

  it("places the purple current-day divider after the latest dated graded row", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 28));

    render(<AllDeliverablesTable />);

    expect(screen.getByText("Lab 1 - Part 2").closest("tr")).toHaveClass("task-row--current");
  });
});
