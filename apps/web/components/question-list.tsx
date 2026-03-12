import { orpc } from '@/utils/orpc/server';
import { QuestionCard } from "./question-card";

interface QuestionListProps {
  examId: string;
}

export async function QuestionList({ examId }: QuestionListProps) {
  const questions = await orpc.getQuestionsByExamId.call(examId);

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
