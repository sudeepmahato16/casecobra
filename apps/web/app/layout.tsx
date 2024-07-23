import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import { constructMetadata } from "@/utils/helper";
import "./globals.css";

const recursive = Recursive({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>{children}</body>
    </html>
  );
}
