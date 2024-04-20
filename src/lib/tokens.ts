import {
  createNewToken,
  deleteExistingToken,
  getPasswordResetTokenByEmail,
} from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await deleteExistingToken(existingToken.id);
  }

  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

  const passwordResetToken = await createNewToken(email, token, expiresAt);

  if (passwordResetToken) {
    return passwordResetToken;
  } else {
    return null;
  }
};
