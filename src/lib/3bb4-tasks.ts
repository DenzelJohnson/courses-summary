import type { CourseTask } from "./course-tasks";

export const THREE_BB4_TASK_COMPLETION_STORAGE_KEY = "courses-summary:3bb4:tasks:v1";

const assignments: readonly CourseTask[] = [1, 2, 3].map((number) => ({
  id: `assignment-${number}`,
  type: "Assignment",
  name: `Assignment ${number}`,
  date: "TBD",
  sortOrder: number,
  calendarDate: null,
}));

const lectures: readonly CourseTask[] = Array.from({ length: 18 }, (_, index) => ({
  id: `lecture-${index + 1}`,
  type: "Lecture",
  name: `Lecture ${index + 1}`,
  date: "TBD",
  sortOrder: index + 6,
  calendarDate: null,
}));

const tutorialDates = [
  ["Tue, Sep 15", 20260915],
  ["Tue, Sep 22", 20260922],
  ["Tue, Sep 29", 20260929],
  ["Tue, Oct 6", 20261006],
  ["Tue, Oct 20", 20261020],
  ["Tue, Oct 27", 20261027],
  ["Tue, Nov 3", 20261103],
  ["Tue, Nov 10", 20261110],
  ["Tue, Nov 17", 20261117],
  ["Tue, Nov 24", 20261124],
  ["Tue, Dec 1", 20261201],
  ["Tue, Dec 8", 20261208],
] as const;

const tutorials: readonly CourseTask[] = tutorialDates.map(([date, calendarDate], index) => ({
  id: `tutorial-${index + 1}`,
  type: "Lecture",
  name: `Tutorial ${index + 1}`,
  date,
  sortOrder: calendarDate * 10_000 + 1_200,
  calendarDate,
}));

export const threeBB4Tasks: readonly CourseTask[] = [
  ...assignments,
  {
    id: "midterm",
    type: "Midterm",
    name: "Midterm",
    date: "Week of Oct 19–23 · 20:00",
    sortOrder: 4,
    calendarDate: 20261023,
  },
  {
    id: "final-exam",
    type: "Exam",
    name: "Final Exam",
    date: "TBD",
    sortOrder: 5,
    calendarDate: null,
  },
  ...lectures,
  ...tutorials,
];
