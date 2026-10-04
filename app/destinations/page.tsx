import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, getJobsByCountrySlug } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore overseas job destinations with Ajira Majuu: Saudi Arabia, UAE, Qatar, Kuwait, Bahrain and Oman. See current opportunities and how to apply.",
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />

      <section className="container-content py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Where We Place Talent
          </p>
          <h1 className="section-title mt-3">Destinations</h1>
          <p className="mt-4 text-slate-600">
            Opportunities across the Gulf region, depending on current employer demand. Choose a
            destination to see current opportunities, requirements, and the recruitment process.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => {
            const count = getJobsByCountrySlug(d.slug).length;
            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="glass-panel group relative flex aspect-[4/3] flex-col justify-end overflow-hidden p-5 transition hover:shadow-glass-lg"
              >
                <Image
                  src={d.thumbImage}
                  alt={`${d.name} skyline`}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="relative">
                  <h2 className="font-display text-xl font-bold text-white">{d.name}</h2>
                  <p className="mt-1 text-xs text-white/80">
                    {count > 0 ? `${count} current ${count === 1 ? "opportunity" : "opportunities"}` : "Contact us for current openings"}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                    View {d.name} Opportunities →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
