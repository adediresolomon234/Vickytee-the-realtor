"use client";

import { FormEvent, KeyboardEvent, useRef, useState } from "react";

type UsLocation = [zip: string, city: string, stateCode: string, state: string, county: string, latitude: number, longitude: number];

const resultLimit = 8;

function matchingLocations(locations: UsLocation[], query: string) {
  const clean = query.trim().toLowerCase();
  if (clean.length < 2) return [];
  const words = clean.split(/[\s,]+/).filter(Boolean);

  return locations
    .filter(([zip, city, stateCode, state, county]) => {
      const searchable = `${zip} ${city} ${stateCode} ${state} ${county}`.toLowerCase();
      return words.every((word) => searchable.includes(word));
    })
    .sort((a, b) => {
      const aStarts = a[0].startsWith(clean) || a[1].toLowerCase().startsWith(clean) ? 0 : 1;
      const bStarts = b[0].startsWith(clean) || b[1].toLowerCase().startsWith(clean) ? 0 : 1;
      return aStarts - bStarts || a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]);
    })
    .slice(0, resultLimit);
}

export function HomeSearch() {
  const locations = useRef<UsLocation[] | null>(null);
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState<UsLocation | null>(null);
  const [results, setResults] = useState<UsLocation[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function loadLocations(query: string) {
    if (!locations.current) {
      setIsLoading(true);
      try {
        const response = await fetch("/us-locations.json");
        if (!response.ok) throw new Error("Location data is unavailable");
        locations.current = await response.json() as UsLocation[];
      } finally {
        setIsLoading(false);
      }
    }
    const next = matchingLocations(locations.current || [], query);
    setResults(next);
    setActiveIndex(-1);
    setIsOpen(next.length > 0);
  }

  function updateLocation(value: string) {
    setLocation(value);
    setSelected(null);
    if (value.trim().length >= 2) void loadLocations(value);
    else {
      setResults([]);
      setIsOpen(false);
    }
  }

  function chooseLocation(item: UsLocation) {
    setSelected(item);
    setLocation(`${item[1]}, ${item[2]} ${item[0]}`);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleLocationKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || !results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current <= 0 ? results.length - 1 : current - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      chooseLocation(results[activeIndex]);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchValue = selected ? `${selected[1]} ${selected[2]} ${selected[0]}` : location;
    const clean = searchValue.trim().replace(/[^a-zA-Z0-9\s,-]/g, "");
    if (!clean) return;
    const slug = clean.replace(/\s+/g, "-").replace(/,/g, "_");
    window.open(`https://www.realtor.com/realestateandhomes-search/${encodeURIComponent(slug)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="home-search-shell">
      <form className="home-search" onSubmit={submit}>
        <label className="location-field">
          <span>U.S. city, county, state, or ZIP</span>
          <input
            value={location}
            onChange={(event) => updateLocation(event.target.value)}
            onKeyDown={handleLocationKeys}
            onFocus={() => { if (results.length) setIsOpen(true); }}
            onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
            placeholder="Try Dallas, TX or 75001"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls="us-location-results"
            aria-activedescendant={activeIndex >= 0 ? `us-location-${activeIndex}` : undefined}
            autoComplete="off"
            required
          />
          {isLoading && <small className="location-loading">Loading U.S. locations…</small>}
          {isOpen && (
            <div className="location-results" id="us-location-results" role="listbox">
              {results.map((item, index) => (
                <button
                  id={`us-location-${index}`}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className={activeIndex === index ? "active" : ""}
                  key={`${item[0]}-${item[1]}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => chooseLocation(item)}
                >
                  <span><strong>{item[1]}</strong><small>{item[4] ? `${item[4]} County · ` : ""}{item[3]}</small></span>
                  <b>{item[0]}</b>
                </button>
              ))}
            </div>
          )}
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
      <p className="location-attribution">Nationwide city and postal location data by <a href="https://www.geonames.org/" target="_blank" rel="noreferrer">GeoNames</a> · Search coverage includes all 50 states, Washington, D.C., and U.S. territories.</p>
    </div>
  );
}
