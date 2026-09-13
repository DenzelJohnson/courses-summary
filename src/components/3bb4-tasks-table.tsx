"use client";

import { usePersistentTaskCompletions } from "@/hooks/use-persistent-task-completions";
import {
  THREE_BB4_TASK_COMPLETION_STORAGE_KEY,
  threeBB4Tasks,
} from "@/lib/3bb4-tasks";

const taskIds = threeBB4Tasks.map((task) => task.id);

export function ThreeBB4TasksTable() {
  const { completed, toggle } = usePersistentTaskCompletions(
    THREE_BB4_TASK_COMPLETION_STORAGE_KEY,
    taskIds,
  );

  return (
    <main className="course-content" aria-label="Course content">
      <section className="tasks-table" aria-label="3BB4 Tasks">
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
            {threeBB4Tasks.map((task) => {
              const isCompleted = completed[task.id] === true;
              return (
                <tr key={task.id}>
                  <td>{task.type}</td>
                  <td>{task.name}</td>
                  <td>{task.date}</td>
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
