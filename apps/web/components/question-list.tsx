import { mockQuestions } from "@/lib/mock-data";
import { QuestionCard } from "./question-card";

interface QuestionListProps {
  examId: string;
}

export function QuestionList({ examId }: QuestionListProps) {
  const questions = mockQuestions[examId as keyof typeof mockQuestions] || [];

  if (questions.length === 0) {
    return (
      <div className="text-center text-muted-foreground">No questions available for this exam.</div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Questions</h2>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
