"use client";

import { usePersistentTaskCompletions } from "@/hooks/use-persistent-task-completions";
import { courseTasks, TASK_COMPLETION_STORAGE_KEY } from "@/lib/course-tasks";
import { formatTaskDate } from "@/lib/task-date";
import { findLatestCurrentTaskId } from "@/lib/task-timeline";

const taskIds = courseTasks.map((task) => task.id);

export function TasksTable() {
  const { completed, toggle } = usePersistentTaskCompletions(TASK_COMPLETION_STORAGE_KEY, taskIds);
  const currentTaskId = findLatestCurrentTaskId(courseTasks, new Date());

  return (
    <main className="course-content" aria-label="Course content">
      <section className="tasks-table" aria-label="Tasks">
        <table>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Checklist</th>
            </tr>
          </thead>
          <tbody>
            {courseTasks.map((task) => {
              const isCompleted = completed[task.id] === true;
              const rowClassName = [
                task.type !== "Lecture" ? "task-row--assessment" : "",
                task.id === currentTaskId ? "task-row--current" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <tr className={rowClassName} key={task.id}>
                  <td>{task.type}</td>
                  <td>{task.name}</td>
                  <td>{formatTaskDate(task.date)}</td>
                  <td>
                    <button
                      aria-label={`Mark ${task.name} ${isCompleted ? "incomplete" : "completed"}`}
                      className={isCompleted ? "task-toggle task-toggle--completed" : "task-toggle"}
                      onClick={() => toggle(task.id)}
                      type="button"
                    >
                      {isCompleted ? "Completed" : "Incomplete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
