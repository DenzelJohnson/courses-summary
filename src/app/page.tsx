import { CourseHeader } from "@/components/course-header";
import { EmptySection } from "@/components/empty-section";
import { resolveSelection, type SearchValues } from "@/lib/navigation";

type HomePageProps = { searchParams: Promise<SearchValues> };

export default async function HomePage({ searchParams }: HomePageProps) {
  const selection = resolveSelection(await searchParams);

  return (
    <div className="page-shell">
      <CourseHeader {...selection} />
      <EmptySection />
    </div>
  );
}
