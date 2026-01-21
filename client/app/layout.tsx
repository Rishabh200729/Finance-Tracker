import "./globals.css";
import { Poppins } from "next/font/google";

import { ReactNode } from "react";
import { Providers } from "@/components/providers";

export const poppins_init = Poppins({
  subsets : ["latin"],
  display : 'swap',
  variable : '--font-poppins',
  weight : ['400', '600']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Providers><main>{children}</main></Providers>
      </body>
    </html>
  );
}
