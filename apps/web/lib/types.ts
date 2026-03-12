export type Course = {
  id: string;
  title: string;
  description: string;
}
export type CourseMember = {
  id: string;
  course_id: string;
  user_id: string;
  role: string;
}
export type Exam = {
  id: string;
  title: string;
  description: string;
  course_id: string;
}
export type Question = {
  id: string;
  exam_id: string;
  question_text: string;
  order_index: number;
}
