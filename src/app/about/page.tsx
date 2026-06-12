import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About gharMitra - A home for every Indian, without the broker",
  description:
    "The story, vision, and people behind gharMitra a no-broker app connecting home owners and seekers directly, with verified listings, real prices, and zero middlemen.",
  openGraph: {
    title: "About gharMitra - A home for every Indian, without the broker",
    description:
      "The story, vision, and people behind gharMitra connecting owners and seekers directly, with verified listings and no brokers.",
    type: "website",
    url: "https://gharmitra.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav overHero />
      <main className="flex-1">
        <About />
      </main>
      <Footer />
    </>
  );
}
