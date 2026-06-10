import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import {
  WhyGharMitra,
  HowItWorks,
  BuiltForEveryone,
  Faq,
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
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
