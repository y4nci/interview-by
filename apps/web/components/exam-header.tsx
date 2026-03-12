import { orpc } from '@/utils/orpc/server';

interface ExamHeaderProps {
  examId: string;
}

export async function ExamHeader({ examId }: ExamHeaderProps) {
  // Find exam across all courses
  const exam = await orpc.getExamById.call(examId);

  if (!exam) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">Exam Not Found</h1>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">{exam.title}</h1>
      <p className="text-muted-foreground mt-2">{exam.description}</p>
    </div>
  );
}
