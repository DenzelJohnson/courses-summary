export const THREE_BB4_GRADE_STORAGE_KEY = "courses-summary:3bb4:grades:v1";

export type ThreeBB4Mark = number | null;

export type ThreeBB4GradeState = {
  version: 1;
  assignments: ThreeBB4Mark[];
  missedAssignments: boolean[];
  midterm: ThreeBB4Mark;
  missedMidterm: boolean;
  finalExam: ThreeBB4Mark;
};

type Contribution = {
  points: number;
  weight: number;
};

export function createEmpty3BB4GradeState(): ThreeBB4GradeState {
  return {
    version: 1,
    assignments: [null, null, null],
    missedAssignments: [false, false, false],
    midterm: null,
    missedMidterm: false,
    finalExam: null,
  };
}

function isMark(value: unknown): value is ThreeBB4Mark {
  return value === null || (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100);
}

function isMarkArray(value: unknown, length: number): value is ThreeBB4Mark[] {
  return Array.isArray(value) && value.length === length && value.every(isMark);
}

function isBooleanArray(value: unknown, length: number): value is boolean[] {
  return Array.isArray(value) && value.length === length && value.every((entry) => typeof entry === "boolean");
}

export function parseStored3BB4GradeState(serialized: string): ThreeBB4GradeState | null {
  try {
    const value: unknown = JSON.parse(serialized);
    if (!value || typeof value !== "object") return null;

    const candidate = value as Record<string, unknown>;
    if (
      candidate.version !== 1 ||
      !isMarkArray(candidate.assignments, 3) ||
      !isBooleanArray(candidate.missedAssignments, 3) ||
      !isMark(candidate.midterm) ||
      typeof candidate.missedMidterm !== "boolean" ||
      !isMark(candidate.finalExam)
    ) {
      return null;
    }

    return {
      version: 1,
      assignments: [...candidate.assignments],
      missedAssignments: [...candidate.missedAssignments],
      midterm: candidate.midterm,
      missedMidterm: candidate.missedMidterm,
      finalExam: candidate.finalExam,
    };
  } catch {
    return null;
  }
}

function addMark(contribution: Contribution, mark: ThreeBB4Mark, weight: number) {
  if (mark === null) return;
  contribution.points += (mark * weight) / 100;
  contribution.weight += weight;
}

export function calculate3BB4Grade(state: ThreeBB4GradeState): number | null {
  const contribution: Contribution = { points: 0, weight: 0 };

  state.assignments.forEach((mark, index) => {
    addMark(
      contribution,
      state.missedAssignments[index] ? state.finalExam : mark,
      10,
    );
  });
  addMark(contribution, state.missedMidterm ? state.finalExam : state.midterm, 20);
  addMark(contribution, state.finalExam, 50);

  return contribution.weight === 0 ? null : (contribution.points / contribution.weight) * 100;
}
