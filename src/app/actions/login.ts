"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import {
  PROFILE_PAGE_REDIRECT_URL,
  //   PROFILE_PAGE_REDIRECT_URL,
} from "@/lib/routes";
import { LoginFormType, LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

export const login = async (values: LoginFormType) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (validatedFields.success) {
    const { email, password } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user || !user.email || !user.password)
      return { error: "Invalid credentials!" };

    // Block user forn signing in if their email is not verified. Send comfirmation email again!. Add this same blocking logic in the fallback too (inside signIn)

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: PROFILE_PAGE_REDIRECT_URL,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }
      throw error;
    }
  } else {
    return { error: "Invalid fields!" };
  }
};