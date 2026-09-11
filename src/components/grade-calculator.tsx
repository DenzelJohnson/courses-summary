"use client";

import { useMemo } from "react";
import { usePersistentGradeState } from "@/hooks/use-persistent-grade-state";
import { calculateGrades, type Mark } from "@/lib/grade-calculator";
import { AssessmentGroup } from "./assessment-group";
import { MarkInput } from "./mark-input";

function formatGrade(grade: number | null) {
  return grade === null ? "—" : `${grade.toFixed(1)}%`;
}

export function GradeCalculator() {
  const [state, setState] = usePersistentGradeState();
  const grades = useMemo(() => calculateGrades(state), [state]);

  const updateAssignment = (index: number, mark: Mark) => {
    setState((current) => ({
      ...current,
      assignments: current.assignments.map((value, itemIndex) =>
        itemIndex === index ? mark : value,
      ),
    }));
  };

  const updateLab = (index: number, mark: Mark) => {
    setState((current) => ({
      ...current,
      labs: current.labs.map((value, itemIndex) => (itemIndex === index ? mark : value)),
    }));
  };

  const updateMidterm = (index: number, mark: Mark) => {
    setState((current) => ({
      ...current,
      midterms: current.midterms.map((value, itemIndex) =>
        itemIndex === index ? mark : value,
      ),
    }));
  };

  const toggleMissedMidterm = (index: number) => {
    setState((current) => {
      const isMissed = !current.missedMidterms[index];
      return {
        ...current,
        midterms: current.midterms.map((value, itemIndex) =>
          itemIndex === index && isMissed ? null : value,
        ),
        missedMidterms: current.missedMidterms.map((value, itemIndex) =>
          itemIndex === index ? isMissed : value,
        ),
      };
    });
  };

  return (
    <section className="grade-calculator" aria-label="Grade calculator">
      <section className="grade-result" aria-label="Grade results" aria-live="polite">
        <span className="grade-result__label">Current</span>
        <strong data-testid="current-grade">{formatGrade(grades.current)}</strong>
        <div className="scheme-results">
          <span data-testid="scheme-one">
            Scheme I <b>{formatGrade(grades.schemeOne)}</b>
          </span>
          <span className="scheme-result--muted" data-testid="scheme-two">
            Scheme II <b>{formatGrade(grades.schemeTwo)}</b>
          </span>
        </div>
      </section>

      <div className="assessment-groups">
        <AssessmentGroup title="Assignments" rule="24% · best 5 of 6">
          {state.assignments.map((mark, index) => (
            <MarkInput
              key={`assignment-${index + 1}`}
              label={`Assignment ${index + 1}`}
              value={mark}
              onChange={(value) => updateAssignment(index, value)}
            />
          ))}
        </AssessmentGroup>

        <AssessmentGroup title="Computer labs" rule="15% · best 4 of 5">
          {state.labs.map((mark, index) => (
            <MarkInput
              key={`lab-${index + 1}`}
              label={`Lab ${index + 1}`}
              value={mark}
              onChange={(value) => updateLab(index, value)}
            />
          ))}
        </AssessmentGroup>

        <AssessmentGroup title="Midterms" rule="20% · 10% each">
          {state.midterms.map((mark, index) => {
            const label = `Midterm ${index + 1}`;
            return (
              <div className="midterm-field" key={`midterm-${index + 1}`}>
                <MarkInput
                  disabled={state.missedMidterms[index]}
                  label={label}
                  value={mark}
                  onChange={(value) => updateMidterm(index, value)}
                />
                <label className="missed-control">
                  <input
                    aria-label={`Missed ${label}`}
                    checked={state.missedMidterms[index]}
                    onChange={() => toggleMissedMidterm(index)}
                    type="checkbox"
                  />
                  <span>Missed</span>
                </label>
              </div>
            );
          })}
        </AssessmentGroup>

        <AssessmentGroup title="Final exam" rule="41%">
          <MarkInput
            label="Final exam"
            value={state.finalExam}
            onChange={(finalExam) => setState((current) => ({ ...current, finalExam }))}
          />
        </AssessmentGroup>
      </div>
    </section>
  );
}
