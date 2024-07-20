"use server";
import axios from "@/utils/axios";
import { getAccessTokenFromCookie } from "./auth";

export const getCurrentUser = async () => {
  try {
    const accessToken = await getAccessTokenFromCookie();

    const { data } = await axios.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data;
  } catch (error) {
    return null;
  }
};
