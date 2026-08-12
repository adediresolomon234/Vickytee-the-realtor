import { getLeads, type Lead } from "../../../../lib/storage";
import { LeadsTable } from "../../LeadsTable";

export default async function AdminLeadsPage() {
  let leads: Lead[] = [];
  try { leads = await getLeads(); } catch { /* Storage may be initializing in a local preview. */ }

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
