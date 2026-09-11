import { describe, expect, it } from "vitest";
import {
  calculateGrades,
  createEmptyGradeState,
  parseStoredGradeState,
} from "./grade-calculator";

describe("calculateGrades", () => {
  it("calculates 74.9% from an 85 assignment and 70 midterm", () => {
    const state = createEmptyGradeState();
    state.assignments[0] = 85;
    state.midterms[0] = 70;

    const result = calculateGrades(state);

    expect(result.schemeOne).toBeCloseTo(74.8649, 4);
    expect(result.schemeTwo).toBeNull();
    expect(result.current).toBeCloseTo(74.8649, 4);
  });

  it("keeps the best five assignments and best four labs", () => {
    const state = createEmptyGradeState();
    state.assignments = [100, 90, 80, 70, 60, 10];
    state.labs = [100, 80, 60, 40, 0];

    expect(calculateGrades(state).schemeOne).toBeCloseTo(76.1538, 4);
  });

  it("counts an explicit zero but excludes blank work", () => {
    const state = createEmptyGradeState();
    state.assignments[0] = 0;
    state.assignments[1] = 100;

    expect(calculateGrades(state).schemeOne).toBe(50);
  });

  it("uses the final exam for lower and missed midterms in scheme two", () => {
    const state = createEmptyGradeState();
    state.midterms = [50, 90];
    state.missedMidterms = [false, true];
    state.finalExam = 80;

    const grades = calculateGrades(state);

    expect(grades.schemeOne).toBeCloseTo(75.082, 3);
    expect(grades.schemeTwo).toBe(80);
    expect(grades.current).toBe(80);
  });

  it("shifts one or both missed midterm weights to the final", () => {
    const oneMissed = createEmptyGradeState();
    oneMissed.assignments[0] = 100;
    oneMissed.missedMidterms[0] = true;
    oneMissed.finalExam = 80;

    const bothMissed = createEmptyGradeState();
    bothMissed.assignments[0] = 100;
    bothMissed.missedMidterms = [true, true];
    bothMissed.finalExam = 80;

    expect(calculateGrades(oneMissed).schemeOne).toBeCloseTo(81.7204, 4);
    expect(calculateGrades(bothMissed).schemeOne).toBeCloseTo(81.45897, 4);
  });

  it("does not expose scheme two before a final mark exists", () => {
    expect(calculateGrades(createEmptyGradeState()).schemeTwo).toBeNull();
  });
});

describe("parseStoredGradeState", () => {
  it("restores a valid versioned grade state", () => {
    const state = createEmptyGradeState();
    state.assignments[0] = 85;

    expect(parseStoredGradeState(JSON.stringify(state))).toEqual(state);
  });

  it("rejects corrupt, incompatible, or out-of-range saved state", () => {
    const invalidMark = createEmptyGradeState();
    invalidMark.labs[0] = 101;

    expect(parseStoredGradeState('{"version":2}')).toBeNull();
    expect(parseStoredGradeState("not-json")).toBeNull();
    expect(parseStoredGradeState(JSON.stringify(invalidMark))).toBeNull();
  });
});
