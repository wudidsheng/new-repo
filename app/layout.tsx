import type { Metadata } from "next";
import { Noto_Serif_HK } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { zhCN } from "@clerk/localizations";
import { Suspense } from "react";

const notoSerifHK = Noto_Serif_HK({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Logo",
  description: "Generated Logo by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="en">
        <body className={`${notoSerifHK.className}  antialiased`}>
          <Suspense>
            <Provider>{children}</Provider>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
