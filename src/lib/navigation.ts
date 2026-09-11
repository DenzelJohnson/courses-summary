export const courses = ["2Z03", "2GA3", "3BB4"] as const;
export const sections = ["syllabus", "lectures", "notes"] as const;

export type Course = (typeof courses)[number];
export type Section = (typeof sections)[number];

export const sectionLabels: Record<Section, string> = {
  syllabus: "Syllabus",
  lectures: "Lectures",
  notes: "Notes",
};

export type SearchValues = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export function resolveSelection(values: SearchValues): {
  course: Course;
  section: Section;
} {
  const courseValue = first(values.course);
  const sectionValue = first(values.section);

  return {
    course: courses.includes(courseValue as Course) ? (courseValue as Course) : "2Z03",
    section: sections.includes(sectionValue as Section)
      ? (sectionValue as Section)
      : "syllabus",
  };
}

export function buildHref(course: Course, section: Section) {
  return `/?course=${course}&section=${section}`;
}
