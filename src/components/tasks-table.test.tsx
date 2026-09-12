import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
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
});
