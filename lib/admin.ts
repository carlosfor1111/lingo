import { auth } from "@clerk/nextjs";

const adminIds = ["user_2eARWaYhljHMYD8Ev4rW9rgzM8T"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
