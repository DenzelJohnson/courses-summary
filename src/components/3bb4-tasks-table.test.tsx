import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { THREE_BB4_TASK_COMPLETION_STORAGE_KEY } from "@/lib/3bb4-tasks";
import { ThreeBB4TasksTable } from "./3bb4-tasks-table";

describe("ThreeBB4TasksTable", () => {
  beforeEach(() => localStorage.clear());

  it("renders 23 3BB4 tasks and persists completion", async () => {
    render(<ThreeBB4TasksTable />);

    expect(screen.getAllByRole("row")).toHaveLength(24);
    fireEvent.click(screen.getByRole("button", { name: "Mark Lecture 18 completed" }));

    await waitFor(() =>
      expect(localStorage.getItem(THREE_BB4_TASK_COMPLETION_STORAGE_KEY)).toContain(
        '"lecture-18":true',
      ),
    );
  });
});
