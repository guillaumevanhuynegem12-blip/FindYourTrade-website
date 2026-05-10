import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DashboardPreview from "@/components/DashboardPreview";
import BrokerStrip from "@/components/BrokerStrip";
import Features from "@/components/Features";
import DeepDive from "@/components/DeepDive";
import TrustSignals from "@/components/TrustSignals";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Nav />
      <Hero />
      <DashboardPreview />
      <BrokerStrip />
      <Features />
      <DeepDive />
      <TrustSignals />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
