"use client";

import toast, { Toaster } from "react-hot-toast";
import { CardWrapper } from "./card-wrapper";
import { useCallback, useEffect, useTransition, useState } from "react";
import { MyToaster } from "../my-toaster";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/app/actions/new-verification";
import { useSearchParams } from "next/navigation";

export const NewVerificationCard = () => {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    startTransition(() => {
      newVerification(token).then((data) => {
        if (data.success) {
          toast.success(data?.success);
        } else {
          toast.error(data?.error as string);
        }
      });
    });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      title="Verification"
      description="Email confirmation process"
      secondaryActionLabel="Back to Login"
      secondaryActionLink="/auth/logn"
      hasBg
      hasBorder
    >
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {isPending && (
          <>
            <p className="font-semibold">Confirming your email</p>
            <BeatLoader />
          </>
        )}
      </div>
      <MyToaster />
    </CardWrapper>
  );
};
