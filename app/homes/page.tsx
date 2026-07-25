import type { Metadata } from "next";
import { backendPropertyToHomeProfile, getBackendPublishedPropertyPage, publicBackendUrl } from "../../lib/backend";
import type { HomeProfile } from "../../lib/homes";
import { getPublishedProperties, getPublishedSectionMedia, propertyToHomeProfile, type SectionMediaItem } from "../../lib/storage";
import { SectionGallery } from "../components/SectionGallery";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { Gallery } from "./Gallery";

export const metadata: Metadata = { title: "Home Gallery | Vickytee the Realtor", description: "Explore home styles and property profiles from across the United States with Victoria Olorede." };
export const dynamic = "force-dynamic";

export default async function HomesPage() {
  let uploadedHomes: HomeProfile[] = [];
  let hasMoreHomes = false;
  let sectionMedia: SectionMediaItem[] = [];

  try {
    const firstPage = await getBackendPublishedPropertyPage({ page: 1, perPage: 12 });
    uploadedHomes = firstPage.properties.map(backendPropertyToHomeProfile);
    hasMoreHomes = firstPage.hasMore;
  } catch {
    try {
      uploadedHomes = (await getPublishedProperties()).map(propertyToHomeProfile);
    } catch {
      // The curated gallery remains available while storage initializes.
    }
  }

  try {
    sectionMedia = await getPublishedSectionMedia("gallery");
  } catch {
    // The gallery page still renders while hosted storage initializes.
  }

  return (
    <main>
      <SiteHeader />
      <section className="interior-hero gallery-hero">
        <div>
          <p className="eyebrow light">Home inspiration gallery</p>
          <h1>See what feels<br /><em>like home.</em></h1>
          <p>Explore property styles, compare how they live, and discover which direction fits your next chapter.</p>
        </div>
      </section>
      <section className="gallery-page">
        <div className="gallery-intro">
          <p className="eyebrow">Curated for your search</p>
          <h2>Homes are not one-size-fits-all.</h2>
          <p>Browse Victoria&apos;s newly uploaded properties alongside curated home profiles from across the United States.</p>
        </div>
        <Gallery uploadedHomes={uploadedHomes} apiBaseUrl={publicBackendUrl()} initialHasMore={hasMoreHomes} />
      </section>
      <SectionGallery items={sectionMedia} />
      <section className="gallery-cta">
        <p className="eyebrow light">Ready for real options?</p>
        <h2>Turn inspiration into a live home search.</h2>
        <p>Victoria will translate what you like into current homes that match your timing, budget, and preferred area.</p>
        <a className="button button-gold" href="/contact">Create my search</a>
      </section>
      <SiteFooter />
    </main>
  );
}
