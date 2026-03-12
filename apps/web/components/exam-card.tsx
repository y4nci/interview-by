import type { Exam } from "@/lib/types";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

interface ExamCardProps {
  exam: Exam;
  courseId: string;
}

export function ExamCard({ exam, courseId }: ExamCardProps) {
  return (
    <div className="border rounded-lg p-6 space-y-4 hover:shadow-md transition-shadow">
      <div>
        <h3 className="text-xl font-semibold">{exam.title}</h3>
        <p className="text-muted-foreground mt-2">{exam.description}</p>
      </div>

      <Button asChild className="w-full">
        <Link href={`/protected/${courseId}/exams/${exam.id}`}>Take Exam</Link>
      </Button>
    </div>
  );
}
