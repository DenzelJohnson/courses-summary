import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  GRADE_STORAGE_KEY,
  createEmptyGradeState,
} from "@/lib/grade-calculator";
import { usePersistentGradeState } from "./use-persistent-grade-state";

function Harness() {
  const [state, setState] = usePersistentGradeState();

  return (
    <>
      <output>{state.assignments[0] ?? "empty"}</output>
      <button
        onClick={() =>
          setState((value) => ({
            ...value,
            assignments: value.assignments.map((mark, index) =>
              index === 0 ? 85 : mark,
            ),
          }))
        }
      >
        Set mark
      </button>
    </>
  );
}

describe("usePersistentGradeState", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with an empty state when nothing is saved", async () => {
    render(<Harness />);

    expect(screen.getByText("empty")).toBeInTheDocument();
    await waitFor(() => expect(localStorage.getItem(GRADE_STORAGE_KEY)).not.toBeNull());
  });

  it("restores a valid saved state", async () => {
    const saved = createEmptyGradeState();
    saved.assignments[0] = 92;
    localStorage.setItem(GRADE_STORAGE_KEY, JSON.stringify(saved));

    render(<Harness />);

    expect(await screen.findByText("92")).toBeInTheDocument();
  });

  it("saves every valid state update", async () => {
    render(<Harness />);
    fireEvent.click(screen.getByRole("button", { name: "Set mark" }));

    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(GRADE_STORAGE_KEY) ?? "null");
      expect(saved.assignments[0]).toBe(85);
    });
  });

  it("falls back safely when saved state is corrupt", async () => {
    localStorage.setItem(GRADE_STORAGE_KEY, "broken");

    render(<Harness />);

    expect(screen.getByText("empty")).toBeInTheDocument();
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem(GRADE_STORAGE_KEY) ?? "null");
      expect(saved.version).toBe(1);
    });
  });
});
