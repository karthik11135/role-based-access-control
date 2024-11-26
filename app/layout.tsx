import type { Metadata } from "next";
import {Nunito} from 'next/font/google' 
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const nt = Nunito({
  weight: ['400', '700'], 
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Role based Auth",
  description: "Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nt.className} min-h-screen text-slate-50 bg-black`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
