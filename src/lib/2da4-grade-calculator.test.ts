import { describe, expect, it } from "vitest";
import {
  calculate2DA4Grade,
  createEmpty2DA4GradeState,
  parseStored2DA4GradeState,
} from "./2da4-grade-calculator";

describe("calculate2DA4Grade", () => {
  it("returns null when no marks have been entered", () => {
    expect(calculate2DA4Grade(createEmpty2DA4GradeState())).toBeNull();
  });

  it("applies 2% per assignment and lab, 30% to the midterm, and 50% to the final", () => {
    const state = createEmpty2DA4GradeState();
    state.assignments = [100, 80, 60, 40, 20];
    state.labs = [90, 70, 50, 30, 10];
    state.midterm = 75;
    state.finalExam = 85;

    expect(calculate2DA4Grade(state)).toBeCloseTo(76, 4);
  });

  it("normalizes entered marks and counts an explicit zero", () => {
    const state = createEmpty2DA4GradeState();
    state.assignments[0] = 0;
    state.assignments[1] = 100;

    expect(calculate2DA4Grade(state)).toBe(50);
  });
});

describe("parseStored2DA4GradeState", () => {
  it("restores valid version-one state and rejects invalid state", () => {
    const state = createEmpty2DA4GradeState();
    state.midterm = 72;

    expect(parseStored2DA4GradeState(JSON.stringify(state))).toEqual(state);
    expect(parseStored2DA4GradeState('{"version":2}')).toBeNull();

    const invalid = { ...state, assignments: [101, null, null, null, null] };
    expect(parseStored2DA4GradeState(JSON.stringify(invalid))).toBeNull();
  });
});
