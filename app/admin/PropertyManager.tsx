"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import type { BackendListingLabel, BackendProperty } from "../../lib/backend";
import { displayListingLabel } from "../../lib/listing-label";
import { PropertiesIcon } from "./icons";
import { MediaDropzone, type MediaDropzoneHandle } from "./MediaDropzone";
import { SlideOver } from "./SlideOver";

export function PropertyManager({ properties, initialListingLabel = "", listingLabels = [] }: { properties: BackendProperty[]; apiBaseUrl?: string; initialListingLabel?: string; listingLabels?: BackendListingLabel[] }) {
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState("");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mediaProperty, setMediaProperty] = useState<BackendProperty | null>(null);
  const mediaDropzoneRef = useRef<MediaDropzoneHandle>(null);

  const visible = useMemo(() => {
    const byLabel = initialListingLabel ? properties.filter((property) => displayListingLabel(property.listingMode) === initialListingLabel) : properties;
    if (!query.trim()) return byLabel;
    const q = query.toLowerCase();
    return byLabel.filter((property) => `${property.title} ${property.city} ${property.state}`.toLowerCase().includes(q));
  }, [properties, query, initialListingLabel]);

  const total = properties.length;
  const live = properties.filter((property) => property.published).length;
  const hidden = total - live;

  async function createProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Uploading property and media…");
    const form = event.currentTarget;
    const response = await fetch("/api/admin/properties", { method: "POST", body: new FormData(form), credentials: "include" });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) return setStatus(data.error || "Could not save this property.");
    form.reset();
    mediaDropzoneRef.current?.reset();
    setStatus("Published. The property is now in the public gallery.");
    window.setTimeout(() => window.location.reload(), 700);
  }

  async function updateProperty(id: string, action: "toggle" | "delete", published: boolean) {
    if (action === "delete" && !window.confirm("Delete this property and all of its uploaded media? This cannot be undone.")) return;
    setBusyId(id);
    const response = await fetch(`/api/admin/properties/${id}`, action === "delete"
      ? { method: "DELETE", credentials: "include" }
      : { method: "PATCH", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ published: !published }) });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus(data.error || "Could not update this property.");
      return setBusyId("");
    }
    window.location.reload();
  }

  return (
    <div>
      <div className="admin-page-actions">
        <button type="button" className="button button-dark" onClick={() => setOpen(true)}>+ Add Property</button>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <div><span>TOTAL PROPERTIES</span><strong>{total}</strong></div>
          <span className="admin-stat-icon"><PropertiesIcon /></span>
        </article>
        <article className="admin-stat-card">
          <div><span>LIVE</span><strong>{live}</strong></div>
          <span className="admin-stat-icon"><PropertiesIcon /></span>
        </article>
        <article className="admin-stat-card">
          <div><span>HIDDEN</span><strong>{hidden}</strong></div>
          <span className="admin-stat-icon"><PropertiesIcon /></span>
        </article>
      </div>

      <section className="admin-table-panel">
        <div className="admin-table-panel-heading"><h3>Properties</h3><span>{total} total</span></div>
        <div className="admin-search-row">
          <input placeholder="Search properties" value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="admin-table-scroll">
        <table className="admin-data-table">
          <thead>
            <tr><th>Photo</th><th>Title</th><th>Location</th><th>Price</th><th>Media</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {visible.length ? visible.map((property) => {
              const thumb = property.media.find((item) => item.kind === "image");
              return (
                <tr key={property.id}>
                  <td><button className="admin-table-thumb" type="button" onClick={() => setMediaProperty(property)}>{thumb ? <img src={thumb.url} alt="" /> : <span>No photo</span>}</button></td>
                  <td>{property.title}</td>
                  <td>{property.city}, {property.state}</td>
                  <td>{property.price}</td>
                  <td>{property.media.length}</td>
                  <td><span className={`status-pill ${property.published ? "status-live" : "status-draft"}`}>{property.published ? "LIVE" : "HIDDEN"}</span></td>
                  <td>
                    <div className="admin-row-actions">
                      <a href={`/homes/${property.slug}`} target="_blank" rel="noreferrer">View ↗</a>
                      <button type="button" disabled={busyId === property.id} onClick={() => updateProperty(property.id, "toggle", !!property.published)}>{property.published ? "Unpublish" : "Publish"}</button>
                      <button className="delete" type="button" disabled={busyId === property.id} onClick={() => updateProperty(property.id, "delete", !!property.published)}>Delete</button>
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan={7} className="admin-table-empty">No properties uploaded yet. Use &quot;+ Add Property&quot; to publish the first one.</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </section>

      <SlideOver open={open} title="Add a new house" onClose={() => setOpen(false)}>
        <form className="admin-form" onSubmit={createProperty}>
          <label>Listing label<select name="listingMode" required defaultValue={listingLabels[0]?.name || "For sale"}>{listingLabels.length ? listingLabels.map((label) => <option key={label.id} value={label.name}>{displayListingLabel(label.name)}</option>) : <option value="For sale">For sale</option>}</select></label>
          <div className="admin-form-grid"><label>Property title<input name="title" required placeholder="Modern home in Atlanta" /></label><label>Property type<select name="propertyType" required defaultValue="Single Family"><option>Single Family</option><option>Condo</option><option>Townhome</option><option>Luxury</option><option>Ranch</option><option>Investment</option><option>Land</option></select></label></div>
          <label>Street address<input name="address" required placeholder="123 Example Street" /></label>
          <div className="admin-form-grid admin-form-grid-three"><label>City<input name="city" required /></label><label>State<input name="state" required maxLength={2} placeholder="GA" /></label><label>ZIP code<input name="zip" required inputMode="numeric" placeholder="30301" /></label></div>
          <div className="admin-form-grid admin-form-grid-four"><label>Price<input name="price" required placeholder="$725,000" /></label><label>Beds<input name="beds" required inputMode="decimal" /></label><label>Baths<input name="baths" required inputMode="decimal" /></label><label>Square feet<input name="sqft" required inputMode="numeric" /></label></div>
          <label>Description<textarea name="description" rows={5} required placeholder="Describe the home, its setting, and what makes it special." /></label>
          <label>Feature tags <span className="field-help">one per line</span><textarea name="features" rows={4} placeholder={"Open-concept living\nRenovated kitchen\nPrivate backyard"} /></label>
          <label>Photo/video tag<input name="roomTag" placeholder="Kitchen, primary suite, exterior..." /></label>
          <label>Photos and videos <span className="field-help">up to 20 files</span></label>
          <MediaDropzone ref={mediaDropzoneRef} name="media" accept="image/*,video/*" multiple required helpText="Photos up to 15 MB each, videos up to 100 MB each" />
          <p className="upload-note">Include at least one photo. Photos may be up to 15 MB each; videos up to 100 MB each; 150 MB total per upload.</p>
          <button className="button button-dark" type="submit">Publish property</button>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </SlideOver>

      <SlideOver open={!!mediaProperty} title={mediaProperty?.title || "Property media"} onClose={() => setMediaProperty(null)}>
        {mediaProperty ? <div className="admin-media-viewer">
          {mediaProperty.media.length ? mediaProperty.media.map((item) => <figure key={item.id} className="admin-media-viewer-item">
            {item.kind === "video" ? <video src={item.url} controls /> : <img src={item.url} alt={item.altText || mediaProperty.title} />}
            <figcaption>{item.roomTag || item.kind}</figcaption>
          </figure>) : <p className="admin-table-empty">No media uploaded for this property.</p>}
        </div> : null}
      </SlideOver>
    </div>
  );
}
