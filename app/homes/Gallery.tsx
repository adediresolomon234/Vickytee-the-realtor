"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { homes, homeTypes } from "../../lib/homes";

export function Gallery() {
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    const restoreSavedHomes = () => {
      try {
        setSaved(JSON.parse(window.localStorage.getItem("vickytee-saved-homes") || "[]"));
      } catch {
        // A private browser session can make local storage unavailable.
      }
    };
    const frame = window.requestAnimationFrame(restoreSavedHomes);
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

  const visible = useMemo(() => homes.filter((home) => (type === "All" || home.type === type) && `${home.name} ${home.type} ${home.setting}`.toLowerCase().includes(query.toLowerCase())), [type, query]);
  return <>
    <div className="gallery-explorer">
      <div className="gallery-toolbar">
        <label><span>Search the collection</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try modern, acreage, or urban…" /></label>
        <p aria-live="polite">Showing <strong>{visible.length}</strong> of {homes.length} profiles</p>
        <div className="saved-counter" aria-live="polite"><span aria-hidden="true">♥</span>{saved.length} saved</div>
      </div>
      <div className="gallery-filters" aria-label="Filter homes by type">
        {homeTypes.map((item) => <button className={type === item ? "active" : ""} type="button" key={item} onClick={() => setType(item)} aria-pressed={type === item}>{item}</button>)}
      </div>
    </div>
    <div className="homes-grid">
      {visible.map((home, index) => <article className={`home-card ${index === 0 && !query && type === "All" ? "home-card-featured" : ""}`} key={home.slug}>
        <div className="home-card-media">
          <Link className="home-card-image" href={`/homes/${home.slug}`}><img src={home.image} alt={`${home.name} inspiration`} loading="lazy" /><span>{home.type}</span><span className="view-cue">Explore profile <b aria-hidden="true">↗</b></span></Link>
          <button className={`save-home ${saved.includes(home.slug) ? "saved" : ""}`} type="button" onClick={() => toggleSaved(home.slug)} aria-label={`${saved.includes(home.slug) ? "Remove" : "Save"} ${home.name} ${saved.includes(home.slug) ? "from" : "to"} your inspiration board`} aria-pressed={saved.includes(home.slug)}><span aria-hidden="true">♥</span></button>
        </div>
        <div className="home-card-copy"><p>{home.setting} · Typical segment {home.segment}</p><h2><Link href={`/homes/${home.slug}`}>{home.name}</Link></h2><div><span>{home.beds} beds</span><span>{home.baths} baths</span><span>{home.size}</span></div><Link className="text-link dark" href={`/homes/${home.slug}`}>View home profile →</Link></div>
      </article>)}
    </div>
    {!visible.length && <div className="no-results"><span aria-hidden="true">⌂</span><h2>No exact match yet.</h2><p>Try a broader search, or ask Victoria to build a search around your needs.</p><button type="button" className="button button-dark" onClick={() => { setQuery(""); setType("All"); }}>Clear filters</button></div>}
  </>;
}
