import { describe, expect, it } from "vitest";
import { courseTasks, TASK_COMPLETION_STORAGE_KEY } from "./course-tasks";

describe("courseTasks", () => {
  it("contains the fixed 51-row 2Z03 schedule in chronological order", () => {
    expect(courseTasks).toHaveLength(51);
    expect(courseTasks.map((task) => task.sortOrder)).toEqual(
      [...courseTasks].map((task) => task.sortOrder).sort((left, right) => left - right),
    );
  });

  it("skips October 12–18 and resumes with lectures 15–17", () => {
    expect(courseTasks.find((task) => task.id === "lecture-15")).toMatchObject({
      date: "Tue, Oct 20",
      name: "Lecture 15 · 3.5 Method of variation of parameters",
    });
    expect(courseTasks.find((task) => task.id === "lecture-17")).toMatchObject({
      date: "Fri, Oct 23",
    });
  });

  it("contains the supplied assessment dates and intentionally undated final", () => {
    expect(courseTasks.find((task) => task.id === "assignment-3")).toMatchObject({
      date: "Mon, Oct 26 · 08:00",
    });
    expect(courseTasks.find((task) => task.id === "midterm-2")).toMatchObject({
      date: "Thu, Nov 26 · 18:30",
    });
    expect(courseTasks.at(-1)).toMatchObject({ type: "Exam", name: "Final Exam", date: "TBD" });
    expect(courseTasks.find((task) => task.id === "lecture-1")?.calendarDate).toBe(20260910);
    expect(courseTasks.find((task) => task.id === "final-exam")?.calendarDate).toBeNull();
    expect(TASK_COMPLETION_STORAGE_KEY).toBe("courses-summary:2z03:tasks:v1");
  });
});
