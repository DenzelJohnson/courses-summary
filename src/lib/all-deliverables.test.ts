import { describe, expect, it } from "vitest";
import { allDeliverables } from "./all-deliverables";

describe("allDeliverables", () => {
  it("includes every graded task from the three courses and excludes lectures and tutorials", () => {
    expect(allDeliverables).toHaveLength(34);
    expect(allDeliverables.filter(({ course }) => course === "2Z03")).toHaveLength(14);
    expect(allDeliverables.filter(({ course }) => course === "2DA4")).toHaveLength(15);
    expect(allDeliverables.filter(({ course }) => course === "3BB4")).toHaveLength(5);
    expect(allDeliverables.every(({ task }) =>
      ["Assignment", "Lab", "Midterm", "Exam"].includes(task.type),
    )).toBe(true);
    expect(allDeliverables.some(({ task }) => task.name.startsWith("Tutorial"))).toBe(false);
    expect(allDeliverables.filter(({ course, task }) => course === "2DA4" && task.type === "Lab")
      .map(({ task }) => task.name)).toEqual([
      "Lab 1 - Part 1", "Lab 1 - Part 2",
      "Lab 2 - Part 1", "Lab 2 - Part 2",
      "Lab 3 - Part 1", "Lab 3 - Part 2",
      "Lab 4 - Part 1", "Lab 4 - Part 2",
      "Lab 5 - Part 1", "Lab 5 - Part 2",
    ]);
  });

  it("orders known Fall 2026 dates across courses and leaves undated work last", () => {
    expect(allDeliverables.slice(0, 3).map(({ course, task }) => `${course}:${task.name}`)).toEqual([
      "2DA4:Lab 1 - Part 1",
      "2Z03:Assignment 1",
      "2DA4:Lab 1 - Part 2",
    ]);
    const dated = allDeliverables.filter(({ task }) => task.calendarDate != null);
    expect(dated.map(({ task }) => task.calendarDate)).toEqual(
      [...dated.map(({ task }) => task.calendarDate)].sort((left, right) => left! - right!),
    );
    expect(allDeliverables.slice(-5).every(({ task }) => task.calendarDate == null)).toBe(true);
    expect(new Set(allDeliverables.map(({ key }) => key)).size).toBe(34);
  });

  it("orders two deliverables on the same day by their start or due time", () => {
    const octoberFifth = allDeliverables
      .filter(({ task }) => task.calendarDate === 20261005)
      .map(({ course, task }) => `${course}:${task.name}`);
    const novemberTwentySixth = allDeliverables
      .filter(({ task }) => task.calendarDate === 20261126)
      .map(({ course, task }) => `${course}:${task.name}`);

    expect(octoberFifth).toEqual(["2DA4:Lab 2 - Part 1", "2DA4:Assignment 1"]);
    expect(novemberTwentySixth).toEqual(["2Z03:Midterm 2", "2Z03:Assignment 5"]);
  });
});
