"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, jobs } from "@/data/jobs";

export default function JobsPage() {
  const [country, setCountry] = useState<string>("All");

  const countryOptions = useMemo(
    () => ["All", ...Array.from(new Set(jobs.map((j) => j.country)))],
    []
  );

  const filtered = jobs.filter((j) => country === "All" || j.country === country);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />

      <section className="container-content py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Current Opportunities
          </p>
          <h1 className="section-title mt-3">Jobs</h1>
          <p className="mt-4 text-slate-600">
            Structured opportunities currently listed by Ajira Majuu. Other destinations are active
            too — WhatsApp us for roles not yet listed here.
          </p>
        </div>

        {/* filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {countryOptions.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                country === c
                  ? "border-brand-purple bg-brand-purple text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-brand-purple/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* job grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <div key={job.slug} className="glass-panel flex flex-col overflow-hidden">
              <div className="relative h-40 w-full">
                <Image src={job.image} alt={job.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">
                  {job.country} · {job.category}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-ink">{job.title}</h3>
                <p className="mt-2 text-sm font-semibold text-brand-purple">{job.salary}</p>
                <div className="mt-auto flex gap-2 pt-4">
                  <Link href={`/jobs/${job.slug}`} className="btn-secondary flex-1 !px-4 !py-2 text-xs">
                    View Details
                  </Link>
                  <Link
                    href={`/apply?country=${encodeURIComponent(job.country)}&job=${encodeURIComponent(job.title)}`}
                    className="btn-primary flex-1 !px-4 !py-2 text-xs"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* other destinations, honestly framed */}
        <div className="glass-panel mt-12 p-6 text-center sm:p-8">
          <h2 className="font-display text-lg font-bold text-ink">
            Don&apos;t See Your Destination?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Ajira Majuu also places candidates in{" "}
            {destinations
              .filter((d) => !jobs.some((j) => j.countrySlug === d.slug))
              .map((d) => d.name)
              .join(", ")}
            . Specific roles for these destinations aren&apos;t listed yet — contact us directly.
          </p>
          <Link href="/destinations" className="btn-secondary mt-4 inline-flex">
            Explore All Destinations
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
