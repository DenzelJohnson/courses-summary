import { twoDA4Tasks } from "./2da4-tasks";
import { threeBB4Tasks } from "./3bb4-tasks";
import { courseTasks, type CourseTask, type CourseTaskType } from "./course-tasks";
import type { Course } from "./navigation";

export type Deliverable = {
  course: Course;
  task: CourseTask;
  key: string;
};

const gradedTypes: ReadonlySet<CourseTaskType> = new Set([
  "Assignment",
  "Lab",
  "Midterm",
  "Exam",
]);

const sources: readonly [Course, readonly CourseTask[]][] = [
  ["2Z03", courseTasks],
  ["2DA4", twoDA4Tasks],
  ["3BB4", threeBB4Tasks],
];

function startTime(task: CourseTask) {
  if (task.sortOrder >= 100_000_000_000) return task.sortOrder % 10_000;
  const match = task.date.match(/(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 100 + Number(match[2]) : 0;
}

export const allDeliverables: readonly Deliverable[] = sources
  .flatMap(([course, tasks]) =>
    tasks
      .filter((task) => gradedTypes.has(task.type))
      .map((task) => ({ course, task, key: `${course}:${task.id}` })),
  )
  .sort((left, right) => {
    const leftDay = left.task.calendarDate ?? Number.MAX_SAFE_INTEGER;
    const rightDay = right.task.calendarDate ?? Number.MAX_SAFE_INTEGER;
    if (leftDay !== rightDay) return leftDay - rightDay;
    if (leftDay !== Number.MAX_SAFE_INTEGER) {
      const timeDifference = startTime(left.task) - startTime(right.task);
      if (timeDifference !== 0) return timeDifference;
    }
    const courseDifference = left.course.localeCompare(right.course);
    return courseDifference || left.task.sortOrder - right.task.sortOrder;
  });
