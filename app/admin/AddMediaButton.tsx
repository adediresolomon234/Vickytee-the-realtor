"use client";

import { FormEvent, useRef, useState } from "react";
import type { Section } from "../../lib/storage";
import { MediaDropzone, type MediaDropzoneHandle } from "./MediaDropzone";
import { SECTION_LABELS } from "./SectionMediaManager";
import { SlideOver } from "./SlideOver";

type Tab = "media" | "social";
type MediaKind = "image" | "video";

export function AddMediaButton({ defaultSection = "gallery" }: { defaultSection?: Section }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("media");
  const [section, setSection] = useState<Section>(defaultSection);
  const [mediaStatus, setMediaStatus] = useState("");
  const [socialStatus, setSocialStatus] = useState("");
  const [mediaKind, setMediaKind] = useState<MediaKind>("image");
  const mediaDropzoneRef = useRef<MediaDropzoneHandle>(null);
  const socialDropzoneRef = useRef<MediaDropzoneHandle>(null);

  function switchMediaKind(kind: MediaKind) {
    setMediaKind(kind);
    mediaDropzoneRef.current?.reset();
  }

  async function uploadMedia(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMediaStatus("Uploading…");
    const form = event.currentTarget;
    const response = await fetch("/api/section-media", { method: "POST", body: new FormData(form) });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) return setMediaStatus(data.error || "Could not upload this file.");
    form.reset();
    mediaDropzoneRef.current?.reset();
    setMediaStatus("Uploaded. Refreshing…");
    window.setTimeout(() => window.location.reload(), 700);
  }

  async function publishSocial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSocialStatus("Publishing…");
    const form = event.currentTarget;
    const response = await fetch("/api/media", { method: "POST", body: new FormData(form) });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) return setSocialStatus(data.error || "Could not publish this item.");
    form.reset();
    socialDropzoneRef.current?.reset();
    setSocialStatus("Published. Refreshing…");
    window.setTimeout(() => window.location.reload(), 700);
  }

  return (
    <>
      <button type="button" className="button button-dark" onClick={() => setOpen(true)}>+ Add Media</button>

      <SlideOver open={open} title="Add media" onClose={() => setOpen(false)}>
        <div className="admin-section-tabs admin-form-tabs">
          <button type="button" className={tab === "media" ? "active" : ""} onClick={() => setTab("media")}>Add Media</button>
          <button type="button" className={tab === "social" ? "active" : ""} onClick={() => setTab("social")}>Add Social Update</button>
        </div>

        {tab === "media" ? (
          <form className="admin-form" onSubmit={uploadMedia}>
            <label>
              Where should this appear?
              <select name="section" value={section} onChange={(event) => setSection(event.target.value as Section)}>
                {Object.entries(SECTION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label>Title<input name="title" required placeholder="Kitchen renovation walkthrough" /></label>
            <label>Caption<textarea name="caption" rows={2} placeholder="A quick note for website visitors" /></label>
            <label>
              What are you uploading?
              <div className="admin-section-tabs admin-type-toggle">
                <button type="button" className={mediaKind === "image" ? "active" : ""} onClick={() => switchMediaKind("image")}>Photo</button>
                <button type="button" className={mediaKind === "video" ? "active" : ""} onClick={() => switchMediaKind("video")}>Video</button>
              </div>
            </label>
            <MediaDropzone
              ref={mediaDropzoneRef}
              name="file"
              accept={mediaKind === "image" ? "image/*" : "video/*"}
              multiple
              required
              helpText={mediaKind === "image" ? "Photos up to 15 MB each, up to 20 files" : "Videos up to 150 MB each, up to 20 files"}
            />
            <button className="button button-dark" type="submit">Upload</button>
            <p className="form-status" aria-live="polite">{mediaStatus}</p>
          </form>
        ) : (
          <form className="admin-form" onSubmit={publishSocial}>
            <label>Display title<input name="title" required placeholder="New home tour in Southlake" /></label>
            <label>Short caption<textarea name="caption" rows={3} placeholder="A quick note for website visitors" /></label>
            <label>Instagram post or Reel URL<input name="instagramUrl" type="url" placeholder="https://www.instagram.com/reel/…" /></label>
            <div className="admin-divider">OR</div>
            <label>Upload a video</label>
            <MediaDropzone ref={socialDropzoneRef} name="video" accept="video/*" helpText="MP4, MOV, WebM — up to 150 MB" />
            <button className="button button-dark" type="submit">Publish to website</button>
            <p className="form-status" aria-live="polite">{socialStatus}</p>
          </form>
        )}
      </SlideOver>
    </>
  );
}
