import { orpc } from '@/utils/orpc/server';

interface CourseHeaderProps {
  courseId: string;
}

export async function CourseHeader({ courseId }: CourseHeaderProps) {
  const course = await orpc.getCourseById.call(courseId);

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
