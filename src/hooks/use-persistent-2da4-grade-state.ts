"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  TWO_DA4_GRADE_STORAGE_KEY,
  createEmpty2DA4GradeState,
  parseStored2DA4GradeState,
  type TwoDA4GradeState,
} from "@/lib/2da4-grade-calculator";

export function usePersistent2DA4GradeState(): [
  TwoDA4GradeState,
  Dispatch<SetStateAction<TwoDA4GradeState>>,
] {
  const [state, setState] = useState<TwoDA4GradeState>(createEmpty2DA4GradeState);
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    try {
      const serialized = localStorage.getItem(TWO_DA4_GRADE_STORAGE_KEY);
      const restored = serialized ? parseStored2DA4GradeState(serialized) : null;
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
      localStorage.setItem(TWO_DA4_GRADE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Browser storage is optional; the in-memory calculator remains usable.
    }
  }, [hasRestored, state]);

  return [state, setState];
}
