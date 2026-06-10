import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import {
  WhyGharMitra,
  HowItWorks,
  BuiltForEveryone,
  Pricing,
  FinalCTA,
} from "@/components/Sections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav overHero />
      <main className="flex-1">
        <Hero />
        <WhyGharMitra />
        <HowItWorks />
        <BuiltForEveryone />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
