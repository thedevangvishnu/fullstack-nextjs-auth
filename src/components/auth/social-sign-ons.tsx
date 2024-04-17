"use client";

import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";

export const SocialSignOns = () => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="default"
        size="lg"
        className="font-semibold rounded-[40px] border-[2px] border-neutral-700 text-orange-600 backdrop-blur-xl bg-white hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg duration-200 uppercase flex items-center gap-1 px-5 md:px-8"
        onClick={() => {}}
      >
        <AiFillGoogleCircle className="text-2xl" />
        Google
      </Button>

      <Button
        variant="default"
        size="lg"
        className="font-semibold rounded-[40px] border-[2px] border-neutral-700 text-orange-600 backdrop-blur-xl bg-white hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg duration-200 uppercase flex items-center gap-1 px-5 md:px-8"
        onClick={() => {}}
      >
        <AiFillGithub className="text-2xl" />
        GitHub
      </Button>
    </div>
  );
};
