import { absoluteUrl, returnUrl } from "./lib/utils";

export const POINTS_TO_REFILL = 10;

export const quests = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];

export const orders = {
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
    confirmUrl: absoluteUrl("/api/pay/"),
    cancelUrl: returnUrl,
  },
};
