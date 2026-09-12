import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { TASK_COMPLETION_STORAGE_KEY } from "@/lib/course-tasks";
import { usePersistentTaskCompletions } from "./use-persistent-task-completions";

const taskIds = ["assignment-1", "lab-1"];

function Harness() {
  const { completed, toggle } = usePersistentTaskCompletions(taskIds);
  return (
    <>
      <output>{completed["assignment-1"] ? "done" : "open"}</output>
      <button onClick={() => toggle("assignment-1")}>Toggle assignment</button>
    </>
  );
}

describe("usePersistentTaskCompletions", () => {
  beforeEach(() => localStorage.clear());

  it("saves a toggled task completion", async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Toggle assignment" }));

    expect(screen.getByText("done")).toBeInTheDocument();
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(TASK_COMPLETION_STORAGE_KEY) ?? "{}"))
        .toEqual({ "assignment-1": true }),
    );
  });

  it("restores valid values and ignores corrupt or unknown saved data", async () => {
    localStorage.setItem(TASK_COMPLETION_STORAGE_KEY, JSON.stringify({ "assignment-1": true, other: true }));
    const first = render(<Harness />);
    await waitFor(() => expect(screen.getByText("done")).toBeInTheDocument());
    first.unmount();

    localStorage.setItem(TASK_COMPLETION_STORAGE_KEY, "not-json");
    render(<Harness />);
    expect(screen.getByText("open")).toBeInTheDocument();
  });
});
