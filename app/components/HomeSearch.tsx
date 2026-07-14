"use client";

import { FormEvent, useState } from "react";

export function HomeSearch() {
  const [location, setLocation] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = location.trim().replace(/[^a-zA-Z0-9\s,-]/g, "");
    if (!clean) return;
    const slug = clean.replace(/\s+/g, "-").replace(/,/g, "_");
    window.open(`https://www.realtor.com/realestateandhomes-search/${encodeURIComponent(slug)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="home-search" onSubmit={submit}>
      <label>
        <span>City, neighborhood, or ZIP</span>
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Where do you want to live?" required />
      </label>
      <label>
        <span>Property type</span>
        <select aria-label="Property type" defaultValue="any"><option value="any">Any property</option><option>House</option><option>Condo</option><option>Land</option><option>Multi-family</option></select>
      </label>
      <label>
        <span>Price range</span>
        <select aria-label="Price range" defaultValue="any"><option value="any">Any price</option><option>Under $350k</option><option>$350k–$600k</option><option>$600k–$1M</option><option>$1M+</option></select>
      </label>
      <button type="submit" aria-label="Search homes on Realtor.com"><span>Search homes</span> ↗</button>
    </form>
  );
}
