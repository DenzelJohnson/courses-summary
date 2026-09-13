import { describe, expect, it } from "vitest";
import type { CourseTask } from "./course-tasks";
import { findLatestCurrentTaskId } from "./task-timeline";

const tasks: readonly CourseTask[] = [
  {
    id: "sep-19",
    type: "Lecture",
    name: "Lecture",
    date: "Fri, Sep 19",
    sortOrder: 1,
    calendarDate: 20260919,
  },
  {
    id: "sep-20-lecture",
    type: "Lecture",
    name: "Lecture",
    date: "Sat, Sep 20",
    sortOrder: 2,
    calendarDate: 20260920,
  },
  {
    id: "sep-20-assignment",
    type: "Assignment",
    name: "Assignment",
    date: "Sat, Sep 20",
    sortOrder: 3,
    calendarDate: 20260920,
  },
  {
    id: "sep-21",
    type: "Lecture",
    name: "Lecture",
    date: "Sun, Sep 21",
    sortOrder: 4,
    calendarDate: 20260921,
  },
];

describe("findLatestCurrentTaskId", () => {
  it("returns the last same-day row", () => {
    expect(findLatestCurrentTaskId(tasks, new Date(2026, 8, 20))).toBe("sep-20-assignment");
  });

  it("returns the latest earlier row across a date gap", () => {
    expect(findLatestCurrentTaskId(tasks, new Date(2026, 8, 19))).toBe("sep-19");
  });

  it("returns null when every task is future or undated", () => {
    expect(
      findLatestCurrentTaskId([{ ...tasks[0], calendarDate: null }], new Date(2026, 8, 18)),
    ).toBeNull();
  });
});
