import type { Metadata } from "next";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Shortkey",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-zinc-100">{children}</body>
    </html>
  );
}
