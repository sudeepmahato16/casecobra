import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/features/configure/Steps";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
