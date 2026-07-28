import Link from "next/link";
import { getBackendAdminStats, getBackendLeads, type BackendLead } from "../../../lib/backend";
import { GalleryIcon, LeadsIcon, PropertiesIcon } from "../icons";
import { LeadsTable } from "../LeadsTable";

export default async function AdminDashboardPage() {
  let stats = { leads: 0, properties: 0, publishedProperties: 0, sectionMedia: 0 };
  let leads: BackendLead[] = [];
  try {
    [stats, leads] = await Promise.all([getBackendAdminStats(), getBackendLeads()]);
  } catch { /* Backend may be unavailable in a local preview. */ }

  return (
    <div className="admin-page">
      <div className="admin-page-intro">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, Victoria. Here&apos;s what&apos;s happening today.</p>
      </div>

      <div className="admin-stat-grid">
        <article className="admin-stat-card">
          <div><span>LEADS</span><strong>{stats.leads}</strong></div>
          <span className="admin-stat-icon"><LeadsIcon /></span>
        </article>
        <article className="admin-stat-card">
          <div><span>PROPERTIES</span><strong>{stats.properties}</strong></div>
          <span className="admin-stat-icon"><PropertiesIcon /></span>
        </article>
        <article className="admin-stat-card">
          <div><span>LIVE PROPERTIES</span><strong>{stats.publishedProperties}</strong></div>
          <span className="admin-stat-icon"><PropertiesIcon /></span>
        </article>
        <article className="admin-stat-card">
          <div><span>GALLERY MEDIA</span><strong>{stats.sectionMedia}</strong></div>
          <span className="admin-stat-icon"><GalleryIcon /></span>
        </article>
      </div>

      <section className="admin-table-panel">
        <div className="admin-table-panel-heading">
          <h3>Recent Leads</h3>
          <Link className="button-outline" href="/admin/leads">View All</Link>
        </div>
        <LeadsTable leads={leads.slice(0, 8)} />
      </section>
    </div>
  );
}
