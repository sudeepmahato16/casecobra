import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex z-40 font-semibold lg:text-2xl md:text-lg text-base"
    >
      case<span className="text-green-600">cobra</span>
    </Link>
  );
};

export default Logo;
