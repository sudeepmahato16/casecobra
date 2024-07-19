import React from "react";
import UploadImage from "@/features/configure/UploadImage";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { BASE_URL } from "@/utils/config";

const UploadPage = () => {
  return (
    <EdgeStoreProvider basePath={`${BASE_URL}/edgestore`}>
      <UploadImage />
    </EdgeStoreProvider>
  );
};

export default UploadPage;
