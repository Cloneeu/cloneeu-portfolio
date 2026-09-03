import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import {
  getSiteUrl,
  SITE_BASE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: SITE_TITLE,
    template: "%s | Cloneeu",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Alexandro", url: "https://github.com/Cloneeu" }],
  creator: "Alexandro (Cloneeu)",
  publisher: "Cloneeu",
  category: "technology",
  keywords: [
    "Cloneeu",
    "Alexandro",
    "software engineer",
    "systems engineer",
    "web developer",
    "Next.js portfolio",
    "TypeScript",
    "React",
  ],
  alternates: {
    canonical: getSiteUrl().toString(),
  },
  manifest: `${SITE_BASE_PATH}/manifest.webmanifest`,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl().toString(),
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
