"use client";

import { useEffect, useState } from "react";
import { TASK_COMPLETION_STORAGE_KEY } from "@/lib/course-tasks";

export function usePersistentTaskCompletions(taskIds: readonly string[]) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(TASK_COMPLETION_STORAGE_KEY) ?? "{}") as unknown;
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
  }, [taskIds]);

  useEffect(() => {
    if (!hasRestored) return;
    try {
      localStorage.setItem(TASK_COMPLETION_STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // Keep the checklist usable when browser storage is unavailable.
    }
  }, [completed, hasRestored]);

  const toggle = (id: string) => {
    setCompleted((current) => ({ ...current, [id]: !current[id] }));
  };

  return { completed, toggle };
}

