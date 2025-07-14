import "@/app/globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Suppress hydration mismatch warning (only after checking everything else) */}
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
