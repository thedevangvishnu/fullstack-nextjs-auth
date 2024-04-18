import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({ where: { email } });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};

export const createNewUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return newUser;
  } catch (error) {
    return null;
  }
};
