"use client";

import { useSearchParams } from "next/navigation";
import { CourseContent } from "./course-content";
import { CourseHeader } from "./course-header";
import { resolveSelection } from "@/lib/navigation";

export function CourseShell() {
  const searchParams = useSearchParams();
  const selection = resolveSelection({
    course: searchParams.get("course") ?? undefined,
    section: searchParams.get("section") ?? undefined,
  });

  return (
    <div className="page-shell">
      <CourseHeader {...selection} />
      <CourseContent {...selection} />
    </div>
  );
}
