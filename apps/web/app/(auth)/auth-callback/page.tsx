import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

import { getCurrentUser } from "@/services/user";
import Redirect from "./Redirect";

const AuthCallBackPage = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/signin");

  return (
    <Redirect>
      <div className="w-full flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Logging you in...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    </Redirect>
  );
};

export default AuthCallBackPage;
