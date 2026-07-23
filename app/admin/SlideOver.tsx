"use client";

import type { ReactNode } from "react";

export function SlideOver({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  if (!open) return null;
  return (
    <div className="slide-over-overlay" onClick={onClose}>
      <div className="slide-over-panel" onClick={(event) => event.stopPropagation()}>
        <div className="slide-over-header">
          <h3>{title}</h3>
          <button type="button" className="slide-over-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="slide-over-body">{children}</div>
      </div>
    </div>
  );
}
