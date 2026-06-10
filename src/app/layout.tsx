import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import TransitionProvider from "@/components/TransitionProvider";

// Display / headings (h1–h4): Geist — a clean, modern variable grotesque.
const display = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gharmitra.com"),
  title: "gharMitra — Find or List a Home, Simply",
  description:
    "gharMitra connects home owners and seekers directly. List your house, room, or flat with photos and videos, see real prices, and contact owners with one tap. Free to browse. Made simple for everyone.",
  openGraph: {
    title: "gharMitra — Find or List a Home, Simply",
    description:
      "List your house, room, or flat with photos and videos, see real prices, and contact owners directly. Made simple for everyone — including first-time and elderly users.",
    type: "website",
    url: "https://gharmitra.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <TransitionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </TransitionProvider>
      </body>
    </html>
  );
}
