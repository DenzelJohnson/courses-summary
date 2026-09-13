import type { CourseTask } from "./course-tasks";

function toCalendarDate(now: Date) {
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

export function findLatestCurrentTaskId(tasks: readonly CourseTask[], now: Date): string | null {
  const currentDate = toCalendarDate(now);

  return tasks.reduce<string | null>((latestId, task) => {
    if (task.calendarDate === null || task.calendarDate === undefined) return latestId;
    return task.calendarDate <= currentDate ? task.id : latestId;
  }, null);
}
