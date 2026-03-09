-- Seed file for interview system (auth-independent data)
-- This seeds courses, exams, and questions only
-- Users and course memberships will be created via the Node.js script

-- Clear existing data (in dependency order)
TRUNCATE questions CASCADE;
TRUNCATE course_members CASCADE;
TRUNCATE exams CASCADE;
TRUNCATE courses CASCADE;
TRUNCATE users CASCADE;

-- Insert courses (these don't depend on auth users)
INSERT INTO courses (id, title, description) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'CS Fundamentals', 'Introduction to programming concepts, data structures, and algorithms'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Web Development', 'Full-stack web development using modern frameworks and tools'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Database Systems', 'Relational databases, SQL, and database design principles');

-- Insert exams
INSERT INTO exams (id, title, description, course_id) VALUES
-- CS Fundamentals exams
('e1111111-1111-1111-1111-111111111111', 'Data Structures Midterm', 'Assessment of basic data structure knowledge', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('e2222222-2222-2222-2222-222222222222', 'Algorithms Final', 'Comprehensive algorithms assessment', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),

-- Web Development exams
('e3333333-3333-3333-3333-333333333333', 'React Components Quiz', 'Testing React component understanding', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('e4444444-4444-4444-4444-444444444444', 'Full-Stack Project Review', 'Assessment of full-stack development skills', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),

-- Database Systems exam
('e5555555-5555-5555-5555-555555555555', 'SQL and Schema Design', 'Database design and SQL query assessment', 'cccccccc-cccc-cccc-cccc-cccccccccccc');

-- Insert questions
INSERT INTO questions (id, exam_id, question_text, model_answer, order_index) VALUES
-- Data Structures Midterm questions
('11111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111',
 'Explain the difference between a stack and a queue. Provide use cases for each.',
 'A stack follows Last-In-First-Out (LIFO) principle, useful for function calls, undo operations, and expression evaluation. A queue follows First-In-First-Out (FIFO) principle, useful for task scheduling, breadth-first search, and handling requests in order.',
 1),

('12222222-2222-2222-2222-222222222222', 'e1111111-1111-1111-1111-111111111111',
 'What is the time complexity of searching in a balanced binary search tree? Explain why.',
 'O(log n) because in a balanced BST, the height is logarithmic relative to the number of nodes. Each comparison eliminates roughly half of the remaining possibilities, leading to logarithmic search time.',
 2),

-- Algorithms Final questions
('13333333-3333-3333-3333-333333333333', 'e2222222-2222-2222-2222-222222222222',
 'Describe the quicksort algorithm and analyze its average and worst-case time complexity.',
 'Quicksort uses divide-and-conquer by selecting a pivot, partitioning elements around it, and recursively sorting subarrays. Average case: O(n log n) with good pivot selection. Worst case: O(n²) when pivot is always the smallest/largest element.',
 1),

('14444444-4444-4444-4444-444444444444', 'e2222222-2222-2222-2222-222222222222',
 'Explain the difference between breadth-first search (BFS) and depth-first search (DFS). When would you use each?',
 'BFS explores nodes level by level using a queue, guaranteeing shortest path in unweighted graphs. DFS explores as far as possible down each branch using a stack/recursion. Use BFS for shortest paths, DFS for topological sorting and detecting cycles.',
 2),

-- React Components Quiz questions
('15555555-5555-5555-5555-555555555555', 'e3333333-3333-3333-3333-333333333333',
 'What is the difference between controlled and uncontrolled components in React?',
 'Controlled components have their form data handled by React state, providing single source of truth and enabling validation. Uncontrolled components manage their own state internally using refs to access DOM values when needed.',
 1),

('16666666-6666-6666-6666-666666666666', 'e3333333-3333-3333-3333-333333333333',
 'Explain the useEffect hook and provide an example of cleanup.',
 'useEffect runs side effects after render. Cleanup prevents memory leaks by returning a function that runs when component unmounts or dependencies change. Example: event listeners, timers, or subscriptions should be cleaned up.',
 2),

-- Full-Stack Project Review questions
('17777777-7777-7777-7777-777777777777', 'e4444444-4444-4444-4444-444444444444',
 'Describe the key differences between REST and GraphQL APIs. What are the advantages of each?',
 'REST uses multiple endpoints and HTTP verbs, simple caching, but can lead to over/under-fetching. GraphQL uses single endpoint with flexible queries, precise data fetching, but requires more complex caching and can expose schema complexity.',
 1),

-- SQL and Schema Design questions
('18888888-8888-8888-8888-888888888888', 'e5555555-5555-5555-5555-555555555555',
 'Explain database normalization. What are the benefits and potential drawbacks?',
 'Normalization eliminates data redundancy by organizing data into related tables. Benefits: reduces storage, prevents update anomalies, maintains data integrity. Drawbacks: complex queries, potential performance impact from joins.',
 1),

('19999999-9999-9999-9999-999999999999', 'e5555555-5555-5555-5555-555555555555',
 'Write a SQL query to find the second highest salary from an employee table.',
 'SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); OR using ROW_NUMBER(): SELECT salary FROM (SELECT salary, ROW_NUMBER() OVER (ORDER BY salary DESC) as rn FROM employees) WHERE rn = 2;',
 2);