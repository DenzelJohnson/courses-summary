"use client";

import { usePersistentTaskCompletions } from "@/hooks/use-persistent-task-completions";
import {
  TWO_DA4_TASK_COMPLETION_STORAGE_KEY,
  twoDA4Tasks,
} from "@/lib/2da4-tasks";
import { formatTaskDate } from "@/lib/task-date";
import { findLatestCurrentTaskId } from "@/lib/task-timeline";

const taskIds = twoDA4Tasks.map((task) => task.id);

export function TwoDA4TasksTable() {
  const { completed, toggle } = usePersistentTaskCompletions(
    TWO_DA4_TASK_COMPLETION_STORAGE_KEY,
    taskIds,
  );
  const currentTaskId = findLatestCurrentTaskId(twoDA4Tasks, new Date());

  return (
    <main className="course-content" aria-label="Course content">
      <section className="tasks-table" aria-label="2DA4 Tasks">
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
            {twoDA4Tasks.map((task) => {
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
