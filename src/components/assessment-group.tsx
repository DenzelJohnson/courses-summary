import type { ReactNode } from "react";

type AssessmentGroupProps = {
  title: string;
  rule: string;
  children: ReactNode;
};

export function AssessmentGroup({ title, rule, children }: AssessmentGroupProps) {
  return (
    <section className="assessment-group">
      <div className="assessment-group__heading">
        <h2>{title}</h2>
        <span>{rule}</span>
      </div>
      <div className="assessment-grid">{children}</div>
    </section>
  );
}
