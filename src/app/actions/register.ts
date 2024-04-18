"use server";

import { createNewUser, getUserByEmail } from "@/data/user";
import { RegisterSchema, RegisterFormType } from "@/schemas";
import bcrypt from "bcryptjs";

export const register = async (values: RegisterFormType) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (validatedFields.success) {
    const { name, email, password } = validatedFields.data;

    const user = await getUserByEmail(email);
    if (user) return { error: "User already exists!" };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createNewUser(name, email, hashedPassword);

    return { success: "Confirmation email sent!" };
  } else {
    return { error: "Invalid fields!" };
  }
};
