import React, { FC } from "react";
import { notFound } from "next/navigation";
import { getConfigurationById } from "@/services/configure";
import DesignPreview from "@/features/configure/DesignPreview";

interface PreviewPageProps {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}

const PreviewPage: FC<PreviewPageProps> = async ({ searchParams: { id } }) => {
  if (!id || typeof id !== "string") return notFound();

  const configuration = await getConfigurationById(id);

  if (!configuration) return notFound();

  return <DesignPreview configuration={configuration} />;
};

export default PreviewPage;
