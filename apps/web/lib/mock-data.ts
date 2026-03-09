// Pre-built scaffolding — used by exam-list.tsx, course-header.tsx, and the exam/question pages.
export const mockCourses = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    title: "CS Fundamentals",
    description: "Introduction to programming concepts, data structures, and algorithms",
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    title: "Web Development",
    description: "Full-stack web development using modern frameworks and tools",
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    title: "Database Systems",
    description: "Relational databases, SQL, and database design principles",
  },
];

export const mockExams = {
  "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa": [
    {
      id: "e1111111-1111-1111-1111-111111111111",
      title: "Data Structures Midterm",
      description: "Assessment of basic data structure knowledge",
      courseId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    },
    {
      id: "e2222222-2222-2222-2222-222222222222",
      title: "Algorithms Final",
      description: "Comprehensive algorithms assessment",
      courseId: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    },
  ],
  "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb": [
    {
      id: "e3333333-3333-3333-3333-333333333333",
      title: "React Components Quiz",
      description: "Testing React component understanding",
      courseId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    },
    {
      id: "e4444444-4444-4444-4444-444444444444",
      title: "Full-Stack Project Review",
      description: "Assessment of full-stack development skills",
      courseId: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    },
  ],
  "cccccccc-cccc-cccc-cccc-cccccccccccc": [
    {
      id: "e5555555-5555-5555-5555-555555555555",
      title: "SQL and Schema Design",
      description: "Database design and SQL query assessment",
      courseId: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    },
  ],
};

export const mockQuestions = {
  "e1111111-1111-1111-1111-111111111111": [
    {
      id: "11111111-1111-1111-1111-111111111111",
      examId: "e1111111-1111-1111-1111-111111111111",
      questionText:
        "Explain the difference between a stack and a queue. Provide use cases for each.",
      orderIndex: 1,
    },
    {
      id: "12222222-2222-2222-2222-222222222222",
      examId: "e1111111-1111-1111-1111-111111111111",
      questionText:
        "What is the time complexity of searching in a balanced binary search tree? Explain why.",
      orderIndex: 2,
    },
  ],
  "e3333333-3333-3333-3333-333333333333": [
    {
      id: "15555555-5555-5555-5555-555555555555",
      examId: "e3333333-3333-3333-3333-333333333333",
      questionText:
        "What is the difference between controlled and uncontrolled components in React?",
      orderIndex: 1,
    },
  ],
};

export type Course = (typeof mockCourses)[0];
export type Exam = (typeof mockExams)["aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"][0];
export type Question = (typeof mockQuestions)["e1111111-1111-1111-1111-111111111111"][0];
