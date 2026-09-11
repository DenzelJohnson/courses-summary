import { Suspense } from "react";
import { CourseShell } from "@/components/course-shell";

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <CourseShell />
    </Suspense>
  );
}
