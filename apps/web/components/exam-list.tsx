import { orpc } from '@/utils/orpc/server';
import { ExamCard } from "./exam-card";

interface ExamListProps {
  courseId: string;
}

export async function ExamList({ courseId }: ExamListProps) {
  const exams = await orpc.getExamsByCourseId.call(courseId);

  if (exams.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No exams available for this course.</div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Available Exams</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} courseId={courseId} />
        ))}
      </div>
    </div>
  );
}
