"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BackendProperty, BackendPropertyPage } from "../../lib/backend";
import type { HomeProfile } from "../../lib/homes";
import { displayListingLabel } from "../../lib/listing-label";

const perPage = 12;

function backendPropertyToClientHome(property: BackendProperty): HomeProfile {
  const images = property.media.filter((item) => item.kind === "image").map((item) => item.url);
  const videos = property.media.filter((item) => item.kind === "video").map((item) => item.url);
  return {
    slug: property.slug,
    name: property.title,
    type: property.propertyType,
    setting: `${property.city}, ${property.state}`,
    segment: property.price,
    beds: property.beds,
    baths: property.baths,
    size: `${property.sqft} sq ft`,
    image: images[0] || "/og.png",
    gallery: images,
    videoUrls: videos,
    listingLabel: displayListingLabel(property.listingMode),
    locationSearch: `${property.address} ${property.city} ${property.state} ${property.zip}`,
    summary: property.description,
    features: property.features.length ? property.features : [property.address, `${property.city}, ${property.state} ${property.zip}`, property.propertyType],
  };
}

export function Gallery({ uploadedHomes = [], apiBaseUrl = "", initialHasMore = false }: { uploadedHomes?: HomeProfile[]; apiBaseUrl?: string; initialHasMore?: boolean }) {
  const [homes, setHomes] = useState(uploadedHomes);
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [browseLocation, setBrowseLocation] = useState("");
  const [browsePrice, setBrowsePrice] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const searchTerm = useMemo(() => [query, browseLocation, type === "All" ? "" : type].filter(Boolean).join(" "), [query, browseLocation, type]);
  const availableTypes = useMemo(() => ["All", ...Array.from(new Set(homes.map((home) => home.type)))], [homes]);

  const fetchPage = useCallback(async (nextPage: number, replace: boolean) => {
    if (!apiBaseUrl) return;
    setIsLoadingMore(true);
    try {
      const params = new URLSearchParams({ page: String(nextPage), perPage: String(perPage) });
      if (searchTerm.trim()) params.set("q", searchTerm.trim());
      const response = await fetch(`${apiBaseUrl}/api/properties?${params.toString()}`);
      if (!response.ok) throw new Error("Could not load properties");
      const data = await response.json() as BackendPropertyPage;
      const nextHomes = data.properties.map(backendPropertyToClientHome);
      setHomes((current) => replace ? nextHomes : [...current, ...nextHomes.filter((home) => !current.some((item) => item.slug === home.slug))]);
      setPage(data.page);
      setHasMore(data.hasMore);
    } finally {
      setIsLoadingMore(false);
    }
  }, [apiBaseUrl, searchTerm]);

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
      if (requestedType) setType(requestedType);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (apiBaseUrl) void fetchPage(1, true);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [apiBaseUrl, fetchPage]);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target || !apiBaseUrl) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting && hasMore && !isLoadingMore) void fetchPage(page + 1, false);
    }, { rootMargin: "450px 0px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, [apiBaseUrl, fetchPage, hasMore, isLoadingMore, page]);

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

  const visible = useMemo(() => {
    const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);
    const locationWords = browseLocation.toLowerCase().split(/[\s,]+/).filter(Boolean);
    return homes.filter((home) => {
      const searchable = `${home.name} ${home.type} ${home.setting} ${home.segment} ${home.listingLabel || ""} ${home.locationSearch || ""} ${home.features.join(" ")}`.toLowerCase();
      return (type === "All" || home.type === type) && queryWords.every((word) => searchable.includes(word)) && locationWords.every((word) => searchable.includes(word));
    });
  }, [homes, type, query, browseLocation]);

  return <>
    {browseLocation && <div className="location-search-context"><div><span aria-hidden="true">⌖</span><p><small>Exploring near</small><strong>{browseLocation}</strong>{browsePrice && <em>{browsePrice}</em>}</p></div><p>Choose a home style below to view its photos, tagged spaces, and guided room tour. Victoria can then match your favorites with available properties in this area.</p><Link href="/homes">Clear location</Link></div>}
    <div className="gallery-explorer">
      <div className="gallery-toolbar">
        <label><span>Search the collection</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Atlanta, rent, condo, or 30301..." /></label>
        <p aria-live="polite">Showing <strong>{visible.length}</strong> of {homes.length} loaded profiles</p>
        <div className="saved-counter" aria-live="polite"><span aria-hidden="true">♥</span>{saved.length} saved</div>
      </div>
      <div className="gallery-filters" aria-label="Filter homes by type">
        {availableTypes.map((item) => <button className={type === item ? "active" : ""} type="button" key={item} onClick={() => setType(item)} aria-pressed={type === item}>{item}</button>)}
      </div>
    </div>
    <div className="homes-grid">
      {visible.map((home, index) => {
        const album = home.gallery.length ? home.gallery : [home.image];
        const mediaCount = album.length + (home.videoUrls?.length || 0);
        const extraCount = Math.max(0, mediaCount - 3);
        return <article className={`home-card ${index === 0 && !query && type === "All" ? "home-card-featured" : ""}`} key={home.slug}>
          <div className="home-card-media">
            <Link className="home-card-album" href={`/homes/${home.slug}`} aria-label={`Open ${home.name} media album`}>
              {album.slice(0, 3).map((image, imageIndex) => <span className="home-card-album-tile" key={`${home.slug}-${imageIndex}`}><img src={image} alt={`${home.name} view ${imageIndex + 1}`} loading="lazy" /></span>)}
              {extraCount > 0 ? <span className="home-card-album-more">+{extraCount}</span> : null}
              <span className="home-card-label">{home.listingLabel || home.type}</span>
              <span className="view-cue">Open album <b aria-hidden="true">↗</b></span>
            </Link>
            <button className={`save-home ${saved.includes(home.slug) ? "saved" : ""}`} type="button" onClick={() => toggleSaved(home.slug)} aria-label={`${saved.includes(home.slug) ? "Remove" : "Save"} ${home.name} ${saved.includes(home.slug) ? "from" : "to"} your inspiration board`} aria-pressed={saved.includes(home.slug)}><span aria-hidden="true">♥</span></button>
          </div>
          <div className="home-card-copy"><p>{home.setting} · {home.segment}</p><h2><Link href={`/homes/${home.slug}`}>{home.name}</Link></h2><div><span>{home.beds} beds</span><span>{home.baths} baths</span><span>{home.size}</span></div><Link className="text-link dark" href={`/homes/${home.slug}`}>Start guided room tour →</Link></div>
        </article>;
      })}
    </div>
    <div ref={sentinelRef} className="gallery-load-sentinel" aria-hidden="true" />
    {isLoadingMore ? <p className="gallery-loading">Loading more properties...</p> : null}
    {!visible.length && !isLoadingMore && <div className="no-results"><span aria-hidden="true">⌂</span><h2>No exact match yet.</h2><p>Try a broader search, or ask Victoria to build a search around your needs.</p><button type="button" className="button button-dark" onClick={() => { setQuery(""); setType("All"); }}>Clear filters</button></div>}
  </>;
}
