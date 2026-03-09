import { mockCourses } from "@/lib/mock-data";
import { CourseCard } from "./course-card";

export function CourseList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
