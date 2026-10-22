import type { ReactNode } from "react";
import { Footer } from "@/src/components/site/Footer";
import { Header } from "@/src/components/site/Header";

/**
 * Chrome for the public marketing site. The portal lives in its own route
 * group so it can use a completely different shell.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
