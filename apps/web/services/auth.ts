"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/utils/config";
import { SignUpFormData } from "@/types";

export const signUp = async (formData: SignUpFormData) => {
  let statusCode;
  try {
    const { status } = await axios.post(
      `${BASE_URL}/api/v1/auth/signup`,
      formData,
      {
        withCredentials: true,
      }
    );

    statusCode = status;
  } catch (error) {
    console.log(error);
  }

  if (statusCode === 201) {
    redirect(`/verify?email=${formData.email}`);
  }
};
