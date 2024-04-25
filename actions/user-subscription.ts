"use server";

import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { createSignature } from "@/lib/utils";
import { orders } from "@/constants";
import { getCheckCookie } from "@/lib/cookie";
import { getUserSubscription } from "@/db/queries";
import { userSubscription } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";

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

export const upgradeConfirm = async () => {
  const userSubscriptionData = await getUserSubscription();

  if (!userSubscriptionData) {
    throw new Error("Upgrade fail");
  }

  revalidatePath("/shop");
};

export const cancelSubscription = async (
  id: typeof userSubscription.$inferSelect.id
) => {
  if (!userSubscription.id) return;

  await db.delete(userSubscription).where(eq(userSubscription.id, id));

  revalidatePath("/shop");
  redirect("/shop");
};
