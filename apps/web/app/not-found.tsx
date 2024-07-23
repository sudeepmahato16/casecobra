import React from "react";
import Link from "next/link";
import { buttonVariants } from "@casecobra/ui";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link
          href="/"
          className={buttonVariants({
            size: "sm",
          })}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
