import Link from "next/link";
import { HomeSearch } from "../components/HomeSearch";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SectionGallery } from "../components/SectionGallery";
import { getPublishedSectionMedia, type SectionMediaItem } from "../../lib/storage";

export const dynamic = "force-dynamic";

export default async function BuyPage() {
  let sectionMedia: SectionMediaItem[] = [];
  try { sectionMedia = await getPublishedSectionMedia("buy"); } catch { /* The page still renders while hosted storage initializes. */ }
  return <main><SiteHeader /><section className="interior-hero buy-hero"><div><p className="eyebrow light">Buy with Victoria</p><h1>Buy with clarity,<br /><em>not pressure.</em></h1><p>A smart home purchase starts with a plan built around your life—not just a list of bedrooms and bathrooms.</p></div></section><section className="page-search"><div><p className="eyebrow">Explore the market</p><h2>Start where you want to live.</h2></div><HomeSearch /></section><section className="steps-section"><div className="gallery-intro"><p className="eyebrow">The buyer journey</p><h2>A clear path to the keys.</h2></div><div className="big-steps"><article><span>01</span><h3>Plan</h3><p>Clarify your goals, timing, financing, and the monthly number that feels comfortable.</p></article><article><span>02</span><h3>Explore</h3><p>Compare neighborhoods and homes with context—not noise—and refine what matters.</p></article><article><span>03</span><h3>Compete</h3><p>Build a strong offer with the right price, terms, protections, and negotiation strategy.</p></article><article><span>04</span><h3>Close</h3><p>Navigate inspections, appraisal, lending, and final details with Victoria close by.</p></article></div></section><section className="two-column-feature"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=88" alt="Bright welcoming home interior" /><div><p className="eyebrow">First home or next home</p><h2>Your search should fit your real life.</h2><p>Victoria helps you look beyond the photos: condition, resale, commute, community, costs, and the way a home will work every day.</p><Link className="button button-dark" href="/homes">Explore home types</Link></div></section><SectionGallery items={sectionMedia} /><SiteFooter /></main>;
}
