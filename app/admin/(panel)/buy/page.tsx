import { getAdminSectionMedia, type SectionMediaItem } from "../../../../lib/storage";
import { AddMediaButton } from "../../AddMediaButton";
import { SectionMediaManager } from "../../SectionMediaManager";

export default async function AdminBuyPage() {
  let media: SectionMediaItem[] = [];
  try { media = await getAdminSectionMedia("buy"); } catch { /* Storage may be initializing in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-actions">
        <AddMediaButton defaultSection="buy" />
      </div>

      <div className="admin-page-intro">
        <h2>Buy</h2>
        <p>Photos and videos shown on the Buy page.</p>
      </div>
      <section className="admin-table-panel">
        <SectionMediaManager initialMedia={media} showSection={false} />
      </section>
    </div>
  );
}
