// Script to create test auth users for the interview system
// This uses the Supabase admin SDK to create users that can actually log in

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY || "your-service-role-key";

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const testUsers = [
  // Educators
  {
    email: "prof.smith@university.edu",
    password: "password123",
    name: "Professor Smith",
    role: "educator",
  },
  {
    email: "dr.johnson@university.edu",
    password: "password123",
    name: "Dr. Johnson",
    role: "educator",
  },
  // Students
  {
    email: "alice.student@university.edu",
    password: "password123",
    name: "Alice Student",
    role: "student",
  },
  {
    email: "bob.student@university.edu",
    password: "password123",
    name: "Bob Student",
    role: "student",
  },
  {
    email: "charlie.student@university.edu",
    password: "password123",
    name: "Charlie Student",
    role: "student",
  },
  {
    email: "diana.student@university.edu",
    password: "password123",
    name: "Diana Student",
    role: "student",
  },
];

async function createTestUsers() {
  console.log("Creating test users...");

  const userIds = {};

  for (const user of testUsers) {
    try {
      // First check if user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers.users.find((u) => u.email === user.email);

      if (existingUser) {
        console.log(`✓ User already exists: ${user.email} (ID: ${existingUser.id})`);
        userIds[user.email] = existingUser.id;
        continue;
      }

      const { data: authUser, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        user_metadata: {
          name: user.name,
          role: user.role,
        },
        email_confirm: true, // Skip email confirmation for testing
      });

      if (error) {
        console.error(`Error creating user ${user.email}:`, error);
        continue;
      }

      console.log(`✓ Created user: ${user.email} (ID: ${authUser.user.id})`);
      userIds[user.email] = authUser.user.id;
    } catch (err) {
      console.error(`Error creating user ${user.email}:`, err);
    }
  }

  return userIds;
}

async function createCourseData(userIds) {
  console.log("Creating course data...");

  // Course data (IDs must match those in SQL seed)
  const courses = [
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

  // Courses should already exist from SQL seed, so skip course creation
  console.log("✓ Courses already exist from SQL seed");

  // Clear existing course memberships first
  await supabase.from("course_members").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // Create course memberships
  const memberships = [
    // Professor Smith teaches CS Fundamentals and Database Systems
    {
      course_id: courses[0].id,
      user_id: userIds["prof.smith@university.edu"],
      role: "educator",
    },
    {
      course_id: courses[2].id,
      user_id: userIds["prof.smith@university.edu"],
      role: "educator",
    },

    // Dr. Johnson teaches Web Development
    {
      course_id: courses[1].id,
      user_id: userIds["dr.johnson@university.edu"],
      role: "educator",
    },

    // Student enrollments
    // Alice: CS Fundamentals and Web Development
    {
      course_id: courses[0].id,
      user_id: userIds["alice.student@university.edu"],
      role: "student",
    },
    {
      course_id: courses[1].id,
      user_id: userIds["alice.student@university.edu"],
      role: "student",
    },

    // Bob: CS Fundamentals and Database Systems
    {
      course_id: courses[0].id,
      user_id: userIds["bob.student@university.edu"],
      role: "student",
    },
    {
      course_id: courses[2].id,
      user_id: userIds["bob.student@university.edu"],
      role: "student",
    },

    // Charlie: All courses
    {
      course_id: courses[0].id,
      user_id: userIds["charlie.student@university.edu"],
      role: "student",
    },
    {
      course_id: courses[1].id,
      user_id: userIds["charlie.student@university.edu"],
      role: "student",
    },
    {
      course_id: courses[2].id,
      user_id: userIds["charlie.student@university.edu"],
      role: "student",
    },

    // Diana: Web Development only
    {
      course_id: courses[1].id,
      user_id: userIds["diana.student@university.edu"],
      role: "student",
    },
  ];

  const { error: membershipError } = await supabase.from("course_members").insert(memberships);

  if (membershipError) {
    console.error("Error creating course memberships:", membershipError);
    return;
  }

  console.log("✓ Created course memberships");
}

async function main() {
  console.log("🚀 Setting up test data for interview system...");

  try {
    const userIds = await createTestUsers();
    await createCourseData(userIds);

    console.log("\n✅ Test data setup complete!");
    console.log("\n📝 Test user credentials:");
    console.log("Email: prof.smith@university.edu | Password: password123 (Educator)");
    console.log("Email: dr.johnson@university.edu | Password: password123 (Educator)");
    console.log("Email: alice.student@university.edu | Password: password123 (Student)");
    console.log("Email: bob.student@university.edu | Password: password123 (Student)");
    console.log("Email: charlie.student@university.edu | Password: password123 (Student)");
    console.log("Email: diana.student@university.edu | Password: password123 (Student)");
  } catch (error) {
    console.error("Error setting up test data:", error);
  }
}

main().catch(console.error);
