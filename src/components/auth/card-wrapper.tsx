"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SocialSignOns } from "./social-sign-ons";

type CardWrapperProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  hasSocialSignOn?: boolean;
  secondaryActionLabel: string;
  secondaryActionLink: string;
  hasBorder?: boolean;
  hasBg?: boolean;
};

export const CardWrapper = ({
  title,
  description,
  children,
  hasSocialSignOn,
  secondaryActionLabel,
  secondaryActionLink = "",
  hasBorder = false,
  hasBg = false,
}: CardWrapperProps) => {
  return (
    <Card
      className={`w-[300px] flex flex-col items-center gap-2 bg-trasparent bg-transparent ${
        hasBorder ? "border-2 border-white" : "border-none"
      }  ${hasBg ? "backdrop-blur-2xl" : ""}`}
    >
      <CardHeader className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-950">
          {title}
        </h1>
        <p className="text-neutral-800">{description}</p>
      </CardHeader>
      <CardContent className="px-0 w-full">{children}</CardContent>
      <CardFooter className="flex flex-col gap-4 w-full px-0 mt-[-10px]">
        {hasSocialSignOn && <SocialSignOns />}
        <Button
          variant="link"
          size="sm"
          asChild
          className={` ${
            hasBorder
              ? "text-neutral-200 hover:text-white"
              : "hover:text-orange-600"
          }`}
        >
          <Link href={secondaryActionLink}>{secondaryActionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
