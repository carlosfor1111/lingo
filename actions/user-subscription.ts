"use server";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import { auth, currentUser } from "@clerk/nextjs";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

const returnUrl = absoluteUrl("/shop");
const orders = {
  amount: 299,
  currency: "TWD",
  orderId: "es-20240101",
  packages: [
    {
      id: "Lingo Pro",
      amount: 299,
      products: [
        {
          name: "es",
          quantity: 1,
          price: 299,
        },
      ],
    },
  ],
  redirectUrls: {
    confirmUrl: returnUrl,
    cancelUrl: returnUrl,
  },
};

const createSignature = (uri: string, linePayBody: typeof orders) => {
  const nonce = Date.now();
  const encrypt = `${process.env.LINE_PAY_SECRET}/${
    process.env.LINE_PAY_VERSION
  }${uri}${JSON.stringify(linePayBody)}${nonce}`;
  const signature = Base64.stringify(
    hmacSHA256(encrypt, process.env.LINE_PAY_SECRET as string)
  );
  const headers = {
    "Content-Type": "application/json",
    "X-LINE-ChannelId": process.env.LINE_PAY_CHANNEL_ID as string,
    "X-LINE-Authorization-Nonce": nonce.toString(),
    "X-LINE-Authorization": signature,
  };
  return headers;
};

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

  const data = await response.json();

  if (data.returnCode === "0000") {
    return { data: data.info.paymentUrl.web };
  }

  throw new Error("Payment went wrong");
};
