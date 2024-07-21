import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/features/configure/Steps";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { BASE_URL } from "@/utils/config";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <EdgeStoreProvider basePath={`${BASE_URL}/edgestore`}>
      <MaxWidthWrapper className="flex-1 flex flex-col">
        <Steps />
        {children}
      </MaxWidthWrapper>
    </EdgeStoreProvider>
  );
};

export default Layout;
