import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const existingToken = await db.verificationToken.findFirst({
      where: { email },
    });

    if (!existingToken) return null;

    return existingToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const existingToken = await db.verificationToken.findFirst({
      where: { token },
    });

    if (!existingToken) return null;

    return existingToken;
  } catch (error) {
    return null;
  }
};
