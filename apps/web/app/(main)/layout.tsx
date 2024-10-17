import React, { ReactNode } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="grainy-light min-h-[calc(100svh-128px)]">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
