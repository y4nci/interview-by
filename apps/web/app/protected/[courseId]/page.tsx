import { CourseHeader } from "@/components/course-header";
import { ExamList } from "@/components/exam-list";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const { courseId } = params;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/protected">← Back to Courses</Link>
          </Button>
        </div>

        <CourseHeader courseId={courseId} />
        <ExamList courseId={courseId} />
      </div>
    </div>
  );
}
