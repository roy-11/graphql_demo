import { Context } from "../../index";

interface SignupArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

export const authResolvers = {
  signup: (
    _: any,
    { email, password, name }: SignupArgs,
    { prisma }: Context
  ) => {
    console.log(email, password, name);
    return prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  },
};
