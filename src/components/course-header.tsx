import {
  buildHref,
  courses,
  sectionLabels,
  sections,
  type Course,
  type Section,
} from "@/lib/navigation";
import { TabNavigation } from "./tab-navigation";

type CourseHeaderProps = { course: Course; section: Section };

export function CourseHeader({ course, section }: CourseHeaderProps) {
  const courseItems = courses.map((value) => ({
    value,
    label: value,
    href: buildHref(value, section),
  }));
  const sectionItems = sections.map((value) => ({
    value,
    label: sectionLabels[value],
    href: buildHref(course, value),
  }));

  return (
    <header className="course-header">
      <div className="course-header__primary">
        <h1>Courses</h1>
        <TabNavigation label="Courses" items={courseItems} activeValue={course} />
      </div>
      <div className="course-header__secondary">
        <TabNavigation
          label="Course sections"
          items={sectionItems}
          activeValue={section}
        />
      </div>
    </header>
  );
}
