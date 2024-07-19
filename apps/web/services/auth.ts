"use server";
import { redirect } from "next/navigation";
import axios from "@/utils/axios";
import { SignUpFormData } from "@/types";

export const signUp = async (formData: SignUpFormData) => {
  let statusCode;
  try {
    const { status } = await axios.post(`/auth/signup`, formData, {
      withCredentials: true,
    });

    statusCode = status;
  } catch (error) {
    console.log(error);
  }

  if (statusCode === 201) {
    redirect(`/verify?email=${formData.email}`);
  }
};
