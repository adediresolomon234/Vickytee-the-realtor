import { getBackendLeads, type BackendLead } from "../../../../lib/backend";
import { LeadsTable } from "../../LeadsTable";

export default async function AdminLeadsPage() {
  let leads: BackendLead[] = [];
  try { leads = await getBackendLeads(); } catch { /* Backend may be unavailable in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-intro">
        <h2>Leads</h2>
        <p>Every inquiry submitted from the website, newest first.</p>
      </div>
      <section className="admin-table-panel">
        <LeadsTable leads={leads} />
      </section>
    </div>
  );
}
