"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import axios from "@/utils/axios";
import { SignInFormData, SignUpFormData } from "@/types";

export const getAccessTokenFromCookie = async () => {
  const accessToken = cookies().get("casecobra-access-token");
  if (!accessToken?.value) return null;

  return accessToken.value;
};

export const signUp = async (formData: SignUpFormData) => {
  try {
    const { status } = await axios.post(`/auth/signup`, formData, {
      withCredentials: true,
    });

    if (status !== 201) throw new Error("Failed to sign up");
  } catch (error: any) {
    return {
      status: "fail",
      message: error.message,
    };
  }

  redirect(`/verify?email=${formData.email}`);
};

export const signIn = async (formData: SignInFormData) => {
  try {
    const { status, headers } = await axios.post(`/auth/signin`, formData, {
      withCredentials: true,
    });

    if (status !== 200) throw new Error("fail to login");

    const cookie = cookies();
    headers["set-cookie"]?.map((c) => {
      const [name, value] = c.split("=");

      if (!value || !name) return;

      cookie.set(name, value?.slice(0, value.length - 6), {
        httpOnly: true,
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      });
    });
  } catch (error: any) {
    return {
      status: "fail",
      message: error.message,
    };
  }

  revalidatePath("/");
  redirect("/");
};

export const signOut = () => {
  const cookie = cookies();

  cookie.delete("casecobra-access-token");
  cookie.delete("casecobra-refresh-token");

  redirect("/");
};
