import type { CourseTask } from "./course-tasks";

export const TWO_DA4_TASK_COMPLETION_STORAGE_KEY = "courses-summary:2da4:tasks:v1";

const tasks: readonly CourseTask[] = [
  {
    id: "lab-1",
    type: "Lab",
    name: "Lab 1",
    date: "Mon, Sep 21 · 14:30–17:20",
    sortOrder: 202609211430,
    calendarDate: 20260921,
  },
  {
    id: "lab-2",
    type: "Lab",
    name: "Lab 2",
    date: "Mon, Oct 5 · 14:30–17:20",
    sortOrder: 202610051430,
    calendarDate: 20261005,
  },
  {
    id: "assignment-1",
    type: "Assignment",
    name: "Assignment 1",
    date: "Mon, Oct 5 · 23:00 via Avenue",
    sortOrder: 202610052300,
    calendarDate: 20261005,
  },
  {
    id: "assignment-2",
    type: "Assignment",
    name: "Assignment 2",
    date: "Mon, Oct 26",
    sortOrder: 202610260000,
    calendarDate: 20261026,
  },
  {
    id: "lab-3",
    type: "Lab",
    name: "Lab 3",
    date: "Week of Oct 26",
    sortOrder: 202610260001,
    calendarDate: 20261026,
  },
  {
    id: "midterm-1",
    type: "Midterm",
    name: "Midterm 1",
    date: "Fri, Nov 6 · 17:30–19:30",
    sortOrder: 202611061730,
    calendarDate: 20261106,
  },
  {
    id: "lab-4",
    type: "Lab",
    name: "Lab 4",
    date: "Week of Nov 9 · 14:30–17:20",
    sortOrder: 202611091430,
    calendarDate: 20261109,
  },
  {
    id: "assignment-3",
    type: "Assignment",
    name: "Assignment 3",
    date: "Mon, Nov 16 · extra week due to Midterm",
    sortOrder: 202611160000,
    calendarDate: 20261116,
  },
  {
    id: "lab-5",
    type: "Lab",
    name: "Lab 5",
    date: "Week of Nov 23 · 14:30–17:20",
    sortOrder: 202611231430,
    calendarDate: 20261123,
  },
  {
    id: "assignment-4",
    type: "Assignment",
    name: "Assignment 4",
    date: "Mon, Nov 30",
    sortOrder: 202611300000,
    calendarDate: 20261130,
  },
];

export const twoDA4Tasks: readonly CourseTask[] = [...tasks].sort(
  (left, right) => left.sortOrder - right.sortOrder,
);
