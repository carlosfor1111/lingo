import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";
import { Button } from "@/components/ui/button";
type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/course">
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
        <Link href="/shop">
          <Button variant="ghost" className="text-orange-500">
            <Image
              src="/points.svg"
              height={28}
              width={28}
              alt="Points"
              className="mr-2"
            />
            {points}
          </Button>
        </Link>
        <Link href="/shop">
          <Button variant="ghost" className="text-rose-500">
            <Image
              src="/heart.svg"
              height={22}
              width={22}
              alt="Hearts"
              className="mr-2"
            />
            {hasActiveSubscription ? (
              <InfinityIcon className="h-4 m-4 stroke-[3]" />
            ) : (
              hearts
            )}
          </Button>
        </Link>
      </Link>
    </div>
  );
};