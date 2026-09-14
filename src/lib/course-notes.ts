import type { Course } from "./navigation";

export type CourseNotes = Record<Course, { embedUrl: string; title: string }>;

export const courseNotes: CourseNotes = {
  "2Z03": {
    title: "2Z03 notes",
    embedUrl:
      "https://docs.google.com/document/d/e/2PACX-1vTPcjqEjkdf3KnqjxUyuRa6bqFgd7Cu2pK4NDW00KGFW7Wbkn5clI-nu_KSW8kjSLn3IN34Z8fJZ3nK/pub?embedded=true",
  },
  "2DA4": {
    title: "2DA4 notes",
    embedUrl:
      "https://docs.google.com/document/d/e/2PACX-1vRhv5DGQ60uuzZTgA-6b0OUh4FEhZ1B7e1iY0N6aEYU3zebhaoLnAmXmyZY8Z5CMPqhOJBip-dUIhAh/pub?embedded=true",
  },
  "3BB4": {
    title: "3BB4 notes",
    embedUrl:
      "https://docs.google.com/document/d/e/2PACX-1vTzW8evEt5CjYQUYniIiAQ-HcmK3g2q9VkSc2unLfI-VAn6moRMDhj7nKiN6OVDGoHVV7JaCZiWoQxQ/pub?embedded=true",
  },
};
