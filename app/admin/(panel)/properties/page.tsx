import { getAdminProperties, type PropertyRecord } from "../../../../lib/storage";
import { PropertyManager } from "../../PropertyManager";

export default async function AdminPropertiesPage() {
  let properties: PropertyRecord[] = [];
  try { properties = await getAdminProperties(); } catch { /* Storage may be initializing in a local preview. */ }

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
