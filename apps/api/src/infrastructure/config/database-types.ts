// Database types for Kysely ORM
// These types correspond to the tables created in the migration

import type { ColumnType } from "kysely";

// Helper type for generated columns (id, timestamps)
export type Generated<T> = ColumnType<T, T | undefined, T>;

// Helper type for timestamp columns
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

// User table interface
export interface User {
  id: Generated<string>;
  email: string;
  name: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Course table interface
export interface Course {
  id: Generated<string>;
  title: string;
  description: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Exam table interface
export interface Exam {
  id: Generated<string>;
  title: string;
  description: string | null;
  course_id: string;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Course member table interface
export interface CourseMember {
  id: Generated<string>;
  course_id: string;
  user_id: string;
  role: "student" | "educator";
  created_at: Generated<Timestamp>;
}

// Question table interface
export interface Question {
  id: Generated<string>;
  exam_id: string;
  question_text: string;
  model_answer: string;
  order_index: Generated<number>;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Answer table interface
export interface Answer {
  id: Generated<string>;
  question_id: string;
  user_id: string;
  answer_text: string;
  score: number | null;
  feedback: string | null;
  created_at: Generated<Timestamp>;
  updated_at: Generated<Timestamp>;
}

// Database interface that combines all tables
export interface Database {
  users: User;
  courses: Course;
  exams: Exam;
  course_members: CourseMember;
  questions: Question;
  answers: Answer;
}

// Helper types for common query operations
export type UserInsert = Omit<User, "id" | "created_at" | "updated_at">;
export type UserUpdate = Partial<UserInsert>;

export type CourseInsert = Omit<Course, "id" | "created_at" | "updated_at">;
export type CourseUpdate = Partial<CourseInsert>;

export type ExamInsert = Omit<Exam, "id" | "created_at" | "updated_at">;
export type ExamUpdate = Partial<ExamInsert>;

export type CourseMemberInsert = Omit<CourseMember, "id" | "created_at">;
export type CourseMemberUpdate = Partial<CourseMemberInsert>;

export type QuestionInsert = Omit<Question, "id" | "created_at" | "updated_at" | "order_index"> & {
  order_index?: number;
};
export type QuestionUpdate = Partial<QuestionInsert>;

export type AnswerInsert = Omit<Answer, "id" | "created_at" | "updated_at">;
export type AnswerUpdate = Partial<AnswerInsert>;

// Joined types for common query results
export interface CourseWithMembership extends Course {
  user_role: "student" | "educator";
}

export interface ExamWithCourse extends Exam {
  course: Pick<Course, "id" | "title">;
}

export interface QuestionWithExam extends Question {
  exam: Pick<Exam, "id" | "title" | "course_id">;
}

export interface AnswerWithUserAndQuestion extends Answer {
  user: Pick<User, "id" | "name" | "email">;
  question: Pick<Question, "id" | "question_text" | "order_index">;
}
