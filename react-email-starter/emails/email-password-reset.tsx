import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailPasswordResetProps {
  magicLink?: string;
  name: string;
}

export const EmailPasswordReset = ({
  magicLink,
  name,
}: EmailPasswordResetProps) => (
  <Html>
    <Head />
    <Preview>Reset your password with this magic link.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>🪄 Your magic link</Heading>
        <Section style={body}>
          <Text>
            Hello <span style={{ fontWeight: "bold" }}>{name}</span>
          </Text>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Click here to reset your password 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you didn not request this, please ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Team NextAuth by Devang
        </Text>
      </Container>
    </Body>
  </Html>
);

// EmailPasswordReset.PreviewProps = {
//   magicLink: "https://raycast.com",
// } as EmailPasswordResetProps;

export default EmailPasswordReset;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
  color: "#fff",
  backgroundColor: "#e8732a",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
