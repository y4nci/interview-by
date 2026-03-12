"use client";

import type { Question } from "@/lib/types";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
}

interface Submission {
  score: number;
  feedback: string;
  submittedAt: Date;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [answer, setAnswer] = useState("");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmission({
      score: Math.floor(Math.random() * 100),
      feedback: "Great job!",
      submittedAt: new Date(),
    });
    setIsSubmitting(false);
  };

  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Question {question.order_index}</h3>
        <p className="text-gray-700">{question.question_text}</p>
      </div>

      {!submission ? (
        <div className="space-y-4">
          <div>
            <label htmlFor={`answer-${question.id}`} className="block text-sm font-medium mb-2">
              Your Answer:
            </label>
            <textarea
              id={`answer-${question.id}`}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-3 border rounded-md resize-vertical min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your answer here..."
              disabled={isSubmitting}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !answer.trim()}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4 bg-gray-50 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Your Answer:</span>
            <span className="text-sm text-gray-500">
              Submitted on {submission.submittedAt.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-3 rounded border text-gray-700">{answer}</div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Score:</span>
              <span
                className={`font-bold text-lg ${
                  submission.score >= 80
                    ? "text-green-600"
                    : submission.score >= 70
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {submission.score}/100
              </span>
            </div>

            <div>
              <span className="font-semibold">Feedback:</span>
              <p className="text-gray-700 mt-1">{submission.feedback}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
