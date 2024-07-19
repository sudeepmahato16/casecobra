"use server";
import { cache } from "react";
import { cookies } from "next/headers";
import axios from "@/utils/axios";

export const getCurrentUser = cache(async () => {
  try {
    const accessToken = cookies().get("casecobra-access-token");

    const { data } = await axios.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    });

    return data.data;
  } catch (error) {
    return null;
  }
});
