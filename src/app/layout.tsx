import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ListeningProvider from "@/components/ListeningProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuned Testimony",
  description:
    "Reimagined hymns, scripture songs, conference messages, and original music created to strengthen faith in Jesus Christ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className={`${geistSans.variable} min-h-full flex flex-col`}>
        <ListeningProvider>{children}</ListeningProvider>
      </body>
    </html>
  );
}
