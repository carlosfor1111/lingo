import { db } from "@/db/db";
import {
  challengeOptions,
  challengeProgress,
  challenges,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "../db/schema";
async function main() {
  try {
    console.log("Resetting the database");

    await db.delete(courses);
    await db.delete(userProgress);
    await db.delete(units);
    await db.delete(lessons);
    await db.delete(challenges);
    await db.delete(challengeOptions);
    await db.delete(challengeProgress);
    await db.delete(userSubscription);

    console.log("Resetting finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the database");
  }

  process.exit();
}

main();
