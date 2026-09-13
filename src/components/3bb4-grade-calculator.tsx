"use client";

import { useMemo } from "react";
import { usePersistent3BB4GradeState } from "@/hooks/use-persistent-3bb4-grade-state";
import {
  calculate3BB4Grade,
  type ThreeBB4Mark,
} from "@/lib/3bb4-grade-calculator";
import { AssessmentGroup } from "./assessment-group";
import { MarkInput } from "./mark-input";

function formatGrade(grade: number | null) {
  return grade === null ? "—" : `${grade.toFixed(1)}%`;
}

export function ThreeBB4GradeCalculator() {
  const [state, setState] = usePersistent3BB4GradeState();
  const current = useMemo(() => calculate3BB4Grade(state), [state]);

  const updateAssignment = (index: number, mark: ThreeBB4Mark) => {
    setState((currentState) => ({
      ...currentState,
      assignments: currentState.assignments.map((value, itemIndex) =>
        itemIndex === index ? mark : value,
      ),
    }));
  };

  const toggleMissedAssignment = (index: number) => {
    setState((currentState) => {
      const isMissed = !currentState.missedAssignments[index];
      return {
        ...currentState,
        assignments: currentState.assignments.map((value, itemIndex) =>
          itemIndex === index && isMissed ? null : value,
        ),
        missedAssignments: currentState.missedAssignments.map((value, itemIndex) =>
          itemIndex === index ? isMissed : value,
        ),
      };
    });
  };

  const toggleMissedMidterm = () => {
    setState((currentState) => {
      const isMissed = !currentState.missedMidterm;
      return {
        ...currentState,
        midterm: isMissed ? null : currentState.midterm,
        missedMidterm: isMissed,
      };
    });
  };

  return (
    <main className="course-content" aria-label="Course content">
      <section className="grade-calculator" aria-label="3BB4 grade calculator">
        <section className="grade-result" aria-label="3BB4 grade results" aria-live="polite">
          <span className="grade-result__label">Current</span>
          <strong data-testid="3bb4-current-grade">{formatGrade(current)}</strong>
        </section>

        <div className="assessment-groups">
          <AssessmentGroup title="Assignments" rule="30% · 10% each">
            {state.assignments.map((mark, index) => {
              const label = `Assignment ${index + 1}`;
              return (
                <div className="midterm-field" key={`assignment-${index + 1}`}>
                  <MarkInput
                    disabled={state.missedAssignments[index]}
                    label={label}
                    value={mark}
                    onChange={(value) => updateAssignment(index, value)}
                  />
                  <label className="missed-control">
                    <input
                      aria-label={`MSAF ${label}`}
                      checked={state.missedAssignments[index]}
                      onChange={() => toggleMissedAssignment(index)}
                      type="checkbox"
                    />
                    <span>MSAF</span>
                  </label>
                </div>
              );
            })}
          </AssessmentGroup>

          <AssessmentGroup title="Midterm" rule="20%">
            <div className="midterm-field">
              <MarkInput
                disabled={state.missedMidterm}
                label="Midterm"
                value={state.midterm}
                onChange={(midterm) => setState((currentState) => ({ ...currentState, midterm }))}
              />
              <label className="missed-control">
                <input
                  aria-label="MSAF Midterm"
                  checked={state.missedMidterm}
                  onChange={toggleMissedMidterm}
                  type="checkbox"
                />
                <span>MSAF</span>
              </label>
            </div>
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
