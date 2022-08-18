import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "..";

type BatchUsers = (ids: number[]) => Promise<User[]>;

const batchUsers: BatchUsers = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const userMap: { [id: string]: User } = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

// @ts-ignore
export const userLoaders = new DataLoader<number, User>(batchUsers);
