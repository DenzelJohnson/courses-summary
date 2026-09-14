import { describe, expect, it } from "vitest";
import { TWO_DA4_TASK_COMPLETION_STORAGE_KEY, twoDA4Tasks } from "./2da4-tasks";

describe("twoDA4Tasks", () => {
  it("contains the ten supplied assessments in chronological order", () => {
    expect(twoDA4Tasks).toHaveLength(10);
    expect(twoDA4Tasks.map((task) => task.name)).toEqual([
      "Lab 1",
      "Lab 2",
      "Assignment 1",
      "Assignment 2",
      "Lab 3",
      "Midterm 1",
      "Lab 4",
      "Assignment 3",
      "Lab 5",
      "Assignment 4",
    ]);
    expect(twoDA4Tasks.find((task) => task.id === "assignment-1")).toMatchObject({
      type: "Assignment",
      date: "Mon, Oct 5 · 23:00 via Avenue",
    });
    expect(twoDA4Tasks.find((task) => task.id === "assignment-3")).toMatchObject({
      date: "Mon, Nov 16 · extra week due to Midterm",
    });
    expect(twoDA4Tasks.find((task) => task.id === "lab-3")?.calendarDate).toBe(20261026);
    expect(twoDA4Tasks.find((task) => task.id === "lab-4")?.calendarDate).toBe(20261109);
    expect(TWO_DA4_TASK_COMPLETION_STORAGE_KEY).toBe("courses-summary:2da4:tasks:v1");
  });
});
