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
import { RegisterFormType, RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { register } from "@/app/actions/register";
import toast from "react-hot-toast";
import { MyToaster } from "@/components/my-toaster";
import { BeatLoader } from "react-spinners";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (values: RegisterFormType) => {
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          } else {
            toast.error(data.error!);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <CardWrapper
        title="Register"
        description="Welcome! Create a new account"
        secondaryActionLink="/auth/login"
        secondaryActionLabel="Already have an account? Sign In"
        hasSocialSignOn
      >
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="flex flex-col gap-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="name"
                        placeholder="Your name"
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
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="password"
                        placeholder="*******"
                        {...field}
                        className={`flex items-center rounded-[30px] w-full h-10 placeholder:text-neutral-700 ${form.formState}`}
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
              className="w-full mt-10 font-semibold rounded-[40px] text-white backdrop-blur-xl bg-orange-600 hover:bg-orange-500 hover:shadow-lg duration-200 uppercase disabled:cursor-not-allowed"
            >
              {isPending ? <BeatLoader size={8} color="white" /> : "SIGN UP"}
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
