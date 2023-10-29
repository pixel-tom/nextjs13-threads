import React from "react";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import RightSidebar from "@/components/shared/RightSidebar";
import Topbar from "@/components/shared/Topbar";

const inter = Red_Hat_Display({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang='en' className="bg-dark-1">
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row max-w-[1500px] mx-auto'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-6xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
