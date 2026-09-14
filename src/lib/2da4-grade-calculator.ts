export const TWO_DA4_GRADE_STORAGE_KEY = "courses-summary:2da4:grades:v1";

export type TwoDA4Mark = number | null;

export type TwoDA4GradeState = {
  version: 1;
  assignments: TwoDA4Mark[];
  labs: TwoDA4Mark[];
  midterm: TwoDA4Mark;
  finalExam: TwoDA4Mark;
};

export function createEmpty2DA4GradeState(): TwoDA4GradeState {
  return {
    version: 1,
    assignments: Array<TwoDA4Mark>(5).fill(null),
    labs: Array<TwoDA4Mark>(5).fill(null),
    midterm: null,
    finalExam: null,
  };
}

function isMark(value: unknown): value is TwoDA4Mark {
  return (
    value === null ||
    (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100)
  );
}

function isMarkArray(value: unknown, length: number): value is TwoDA4Mark[] {
  return Array.isArray(value) && value.length === length && value.every(isMark);
}

export function parseStored2DA4GradeState(serialized: string): TwoDA4GradeState | null {
  try {
    const value: unknown = JSON.parse(serialized);
    if (!value || typeof value !== "object") return null;

    const candidate = value as Record<string, unknown>;
    if (
      candidate.version !== 1 ||
      !isMarkArray(candidate.assignments, 5) ||
      !isMarkArray(candidate.labs, 5) ||
      !isMark(candidate.midterm) ||
      !isMark(candidate.finalExam)
    ) {
      return null;
    }

    return {
      version: 1,
      assignments: [...candidate.assignments],
      labs: [...candidate.labs],
      midterm: candidate.midterm,
      finalExam: candidate.finalExam,
    };
  } catch {
    return null;
  }
}

function addMarks(
  contribution: { points: number; weight: number },
  marks: TwoDA4Mark[],
  itemWeight: number,
) {
  marks.forEach((mark) => {
    if (mark === null) return;
    contribution.points += (mark * itemWeight) / 100;
    contribution.weight += itemWeight;
  });
}

export function calculate2DA4Grade(state: TwoDA4GradeState): number | null {
  const contribution = { points: 0, weight: 0 };
  addMarks(contribution, state.assignments, 2);
  addMarks(contribution, state.labs, 2);
  addMarks(contribution, [state.midterm], 30);
  addMarks(contribution, [state.finalExam], 50);

  return contribution.weight === 0 ? null : (contribution.points / contribution.weight) * 100;
}
