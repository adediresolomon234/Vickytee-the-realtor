import { getAdminSectionMedia, type SectionMediaItem } from "../../../../lib/storage";
import { AddMediaButton } from "../../AddMediaButton";
import { SectionMediaManager } from "../../SectionMediaManager";

export default async function AdminSellPage() {
  let media: SectionMediaItem[] = [];
  try { media = await getAdminSectionMedia("sell"); } catch { /* Storage may be initializing in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-actions">
        <AddMediaButton defaultSection="sell" />
      </div>

      <div className="admin-page-intro">
        <h2>Sell</h2>
        <p>Photos and videos shown on the Sell page.</p>
      </div>
      <section className="admin-table-panel">
        <SectionMediaManager initialMedia={media} showSection={false} />
      </section>
    </div>
  );
}
