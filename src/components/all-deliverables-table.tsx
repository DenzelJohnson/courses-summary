"use client";

import { usePersistentTaskCompletions } from "@/hooks/use-persistent-task-completions";
import { allDeliverables } from "@/lib/all-deliverables";
import { TWO_DA4_TASK_COMPLETION_STORAGE_KEY, twoDA4Tasks } from "@/lib/2da4-tasks";
import { THREE_BB4_TASK_COMPLETION_STORAGE_KEY, threeBB4Tasks } from "@/lib/3bb4-tasks";
import { TASK_COMPLETION_STORAGE_KEY, courseTasks } from "@/lib/course-tasks";
import { formatTaskDate } from "@/lib/task-date";
import { findLatestCurrentTaskId } from "@/lib/task-timeline";

const twoZ03Ids = courseTasks.map((task) => task.id);
const twoDA4Ids = twoDA4Tasks.map((task) => task.id);
const threeBB4Ids = threeBB4Tasks.map((task) => task.id);
const timelineTasks = allDeliverables.map(({ key, task }) => ({ ...task, id: key }));

export function AllDeliverablesTable() {
  const twoZ03 = usePersistentTaskCompletions(TASK_COMPLETION_STORAGE_KEY, twoZ03Ids);
  const twoDA4 = usePersistentTaskCompletions(TWO_DA4_TASK_COMPLETION_STORAGE_KEY, twoDA4Ids);
  const threeBB4 = usePersistentTaskCompletions(THREE_BB4_TASK_COMPLETION_STORAGE_KEY, threeBB4Ids);
  const completions = { "2Z03": twoZ03, "2DA4": twoDA4, "3BB4": threeBB4 };
  const currentKey = findLatestCurrentTaskId(timelineTasks, new Date());

  return (
    <main className="course-content" aria-label="Course content">
      <section className="tasks-table tasks-table--all-deliverables" aria-label="All Deliverables">
        <table>
          <thead>
            <tr>
              <th scope="col">Course</th>
              <th scope="col">Type</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Checklist</th>
            </tr>
          </thead>
          <tbody>
            {allDeliverables.map(({ course, task, key }) => {
              const isCompleted = completions[course].completed[task.id] === true;
              const rowClassName = [
                "task-row--assessment",
                key === currentKey ? "task-row--current" : "",
              ].filter(Boolean).join(" ");

              return (
                <tr className={rowClassName} key={key}>
                  <td>{course}</td>
                  <td>{task.type}</td>
                  <td>{task.name}</td>
                  <td>{formatTaskDate(task.date)}</td>
                  <td>
                    <button
                      aria-label={`Mark ${course} ${task.name} ${isCompleted ? "incomplete" : "completed"}`}
                      className={isCompleted ? "task-toggle task-toggle--completed" : "task-toggle"}
                      onClick={() => completions[course].toggle(task.id)}
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
