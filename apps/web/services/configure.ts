"use server";

import { redirect } from "next/navigation";
import axios from "@/utils/axios";
import { BASE_URL } from "@/utils/config";
import { getAccessTokenFromCookie } from "./auth";

export const createConfiguration = async ({
  imageUrl,
}: {
  imageUrl: string;
}) => {
  let configId;
  try {
    const accessToken = await getAccessTokenFromCookie();

    const { data } = await axios.post(
      `${BASE_URL}/configure`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    configId = data.data.configuration.id;
  } catch (error) {
    throw new Error("failed to create configuration");
  }

  redirect(`/configure/design?id=${configId}`);
};

export const getConfigurationById = async () => {};
