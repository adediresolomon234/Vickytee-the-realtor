"use client";

import { useState } from "react";

export type Section = "gallery" | "buy" | "sell";
export type SectionMediaItem = { id: string; section: Section; kind: "image" | "video"; title: string; caption: string | null; url: string; published: boolean | number };

export const SECTION_LABELS: Record<Section, string> = {
  gallery: "General gallery",
  buy: "Buy page",
  sell: "Sell page",
};

export function SectionMediaManager({ initialMedia, showSection = true }: { initialMedia: SectionMediaItem[]; showSection?: boolean }) {
  const [status, setStatus] = useState("");
  const [busyId, setBusyId] = useState("");

  async function update(id: string, action: "toggle" | "delete", published: boolean) {
    if (action === "delete" && !window.confirm("Delete this photo/video? This cannot be undone.")) return;
    setBusyId(id);
    const response = await fetch(`/api/section-media/${id}`, action === "delete"
      ? { method: "DELETE" }
      : { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ published: !published }) });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus(data.error || "Could not update this item.");
      return setBusyId("");
    }
    window.location.reload();
  }

  const columns = showSection ? 7 : 6;

  return (
    <div>
      <div className="admin-table-scroll">
        <table className="admin-data-table">
          <thead>
            <tr><th>Preview</th><th>Title</th>{showSection && <th>Section</th>}<th>Caption</th><th>Type</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {initialMedia.length ? initialMedia.map((item) => (
              <tr key={item.id}>
                <td><div className="admin-table-thumb">{item.kind === "image" ? <img src={item.url} alt="" /> : <video src={item.url} muted />}</div></td>
                <td>{item.title}</td>
                {showSection && <td>{SECTION_LABELS[item.section]}</td>}
                <td>{item.caption || "—"}</td>
                <td>{item.kind}</td>
                <td><span className={`status-pill ${item.published ? "status-live" : "status-draft"}`}>{item.published ? "LIVE" : "HIDDEN"}</span></td>
                <td>
                  <div className="admin-row-actions">
                    <button type="button" disabled={busyId === item.id} onClick={() => update(item.id, "toggle", !!item.published)}>{item.published ? "Unpublish" : "Publish"}</button>
                    <button className="delete" type="button" disabled={busyId === item.id} onClick={() => update(item.id, "delete", !!item.published)}>Delete</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={columns} className="admin-table-empty">Nothing uploaded here yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="form-status" aria-live="polite">{status}</p>
    </div>
  );
}
