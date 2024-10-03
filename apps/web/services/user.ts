"use server";
import axios from "@/lib/axios";
import { getAccessTokenFromCookie, getRefreshTokenFromCookie } from "./auth";

export const getCurrentUser = async (): Promise<{
  user: {
    id: string;
    email: string;
    name: string;
  };
  token?: {
    accessToken: string;
    refreshToken: string;
  };
} | null> => {
  try {
    const accessToken = await getAccessTokenFromCookie();

    const { data } = await axios.get("/users/current-user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data;
  } catch (error: any) {
    const refreshToken = await getRefreshTokenFromCookie();
    if (error.response?.data?.status === "fail" && refreshToken) {
      const { data } = await axios.post("/auth/refresh-token", {
        refreshToken,
      });

      return { ...data.data, token: { ...data.token } };
    }
    return null;
  }
};
