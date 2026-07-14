"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div>
      <label>Email address<input type="email" name="email" autoComplete="email" required /></label>
      <label>Phone number<input type="tel" name="phone" autoComplete="tel" /></label>
      <label>I’m interested in<select name="interest" defaultValue="Buying a home"><option>Buying a home</option><option>Selling a home</option><option>Investing</option><option>Home valuation</option><option>General question</option></select></label>
      <label>Tell me a little more<textarea name="message" rows={4} placeholder="Timeline, location, goals…" /></label>
      <button className="button button-gold" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send my message"}</button>
      <p className={`form-status ${state}`} aria-live="polite">{state === "sent" ? "Thank you—your message is with Victoria." : state === "error" ? "Something went wrong. Please call or email Victoria directly." : ""}</p>
    </form>
  );
}
