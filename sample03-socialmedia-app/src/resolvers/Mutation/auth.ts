import { Context } from "../../index";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

console.log(process.env.JWT_SIGNITURE);
console.log(typeof process.env.JWT_SIGNITURE);

interface SignupArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

interface SigninArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface UserPayload {
  userErrors: {
    message: string;
  }[];
  token: string | null;
}

export const authResolvers = {
  signup: async (
    _: any,
    { credentials, name, bio }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "invalid email",
          },
        ],
        token: null,
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
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: "invalid name or bio",
          },
        ],
        token: null,
      };
    }

    const hashedPassoword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassoword,
      },
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: user.id,
      },
    });

    const token = await JWT.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SIGNITURE || "",
      {
        expiresIn: 864000 * 365,
      }
    );

    return {
      userErrors: [
        {
          message: "dummy response",
        },
      ],
      token,
    };
  },
  signin: async (
    _: any,
    { credentials }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "invalid requet data",
          },
        ],
        token: null,
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        userErrors: [
          {
            message: "invalid requet data",
          },
        ],
        token: null,
      };
    }

    return {
      userErrors: [],
      token: JWT.sign({ email }, process.env.JWT_SIGNITURE || "", {
        expiresIn: 864000 * 365,
      }),
    };
  },
};
