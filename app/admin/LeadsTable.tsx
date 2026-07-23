"use client";

import { useMemo, useState } from "react";
import type { Lead } from "../../lib/storage";

function toCsv(leads: Lead[]) {
  const header = ["Date Created", "First Name", "Last Name", "Email", "Phone", "Interest", "Status", "Message"];
  const rows = leads.map((lead) => [lead.createdAt, lead.firstName, lead.lastName, lead.email, lead.phone || "", lead.interest, lead.status, lead.message || ""]);
  return [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export function LeadsTable({ leads, showSearch = true }: { leads: Lead[]; showSearch?: boolean }) {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    if (!query.trim()) return leads;
    const q = query.toLowerCase();
    return leads.filter((lead) => `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.interest}`.toLowerCase().includes(q));
  }, [leads, query]);

  function exportCsv() {
    const blob = new Blob([toCsv(visible)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {showSearch && (
        <div className="admin-table-toolbar">
          <input placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
          <button type="button" className="button-outline" onClick={exportCsv}>Export</button>
        </div>
      )}
      <div className="admin-table-scroll">
        <table className="admin-data-table">
          <thead>
            <tr><th>Date Created</th><th>Full Name</th><th>Interest</th><th>Contact</th><th>Source</th><th>Status</th></tr>
          </thead>
          <tbody>
            {visible.length ? visible.map((lead) => (
              <tr key={lead.id}>
                <td>{new Date(lead.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
                <td>{lead.firstName} {lead.lastName}</td>
                <td>{lead.interest}</td>
                <td><a href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone && <><br /><a href={`tel:${lead.phone}`}>{lead.phone}</a></>}</td>
                <td>WEB</td>
                <td><span className={`status-pill status-${lead.status}`}>{lead.status.toUpperCase()}</span></td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="admin-table-empty">No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
