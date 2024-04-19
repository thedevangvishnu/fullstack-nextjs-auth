"use client";

import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { PROFILE_PAGE_REDIRECT_URL } from "@/lib/routes";

export const SocialSignOns = () => {
  const onBtnClick = async (provider: string) => {
    await signIn(provider, {
      callbackUrl: PROFILE_PAGE_REDIRECT_URL,
    });
  };

  return (
    <div className="flex items-center w-full justify-between">
      <Button
        variant="default"
        size="lg"
        className="font-semibold rounded-[40px] border-[2px] border-neutral-700 text-orange-600 backdrop-blur-xl bg-white hover:bg-orange-100 hover:border-orange-500 hover:shadow-lg duration-200 uppercase flex items-center gap-1 px-7"
        onClick={() => onBtnClick("google")}
      >
        <AiFillGoogleCircle className="text-2xl" />
        Google
      </Button>

      <Button
        variant="default"
        size="lg"
        className="font-semibold rounded-[40px] border-[2px] border-neutral-700 text-orange-600 backdrop-blur-xl bg-white hover:bg-orange-100 hover:border-orange-500 hover:shadow-lg duration-200 uppercase flex items-center gap-1 px-7"
        onClick={() => onBtnClick("github")}
      >
        <AiFillGithub className="text-2xl" />
        GitHub
      </Button>
    </div>
  );
};
