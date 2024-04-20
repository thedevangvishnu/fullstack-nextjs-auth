import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const existingToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    if (!existingToken) return null;

    return existingToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const existingToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!existingToken) return null;

    return existingToken;
  } catch (error) {
    return null;
  }
};

export const deleteExistingToken = async (tokenId: string) => {
  try {
    const deletedToken = await db.passwordResetToken.delete({
      where: { id: tokenId },
    });

    return deletedToken;
  } catch (error) {
    return null;
  }
};

export const createNewToken = async (
  email: string,
  token: string,
  expiresAt: Date
) => {
  try {
    const newToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return newToken;
  } catch (error) {
    return null;
  }
};
