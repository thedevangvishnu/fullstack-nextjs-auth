"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { NewPasswordFormType, NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useTransition, useState } from "react";
import toast from "react-hot-toast";
import { MyToaster } from "@/components/my-toaster";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/app/actions/new-password";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

export const NewPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordFormType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onFormSubmit = useCallback(
    (values: NewPasswordFormType) => {
      console.log({ token });
      if (!token) {
        toast.error("Missing token!");
        return;
      }

      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      startTransition(() => {
        newPassword(values, token)
          .then((data) => {
            if (data?.success) {
              toast.success(data?.success);
            } else {
              toast.error(data?.error as string);
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      });
    },
    [token]
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardWrapper
        title="New password"
        description="Enter your new password"
        secondaryActionLink="/auth/login"
        secondaryActionLabel="Back to Login"
      >
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="flex flex-col gap-3">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl className="relative">
                      <>
                        <Input
                          disabled={isPending}
                          type={!showNewPassword ? "password" : "text"}
                          placeholder="New Password"
                          {...field}
                          className={`flex items-center rounded-[30px] w-full h-10 placeholder:text-neutral-700 pr-10 ${form.formState}`}
                        />
                        {!showNewPassword && (
                          <FaEyeSlash
                            className="absolute top-1 right-4 cursor-pointer text-neutral-500"
                            onClick={() => setShowNewPassword(true)}
                          />
                        )}
                        {showNewPassword && (
                          <FaEye
                            className="absolute top-1 right-4 cursor-pointer text-neutral-500"
                            onClick={() => setShowNewPassword(false)}
                          />
                        )}
                      </>
                    </FormControl>
                    <div className="h-3 text-right italic">
                      <FormMessage className="text-[12px] italic text-red-600 font-semibold" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl className="relative">
                      <>
                        <Input
                          disabled={isPending}
                          type={!showConfirmPassword ? "password" : "text"}
                          placeholder="Confirm Password"
                          {...field}
                          className={`flex items-center rounded-[30px] w-full h-10 placeholder:text-neutral-700 pr-10 ${form.formState}`}
                        />
                        {!showConfirmPassword && (
                          <FaEyeSlash
                            className="absolute top-1 right-4 cursor-pointer text-neutral-500"
                            onClick={() => setShowConfirmPassword(true)}
                          />
                        )}
                        {showConfirmPassword && (
                          <FaEye
                            className="absolute top-1 right-4 cursor-pointer text-neutral-500"
                            onClick={() => setShowConfirmPassword(false)}
                          />
                        )}
                      </>
                    </FormControl>
                    <div className="h-3 text-right italic">
                      <FormMessage className="text-[12px] italic text-red-600 font-semibold" />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isPending}
              type="submit"
              variant="default"
              size="lg"
              className="w-full mt-5 font-semibold rounded-[40px] text-white bg-orange-600 hover:bg-orange-500 hover:shadow-lg duration-200 uppercase"
            >
              {isPending ? <BeatLoader size={8} color="white" /> : "RESET"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
      <div className="absolute right-4 bottom-4">
        <MyToaster />
      </div>
    </div>
  );
};
