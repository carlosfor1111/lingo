import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { userSubscription } from "@/db/schema";
import { createSignature } from "@/lib/utils";
import { orders } from "@/constants";
import { getCheckCookie } from "@/lib/cookie";
import { revalidatePath } from "next/cache";

export async function GET(req: Request) {
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

    const data = await response.json();

    const checkoutValue = await getCheckCookie();

    const currentDate = new Date();

    // Get next month's date
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    if (data.returnCode === "1180") {
      return new NextResponse(data.returnMessage, { status: 410 });
    }

    if (data.returnCode === "0000") {
      if (!checkoutValue?.userId) {
        return new NextResponse("User ID is required", { status: 400 });
      }
      const transactionId = checkoutValue.data.info.transactionId;
      await db.insert(userSubscription).values({
        userId: checkoutValue.userId,
        stripeSubscriptionId: checkoutValue.orders.orderId,
        stripeCustomerId: `${checkoutValue.userId}-${transactionId}`,
        stripePriceId: `${checkoutValue.orders.amount}-${checkoutValue.id}-${transactionId}`,
        stripeCurrentPeriodEnd: nextMonthDate,
      });

      const isSubscripted = await db.query.userSubscription.findFirst({
        where: eq(
          checkoutValue.orders.orderId,
          userSubscription.stripeSubscriptionId
        ),
      });

      if (isSubscripted) {
        await db
          .update(userSubscription)
          .set({
            stripeCustomerId: checkoutValue.userId + transactionId,
            stripePriceId: `${checkoutValue.orders.packages[0].id}-${checkoutValue.orders.packages[0].amount}`,
            stripeCurrentPeriodEnd: nextMonthDate,
          })
          .where(
            eq(checkoutValue.orderId, userSubscription.stripeSubscriptionId)
          );
      }
      revalidatePath("/shop");
    }
    return new NextResponse("Upgrade Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }
}
