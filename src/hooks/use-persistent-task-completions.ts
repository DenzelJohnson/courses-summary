"use client";

import { useEffect, useState } from "react";

export function usePersistentTaskCompletions(storageKey: string, taskIds: readonly string[]) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) ?? "{}") as unknown;
      if (stored && typeof stored === "object" && !Array.isArray(stored)) {
        setCompleted(
          Object.fromEntries(
            Object.entries(stored).filter(
              ([id, value]) => taskIds.includes(id) && value === true,
            ),
          ),
        );
      }
    } catch {
      setCompleted({});
    } finally {
      setHasRestored(true);
    }
  }, [storageKey, taskIds]);

  useEffect(() => {
    if (!hasRestored) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(completed));
    } catch {
      // Keep the checklist usable when browser storage is unavailable.
    }
  }, [completed, hasRestored, storageKey]);

  const toggle = (id: string) => {
    setCompleted((current) => ({ ...current, [id]: !current[id] }));
  };

  return { completed, toggle };
}
