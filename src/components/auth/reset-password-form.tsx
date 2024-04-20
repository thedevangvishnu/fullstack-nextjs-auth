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
import { ResetPasswordFormType, ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useTransition } from "react";
import toast from "react-hot-toast";
import { MyToaster } from "@/components/my-toaster";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { resetPassword } from "@/app/actions/reset-password";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const form = useForm<ResetPasswordFormType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onFormSubmit = useCallback((values: ResetPasswordFormType) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data?.success) {
          toast.success(data?.success);
        } else {
          toast.error(data?.error as string);
        }
      });
    });
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardWrapper
        title="Reset password"
        description="Enter your email to get reset link"
        secondaryActionLink="/auth/login"
        secondaryActionLabel="Back to Login"
        s
      >
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="flex flex-col gap-3">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="email"
                        placeholder="abc@email.com"
                        {...field}
                        className="rounded-[30px] w-full h-10 placeholder:text-neutral-700"
                      />
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
