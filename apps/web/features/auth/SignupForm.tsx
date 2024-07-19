"use client";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Label } from "@casecobra/ui";
import FormItem from "./FormItem";
import { SignUpFormData, SignUpSchema } from "@/types";
import { signUp } from "@/services/auth";

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: SignUpFormData) => {
    startTransition(async () => {
      await signUp(data);
    });
  };

  return (
    <form
      className="p-2 flex flex-col gap-6 my-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormItem error={errors.name?.message}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: true,
          })}
        />
      </FormItem>

      <FormItem error={errors.email?.message}>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: true,
          })}
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
        />
      </FormItem>

      <Button type="submit" size="lg" className="mt-4" isLoading={isLoading}>
        Continue
      </Button>
    </form>
  );
};

export default SignupForm;
