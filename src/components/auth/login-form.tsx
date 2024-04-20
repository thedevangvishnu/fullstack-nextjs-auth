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
import { LoginFormType, LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState, useTransition } from "react";
import { login } from "@/app/actions/login";
import toast from "react-hot-toast";
import { MyToaster } from "@/components/my-toaster";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { UrlErrorToaster } from "./url-error-toaster";
import Link from "next/link";
import { FaEyeSlash, FaEye } from "react-icons/fa6";

export const LoginForm = () => {
  const [urlError, setUrlError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const authError = searchParams.get("error");

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const updateUrlError = useCallback(() => {
    const error =
      authError === "OAuthAccountNotLinked"
        ? "Email already in use with different provider"
        : "";

    setUrlError(error);
  }, [authError]);

  useEffect(() => {
    updateUrlError();
  }, [updateUrlError]);

  const onFormSubmit = useCallback((values: LoginFormType) => {
    startTransition(() => {
      login(values).then((data) => {
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
        title="Login"
        description="Delighed to have you here!"
        secondaryActionLink="/auth/register"
        secondaryActionLabel="Don't have an account? Sign Up"
        hasSocialSignOn
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

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormControl className="relative">
                      <>
                        <Input
                          disabled={isPending}
                          type={!showPassword ? "password" : "text"}
                          placeholder="*******"
                          {...field}
                          className={`flex items-center rounded-[30px] w-full h-10 placeholder:text-neutral-700 pr-10 ${form.formState}`}
                        />
                        {!showPassword && (
                          <FaEyeSlash
                            className="absolute top-1 right-4 cursor-pointer text-neutral-500"
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                        {showPassword && (
                          <FaEye
                            className="absolute top-1 right-4 cursor-pointer text-neutral-500"
                            onClick={() => setShowPassword(false)}
                          />
                        )}
                      </>
                    </FormControl>
                    <div className="h-3 flex items-center justify-between">
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className=" hover:text-orange-500 duration-200"
                      >
                        <Link href="/auth/reset-password" className="mt-3">
                          Forgot password?
                        </Link>
                      </Button>
                      <FormMessage className="text-[12px] italic text-red-600 font-semibold ml-auto" />
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
              className="w-full mt-10 font-semibold rounded-[40px] text-white bg-orange-600 hover:bg-orange-500 hover:shadow-lg duration-200 uppercase"
            >
              {isPending ? <BeatLoader size={8} color="white" /> : "SIGN IN"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
      <div className="absolute right-4 bottom-4">
        <MyToaster />
        {urlError && <UrlErrorToaster error={urlError} />}
      </div>
    </div>
  );
};
