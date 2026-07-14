"use client";

import { FormEvent, useState } from "react";
import type { PropertyRecord } from "../../lib/storage";

export function PropertyManager({ properties }: { properties: PropertyRecord[] }) {
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState("");

  async function createProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Uploading property and media…");
    const form = event.currentTarget;
    const response = await fetch("/api/properties", { method: "POST", body: new FormData(form) });
    const data = await response.json() as { error?: string };
    if (!response.ok) return setStatus(data.error || "Could not save this property.");
    form.reset();
    setStatus("Published. The property is now in the public gallery.");
    window.setTimeout(() => window.location.reload(), 700);
  }

  async function updateProperty(id: string, action: "toggle" | "delete", published: boolean) {
    if (action === "delete" && !window.confirm("Delete this property and all of its uploaded media? This cannot be undone.")) return;
    setBusyId(id);
    const response = await fetch(`/api/properties/${id}`, action === "delete" ? { method: "DELETE" } : { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ published: !published }) });
    const data = await response.json() as { error?: string };
    if (!response.ok) {
      setStatus(data.error || "Could not update this property.");
      return setBusyId("");
    }
    window.location.reload();
  }

  return <div className="property-manager">
    <form className="admin-form property-form" onSubmit={createProperty}>
      <div className="admin-form-grid"><label>Property title<input name="title" required placeholder="Modern home in Atlanta" /></label><label>Property type<select name="propertyType" required defaultValue="Single Family"><option>Single Family</option><option>Condo</option><option>Townhome</option><option>Luxury</option><option>Ranch</option><option>Investment</option><option>Land</option></select></label></div>
      <label>Street address<input name="address" required placeholder="123 Example Street" /></label>
      <div className="admin-form-grid admin-form-grid-three"><label>City<input name="city" required /></label><label>State<input name="state" required maxLength={2} placeholder="GA" /></label><label>ZIP code<input name="zip" required inputMode="numeric" placeholder="30301" /></label></div>
      <div className="admin-form-grid admin-form-grid-four"><label>Price<input name="price" required placeholder="$725,000" /></label><label>Beds<input name="beds" required inputMode="decimal" /></label><label>Baths<input name="baths" required inputMode="decimal" /></label><label>Square feet<input name="sqft" required inputMode="numeric" /></label></div>
      <label>Description<textarea name="description" rows={5} required placeholder="Describe the home, its setting, and what makes it special." /></label>
      <label>Feature tags <span className="field-help">one per line</span><textarea name="features" rows={4} placeholder={"Open-concept living\nRenovated kitchen\nPrivate backyard"} /></label>
      <label>Room label for this upload<input name="roomTag" placeholder="Kitchen, primary suite, exterior…" /></label>
      <label>Photos and videos <span className="field-help">up to 20 files</span><input name="media" type="file" accept="image/*,video/*" multiple required /></label>
      <p className="upload-note">Include at least one photo. Photos may be up to 15 MB each; videos up to 100 MB each; 150 MB total per upload.</p>
      <button className="button button-dark" type="submit">Publish property</button>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>

    <div className="property-admin-list">
      <div className="property-list-heading"><h3>Managed properties</h3><span>{properties.length} total</span></div>
      {properties.length ? properties.map((property) => <article className="property-admin-card" key={property.id}>
        <div className="property-admin-thumb">{property.media.find((item) => item.kind === "image") ? <img src={property.media.find((item) => item.kind === "image")!.url} alt="" /> : <span>No photo</span>}</div>
        <div><span className={`publish-status ${property.published ? "live" : "draft"}`}>{property.published ? "Live" : "Hidden"}</span><h4>{property.title}</h4><p>{property.city}, {property.state} {property.zip} · {property.media.length} media files</p><div className="property-admin-actions"><a href={`/homes/${property.slug}`} target="_blank" rel="noreferrer">View ↗</a><button type="button" disabled={busyId === property.id} onClick={() => updateProperty(property.id, "toggle", !!property.published)}>{property.published ? "Unpublish" : "Publish"}</button><button className="delete" type="button" disabled={busyId === property.id} onClick={() => updateProperty(property.id, "delete", !!property.published)}>Delete</button></div></div>
      </article>) : <p className="admin-empty">No properties uploaded yet. Use the form above to publish the first one.</p>}
    </div>
  </div>;
}
