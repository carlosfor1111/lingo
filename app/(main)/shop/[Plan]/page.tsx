import Image from "next/image";
import { FeedWrapper } from "@/components/feed-wrapper";
import { userSubscription } from "../../../../db/schema";
import { getUserSubscription } from "@/db/queries";

const PlanPage = async () => {
  const userSubscriptionData = getUserSubscription();

  const [userSubscription] = await Promise.all([userSubscriptionData]);

  // const [item, item2] = userSubscription?.stripePriceId.split("-");
  // console.log(item);
  return (
    <FeedWrapper>
      <div className="w-full flex flex-col items-center">
        <Image src="/plan.svg" alt="Plan" height={90} width={90} />
        <h1 className="text-center font-bold text-neutral-800 text-2xl mt-6 mb-3">
          Current Plan
        </h1>

        <hr className="w-full mb-3" />
        <p className="text-muted-foreground text-center text-lg mb-6">
          Spend your points on cool stuff.
        </p>
      </div>
    </FeedWrapper>
  );
};

export default PlanPage;
