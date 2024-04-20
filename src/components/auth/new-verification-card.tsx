"use client";

import { CardWrapper } from "./card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { MyToaster } from "../my-toaster";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/app/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { SuccessMessage } from "../success-message";
import { ErrorMessage } from "../error-message";

export const NewVerificationCard = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data?.success);
        } else {
          setError(data?.error);
        }
      })
      .catch((error) => [setError("Something went wrong!")]);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardWrapper
        title="Verification"
        description="Email confirmation process"
        secondaryActionLabel="Back to Login"
        secondaryActionLink="/auth/logn"
      >
        <div className="w-full flex flex-col items-center justify-center gap-2">
          {!success && !error && (
            <>
              <p className="font-semibold">Confirming your email</p>
              <BeatLoader />
            </>
          )}
          {success && !error && (
            <>
              <SuccessMessage message={success} />
              <p className="font-medium text-white">
                Now, try signing in again.
              </p>
            </>
          )}
          {error && <ErrorMessage message={error} />}
        </div>
        <MyToaster />
      </CardWrapper>
    </div>
  );
};
