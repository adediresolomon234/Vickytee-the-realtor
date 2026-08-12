import { getBackendAdminProperties, type BackendProperty } from "../../../../lib/backend";
import { PropertyManager } from "../../PropertyManager";

export default async function AdminPropertiesPage() {
  let properties: BackendProperty[] = [];
  try { properties = await getBackendAdminProperties(); } catch { /* Backend may be unavailable in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-intro">
        <h2>Properties</h2>
        <p>Add new listings with photos and videos, and control what is live on the public gallery.</p>
      </div>
      <PropertyManager properties={properties} />
    </div>
  );
}
