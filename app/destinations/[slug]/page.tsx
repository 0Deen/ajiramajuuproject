import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinations, getDestinationBySlug, getJobsByCountrySlug, RECRUITMENT_PROCESS } from "@/data/jobs";
import { buildWhatsAppUrl, destinationWhatsAppMessage } from "@/lib/whatsapp";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return {};
  return {
    title: `${destination.name} Jobs`,
    description: `Overseas job opportunities in ${destination.name} with Ajira Majuu — a private overseas recruitment agency in Kenya. See current openings, requirements and how to apply.`,
  };
}

const FAQ = (countryName: string) => [
  {
    q: `How do I apply for jobs in ${countryName}?`,
    a: "Choose an opportunity below and click Apply — no account is required. You can also reach us directly on WhatsApp.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can apply directly. Ajira Majuu's recruitment team follows up using the contact details you provide.",
  },
  {
    q: "What documents do I need?",
    a: "This depends on the specific opportunity and destination. Our recruitment team will confirm exactly what's required once they review your application.",
  },
  {
    q: "What happens after I apply?",
    a: "Our team reviews your application, and if it matches a current opportunity, we'll contact you using the details you provided to continue the recruitment process.",
  },
  {
    q: `Is salary and benefit information for ${countryName} guaranteed?`,
    a: "Listed figures come directly from the employer information Ajira Majuu has on file for that specific opportunity. Final terms are governed by the employment contract.",
  },
];

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();

  const jobs = getJobsByCountrySlug(destination.slug);
  const whatsappUrl = buildWhatsAppUrl(destinationWhatsAppMessage(destination.name));

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />

      {/* hero */}
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
        <Image src={destination.heroImage} alt={`${destination.name} skyline`} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="container-content relative flex h-full flex-col justify-end pb-10">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            Ajira Majuu · Private Overseas Recruitment Agency in Kenya
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            {destination.name} Job Opportunities
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">{destination.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp Us About {destination.name}
            </a>
            <Link href={`/apply?country=${encodeURIComponent(destination.name)}`} className="btn-secondary">
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* current opportunities */}
      <section className="container-content py-14">
        <h2 className="section-title">Current Opportunities</h2>

        {jobs.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job.slug} className="glass-panel flex flex-col overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image src={job.image} alt={job.title} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-orange">{job.category}</p>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink">{job.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-brand-purple">{job.salary}</p>
                  <div className="mt-auto flex gap-2 pt-4">
                    <Link href={`/jobs/${job.slug}`} className="btn-secondary flex-1 !px-4 !py-2 text-xs">
                      View Details
                    </Link>
                    <Link href={`/apply?country=${encodeURIComponent(destination.name)}&job=${encodeURIComponent(job.title)}`} className="btn-primary flex-1 !px-4 !py-2 text-xs">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel mt-8 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-ink">
              No Current {destination.name} Opportunities Listed
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
              We don&apos;t currently have a structured opportunity listed for {destination.name} on the
              website. Reach out directly — our team can confirm what&apos;s currently available.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp Ajira Majuu
              </a>
              <Link href="/destinations" className="btn-secondary">
                Explore Other Destinations
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* recruitment process */}
      <section className="bg-brand-purple/5 py-14">
        <div className="container-content">
          <h2 className="section-title">Recruitment Process</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RECRUITMENT_PROCESS.map((step, i) => (
              <div key={step.step} className="glass-panel p-5">
                <span className="badge-check text-sm font-bold">{i + 1}</span>
                <h3 className="mt-3 font-display text-base font-bold text-ink">{step.step}</h3>
                <p className="mt-1 text-xs text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* important information */}
      <section className="container-content py-14">
        <div className="glass-panel p-6 sm:p-8">
          <h2 className="font-display text-xl font-bold text-ink">Important Information</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Salary and benefits shown are specific to the verified opportunity listed and may not apply to every employer.</li>
            <li>Final employment terms are governed by your signed employment contract.</li>
            <li>Job availability can change — confirm current openings with our team before making arrangements.</li>
            <li>Submitting an application does not guarantee employment.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-purple/5 py-14">
        <div className="container-content">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {FAQ(destination.name).map((item) => (
              <details key={item.q} className="glass-panel group p-5">
                <summary className="cursor-pointer list-none font-display text-base font-semibold text-ink">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* final CTA */}
      <section className="container-content py-14 text-center">
        <h2 className="section-title">Ready to Apply for {destination.name}?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Applying doesn&apos;t require an account — just your details, and our team will follow up with you.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={`/apply?country=${encodeURIComponent(destination.name)}`} className="btn-primary">
            Apply Now
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            WhatsApp Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
