import type { Course, Section } from "@/lib/navigation";
import { EmptySection } from "./empty-section";
import { GradeCalculator } from "./grade-calculator";
import { ThreeBB4GradeCalculator } from "./3bb4-grade-calculator";
import { ThreeBB4TasksTable } from "./3bb4-tasks-table";
import { TasksTable } from "./tasks-table";

type CourseContentProps = {
  course: Course;
  section: Section;
};

export function CourseContent({ course, section }: CourseContentProps) {
  if (course === "2Z03" && section === "lectures") return <TasksTable />;
  if (course === "3BB4" && section === "lectures") return <ThreeBB4TasksTable />;
  if (course === "3BB4" && section === "syllabus") return <ThreeBB4GradeCalculator />;
  if (course !== "2Z03" || section !== "syllabus") return <EmptySection />;

  return (
    <main className="course-content" aria-label="Course content">
      <GradeCalculator />
    </main>
  );
}
