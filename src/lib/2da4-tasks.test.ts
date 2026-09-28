import { describe, expect, it } from "vitest";
import { TWO_DA4_TASK_COMPLETION_STORAGE_KEY, twoDA4Tasks } from "./2da4-tasks";

describe("twoDA4Tasks", () => {
  it("adds 37 Monday, Wednesday, Friday lectures around the Fall Break", () => {
    const lectures = twoDA4Tasks.filter((task) => task.type === "Lecture");

    expect(twoDA4Tasks).toHaveLength(52);
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

  it("contains fifteen assessments with separate rows for both parts of every lab", () => {
    const assessments = twoDA4Tasks.filter((task) => task.type !== "Lecture");

    expect(assessments).toHaveLength(15);
    expect(assessments.map((task) => task.name)).toEqual([
      "Lab 1 - Part 1",
      "Lab 1 - Part 2",
      "Lab 2 - Part 1",
      "Assignment 1",
      "Lab 2 - Part 2",
      "Assignment 2",
      "Lab 3 - Part 1",
      "Lab 3 - Part 2",
      "Midterm 1",
      "Lab 4 - Part 1",
      "Assignment 3",
      "Lab 4 - Part 2",
      "Lab 5 - Part 1",
      "Assignment 4",
      "Lab 5 - Part 2",
    ]);
    expect(twoDA4Tasks.find((task) => task.id === "assignment-1")).toMatchObject({
      type: "Assignment",
      date: "Mon, Oct 5 · 23:00 via Avenue",
    });
    expect(twoDA4Tasks.find((task) => task.id === "assignment-3")).toMatchObject({
      date: "Mon, Nov 16 · extra week due to Midterm",
    });
    expect(
      assessments
        .filter((task) => task.type === "Lab")
        .map(({ id, name, date, sortOrder, calendarDate }) => ({
          id,
          name,
          date,
          sortOrder,
          calendarDate,
        })),
    ).toEqual([
      {
        id: "lab-1",
        name: "Lab 1 - Part 1",
        date: "Mon, Sep 21 · 14:30–17:20",
        sortOrder: 202609211430,
        calendarDate: 20260921,
      },
      {
        id: "lab-1-part-2",
        name: "Lab 1 - Part 2",
        date: "Mon, Sep 28 · 14:30–17:20",
        sortOrder: 202609281430,
        calendarDate: 20260928,
      },
      {
        id: "lab-2",
        name: "Lab 2 - Part 1",
        date: "Mon, Oct 5 · 14:30–17:20",
        sortOrder: 202610051430,
        calendarDate: 20261005,
      },
      {
        id: "lab-2-part-2",
        name: "Lab 2 - Part 2",
        date: "Mon, Oct 19 · 14:30–17:20",
        sortOrder: 202610191430,
        calendarDate: 20261019,
      },
      {
        id: "lab-3",
        name: "Lab 3 - Part 1",
        date: "Mon, Oct 26",
        sortOrder: 202610260001,
        calendarDate: 20261026,
      },
      {
        id: "lab-3-part-2",
        name: "Lab 3 - Part 2",
        date: "Mon, Nov 2",
        sortOrder: 202611020001,
        calendarDate: 20261102,
      },
      {
        id: "lab-4",
        name: "Lab 4 - Part 1",
        date: "Mon, Nov 9 · 14:30–17:20",
        sortOrder: 202611091430,
        calendarDate: 20261109,
      },
      {
        id: "lab-4-part-2",
        name: "Lab 4 - Part 2",
        date: "Mon, Nov 16 · 14:30–17:20",
        sortOrder: 202611161430,
        calendarDate: 20261116,
      },
      {
        id: "lab-5",
        name: "Lab 5 - Part 1",
        date: "Mon, Nov 23 · 14:30–17:20",
        sortOrder: 202611231430,
        calendarDate: 20261123,
      },
      {
        id: "lab-5-part-2",
        name: "Lab 5 - Part 2",
        date: "Mon, Nov 30 · 14:30–17:20",
        sortOrder: 202611301430,
        calendarDate: 20261130,
      },
    ]);
    expect(TWO_DA4_TASK_COMPLETION_STORAGE_KEY).toBe("courses-summary:2da4:tasks:v1");
  });
});
