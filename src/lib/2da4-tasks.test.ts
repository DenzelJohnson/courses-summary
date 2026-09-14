import { describe, expect, it } from "vitest";
import { TWO_DA4_TASK_COMPLETION_STORAGE_KEY, twoDA4Tasks } from "./2da4-tasks";

describe("twoDA4Tasks", () => {
  it("adds 37 Monday, Wednesday, Friday lectures around the Fall Break", () => {
    const lectures = twoDA4Tasks.filter((task) => task.type === "Lecture");

    expect(twoDA4Tasks).toHaveLength(47);
    expect(lectures.map((task) => `${task.name} · ${task.date}`)).toEqual([
      "Lecture 1 · Wed, Sep 9",
      "Lecture 2 · Fri, Sep 11",
      "Lecture 3 · Mon, Sep 14",
      "Lecture 4 · Wed, Sep 16",
      "Lecture 5 · Fri, Sep 18",
      "Lecture 6 · Mon, Sep 21",
      "Lecture 7 · Wed, Sep 23",
      "Lecture 8 · Fri, Sep 25",
      "Lecture 9 · Mon, Sep 28",
      "Lecture 10 · Wed, Sep 30",
      "Lecture 11 · Fri, Oct 2",
      "Lecture 12 · Mon, Oct 5",
      "Lecture 13 · Wed, Oct 7",
      "Lecture 14 · Fri, Oct 9",
      "Lecture 15 · Mon, Oct 19",
      "Lecture 16 · Wed, Oct 21",
      "Lecture 17 · Fri, Oct 23",
      "Lecture 18 · Mon, Oct 26",
      "Lecture 19 · Wed, Oct 28",
      "Lecture 20 · Fri, Oct 30",
      "Lecture 21 · Mon, Nov 2",
      "Lecture 22 · Wed, Nov 4",
      "Lecture 23 · Fri, Nov 6",
      "Lecture 24 · Mon, Nov 9",
      "Lecture 25 · Wed, Nov 11",
      "Lecture 26 · Fri, Nov 13",
      "Lecture 27 · Mon, Nov 16",
      "Lecture 28 · Wed, Nov 18",
      "Lecture 29 · Fri, Nov 20",
      "Lecture 30 · Mon, Nov 23",
      "Lecture 31 · Wed, Nov 25",
      "Lecture 32 · Fri, Nov 27",
      "Lecture 33 · Mon, Nov 30",
      "Lecture 34 · Wed, Dec 2",
      "Lecture 35 · Fri, Dec 4",
      "Lecture 36 · Mon, Dec 7",
      "Lecture 37 · Wed, Dec 9",
    ]);
    expect(
      lectures.some(
        (task) =>
          (task.calendarDate ?? 0) >= 20261012 && (task.calendarDate ?? 0) <= 20261018,
      ),
    ).toBe(false);
  });

  it("contains the ten supplied assessments in chronological order", () => {
    const assessments = twoDA4Tasks.filter((task) => task.type !== "Lecture");

    expect(assessments).toHaveLength(10);
    expect(assessments.map((task) => task.name)).toEqual([
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
    expect(twoDA4Tasks.find((task) => task.id === "lab-3")?.date).toBe("Weeks of Oct 26");
    expect(twoDA4Tasks.find((task) => task.id === "lab-4")?.date).toBe(
      "Weeks of Nov 9 · 14:30–17:20",
    );
    expect(twoDA4Tasks.find((task) => task.id === "lab-3")?.calendarDate).toBe(20261026);
    expect(twoDA4Tasks.find((task) => task.id === "lab-4")?.calendarDate).toBe(20261109);
    expect(TWO_DA4_TASK_COMPLETION_STORAGE_KEY).toBe("courses-summary:2da4:tasks:v1");
  });
});
