import type { ReactNode } from "react";

/**
 * The sign-in screen sits on its own, without the portal navigation.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col items-center px-5 py-12 sm:py-16">
      {children}
    </div>
  );
}
