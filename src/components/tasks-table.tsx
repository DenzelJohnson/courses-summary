"use client";

import { usePersistentTaskCompletions } from "@/hooks/use-persistent-task-completions";
import { courseTasks } from "@/lib/course-tasks";

const taskIds = courseTasks.map((task) => task.id);

export function TasksTable() {
  const { completed, toggle } = usePersistentTaskCompletions(taskIds);

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

