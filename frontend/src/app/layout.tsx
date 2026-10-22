import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Footer } from "@/src/components/site/Footer";
import { Header } from "@/src/components/site/Header";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title:
    "OrLabs Tech Industries — Software engineering from Kigali, Rwanda",
  description:
    "OrLabs Tech Industries is a Rwandan software engineering company building custom software, web and mobile apps, cloud and data solutions for organisations across Africa.",
  openGraph: {
    title: "OrLabs Tech Industries — Light, engineered.",
    description:
      "Software that brings light to your business. Custom software, apps, cloud and data solutions from Kigali, Rwanda.",
    images: ["/orlabs-logo-pack/orlabs-logo-horizontal-on-navy.png"],
    type: "website",
  },
  icons: {
    icon: "/orlabs-logo-pack/favicon.svg",
    apple: "/orlabs-logo-pack/orlabs-app-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
