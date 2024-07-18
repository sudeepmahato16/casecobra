import React from "react";
import AuthFormHeader from "./AuthFormHeader";
import { Button, Input, Label } from "@casecobra/ui";
import FormItem from "./FormItem";
import AuthFormFooter from "./AuthFormFooter";

const SignupForm = () => {
  return (
    <div className="max-w-[410px] w-full px-4 py-20 ">
      <AuthFormHeader
        title="Create your account"
        subtitle=" Welcome! Please fill in the details."
      />
      <form className="p-2 flex flex-col gap-6 my-7">
        <FormItem>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" />
        </FormItem>

        <FormItem>
          <Label htmlFor="email">Email address</Label>
          <Input type="email" id="email" />
        </FormItem>

        <FormItem>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" />
        </FormItem>

        <Button type="submit" size="lg" className="mt-4">
          Continue
        </Button>
      </form>

      <AuthFormFooter
        text="Already have an account?"
        url="/signin"
        label="Sign in"
      />
    </div>
  );
};

export default SignupForm;
