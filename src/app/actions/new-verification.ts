"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string | null) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Invalid token!" };

  const hasExpired = new Date() > new Date(existingToken.expiresAt);
  if (hasExpired) return { error: "Token has expired!" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser || !existingUser.email)
    return { error: "Email for token is invalid!" };

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingUser.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Email verified!" };
};
