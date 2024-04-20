"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/emails";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetPasswordFormType, ResetPasswordSchema } from "@/schemas";

export const resetPassword = async (values: ResetPasswordFormType) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (validatedFields.success) {
    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password)
      return { error: "Invalid email!" };

    const passwordResetToken = await generatePasswordResetToken(
      existingUser.email!
    );

    if (passwordResetToken) {
      await sendPasswordResetEmail(
        passwordResetToken.email as string,
        passwordResetToken.token as string
      );

      return { success: "Reset email sent!" };
    } else {
      return { error: "Something went wrong!" };
    }
  } else {
    return { error: "Invalid fields!" };
  }
};
