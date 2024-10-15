import { prisma } from "./prisma";

export const createActivity = async (userId: number, action: string) => {
  return await prisma.activity.create({
    data: {
      userId,
      action,
      createdAt: new Date(), 
    },
  });
};