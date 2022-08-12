import { Post, Prisma } from "@prisma/client";
import { Context } from "../index";

interface PostArgs {
  post: {
    title: string;
    content: string;
  };
}

interface PostPayloadType {
  userErrors: {
    message: string;
  }[];
  post: Post | null | Prisma.Prisma__PostClient<Post>;
}

export const Mutation = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "no title or no content",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          authorId: 1,
        },
      }),
    };
  },
  postUpdate: (
    _: any,
    { postId, post }: { postId: String; post: PostArgs["post"] },
    { prisma }: Context
  ): PostPayloadType => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "no title or no content",
          },
        ],
        post: null,
      };
    }

    const existingPost = prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "The post does not exist",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate: { title?: string; content?: string } = {};
    if (title) payloadToUpdate.title = title;
    if (content) payloadToUpdate.content = content;

    return {
      userErrors: [],
      post: prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(postId),
        },
      }),
    };
  },
};
