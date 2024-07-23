"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "@/services/auth";
import { Button, Input, Label, toast } from "@casecobra/ui";
import FormItem from "./FormItem";
import { SignInFormData, SignInSchema } from "@/types";

const SigninForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: SignInFormData) => {
    startTransition(async () => {
      const res = await signIn(data);

      if (res && res.status === "error") {
        toast.error(res.message);
        setError("email", {});
        setError("password", {}, { shouldFocus: true });
      }
    });
  };

  return (
    <form
      className="p-2 flex flex-col gap-6 my-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormItem error={errors.email?.message}>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
          autoFocus
          error={!!errors.email}
        />
      </FormItem>

      <FormItem error={errors.password?.message}>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: true,
          })}
          error={!!errors.password}
        />
      </FormItem>

      <Button type="submit" size="lg" className="mt-4" isLoading={isLoading}>
        Continue
      </Button>
    </form>
  );
};

export default SigninForm;
