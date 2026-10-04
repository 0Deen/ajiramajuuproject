import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply Now",
  description:
    "Apply for an overseas job opportunity with Ajira Majuu. No account required — submit your details and our recruitment team will follow up with you.",
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Navbar />
      <section className="container-content py-14 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">
            No Account Needed
          </p>
          <h1 className="section-title mt-3">Apply Now</h1>
          <p className="mt-4 text-slate-600">
            Fill in your details below. Our recruitment team will review your application and
            follow up with you directly — submitting does not guarantee employment.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <Suspense fallback={<div className="glass-panel p-8 text-center text-sm text-slate-500">Loading form…</div>}>
            <ApplyForm />
          </Suspense>
        </div>
      </section>
      <Footer />
    </main>
  );
}
