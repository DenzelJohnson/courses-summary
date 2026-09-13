import type { CourseTask } from "./course-tasks";

export const THREE_BB4_TASK_COMPLETION_STORAGE_KEY = "courses-summary:3bb4:tasks:v1";

const assignments: readonly CourseTask[] = [1, 2, 3].map((number) => ({
  id: `assignment-${number}`,
  type: "Assignment",
  name: `Assignment ${number}`,
  date: "TBD",
  sortOrder: number,
}));

const lectures: readonly CourseTask[] = Array.from({ length: 18 }, (_, index) => ({
  id: `lecture-${index + 1}`,
  type: "Lecture",
  name: `Lecture ${index + 1}`,
  date: "TBD",
  sortOrder: index + 6,
}));

export const threeBB4Tasks: readonly CourseTask[] = [
  ...assignments,
  {
    id: "midterm",
    type: "Midterm",
    name: "Midterm",
    date: "Week of Oct 19–23 · 20:00",
    sortOrder: 4,
  },
  { id: "final-exam", type: "Exam", name: "Final Exam", date: "TBD", sortOrder: 5 },
  ...lectures,
];
