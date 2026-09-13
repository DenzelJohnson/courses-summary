import { describe, expect, it } from "vitest";
import {
  THREE_BB4_TASK_COMPLETION_STORAGE_KEY,
  threeBB4Tasks,
} from "./3bb4-tasks";

describe("threeBB4Tasks", () => {
  it("contains three assignments, a midterm, final, and eighteen undated lectures", () => {
    expect(threeBB4Tasks).toHaveLength(23);
    expect(threeBB4Tasks.filter((task) => task.type === "Lecture")).toHaveLength(18);
    expect(threeBB4Tasks.filter((task) => task.date === "TBD")).toHaveLength(22);
    expect(threeBB4Tasks.find((task) => task.id === "midterm")).toMatchObject({
      type: "Midterm",
      name: "Midterm",
      date: "Week of Oct 19–23 · 20:00",
    });
    expect(threeBB4Tasks.find((task) => task.id === "midterm")?.calendarDate).toBe(20261023);
    expect(threeBB4Tasks.find((task) => task.id === "assignment-1")?.calendarDate).toBeNull();
    expect(THREE_BB4_TASK_COMPLETION_STORAGE_KEY).toBe("courses-summary:3bb4:tasks:v1");
  });
});
