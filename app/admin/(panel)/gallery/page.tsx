import { getAdminSectionMedia, SECTIONS, type SectionMediaItem } from "../../../../lib/storage";
import { AddMediaButton } from "../../AddMediaButton";
import { SectionMediaManager } from "../../SectionMediaManager";

export default async function AdminGalleryPage() {
  let sectionMedia: SectionMediaItem[] = [];
  try {
    const results = await Promise.all(SECTIONS.map((section) => getAdminSectionMedia(section)));
    sectionMedia = results.flat().sort((a: SectionMediaItem, b: SectionMediaItem) => b.createdAt.localeCompare(a.createdAt));
  } catch { /* Storage may be initializing in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-actions">
        <AddMediaButton />
      </div>

      <div className="admin-page-intro">
        <h2>Gallery</h2>
        <p>Everything published across the gallery, Buy, and Sell pages, in one list.</p>
      </div>
      <section className="admin-table-panel">
        <SectionMediaManager initialMedia={sectionMedia} />
      </section>
    </div>
  );
}
