"use client";

export type CourseTaskType = "Lecture" | "Assignment" | "Lab" | "Midterm" | "Exam";

export type CourseTask = {
  id: string;
  type: CourseTaskType;
  name: string;
  date: string;
  sortOrder: number;
  calendarDate?: number | null;
};

export const TASK_COMPLETION_STORAGE_KEY = "courses-summary:2z03:tasks:v1";

type LectureDefinition = readonly [date: string, sortOrder: number, topic: string];

const lectures: readonly LectureDefinition[] = [
  ["Thu, Sep 10", 202009101200, "1 Introduction, 1.1 Definitions and terminology"],
  ["Fri, Sep 11", 202009111200, "1.2 Initial value problems"],
  ["Tue, Sep 15", 202009151200, "2.1 Direction fields and autonomous equations"],
  ["Thu, Sep 17", 202009171200, "2.1 Direction fields and autonomous equations (continued)"],
  ["Fri, Sep 18", 202009181200, "2.5 Separable equations"],
  ["Tue, Sep 22", 202009221200, "2.3 Linear equations"],
  ["Thu, Sep 24", 202009241200, "2.3 Linear equations (continued)"],
  ["Fri, Sep 25", 202009251200, "2.7 Linear models, 2.8 Nonlinear models"],
  ["Tue, Sep 29", 202009291200, "3.1 Linear second-order equations"],
  ["Thu, Oct 1", 202010011200, "3.1 Linear second-order equations (continued)"],
  ["Fri, Oct 2", 202010021200, "3.3 Homogeneous linear equations with constant coefficients"],
  ["Tue, Oct 6", 202010061200, "3.3 Homogeneous linear equations with constant coefficients (continued)"],
  ["Thu, Oct 8", 202010081200, "3.4 Method of undetermined coefficients"],
  ["Fri, Oct 9", 202010091200, "3.4 Method of undetermined coefficients (continued)"],
  ["Tue, Oct 20", 202010201200, "3.5 Method of variation of parameters"],
  ["Thu, Oct 22", 202010221200, "3.5 Method of variation of parameters (continued)"],
  ["Fri, Oct 23", 202010231200, "3.6 Cauchy–Euler equations"],
  ["Tue, Oct 27", 202010271200, "3.8 Initial value problems for linear equations"],
  ["Thu, Oct 29", 202010291200, "3.8 Initial value problems for linear equations (continued)"],
  ["Fri, Oct 30", 202010301200, "3.9 Boundary value problems for linear equations"],
  ["Tue, Nov 3", 202011031200, "4.1 Definition of the Laplace transform"],
  ["Thu, Nov 5", 202011051200, "4.1 Definition of the Laplace transform (continued)"],
  ["Fri, Nov 6", 202011061200, "4.2 Inverse Laplace transform, and Laplace transform of derivatives"],
  ["Tue, Nov 10", 202011101200, "4.3 Translation of Laplace transform"],
  ["Thu, Nov 12", 202011121200, "4.3 Translation of Laplace transform (continued)"],
  ["Fri, Nov 13", 202011131200, "4.3 Rational properties of Laplace transform"],
  ["Tue, Nov 17", 202011171200, "4.4 Rational properties of Laplace transform (continued)"],
  ["Thu, Nov 19", 202011191200, "4.5 The Dirac delta function"],
  ["Fri, Nov 20", 202011201200, "13.1 Separable partial differential equations"],
  ["Tue, Nov 24", 202011241200, "13.2 Classical boundary value problems for partial differential equations"],
  ["Thu, Nov 26", 202011261200, "13.2 Classical boundary value problems for partial differential equations (continued)"],
  ["Fri, Nov 27", 202011271200, "13.3 Heat equation"],
  ["Tue, Dec 1", 202012011200, "13.5 Laplace equation"],
  ["Thu, Dec 3", 202012031200, "13.4 Wave equation"],
  ["Fri, Dec 4", 202012041200, "13.4 Wave equation (continued)"],
  ["Tue, Dec 8", 202012081200, "Catch up and review"],
  ["Thu, Dec 10", 202012101200, "Catch up and review (last class)"],
];

const lectureTasks: readonly CourseTask[] = lectures.map(([date, sortOrder, topic], index) => ({
  id: `lecture-${index + 1}`,
  type: "Lecture",
  name: `Lecture ${index + 1} · ${topic}`,
  date,
  sortOrder,
}));

const assessmentTasks: readonly CourseTask[] = [
  { id: "assignment-1", type: "Assignment", name: "Assignment 1", date: "Thu, Sep 24 · 23:59", sortOrder: 202009242359 },
  { id: "assignment-2", type: "Assignment", name: "Assignment 2", date: "Thu, Oct 8 · 23:59", sortOrder: 202010082359 },
  { id: "assignment-3", type: "Assignment", name: "Assignment 3", date: "Mon, Oct 26 · 08:00", sortOrder: 202010260800 },
  { id: "assignment-4", type: "Assignment", name: "Assignment 4", date: "Thu, Nov 12 · 23:59", sortOrder: 202011122359 },
  { id: "assignment-5", type: "Assignment", name: "Assignment 5", date: "Thu, Nov 26 · 23:59", sortOrder: 202011262359 },
  { id: "assignment-6", type: "Assignment", name: "Assignment 6", date: "Thu, Dec 10 · 23:59", sortOrder: 202012102359 },
  { id: "lab-1", type: "Lab", name: "Lab 1", date: "Thu, Oct 1 · 23:59", sortOrder: 202010012359 },
  { id: "lab-2", type: "Lab", name: "Lab 2", date: "Thu, Oct 22 · 23:59", sortOrder: 202010222359 },
  { id: "lab-3", type: "Lab", name: "Lab 3", date: "Thu, Nov 5 · 23:59", sortOrder: 202011052359 },
  { id: "lab-4", type: "Lab", name: "Lab 4", date: "Thu, Nov 19 · 23:59", sortOrder: 202011192359 },
  { id: "lab-5", type: "Lab", name: "Lab 5", date: "Thu, Dec 3 · 23:59", sortOrder: 202012032359 },
  { id: "midterm-1", type: "Midterm", name: "Midterm 1", date: "Fri, Oct 30 · 18:30", sortOrder: 202010301830 },
  { id: "midterm-2", type: "Midterm", name: "Midterm 2", date: "Thu, Nov 26 · 18:30", sortOrder: 202011261830 },
  { id: "final-exam", type: "Exam", name: "Final Exam", date: "TBD", sortOrder: 999999999999 },
];

function fall2026CalendarDate(sortOrder: number) {
  return 20260000 + (Math.floor(sortOrder / 10_000) % 10_000);
}

export const courseTasks = [...lectureTasks, ...assessmentTasks]
  .sort((left, right) => left.sortOrder - right.sortOrder)
  .map((task) => ({
    ...task,
    calendarDate: task.date === "TBD" ? null : fall2026CalendarDate(task.sortOrder),
  }));
