import { FC, Suspense } from "react";

import ThankYou from "./ThankYou";
import { notFound } from "next/navigation";

interface ThankYouPageProps {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}

const ThankYouPage: FC<ThankYouPageProps> = ({ searchParams: { id } }) => {
  if (!id || typeof id !== "string") return notFound();
  return (
    <Suspense>
      <ThankYou id={id} />
    </Suspense>
  );
};

export default ThankYouPage;
