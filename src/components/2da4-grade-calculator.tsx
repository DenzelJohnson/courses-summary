"use client";

import { useMemo } from "react";
import { usePersistent2DA4GradeState } from "@/hooks/use-persistent-2da4-grade-state";
import { calculate2DA4Grade, type TwoDA4Mark } from "@/lib/2da4-grade-calculator";
import { AssessmentGroup } from "./assessment-group";
import { MarkInput } from "./mark-input";

function formatGrade(grade: number | null) {
  return grade === null ? "—" : `${grade.toFixed(1)}%`;
}

export function TwoDA4GradeCalculator() {
  const [state, setState] = usePersistent2DA4GradeState();
  const current = useMemo(() => calculate2DA4Grade(state), [state]);

  const updateList = (field: "assignments" | "labs", index: number, mark: TwoDA4Mark) => {
    setState((currentState) => ({
      ...currentState,
      [field]: currentState[field].map((value, itemIndex) =>
        itemIndex === index ? mark : value,
      ),
    }));
  };

  return (
    <main className="course-content" aria-label="Course content">
      <section className="grade-calculator" aria-label="2DA4 grade calculator">
        <section className="grade-result" aria-label="2DA4 grade results" aria-live="polite">
          <span className="grade-result__label">Current</span>
          <strong data-testid="2da4-current-grade">{formatGrade(current)}</strong>
        </section>

        <div className="assessment-groups">
          <AssessmentGroup title="Assignments" rule="10% · 2% each">
            {state.assignments.map((mark, index) => (
              <MarkInput
                key={`assignment-${index + 1}`}
                label={`Assignment ${index + 1}`}
                value={mark}
                onChange={(value) => updateList("assignments", index, value)}
              />
            ))}
          </AssessmentGroup>

          <AssessmentGroup title="Labs" rule="10% · 2% each">
            {state.labs.map((mark, index) => (
              <MarkInput
                key={`lab-${index + 1}`}
                label={`Lab ${index + 1}`}
                value={mark}
                onChange={(value) => updateList("labs", index, value)}
              />
            ))}
          </AssessmentGroup>

          <AssessmentGroup title="Midterm" rule="30%">
            <MarkInput
              label="Midterm 1"
              value={state.midterm}
              onChange={(midterm) => setState((currentState) => ({ ...currentState, midterm }))}
            />
          </AssessmentGroup>

          <AssessmentGroup title="Final exam" rule="50%">
            <MarkInput
              label="Final exam"
              value={state.finalExam}
              onChange={(finalExam) => setState((currentState) => ({ ...currentState, finalExam }))}
            />
          </AssessmentGroup>
        </div>
      </section>
    </main>
  );
}
