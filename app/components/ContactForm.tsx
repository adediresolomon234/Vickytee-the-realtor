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
      <label>Property address<input name="address" autoComplete="street-address" placeholder="Search address" /></label>
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
          <span>By checking this box, I consent to receive educational, informational, and occasional marketing text messages from <strong>VICKYTEETHEREALTOR INC</strong> related to property updates and market insights. Messages may be sent using an automated system, CRM, or ATDS, and may include prerecorded or artificial voice messages, as well as text messages. Message frequency varies based on my interaction with the services. Message and data rates may apply. Consent is not a condition of purchase. I can opt out at any time by replying STOP, or get help by replying HELP to <a href="tel:+19452371832">+1 945-237-1832</a>.</span>
        </label>
        <label className="consent-control">
          <input type="checkbox" name="marketingSmsConsent" />
          <span>By checking this box, I confirm that I am using my own mobile number and email address, that I am at least 18 years old, and that I may be required to confirm my opt-in via a follow-up message.</span>
        </label>
        <p className="consent-links"><a href="/terms-and-conditions">Terms &amp; Conditions</a><span aria-hidden="true">|</span><a href="/privacy-policy">Privacy Policy</a></p>
      </div>
      <button className="button button-gold" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending..." : "Send my message"}</button>
      <p className={`form-status ${state}`} aria-live="polite">{state === "sent" ? "Thank you - your message is with Victoria." : state === "error" ? "Something went wrong. Please call or email Victoria directly." : ""}</p>
    </form>
  );
}
