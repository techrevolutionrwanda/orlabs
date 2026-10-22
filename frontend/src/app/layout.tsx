import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "OrLabs Tech Industries — Software engineering from Kigali, Rwanda",
  description:
    "OrLabs Tech Industries is a Rwandan software engineering company building custom software, web and mobile apps, cloud and data solutions for organisations across Africa.",
  icons: {
    icon: "orlabs-logo-pack/favicon.svg",
    apple: "orlabs-logo-pack/orlabs-app-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="absolute -left-[9999px] top-0 z-[100] rounded-sm bg-gold p-3 text-navy focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
