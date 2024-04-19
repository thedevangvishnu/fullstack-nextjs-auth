import { Resend } from "resend";
import EmailVerification from "../../react-email-starter/emails/email-verification";
import { getUserByEmail } from "@/data/user";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const magicLink = `${process.env.VERCEL_URL}/auth/new-verification?token=${token}`;

  const user = await getUserByEmail(email);
  const name = user?.name!;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Email",
    react: EmailVerification({ magicLink, name }),
  });
};
