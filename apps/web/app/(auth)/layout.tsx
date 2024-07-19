import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/user";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      {children}
    </main>
  );
};

export default AuthLayout;
