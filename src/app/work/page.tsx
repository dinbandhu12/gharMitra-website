import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Work from "@/components/Work";

export const metadata: Metadata = {
  title: "How gharMitra Works - The platform behind a simpler home search",
  description:
    "See how gharMitra works end to end: verified visual listings, direct owner contact, and three simple steps to find or list a home with no brokers in between.",
  openGraph: {
    title: "How gharMitra Works - The platform behind a simpler home search",
    description:
      "Verified listings, direct owner contact, and three simple steps to find or list a home no brokers, no middlemen.",
    type: "website",
    url: "https://gharmitra.com/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <Nav overHero />
      <main className="flex-1">
        <Work />
      </main>
      <Footer />
    </>
  );
}
