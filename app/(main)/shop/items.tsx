"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { useTransition, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";
import { createLinePayUrl, upgradeConfirm } from "@/actions/user-subscription";
import { useSearchParams } from "next/navigation";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const router = useRouter();
  const transactionId = useSearchParams().get("transactionId");
  const orderId = useSearchParams().get("orderId");

  const confirmSubscription = async () => {
    await fetch(`/api/pay/?transactionId=${transactionId}&orderId=${orderId}`, {
      method: "GET",
    });
    startTransition(() => {
      upgradeConfirm().catch(() => toast.error("Something went wrong"));
    });
  };

  useEffect(() => {
    if (transactionId && orderId) {
      confirmSubscription();
    }
  }, [transactionId && orderId]);

  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = () => {
    startTransition(async () => {
      const { data } = await createLinePayUrl();
      if (data) {
        window.location.href = data.info.paymentUrl.web;
      }
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>
        {hasActiveSubscription ? (
          <Button
            disabled={pending}
            onClick={() => router.push(`/shop/${orderId}`)}
          >
            settings
          </Button>
        ) : (
          <Button onClick={onUpgrade} disabled={pending}>
            upgrade
          </Button>
        )}
      </div>
    </ul>
  );
};
