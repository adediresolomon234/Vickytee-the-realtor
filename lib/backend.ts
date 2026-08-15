export type BackendLead = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  preferredContactDate?: string | null;
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
};

export function backendBaseUrl() {
  return process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8080";
}

function absoluteBackendUrl(path: string) {
  return new URL(path, backendBaseUrl()).toString();
}

export async function backendFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(absoluteBackendUrl(path), {
    ...init,
    headers: { accept: "application/json", ...(init?.headers || {}) },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : `Backend request failed: ${response.status}`);
  }
  return data as T;
}

async function adminRequestInit(): Promise<RequestInit> {
  const cookieStore = await cookies();
  return { headers: { cookie: cookieStore.toString() } };
}

export async function getBackendLeads() {
  const data = await backendFetch<{ leads: BackendLead[] }>("/api/admin/leads", await adminRequestInit());
  return data.leads;
}

export async function getBackendAdminProperties() {
  const data = await backendFetch<{ properties: BackendProperty[] }>("/api/admin/properties", await adminRequestInit());
  return data.properties;
}

export async function getBackendPublishedProperties(mode?: "buy" | "sell") {
  const query = mode ? `?mode=${encodeURIComponent(mode)}` : "";
  const data = await backendFetch<{ properties: BackendProperty[] }>(`/api/properties${query}`);
  return data.properties;
}

export async function getBackendPropertyBySlug(slug: string) {
  return backendFetch<BackendProperty>(`/api/properties/${encodeURIComponent(slug)}`);
}

export async function getBackendAdminStats(): Promise<BackendStats> {
  const [leads, properties] = await Promise.all([getBackendLeads(), getBackendAdminProperties()]);
  return {
    leads: leads.length,
    properties: properties.length,
    publishedProperties: properties.filter((property) => property.published).length,
  };
}

export function backendPropertyToHomeProfile(property: BackendProperty) {
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
    summary: property.description,
    features: property.features?.length ? property.features : [property.address, `${property.city}, ${property.state} ${property.zip}`, property.propertyType],
  };
}
import { cookies } from "next/headers";
