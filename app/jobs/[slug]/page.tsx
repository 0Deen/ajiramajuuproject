import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs, getJobBySlug, getJobsByCountrySlug, getDestinationBySlug } from "@/data/jobs";
import { buildWhatsAppUrl, jobWhatsAppMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const job = getJobBySlug(params.slug);
  if (!job) return {};
  return {
    title: `${job.title} — ${job.country}`,
    description: `${job.title} opportunity in ${job.country} with Ajira Majuu. Salary: ${job.salary}. Apply directly — no account required.`,
  };
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  const destination = getDestinationBySlug(job.countrySlug);
  const related = getJobsByCountrySlug(job.countrySlug).filter((j) => j.slug !== job.slug);
  const whatsappUrl = buildWhatsAppUrl(jobWhatsAppMessage(job.title, job.country));
  const applyUrl = `/apply?country=${encodeURIComponent(job.country)}&job=${encodeURIComponent(job.title)}`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />

      <section className="container-content py-10 sm:py-14">
        <nav className="text-xs text-slate-500">
          <Link href="/jobs" className="hover:text-brand-purple">Jobs</Link>
          {" / "}
          {destination && (
            <>
              <Link href={`/destinations/${destination.slug}`} className="hover:text-brand-purple">
                {destination.name}
              </Link>
              {" / "}
            </>
          )}
          <span className="text-slate-700">{job.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative h-56 w-full overflow-hidden rounded-2xl sm:h-72">
              <Image src={job.image} alt={job.title} fill className="object-cover" priority />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand-orange">
              {job.country} · {job.category}
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">{job.title}</h1>
            <p className="mt-3 text-xl font-bold text-brand-purple">{job.salary}</p>

            <div className="mt-8">
              <h2 className="font-display text-lg font-bold text-ink">Confirmed Benefits</h2>
              <ul className="mt-3 space-y-2">
                {job.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="badge-check mt-0.5 h-5 w-5 flex-none text-[10px]">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel mt-8 p-5">
              <h2 className="font-display text-base font-bold text-ink">Important Information</h2>
              <p className="mt-2 text-sm text-slate-600">
                Figures above come from the employer information Ajira Majuu has on file for this
                specific opportunity. Final terms are governed by your employment contract. Job
                availability can change — confirm with our recruitment team before making any
                arrangements.
              </p>
            </div>
          </div>

          {/* sticky apply sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="glass-panel p-6">
              <h2 className="font-display text-lg font-bold text-ink">Apply For This Position</h2>
              <p className="mt-2 text-sm text-slate-600">
                No account needed — submit your details and our team will follow up with you.
              </p>
              <Link href={applyUrl} className="btn-primary mt-5 w-full justify-center">
                Apply For This Position
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary mt-3 w-full justify-center"
              >
                WhatsApp About This Role
              </a>
              <a href="tel:+254115614253" className="mt-3 block text-center text-sm font-semibold text-brand-purple">
                Or call +254 115 614 253
              </a>
            </div>

            {related.length > 0 && (
              <div className="mt-6">
                <h3 className="font-display text-sm font-bold text-ink">
                  Other {job.country} Opportunities
                </h3>
                <div className="mt-3 space-y-2">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/jobs/${r.slug}`}
                      className="glass-panel flex items-center justify-between p-3 text-sm transition hover:shadow-glass-lg"
                    >
                      <span className="font-medium text-ink">{r.title}</span>
                      <span className="text-xs text-brand-purple">{r.salary}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
