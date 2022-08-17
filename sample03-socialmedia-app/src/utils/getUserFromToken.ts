import JWT from "jsonwebtoken";
export const getUserFromToken = (token: string) => {
  try {
    const userInfo = JWT.verify(token, process.env.JWT_SIGNITURE) as {
      userId: number;
    };
    return userInfo;
  } catch (error) {
    return null;
  }
};
