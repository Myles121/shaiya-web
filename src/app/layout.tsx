import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@app/_lib/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shaiya M",
  description: "Join Shaiya M today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-blue-500 via-purple-500 to-violet-500 min-h-screen`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
