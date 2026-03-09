import { mockCourses } from "@/lib/mock-data";

interface CourseHeaderProps {
  courseId: string;
}

export function CourseHeader({ courseId }: CourseHeaderProps) {
  const course = mockCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">Course Not Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="text-muted-foreground mt-2">{course.description}</p>
    </div>
  );
}
