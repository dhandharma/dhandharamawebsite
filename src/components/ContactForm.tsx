"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { inquiryPurposes, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const field =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-700";

/**
 * Enquiry form. There is no backend, so a valid submission opens a pre-filled WhatsApp chat
 * with the branch number. Swap `onSubmit` for an API call if/when a backend exists.
 */
export function ContactForm() {
  const uid = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").replace(/[\s-]/g, "");
    const purpose = String(data.get("purpose") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const next: Record<string, string> = {};
    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^(\+?91)?[6-9]\d{9}$/.test(phone)) next.phone = "Enter a valid 10-digit mobile number.";
    if (!purpose) next.purpose = "Please choose what you need help with.";
    setErrors(next);
    if (Object.keys(next).length) {
      setSent(false);
      return;
    }

    const text = [
      `Hello ${site.name}, I would like to enquire.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Regarding: ${purpose}`,
      message && `Message: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const err = (key: string) => errors[key];
  const describe = (key: string) => (err(key) ? `${uid}-${key}-err` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5" aria-label="Enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-semibold text-brand">
            Full name <span aria-hidden="true" className="text-accent-text">*</span>
          </label>
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!err("name")}
            aria-describedby={describe("name")}
            placeholder="Your name"
            className={field}
          />
          {err("name") && (
            <p id={`${uid}-name-err`} className="mt-1.5 text-sm text-red-700">
              {err("name")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-semibold text-brand">
            Phone number <span aria-hidden="true" className="text-accent-text">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={!!err("phone")}
            aria-describedby={describe("phone")}
            placeholder="10-digit mobile number"
            className={field}
          />
          {err("phone") && (
            <p id={`${uid}-phone-err`} className="mt-1.5 text-sm text-red-700">
              {err("phone")}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-purpose`} className="mb-1.5 block text-sm font-semibold text-brand">
          I&rsquo;m interested in <span aria-hidden="true" className="text-accent-text">*</span>
        </label>
        <select
          id={`${uid}-purpose`}
          name="purpose"
          required
          defaultValue=""
          aria-invalid={!!err("purpose")}
          aria-describedby={describe("purpose")}
          className={field}
        >
          <option value="" disabled>
            Select an option
          </option>
          {inquiryPurposes.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {err("purpose") && (
          <p id={`${uid}-purpose-err`} className="mt-1.5 text-sm text-red-700">
            {err("purpose")}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-semibold text-brand">
          Message <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          placeholder="Anything we should know?"
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" className="sm:self-start">
          Send enquiry
          <ArrowRight aria-hidden="true" className="size-[18px] transition-transform group-hover:translate-x-0.5" />
        </Button>
        <p className="text-sm text-muted">Opens WhatsApp with your details filled in.</p>
      </div>

      <p role="status" className={sent ? "rounded-md bg-brand-tint px-4 py-3 text-sm text-brand" : "sr-only"}>
        {sent
          ? `WhatsApp should now be open. If it didn't open, call us on ${site.phoneDisplay}.`
          : ""}
      </p>
    </form>
  );
}
