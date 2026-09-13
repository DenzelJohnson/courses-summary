import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  THREE_BB4_GRADE_STORAGE_KEY,
  createEmpty3BB4GradeState,
} from "@/lib/3bb4-grade-calculator";
import { usePersistent3BB4GradeState } from "./use-persistent-3bb4-grade-state";

function Harness() {
  const [state, setState] = usePersistent3BB4GradeState();

  return (
    <>
      <output>{state.assignments[0] ?? "empty"}</output>
      <button
        onClick={() =>
          setState((current) => ({
            ...current,
            assignments: current.assignments.map((mark, index) => (index === 0 ? 85 : mark)),
          }))
        }
      >
        Set mark
      </button>
    </>
  );
}

describe("usePersistent3BB4GradeState", () => {
  beforeEach(() => localStorage.clear());

  it("restores and saves the independent 3BB4 state", async () => {
    const saved = createEmpty3BB4GradeState();
    saved.assignments[0] = 92;
    localStorage.setItem(THREE_BB4_GRADE_STORAGE_KEY, JSON.stringify(saved));

    render(<Harness />);
    expect(await screen.findByText("92")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Set mark" }));
    await waitFor(() =>
      expect(JSON.parse(localStorage.getItem(THREE_BB4_GRADE_STORAGE_KEY) ?? "null").assignments[0]).toBe(85),
    );
  });
});
