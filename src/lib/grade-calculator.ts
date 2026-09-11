export const GRADE_STORAGE_KEY = "courses-summary:2z03:grades:v1";

export type Mark = number | null;

export type GradeState = {
  version: 1;
  assignments: Mark[];
  labs: Mark[];
  midterms: Mark[];
  missedMidterms: boolean[];
  finalExam: Mark;
};

export type GradeResult = {
  current: number | null;
  schemeOne: number | null;
  schemeTwo: number | null;
};

type Contribution = {
  points: number;
  weight: number;
};

export function createEmptyGradeState(): GradeState {
  return {
    version: 1,
    assignments: Array<Mark>(6).fill(null),
    labs: Array<Mark>(5).fill(null),
    midterms: Array<Mark>(2).fill(null),
    missedMidterms: [false, false],
    finalExam: null,
  };
}

function isMark(value: unknown): value is Mark {
  return (
    value === null ||
    (typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100)
  );
}

function isMarkArray(value: unknown, length: number): value is Mark[] {
  return Array.isArray(value) && value.length === length && value.every(isMark);
}

function isBooleanArray(value: unknown, length: number): value is boolean[] {
  return (
    Array.isArray(value) &&
    value.length === length &&
    value.every((entry) => typeof entry === "boolean")
  );
}

export function parseStoredGradeState(serialized: string): GradeState | null {
  try {
    const value: unknown = JSON.parse(serialized);
    if (!value || typeof value !== "object") return null;

    const candidate = value as Record<string, unknown>;
    if (
      candidate.version !== 1 ||
      !isMarkArray(candidate.assignments, 6) ||
      !isMarkArray(candidate.labs, 5) ||
      !isMarkArray(candidate.midterms, 2) ||
      !isBooleanArray(candidate.missedMidterms, 2) ||
      !isMark(candidate.finalExam)
    ) {
      return null;
    }

    return {
      version: 1,
      assignments: [...candidate.assignments],
      labs: [...candidate.labs],
      midterms: [...candidate.midterms],
      missedMidterms: [...candidate.missedMidterms],
      finalExam: candidate.finalExam,
    };
  } catch {
    return null;
  }
}

function bestOf(marks: Mark[], keep: number, itemWeight: number): Contribution {
  const retained = marks
    .filter((mark): mark is number => mark !== null)
    .sort((left, right) => right - left)
    .slice(0, keep);

  return {
    points: retained.reduce((sum, mark) => sum + (mark * itemWeight) / 100, 0),
    weight: retained.length * itemWeight,
  };
}

function normalize({ points, weight }: Contribution): number | null {
  return weight === 0 ? null : (points / weight) * 100;
}

function calculateScheme(state: GradeState, substituteFinal: boolean): number | null {
  const assignment = bestOf(state.assignments, 5, 4.8);
  const lab = bestOf(state.labs, 4, 3.75);
  const contribution: Contribution = {
    points: assignment.points + lab.points,
    weight: assignment.weight + lab.weight,
  };

  state.midterms.forEach((mark, index) => {
    const missed = state.missedMidterms[index];
    if (missed && state.finalExam !== null) {
      contribution.points += (state.finalExam * 10) / 100;
      contribution.weight += 10;
      return;
    }

    if (!missed && mark !== null) {
      const appliedMark =
        substituteFinal && state.finalExam !== null ? Math.max(mark, state.finalExam) : mark;
      contribution.points += (appliedMark * 10) / 100;
      contribution.weight += 10;
    }
  });

  if (state.finalExam !== null) {
    contribution.points += (state.finalExam * 41) / 100;
    contribution.weight += 41;
  }

  return normalize(contribution);
}

export function calculateGrades(state: GradeState): GradeResult {
  const schemeOne = calculateScheme(state, false);
  const schemeTwo = state.finalExam === null ? null : calculateScheme(state, true);
  const available = [schemeOne, schemeTwo].filter((grade): grade is number => grade !== null);

  return {
    current: available.length === 0 ? null : Math.max(...available),
    schemeOne,
    schemeTwo,
  };
}
