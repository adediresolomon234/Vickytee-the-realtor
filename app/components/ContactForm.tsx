"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      lookingToDo: formData.getAll("lookingToDo").join(", "),
      nonMarketingSmsConsent: formData.has("nonMarketingSmsConsent"),
      marketingSmsConsent: formData.has("marketingSmsConsent"),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>First name<input name="firstName" autoComplete="given-name" required /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" required /></label>
      </div>
      <div className="form-row">
        <label>Phone<input type="tel" name="phone" autoComplete="tel" required /></label>
        <label>Email<input type="email" name="email" autoComplete="email" required /></label>
      </div>
      <div className="form-row">
        <label>Preferred date of contact<input type="date" name="preferredContactDate" /></label>
        <label>Best time to contact<input type="time" name="bestTimeToContact" /></label>
      </div>
      <fieldset className="form-options">
        <legend>What are you looking to do?</legend>
        <div className="option-grid option-grid-three">
          {[
            ["Buy", "Buy"],
            ["Sell", "Sell"],
            ["Invest", "Invest"],
          ].map(([value, label]) => (
            <label className="option-control" key={value}><input type="checkbox" name="lookingToDo" value={value} /><span>{label}</span></label>
          ))}
        </div>
      </fieldset>
      <fieldset className="form-options">
        <legend>What is your ideal time frame?</legend>
        <div className="option-grid">
          {[
            ["ASAP", "ASAP"],
            ["Within 1 month", "Within 1 month"],
            ["3-6 months", "3-6 months"],
            ["6-12 months", "6-12 months"],
            ["Just exploring", "Just exploring"],
          ].map(([value, label]) => (
            <label className="option-control" key={value}><input type="radio" name="idealTimeframe" value={value} required /><span>{label}</span></label>
          ))}
        </div>
      </fieldset>
      <fieldset className="form-options">
        <legend>Investment type</legend>
        <div className="option-grid">
          {[
            "Single family",
            "Vacation home",
            "Rental property",
            "Commercial property",
            "Fix and flip",
            "Land only",
            "Other",
          ].map((value) => (
            <label className="option-control" key={value}><input type="radio" name="investmentType" value={value} /><span>{value}</span></label>
          ))}
        </div>
      </fieldset>
      <label>Tell me a little more<textarea name="message" rows={4} placeholder="Timeline, location, goals..." /></label>
      <div className="consent-options">
        <label className="consent-control">
          <input type="checkbox" name="nonMarketingSmsConsent" />
          <span>By checking this box, I consent to receive non-marketing text messages from <strong>VICTORIA OLEREDE, REALTOR&reg;</strong> about property updates and market insights. Message frequency varies, message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.</span>
        </label>
        <label className="consent-control">
          <input type="checkbox" name="marketingSmsConsent" />
          <span>By checking this box, I consent to receive marketing and promotional messages including special offers, discounts, new product updates among others, from <strong>VICTORIA OLEREDE, REALTOR&reg;</strong> at the phone number provided. Frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.</span>
        </label>
      </div>
      <button className="button button-gold" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send my message"}</button>
      <p className={`form-status ${state}`} aria-live="polite">{state === "sent" ? "Thank you - your message is with Victoria." : state === "error" ? "Something went wrong. Please call or email Victoria directly." : ""}</p>
    </form>
  );
}
