import type { Metadata } from "next";
import { BASE_URL } from "~/lib/constants";
import "~/styles/globals.css";

const METADATA = {
  title: "Shortkey",
  description: "Minimalistic and open-source URL shortener.",
  images: [
    {
      url: `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
  ],
};

export const metadata: Metadata = {
  title: METADATA.title,
  description: METADATA.description,
  openGraph: {
    title: METADATA.title,
    description: METADATA.description,
    type: "website",
    url: BASE_URL,
    images: [...METADATA.images],
  },
  twitter: {
    title: METADATA.title,
    description: METADATA.description,
    card: "summary_large_image",
    images: [...METADATA.images],
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
