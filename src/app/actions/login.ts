"use server";

import { getUserByEmail } from "@/data/user";
import { LoginFormType, LoginSchema } from "@/schemas";

export const login = async (values: LoginFormType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user) return { error: "Invalid credentials!" };
  } else {
    return { error: "Invalid fields!" };
  }
};
