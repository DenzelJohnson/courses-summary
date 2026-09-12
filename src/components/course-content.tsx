import type { Course, Section } from "@/lib/navigation";
import { EmptySection } from "./empty-section";
import { GradeCalculator } from "./grade-calculator";
import { TasksTable } from "./tasks-table";

type CourseContentProps = {
  course: Course;
  section: Section;
};

export function CourseContent({ course, section }: CourseContentProps) {
  if (course === "2Z03" && section === "lectures") return <TasksTable />;
  if (course !== "2Z03" || section !== "syllabus") return <EmptySection />;

  return (
    <main className="course-content" aria-label="Course content">
      <GradeCalculator />
    </main>
  );
}
