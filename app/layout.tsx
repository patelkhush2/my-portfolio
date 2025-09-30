import "@/styles/main.css";

import type { Metadata } from "next";

import { Providers } from "@/components/providers";

import clsx from "clsx";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Khush Patel – Portfolio",
  description: "",
  openGraph: {
    title: "Khush Patel – Portfolio",
    url: "https://khushpatel.work",
    siteName: "Khush Patel",
    locale: "en_CA",
    type: "website",
  },
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={clsx(inter.className)} suppressHydrationWarning>
      <body>
        <Providers>
          <main className="mx-auto max-w-screen-md overflow-x-hidden px-6 py-24 md:overflow-x-visible ">
            <article className="article">{children}</article>
          </main>
        </Providers>
      </body>
    </html>
  );
}
