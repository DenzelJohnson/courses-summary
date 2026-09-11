"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  GRADE_STORAGE_KEY,
  createEmptyGradeState,
  parseStoredGradeState,
  type GradeState,
} from "@/lib/grade-calculator";

export function usePersistentGradeState(): [
  GradeState,
  Dispatch<SetStateAction<GradeState>>,
] {
  const [state, setState] = useState<GradeState>(createEmptyGradeState);
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    try {
      const serialized = localStorage.getItem(GRADE_STORAGE_KEY);
      const restored = serialized ? parseStoredGradeState(serialized) : null;
      if (restored) setState(restored);
    } catch {
      // Browser storage is optional; the in-memory calculator remains usable.
    } finally {
      setHasRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!hasRestored) return;

    try {
      localStorage.setItem(GRADE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Browser storage is optional; the in-memory calculator remains usable.
    }
  }, [hasRestored, state]);

  return [state, setState];
}
