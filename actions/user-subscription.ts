"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { cookies } from "next/headers";

import { absoluteUrl, createSignature } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";
import { userSubscription } from "@/db/schema";
import { orders } from "@/constants";
import { getCheckCookie } from "@/lib/cookie";

export const createLinePayUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const uri = "/payments/request";

  const url = `${process.env.LINE_PAY_SITE}/${process.env.LINE_PAY_VERSION}${uri}`;

  const headers = createSignature(uri, orders);

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(orders),
  });

  const checkoutValue = await getCheckCookie();

  const data = await response.json();

  if (data.returnCode === "1172" && checkoutValue) {
    return { data: checkoutValue.data, orderId: checkoutValue.orders.orderId };
  }

  if (data.returnCode === "0000") {
    cookies().set(
      "checkout",
      JSON.stringify({
        userId,
        orders,
        data,
      })
    );
    return { data, orderId: orders.orderId };
  }

  throw new Error("Payment went wrong");
};
