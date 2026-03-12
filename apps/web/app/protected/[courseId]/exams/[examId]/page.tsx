import { ExamHeader } from "@/components/exam-header";
import { QuestionList } from "@/components/question-list";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface ExamPageProps {
  params: {
    courseId: string;
    examId: string;
  };
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { courseId, examId } = await params;

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href={`/protected/${courseId}`}>← Back to Course</Link>
          </Button>
        </div>

        <ExamHeader examId={examId} />
        <QuestionList examId={examId} />
      </div>
    </div>
  );
}
