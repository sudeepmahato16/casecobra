"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "@/utils/axios";
import { BASE_URL } from "@/utils/config";

export const createConfiguration = async ({
  imageUrl,
}: {
  imageUrl: string;
}) => {
  let configId;
  try {
    const accessToken = cookies().get("casecobra-access-token");

    if (!accessToken?.value) throw new Error("Please log in");

    const { data } = await axios.post(
      `${BASE_URL}/configure`,
      { imageUrl },
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
    configId = data.data.configuration.id;
  } catch (error) {
    throw new Error("failed to create configuration");
  }

  redirect(`/configure/design?id=${configId}`);
};
