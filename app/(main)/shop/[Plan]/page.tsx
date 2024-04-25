import { redirect } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserSubscription } from "@/db/queries";
import Cancel from "./items";

const PlanPage = async () => {
  const userSubscriptionData = getUserSubscription();

  const userSubscription = await userSubscriptionData;

  const item = userSubscription?.stripePriceId.split("-");

  if (!userSubscription) {
    toast.error("Something when wrong");

    redirect("/shop");
  }

  console.log(userSubscription);

  return (
    <FeedWrapper>
      <div className="w-full flex flex-col items-center">
        <Image src="/plan.svg" alt="Plan" height={90} width={90} />
        <h1 className="text-center font-bold text-neutral-800 text-2xl mt-6 mb-3">
          Current Plan : {item?.[1]}
        </h1>
        <hr className="w-full mb-3" />

        <div className="flex items-center w-[50%] p-4 pt-8 gap-x-4">
          <div className="flex-1">
            <p className="text-neutral-700 text-base lg:text-xl font-bold">
              amount :
            </p>
          </div>
          {item?.[0]}
        </div>

        <div className="flex items-center w-[50%] p-4 pt-8 gap-x-4 border-t-2">
          <div className="flex-1">
            <p className="text-neutral-700 text-base lg:text-xl font-bold">
              expired :
            </p>
          </div>

          {userSubscription?.stripeCurrentPeriodEnd.toLocaleString()}
        </div>
        <Cancel userSubscription={userSubscription} />
      </div>
    </FeedWrapper>
  );
};

export default PlanPage;
