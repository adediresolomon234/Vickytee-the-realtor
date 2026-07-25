import { cookies } from "next/headers";
import type { HomeProfile } from "./homes";
import { displayListingLabel } from "./listing-label";

export type BackendLead = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredContactDate?: string;
  bestTimeToContact: string;
  lookingToDo: string;
  idealTimeframe: string;
  investmentType: string;
  nonMarketingSmsConsent: boolean;
  marketingSmsConsent: boolean;
  source: string;
  status: string;
};

export type BackendPropertyMedia = {
  id: string;
  propertyId: string;
  createdAt: string;
  kind: "image" | "video";
  url: string;
  storageKey?: string;
  contentType?: string;
  altText: string;
  roomTag?: string;
  sortOrder: number;
};

export type BackendProperty = {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  title: string;
  listingMode: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  propertyType: string;
  beds: string;
  baths: string;
  sqft: string;
  description: string;
  features: string[];
  published: boolean;
  media: BackendPropertyMedia[];
};

export type BackendStats = {
  leads: number;
  properties: number;
  publishedProperties: number;
  sectionMedia: number;
};

export type BackendListingLabel = {
  id: string;
  createdAt: string;
  name: string;
};

export type BackendPropertyPage = {
  properties: BackendProperty[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
};

export function publicBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || "http://localhost:8080";
}

function serverBackendUrl() {
  return process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";
}

async function adminFetch<T>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const response = await fetch(`${serverBackendUrl()}${path}`, {
    cache: "no-store",
    headers: { cookie: cookieStore.toString() },
  });
  if (!response.ok) throw new Error(`Backend request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getBackendLeads() {
  const data = await adminFetch<{ leads: BackendLead[] }>("/api/admin/leads");
  return data.leads;
}

export async function getBackendAdminProperties() {
  const data = await adminFetch<{ properties: BackendProperty[] }>("/api/admin/properties");
  return data.properties;
}

export async function getBackendAdminStats(): Promise<BackendStats> {
  const [leads, properties] = await Promise.all([getBackendLeads(), getBackendAdminProperties()]);
  return {
    leads: leads.length,
    properties: properties.length,
    publishedProperties: properties.filter((property) => property.published).length,
    sectionMedia: 0,
  };
}

export async function getBackendAdminMe() {
  return adminFetch<{ admin: { email: string } }>("/api/admin/me");
}

export async function getBackendListingLabels() {
  const data = await adminFetch<{ labels: BackendListingLabel[] }>("/api/admin/listing-labels");
  return data.labels;
}

export async function getBackendPublishedPropertyPage({ mode, search = "", page = 1, perPage = 12 }: { mode?: "buy" | "sell"; search?: string; page?: number; perPage?: number } = {}) {
  const params = new URLSearchParams({ page: String(page), perPage: String(perPage) });
  if (mode) params.set("mode", mode);
  if (search.trim()) params.set("q", search.trim());
  const response = await fetch(`${serverBackendUrl()}/api/properties?${params.toString()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Backend request failed: ${response.status}`);
  return response.json() as Promise<BackendPropertyPage>;
}

export async function getBackendPublishedProperties(mode?: "buy" | "sell") {
  const data = await getBackendPublishedPropertyPage({ mode, page: 1, perPage: 250 });
  return data.properties;
}

export async function getBackendPublishedPropertyBySlug(slug: string) {
  const response = await fetch(`${serverBackendUrl()}/api/properties/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Backend request failed: ${response.status}`);
  return response.json() as Promise<BackendProperty>;
}

export function backendPropertyToHomeProfile(property: BackendProperty): HomeProfile {
  const images = property.media.filter((item) => item.kind === "image").map((item) => item.url);
  const videos = property.media.filter((item) => item.kind === "video").map((item) => item.url);
  const listingLabel = displayListingLabel(property.listingMode);
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
    listingLabel,
    locationSearch: `${property.address} ${property.city} ${property.state} ${property.zip}`,
    summary: property.description,
    features: property.features.length ? property.features : [property.address, `${property.city}, ${property.state} ${property.zip}`, property.propertyType],
  };
}
