import { redirect } from "next/navigation";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { lessons, units as unitsSchema } from "@/db/schema";
import { Header } from "@/app/(main)/learn/header";
import { Unit } from "@/app/(main)/learn/unit";

import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const lessonPercentageData = getLessonPercentage();
  const courseProgressData = getCourseProgress();

  const [userProgress, units, courseProgress, lessonsPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      courseProgressData,
      lessonPercentageData,
    ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  if (!courseProgress) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect;
                    })
                  | undefined
              }
              activeLessonPercentage={lessonsPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
