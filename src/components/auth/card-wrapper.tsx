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
  body?: React.ReactNode;
  hasSocialSignOn: boolean;
  secondaryActionLabel: string;
  secondaryActionLink: string;
};

export const CardWrapper = ({
  title,
  description,
  body,
  hasSocialSignOn,
  secondaryActionLabel,
  secondaryActionLink = "",
}: CardWrapperProps) => {
  return (
    <Card className="w-[300px] md:w-[450px] px-2 md:px-4 flex flex-col items-center gap-4 border-none bg-trasparent ">
      <CardHeader className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-neutral-950">
          {title}
        </h1>
        <p className="text-neutral-800">{description}</p>
      </CardHeader>
      <CardContent>{body}</CardContent>
      <CardFooter className="flex flex-col gap-4">
        {hasSocialSignOn && <SocialSignOns />}
        <Button
          variant="link"
          size="sm"
          asChild
          className="hover:text-orange-600"
        >
          <Link href={secondaryActionLink}>{secondaryActionLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
