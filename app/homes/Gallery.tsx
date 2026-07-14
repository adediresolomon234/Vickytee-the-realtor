"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { homes, homeTypes } from "../../lib/homes";

export function Gallery() {
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => homes.filter((home) => (type === "All" || home.type === type) && `${home.name} ${home.type} ${home.setting}`.toLowerCase().includes(query.toLowerCase())), [type, query]);
  return <>
    <div className="gallery-toolbar">
      <label><span>Search styles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Modern, condo, acreage…" /></label>
      <label><span>Home type</span><select value={type} onChange={(event) => setType(event.target.value)}>{homeTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
      <p>{visible.length} home profiles</p>
    </div>
    <div className="homes-grid">
      {visible.map((home) => <article className="home-card" key={home.slug}>
        <Link className="home-card-image" href={`/homes/${home.slug}`}><img src={home.image} alt={home.name} loading="lazy" /><span>{home.type}</span></Link>
        <div className="home-card-copy"><p>{home.setting} · Typical segment {home.segment}</p><h2><Link href={`/homes/${home.slug}`}>{home.name}</Link></h2><div><span>{home.beds} beds</span><span>{home.baths} baths</span><span>{home.size}</span></div><Link className="text-link dark" href={`/homes/${home.slug}`}>View home profile →</Link></div>
      </article>)}
    </div>
    {!visible.length && <div className="no-results"><h2>No exact match yet.</h2><p>Try a broader search, or ask Victoria to build a search around your needs.</p><Link className="button button-dark" href="/contact">Build my search</Link></div>}
  </>;
}
