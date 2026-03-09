import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
interface CourseCardProps {
  // TODO: Fix this type
  course: any;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-muted-foreground mt-2">{course.description}</p>
      </div>

      <Button asChild className="w-full">
        <Link href={`/protected/${course.id}`}>View Exams</Link>
      </Button>
    </div>
  );
}
