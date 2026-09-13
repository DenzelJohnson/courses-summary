import { describe, expect, it } from "vitest";
import {
  calculate3BB4Grade,
  createEmpty3BB4GradeState,
  parseStored3BB4GradeState,
} from "./3bb4-grade-calculator";

describe("calculate3BB4Grade", () => {
  it("normalizes only entered marks", () => {
    const state = createEmpty3BB4GradeState();
    state.assignments[0] = 85;
    state.midterm = 70;

    expect(calculate3BB4Grade(state)).toBeCloseTo(75, 4);
  });

  it("uses the final mark for each MSAF-transferred weight", () => {
    const state = createEmpty3BB4GradeState();
    state.assignments[0] = 90;
    state.missedAssignments[1] = true;
    state.missedMidterm = true;
    state.finalExam = 80;

    expect(calculate3BB4Grade(state)).toBeCloseTo(81.1111, 4);
  });

  it("excludes a missed assessment until the final is entered", () => {
    const state = createEmpty3BB4GradeState();
    state.missedMidterm = true;

    expect(calculate3BB4Grade(state)).toBeNull();
  });
});

describe("parseStored3BB4GradeState", () => {
  it("restores only valid version-one state", () => {
    const state = createEmpty3BB4GradeState();
    state.assignments[2] = 64;

    expect(parseStored3BB4GradeState(JSON.stringify(state))).toEqual(state);
    expect(parseStored3BB4GradeState('{"version":2}')).toBeNull();
  });
});
