"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Label } from "@casecobra/ui";
import FormItem from "./FormItem";
import { SignInFormData, SignInSchema } from "@/types";

const SigninForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormData) => {
    const { email, password } = data;
    console.log(email, password);
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

      <Button type="submit" size="lg" className="mt-4">
        Continue
      </Button>
    </form>
  );
};

export default SigninForm;
