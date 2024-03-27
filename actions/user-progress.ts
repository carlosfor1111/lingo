"use server";

import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/db/db";
import { getCourseById } from "@/db/queries";
import { POINTS_TO_REFILL } from "@/constants";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  const user = currentUser();

  if (!userId || !user) throw new Error("Unauthorized");

  const course = await getCourseById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }
};
