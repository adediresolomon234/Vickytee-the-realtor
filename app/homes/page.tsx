import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { backendPropertyToHomeProfile, getBackendPublishedProperties } from "../../lib/backend";
import type { HomeProfile } from "../../lib/homes";
import { Gallery } from "./Gallery";

export const metadata: Metadata = { title: "Home Gallery | Vickytee the Realtor", description: "Explore home styles and property profiles from across the United States with Victoria Olorede." };
export const dynamic = "force-dynamic";

export default async function HomesPage() {
  let uploadedHomes: HomeProfile[] = [];
  try {
    uploadedHomes = (await getBackendPublishedProperties()).map(backendPropertyToHomeProfile);
  } catch {
    // The curated gallery remains available while the Go backend is unavailable.
  }

  return (
    <main>
      <SiteHeader />
      <section className="interior-hero gallery-hero"><div><p className="eyebrow light">Home inspiration gallery</p><h1>See what feels<br /><em>like home.</em></h1><p>Explore property styles, compare how they live, and discover which direction fits your next chapter.</p></div></section>
      <section className="gallery-page"><div className="gallery-intro"><p className="eyebrow">Curated for your search</p><h2>Homes are not one-size-fits-all.</h2><p>Browse Victoria's newly uploaded properties alongside curated home profiles from across the United States.</p></div><Gallery uploadedHomes={uploadedHomes} /></section>
      <section className="gallery-cta"><p className="eyebrow light">Ready for real options?</p><h2>Turn inspiration into a live home search.</h2><p>Victoria will translate what you like into current homes that match your timing, budget, and preferred area.</p><a className="button button-gold" href="/contact">Create my search</a></section>
      <SiteFooter />
    </main>
  );
}
