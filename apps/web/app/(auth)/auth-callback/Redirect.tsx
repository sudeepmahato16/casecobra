"use client";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode, useEffect, useRef } from "react";

interface RedirectProps {
  children: ReactNode;
}

const Redirect: FC<RedirectProps> = ({ children }) => {
  const router = useRouter();
  const initialRender = useRef(false);

  useEffect(() => {
    if (initialRender.current) return;
    initialRender.current = true;
    const configId = localStorage.getItem("configId");
    if (configId) {
      localStorage.removeItem("configId");
      router.push(`/configure/preview?id=${configId}`);
    } else {
      router.push("/");
    }
  }, []);

  return <>{children}</>;
};

export default Redirect;
