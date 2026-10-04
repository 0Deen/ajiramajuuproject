"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { destinations, getJobsByCountrySlug } from "@/data/jobs";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  county: string;
  preferredCountry: string;
  preferredJob: string;
  experience: string;
  passportStatus: string;
  willingToRelocate: boolean;
  willingMedicalChecks: boolean;
  notes: string;
  consent: boolean;
}

const STEPS = ["Personal Info", "Destination & Job", "Readiness", "Review & Submit"];

const EXPERIENCE_OPTIONS = ["First-time applicant", "Less than 1 year", "1–3 years", "3+ years"];

const PASSPORT_OPTIONS = [
  "I have a valid passport",
  "I need to apply for one",
  "My passport is being processed",
];

export default function ApplyForm() {
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [reference, setReference] = useState("");

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    county: "",
    preferredCountry: searchParams.get("country") || "",
    preferredJob: searchParams.get("job") || "",
    experience: "",
    passportStatus: "",
    willingToRelocate: true,
    willingMedicalChecks: true,
    notes: "",
    consent: false,
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const jobOptionsForCountry = useMemo(() => {
    const dest = destinations.find((d) => d.name === form.preferredCountry);
    if (!dest) return [];
    return getJobsByCountrySlug(dest.slug);
  }, [form.preferredCountry]);

  function stepIsValid(i: number): boolean {
    if (i === 0) return form.fullName.trim().length > 1 && form.phone.trim().length > 6;
    if (i === 1) return form.preferredCountry.trim().length > 0;
    if (i === 2) return form.passportStatus.trim().length > 0;
    if (i === 3) return form.consent;
    return true;
  }

  async function handleSubmit() {
    setStatus("sending");
    setErrorMsg("");

    const notesParts = [
      form.notes,
      `Willing to relocate: ${form.willingToRelocate ? "Yes" : "No"}.`,
      `Willing to complete required medical checks: ${form.willingMedicalChecks ? "Yes" : "No"}.`,
    ].filter(Boolean);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          phone: form.phone,
          email: form.email,
          county: form.county,
          preferredCountry: form.preferredCountry,
          preferredJob: form.preferredJob,
          experience: form.experience,
          passportStatus: form.passportStatus,
          message: notesParts.join(" "),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setReference(data.reference || "");
      setStatus("sent");
    } catch {
      setErrorMsg("Network error — please try again shortly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    const whatsappUrl = buildWhatsAppUrl(
      `Hi Ajira Majuu, I just submitted an application (ref: ${reference}). I'd like to follow up.`
    );
    return (
      <div className="glass-panel p-8 text-center">
        <div className="badge-check mx-auto h-12 w-12 text-lg">✓</div>
        <h2 className="mt-4 font-display text-2xl font-bold text-ink">Application Received</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
          Thank you for applying with Ajira Majuu. Your application has been successfully received.
          Our recruitment team will review your information and contact you using the details you
          provided.
        </p>
        {reference && (
          <div className="mx-auto mt-4 inline-block rounded-xl bg-brand-purple/5 px-5 py-3">
            <p className="text-xs text-slate-500">Your reference number</p>
            <p className="font-display text-lg font-bold text-brand-purple">{reference}</p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Chat on WhatsApp
          </a>
          <Link href="/jobs" className="btn-secondary">
            Return to Jobs
          </Link>
          <Link href="/#contact" className="btn-secondary">
            Contact Ajira Majuu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 sm:p-8">
      {/* step indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                i <= step ? "bg-brand-purple text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}
            </div>
            <span className="mt-1 hidden text-center text-[10px] text-slate-500 sm:block">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {step === 0 && (
          <>
            <Field label="Full name" required>
              <input className="input" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" />
            </Field>
            <Field label="Phone number (WhatsApp works best)" required>
              <input className="input" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+254..." />
            </Field>
            <Field label="Email (optional)">
              <input className="input" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="County / Town (optional)">
              <input className="input" value={form.county} onChange={(e) => update("county", e.target.value)} placeholder="e.g. Nairobi" />
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Preferred destination" required>
              <select className="input" value={form.preferredCountry} onChange={(e) => update("preferredCountry", e.target.value)}>
                <option value="">Select a destination</option>
                {destinations.map((d) => (
                  <option key={d.slug} value={d.name}>{d.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Preferred job">
              {jobOptionsForCountry.length > 0 ? (
                <select className="input" value={form.preferredJob} onChange={(e) => update("preferredJob", e.target.value)}>
                  <option value="">Select an opportunity</option>
                  {jobOptionsForCountry.map((j) => (
                    <option key={j.slug} value={j.title}>{j.title} — {j.salary}</option>
                  ))}
                  <option value="Other">Other / not listed</option>
                </select>
              ) : (
                <input className="input" value={form.preferredJob} onChange={(e) => update("preferredJob", e.target.value)} placeholder="e.g. Caregiver, Driver, House Help" />
              )}
            </Field>
            <Field label="Years of experience">
              <select className="input" value={form.experience} onChange={(e) => update("experience", e.target.value)}>
                <option value="">Select an option</option>
                {EXPERIENCE_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Passport status" required>
              <select className="input" value={form.passportStatus} onChange={(e) => update("passportStatus", e.target.value)}>
                <option value="">Select an option</option>
                {PASSPORT_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.willingToRelocate} onChange={(e) => update("willingToRelocate", e.target.checked)} />
              I am willing to relocate abroad for this opportunity
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.willingMedicalChecks} onChange={(e) => update("willingMedicalChecks", e.target.checked)} />
              I am willing to complete required medical checks where applicable
            </label>
            <Field label="Anything else we should know? (optional)">
              <textarea className="input min-h-[90px]" value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Optional notes for the recruitment team" />
            </Field>
          </>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <ReviewRow label="Full name" value={form.fullName} />
            <ReviewRow label="Phone" value={form.phone} />
            <ReviewRow label="Email" value={form.email || "—"} />
            <ReviewRow label="Destination" value={form.preferredCountry} />
            <ReviewRow label="Preferred job" value={form.preferredJob || "—"} />
            <ReviewRow label="Experience" value={form.experience || "—"} />
            <ReviewRow label="Passport status" value={form.passportStatus} />

            <label className="mt-4 flex items-start gap-2 text-sm text-slate-600">
              <input type="checkbox" className="mt-0.5" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} />
              I confirm that the information provided is accurate to the best of my knowledge and I
              understand that submission of this application does not guarantee employment.
            </label>

            {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}
          </div>
        )}
      </div>

      {/* navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-secondary !px-5 !py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => stepIsValid(step) && setStep((s) => s + 1)}
            disabled={!stepIsValid(step)}
            className="btn-primary !px-6 !py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!stepIsValid(step) || status === "sending"}
            className="btn-primary !px-6 !py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "sending" ? "Submitting…" : "Submit Application"}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
