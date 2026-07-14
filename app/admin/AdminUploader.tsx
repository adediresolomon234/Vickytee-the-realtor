"use client";

import { FormEvent, useState } from "react";

export function AdminUploader() {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Publishing…");
    const form = event.currentTarget;
    const response = await fetch("/api/media", { method: "POST", body: new FormData(form) });
    const data = await response.json() as { error?: string };
    if (!response.ok) return setStatus(data.error || "Could not publish this item.");
    form.reset();
    setStatus("Published. It is now live on the homepage.");
    window.setTimeout(() => window.location.reload(), 800);
  }
  return <form className="admin-form" onSubmit={submit}>
    <label>Display title<input name="title" required placeholder="New home tour in Southlake" /></label>
    <label>Short caption<textarea name="caption" rows={3} placeholder="A quick note for website visitors" /></label>
    <label>Instagram post or Reel URL<input name="instagramUrl" type="url" placeholder="https://www.instagram.com/reel/…" /></label>
    <div className="admin-divider">OR</div>
    <label>Upload a video (MP4, MOV, WebM — max 150 MB)<input name="video" type="file" accept="video/*" /></label>
    <button className="button button-dark" type="submit">Publish to website</button>
    <p className="form-status" aria-live="polite">{status}</p>
  </form>;
}
