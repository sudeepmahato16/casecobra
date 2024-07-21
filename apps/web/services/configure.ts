"use server";

import { redirect } from "next/navigation";
import axios from "@/utils/axios";
import { getAccessTokenFromCookie } from "./auth";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  Configuration,
  PhoneModel,
} from "@/types";

export const createConfiguration = async ({
  imageUrl,
}: {
  imageUrl: string;
}) => {
  let configId;
  try {
    const accessToken = await getAccessTokenFromCookie();

    const { data } = await axios.post(
      "/configure",
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

export const getConfigurationById = async (
  id: string
): Promise<Configuration | null> => {
  const accessToken = await getAccessTokenFromCookie();

  try {
    const { data } = await axios.get(`/configure/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data.configuration;
  } catch (error) {
    return null;
  }
};

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
  croppedImageUrl: string;
};

export const updateConfiguration = async ({
  color,
  configId,
  model,
  material,
  finish,
  croppedImageUrl,
}: SaveConfigArgs) => {
  const accessToken = await getAccessTokenFromCookie();

  const { data } = await axios.patch(
    `/configure/${configId}`,
    {
      color,
      model,
      material,
      finish,
      croppedImageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return data.data.configuration;
};
