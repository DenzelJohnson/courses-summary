import type { Course } from "@/lib/navigation";
import { courseNotes } from "@/lib/course-notes";

type NotesViewerProps = {
  course: Course;
};

export function NotesViewer({ course }: NotesViewerProps) {
  const notes = courseNotes[course];

  return (
    <main className="notes-viewer" aria-label="Course notes">
      <iframe
        className="notes-viewer__frame"
        loading="eager"
        src={notes.embedUrl}
        title={notes.title}
      />
    </main>
  );
}
