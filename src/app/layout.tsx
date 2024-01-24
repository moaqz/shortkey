import type { Metadata } from "next";
import { BASE_URL } from "~/lib/constants";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Shortkey",
  description: "Minimalistic and open-source URL shortener.",
  openGraph: {
    title: "Shortkey",
    description: "Minimalistic and open-source URL shortener.",
    type: "website",
    url: BASE_URL,
  },
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
