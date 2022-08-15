import { Context } from "../../index";
import validator from "validator";

interface SignupArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  user: null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { email, password, name, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "invalid email",
          },
        ],
        user: null,
      };
    }

    const isPassoword = validator.isLength(password, {
      min: 3,
    });
    if (!isPassoword) {
      return {
        userErrors: [
          {
            message: "invalid password",
          },
        ],
        user: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "invalid name or bio",
          },
        ],
        user: null,
      };
    }

    // dummy response
    return {
      userErrors: [
        {
          message: "dummy response",
        },
      ],
      user: null,
    };
    // return prisma.user.create({
    //   data: {
    //     email,
    //     password,
    //     name,
    //   },
    // });
  },
};
