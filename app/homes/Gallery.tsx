"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { homes, homeTypes, type HomeProfile } from "../../lib/homes";

export function Gallery({ uploadedHomes = [] }: { uploadedHomes?: HomeProfile[] }) {
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [browseLocation, setBrowseLocation] = useState("");
  const [browsePrice, setBrowsePrice] = useState("");

  useEffect(() => {
    const restoreSavedHomes = () => {
      try {
        setSaved(JSON.parse(window.localStorage.getItem("vickytee-saved-homes") || "[]"));
      } catch {
        // A private browser session can make local storage unavailable.
      }
    };
    const frame = window.requestAnimationFrame(() => {
      restoreSavedHomes();
      const params = new URLSearchParams(window.location.search);
      setBrowseLocation(params.get("location") || "");
      setBrowsePrice(params.get("price") || "");
      const requestedType = params.get("type");
      if (requestedType && homeTypes.includes(requestedType)) setType(requestedType);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleSaved(slug: string) {
    setSaved((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
      try {
        window.localStorage.setItem("vickytee-saved-homes", JSON.stringify(next));
      } catch {
        // The gallery still works when preferences cannot be stored.
      }
      return next;
    });
  }

  const allHomes = useMemo(() => [...uploadedHomes, ...homes], [uploadedHomes]);
  const availableTypes = useMemo(() => ["All", ...Array.from(new Set(allHomes.map((home) => home.type)))], [allHomes]);
  const visible = useMemo(() => allHomes.filter((home) => (type === "All" || home.type === type) && `${home.name} ${home.type} ${home.setting}`.toLowerCase().includes(query.toLowerCase())), [allHomes, type, query]);
  return <>
    {browseLocation && <div className="location-search-context"><div><span aria-hidden="true">⌖</span><p><small>Exploring near</small><strong>{browseLocation}</strong>{browsePrice && <em>{browsePrice}</em>}</p></div><p>Choose a home style below to view its photos, tagged spaces, and guided room tour. Victoria can then match your favorites with available properties in this area.</p><Link href="/homes">Clear location</Link></div>}
    <div className="gallery-explorer">
      <div className="gallery-toolbar">
        <label><span>Search the collection</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try modern, acreage, or urban…" /></label>
        <p aria-live="polite">Showing <strong>{visible.length}</strong> of {allHomes.length} profiles</p>
        <div className="saved-counter" aria-live="polite"><span aria-hidden="true">♥</span>{saved.length} saved</div>
      </div>
      <div className="gallery-filters" aria-label="Filter homes by type">
        {availableTypes.map((item) => <button className={type === item ? "active" : ""} type="button" key={item} onClick={() => setType(item)} aria-pressed={type === item}>{item}</button>)}
      </div>
    </div>
    <div className="homes-grid">
      {visible.map((home, index) => <article className={`home-card ${index === 0 && !query && type === "All" ? "home-card-featured" : ""}`} key={home.slug}>
        <div className="home-card-media">
          <Link className="home-card-image" href={`/homes/${home.slug}`}><img src={home.image} alt={`${home.name} inspiration`} loading="lazy" /><span>{home.type}</span><span className="view-cue">Explore profile <b aria-hidden="true">↗</b></span></Link>
          <button className={`save-home ${saved.includes(home.slug) ? "saved" : ""}`} type="button" onClick={() => toggleSaved(home.slug)} aria-label={`${saved.includes(home.slug) ? "Remove" : "Save"} ${home.name} ${saved.includes(home.slug) ? "from" : "to"} your inspiration board`} aria-pressed={saved.includes(home.slug)}><span aria-hidden="true">♥</span></button>
        </div>
        <div className="home-card-copy"><p>{home.setting} · Typical segment {home.segment}</p><h2><Link href={`/homes/${home.slug}`}>{home.name}</Link></h2><div><span>{home.beds} beds</span><span>{home.baths} baths</span><span>{home.size}</span></div><Link className="text-link dark" href={`/homes/${home.slug}`}>Start guided room tour →</Link></div>
      </article>)}
    </div>
    {!visible.length && <div className="no-results"><span aria-hidden="true">⌂</span><h2>No exact match yet.</h2><p>Try a broader search, or ask Victoria to build a search around your needs.</p><button type="button" className="button button-dark" onClick={() => { setQuery(""); setType("All"); }}>Clear filters</button></div>}
  </>;
}
