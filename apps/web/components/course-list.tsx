import type { CourseMember } from "@/lib/types";
import { CourseCard } from "./course-card";

import { createClient } from "@/utils/supabase/server";
import { orpc } from '@/utils/orpc/server';

export async function CourseList() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return null;
  }

  const courseMembershipList = await orpc.getCourseList.call(user?.id);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {
        (!!courseMembershipList && courseMembershipList.length > 0)
          ? courseMembershipList.map((courseMembership: CourseMember) => (
            <CourseCard key={courseMembership.id} courseId={courseMembership.course_id} />
          ))
          : <div className="text-center text-muted-foreground">
            No courses available
          </div>
      }
    </div>
  );
}
