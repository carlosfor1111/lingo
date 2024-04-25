"use client";

import { toast } from "sonner";
import { startTransition } from "react";
import { Button } from "@/components/ui/button";
import { cancelSubscription } from "@/actions/user-subscription";
import { userSubscription } from "@/db/schema";

type props = {
  userSubscription: typeof userSubscription.$inferSelect;
};

const Cancel = ({ userSubscription }: props) => {
  const onCancel = () => {
    startTransition(() => {
      if (!userSubscription) return;

      cancelSubscription(userSubscription.id)
        .then(() => {
          toast.info("cancel successfully, back to shop page.");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="flex items-center w-[50%] p-4 pt-8 gap-x-4">
      <div className="flex-1">
        <p className="text-neutral-700 text-base lg:text-xl font-bold">
          Cancel Subscription
        </p>
      </div>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};

export default Cancel;
