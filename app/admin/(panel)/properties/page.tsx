import { getBackendAdminProperties, getBackendListingLabels, type BackendListingLabel, type BackendProperty } from "../../../../lib/backend";
import { PropertyManager } from "../../PropertyManager";

export default async function AdminPropertiesPage({ searchParams }: { searchParams: Promise<{ label?: string }> }) {
  const { label = "" } = await searchParams;
  let properties: BackendProperty[] = [];
  let listingLabels: BackendListingLabel[] = [];
  try { properties = await getBackendAdminProperties(); } catch { /* Backend may be unavailable in a local preview. */ }
  try { listingLabels = await getBackendListingLabels(); } catch { /* Backend may be unavailable in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-intro">
        <h2>Properties</h2>
        <p>Add new listings with photos and videos, and control what is live on the public gallery.</p>
      </div>
      <PropertyManager properties={properties} initialListingLabel={label} listingLabels={listingLabels} />
    </div>
  );
}
