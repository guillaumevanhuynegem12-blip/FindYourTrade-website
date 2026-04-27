import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novx — Make traders profitable",
  description:
    "Novx turns losing traders into profitable ones. Spot mistakes, master discipline, and automate your edge.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="novx-gradient min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
