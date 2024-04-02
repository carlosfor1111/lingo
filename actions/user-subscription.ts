"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { absoluteUrl, createSignature } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";
import { userSubscription } from "@/db/schema";
import { orders } from "@/constants";

export const createLinePayUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }
  if (userSubscription && userSubscription.stripeCustomerId) {
    // const stripeSession = await stripe.billingPortal.sessions.create({
    //   customer: userSubscription.stripeCustomerId,
    //   return_url: returnUrl,
    // });
    // return { data: stripeSession.url };
  }
  const uri = "/payments/request";

  const url = `${process.env.LINE_PAY_SITE}/${process.env.LINE_PAY_VERSION}${uri}`;

  const headers = createSignature(uri, orders);
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(orders),
  });

  const data = await response.json();

  if (data.returnCode === "0000") {
    return { data: data.info.paymentUrl.web };
  }

  throw new Error("Payment went wrong");
};
