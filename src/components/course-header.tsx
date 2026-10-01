import {
  buildHref,
  courses,
  sectionLabels,
  sections,
  type PrimaryTab,
  type Section,
} from "@/lib/navigation";
import { TabNavigation } from "./tab-navigation";

type CourseHeaderProps = { course: PrimaryTab; section: Section };

export function CourseHeader({ course, section }: CourseHeaderProps) {
  const courseSection = course === "all-deliverables" ? "lectures" : section;
  const courseItems = courses.map((value) => ({
    value,
    label: value,
    href: buildHref(value, courseSection),
  }));
  const primaryItems = [
    ...courseItems,
    { value: "all-deliverables", label: "All Deliverables", href: "/?course=all-deliverables" },
  ];

  return (
    <header className="course-header">
      <div className="course-header__primary">
        <h1>Courses</h1>
        <TabNavigation label="Courses" items={primaryItems} activeValue={course} />
      </div>
      {course !== "all-deliverables" && (
        <div className="course-header__secondary">
          <TabNavigation
            label="Course sections"
            items={sections.map((value) => ({
              value,
              label: sectionLabels[value],
              href: buildHref(course, value),
            }))}
            activeValue={section}
          />
        </div>
      )}
    </header>
  );
}
