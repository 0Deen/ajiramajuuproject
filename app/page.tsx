import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobCategories from "@/components/JobCategories";
import { GulfShowcase } from "@/components/GulfShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />
      <GulfShowcase />
      <Hero />
      <JobCategories />
      <WhyChooseUs />
      <ContactSection />
      <Footer />
    </main>
  );
}
