import { prisma, Prisma, User } from "@prisma/client";
import { Context } from "../index";

interface CanUserMutatePost {
  userId: number;
  postId: number;
  prisma: Context["prisma"];
}

type Test = {
  test: Prisma.Prisma__UserClient<User | null>;
};

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma,
}: CanUserMutatePost) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return {
      userErrors: [
        {
          message: "user not found",
        },
      ],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.authorId == user.id) {
    return {
      userErrors: [
        {
          message: "Post not owned by user",
        },
      ],
      post: null,
    };
  }
};
