"use client";

import { useEffect, useId, useState } from "react";
import type { Mark } from "@/lib/grade-calculator";

type MarkInputProps = {
  label: string;
  value: Mark;
  onChange: (value: Mark) => void;
  disabled?: boolean;
};

export function MarkInput({ label, value, onChange, disabled = false }: MarkInputProps) {
  const inputId = useId();
  const [draft, setDraft] = useState(value === null ? "" : String(value));
  const parsed = draft === "" ? null : Number(draft);
  const isInvalid =
    draft !== "" && (!Number.isFinite(parsed) || (parsed as number) < 0 || (parsed as number) > 100);

  useEffect(() => {
    setDraft(value === null ? "" : String(value));
  }, [value]);

  return (
    <div className="mark-field">
      <label htmlFor={inputId}>{label}</label>
      <div className="mark-field__control">
        <input
          aria-invalid={isInvalid || undefined}
          disabled={disabled}
          inputMode="decimal"
          max="100"
          min="0"
          onChange={(event) => {
            const nextDraft = event.target.value;
            setDraft(nextDraft);
            if (nextDraft === "") {
              onChange(null);
              return;
            }

            const nextValue = Number(nextDraft);
            if (Number.isFinite(nextValue) && nextValue >= 0 && nextValue <= 100) {
              onChange(nextValue);
            }
          }}
          step="any"
          type="number"
          value={draft}
          id={inputId}
        />
        <span aria-hidden="true">%</span>
      </div>
    </div>
  );
}
