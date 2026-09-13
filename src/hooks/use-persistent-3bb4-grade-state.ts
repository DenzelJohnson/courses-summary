"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  THREE_BB4_GRADE_STORAGE_KEY,
  createEmpty3BB4GradeState,
  parseStored3BB4GradeState,
  type ThreeBB4GradeState,
} from "@/lib/3bb4-grade-calculator";

export function usePersistent3BB4GradeState(): [
  ThreeBB4GradeState,
  Dispatch<SetStateAction<ThreeBB4GradeState>>,
] {
  const [state, setState] = useState<ThreeBB4GradeState>(createEmpty3BB4GradeState);
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    try {
      const serialized = localStorage.getItem(THREE_BB4_GRADE_STORAGE_KEY);
      const restored = serialized ? parseStored3BB4GradeState(serialized) : null;
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
      localStorage.setItem(THREE_BB4_GRADE_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Browser storage is optional; the in-memory calculator remains usable.
    }
  }, [hasRestored, state]);

  return [state, setState];
}
