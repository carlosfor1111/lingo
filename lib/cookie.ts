"use server";

import { cookies } from "next/headers";

export const getCheckCookie = async () => {
  const cookieStore = cookies();
  const checkout = cookieStore.get("checkout")?.value;
  const checkoutValue = checkout && JSON.parse(checkout);
  return checkoutValue;
};
