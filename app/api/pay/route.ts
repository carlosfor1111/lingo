import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { db } from "@/db/db";
import { userSubscription } from "@/db/schema";
import { createSignature } from "@/lib/utils";
import { orders } from "@/constants";

export async function GET(req: Request) {
  // const transactionId = headers().get("transactionId");

  // const uri = `/payments/${transactionId}/confirm`;
  // const url = `${process.env.LINE_PAY_SITE}/${process.env.LINE_PAY_VERSION}${uri}`;

  // const postHeaders = createSignature(uri, orders);

  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: postHeaders,
  //   body: JSON.stringify(orders),
  // });

  // console.log(response);

  return new NextResponse("TEST", { status: 200 });
}
