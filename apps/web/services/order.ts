"use server";

import axios from "@/utils/axios";
import { getAccessTokenFromCookie } from "./auth";

export const createPaymentSession = async (
  configId: string
): Promise<
  | {
      status: "success";
      data: {
        session: {
          url: string;
        };
      };
    }
  | {
      status: "error";
      message: string;
    }
> => {
  try {
    const accessToken = await getAccessTokenFromCookie();
    if (!accessToken) throw new Error("Please logged in!");
    const { data } = await axios.get(`/order/checkout-session/${configId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
};
