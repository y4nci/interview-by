import type { Course, CourseMember, Exam, Question } from '@/infrastructure/config/database';
import { os } from "@orpc/server";
import { createClient } from "@supabase/supabase-js";

/**
 * creates a supabase client with the environment variables.
 * @returns the supabase client.
 * @throws {Error} if the environment variables are not set.
 */
const createClientWithCredentials = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase env: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY must be set",
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}

const getCourseList = os.handler(async ({ input }): Promise<CourseMember[]> => {
  const userId = input as string;

  const supabase = createClientWithCredentials();

  const { data: courseMembers, error } = await supabase
    .from("course_members")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return courseMembers || [];
});

const getCourseById = os.handler(async ({ input }): Promise<Course> => {
  const courseId = input as string;

  const supabase = createClientWithCredentials();

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return course;
});

const getExamsByCourseId = os.handler(async ({ input }): Promise<Exam[]> => {
  const courseId = input as string;

  const supabase = createClientWithCredentials();

  const { data: exams, error } = await supabase
    .from("exams")
    .select("*")
    .eq("course_id", courseId);

  if (error) {
    throw new Error(error.message);
  }

  return exams || [];
});

const getQuestionsByExamId = os.handler(async ({ input }): Promise<Question[]> => {
  const examId = input as string;

  const supabase = createClientWithCredentials();

  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("exam_id", examId);

  if (error) {
    throw new Error(error.message);
  }

  return questions || [];
});

export const appRouter = os.router({
  getCourseList,
  getCourseById,
  getExamsByCourseId,
  getQuestionsByExamId,
});

export type AppRouter = typeof appRouter;
