import { CourseList } from "@/components/course-list";

export default function ProtectedPage() {
  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Course Overview</h1>
          <p className="text-muted-foreground mt-2">Select a course to view available exams</p>
        </div>

        <CourseList />
      </div>
    </div>
  );
}
