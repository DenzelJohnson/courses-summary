import { describe, expect, it } from "vitest";
import {
  THREE_BB4_TASK_COMPLETION_STORAGE_KEY,
  threeBB4Tasks,
} from "./3bb4-tasks";

describe("threeBB4Tasks", () => {
  it("contains three assignments, a midterm, final, eighteen lectures, and twelve tutorials", () => {
    expect(threeBB4Tasks).toHaveLength(35);
    expect(threeBB4Tasks.filter((task) => task.type === "Lecture")).toHaveLength(30);
    expect(threeBB4Tasks.filter((task) => task.date === "TBD")).toHaveLength(22);
    expect(threeBB4Tasks.find((task) => task.id === "midterm")).toMatchObject({
      type: "Midterm",
      name: "Midterm",
      date: "Week of Oct 19–23 · 20:00",
    });
    expect(threeBB4Tasks.find((task) => task.id === "midterm")?.calendarDate).toBe(20261023);
    expect(threeBB4Tasks.find((task) => task.id === "assignment-1")?.calendarDate).toBeNull();
    expect(threeBB4Tasks.filter((task) => task.name.startsWith("Tutorial "))).toEqual([
      expect.objectContaining({ name: "Tutorial 1", date: "Tue, Sep 15", calendarDate: 20260915 }),
      expect.objectContaining({ name: "Tutorial 2", date: "Tue, Sep 22", calendarDate: 20260922 }),
      expect.objectContaining({ name: "Tutorial 3", date: "Tue, Sep 29", calendarDate: 20260929 }),
      expect.objectContaining({ name: "Tutorial 4", date: "Tue, Oct 6", calendarDate: 20261006 }),
      expect.objectContaining({ name: "Tutorial 5", date: "Tue, Oct 20", calendarDate: 20261020 }),
      expect.objectContaining({ name: "Tutorial 6", date: "Tue, Oct 27", calendarDate: 20261027 }),
      expect.objectContaining({ name: "Tutorial 7", date: "Tue, Nov 3", calendarDate: 20261103 }),
      expect.objectContaining({ name: "Tutorial 8", date: "Tue, Nov 10", calendarDate: 20261110 }),
      expect.objectContaining({ name: "Tutorial 9", date: "Tue, Nov 17", calendarDate: 20261117 }),
      expect.objectContaining({ name: "Tutorial 10", date: "Tue, Nov 24", calendarDate: 20261124 }),
      expect.objectContaining({ name: "Tutorial 11", date: "Tue, Dec 1", calendarDate: 20261201 }),
      expect.objectContaining({ name: "Tutorial 12", date: "Tue, Dec 8", calendarDate: 20261208 }),
    ]);
    expect(THREE_BB4_TASK_COMPLETION_STORAGE_KEY).toBe("courses-summary:3bb4:tasks:v1");
  });
});
