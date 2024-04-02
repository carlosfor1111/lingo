import { type ClassValue, clsx } from "clsx";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import { twMerge } from "tailwind-merge";
import { orders } from "@/constants";

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const returnUrl = absoluteUrl("/shop");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createSignature = (uri: string, linePayBody: typeof orders) => {
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
