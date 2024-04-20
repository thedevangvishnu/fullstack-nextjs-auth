"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail, updatePassword } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordFormType, NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";

export const newPassword = async (
  values: NewPasswordFormType,
  token: string | null
) => {
  if (!token) return { error: "Missing token!" };

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (validatedFields.success) {
    const { password, confirmPassword } = validatedFields.data;
    if (password !== confirmPassword) {
      return { error: "Passwords do not match!" };
    }

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) return { error: "Inalid token!" };

    const hasExpired = new Date() > new Date(existingToken.expiresAt);
    if (hasExpired) return { error: "Token has expired!" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await updatePassword(existingUser.email!, hashedPassword);

      await db.passwordResetToken.delete({
        where: { id: existingToken.id },
      });

      return { success: "Password udpated!" };
    } else {
      return { error: "Email for token is invalid!" };
    }
  } else {
    return { error: "Invalid fields!" };
  }
};
