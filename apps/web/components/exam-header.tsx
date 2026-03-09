import { mockExams } from "@/lib/mock-data";

interface ExamHeaderProps {
  examId: string;
}

export function ExamHeader({ examId }: ExamHeaderProps) {
  // Find exam across all courses
  let exam = null;
  for (const courseExams of Object.values(mockExams)) {
    exam = courseExams.find((e) => e.id === examId);
    if (exam) break;
  }

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
