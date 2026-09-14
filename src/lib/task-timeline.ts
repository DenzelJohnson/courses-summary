import type { CourseTask } from "./course-tasks";

function toCalendarDate(now: Date) {
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

export function findLatestCurrentTaskId(tasks: readonly CourseTask[], now: Date): string | null {
  const currentDate = toCalendarDate(now);

  const latestTask = tasks.reduce<CourseTask | null>((latest, task) => {
    if (task.calendarDate === null || task.calendarDate === undefined) return latest;
    if (task.calendarDate > currentDate) return latest;
    if (latest === null || task.calendarDate >= (latest.calendarDate ?? 0)) return task;

    return latest;
  }, null);

  return latestTask?.id ?? null;
}
