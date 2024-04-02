import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/db/db";
import { userSubscription } from "@/db/schema";
import { createSignature } from "@/lib/utils";
import { orders } from "@/constants";
import { auth, currentUser } from "@clerk/nextjs";

export async function GET(req: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  const { searchParams } = new URL(req.url);

  const transactionId = searchParams.get("transactionId");

  const uri = `/payments/${transactionId}/confirm`;
  const url = `${process.env.LINE_PAY_SITE}/${process.env.LINE_PAY_VERSION}${uri}`;

  let body = { amount: orders.amount, currency: orders.currency };

  const postHeaders = createSignature(uri, body);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: postHeaders,
      body: JSON.stringify(body),
    });
    // await db.query.userSubscription.findFirst({
    //   where: eq(
    //     `sub-${userSubscription.id}`,
    //     userSubscription.stripeSubscriptionId
    //   ),
    // });
    const data = await response.json();

    const session = sessionStorage.getItem("checkout");
    const parseSession = session && JSON.parse(session);
    const currentDate = new Date();

    // Get next month's date
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    if (data.returnCode === "1180") {
      return new NextResponse(data.returnMessage, { status: 410 });
    }

    if (data.returnCode === "0000") {
      if (!parseSession?.userId) {
        return new NextResponse("User ID is required", { status: 400 });
      }

      await db.insert(userSubscription).values({
        userId: parseSession.userId,
        // stripeSubscriptionId: `sub${data.transactionId}`,
        // stripeCustomerId: `customer${data.transactionId}`,
        // stripePriceId: orders.packages[0].id,
        // stripeCurrentPeriodEnd: nextMonthDate,
      });

      return new NextResponse("User ID is required", { status: 400 });
    }
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return new NextResponse(null, { status: 200 });
}
