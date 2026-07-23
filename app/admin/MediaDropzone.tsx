"use client";

import { DragEvent, forwardRef, useImperativeHandle, useRef, useState } from "react";

export type MediaDropzoneHandle = { reset: () => void };

type PreviewItem = { file: File; url: string; kind: "image" | "video" };

function detectKind(file: File): "image" | "video" {
  return file.type.startsWith("video/") ? "video" : "image";
}

export const MediaDropzone = forwardRef<MediaDropzoneHandle, {
  name: string;
  accept: string;
  multiple?: boolean;
  required?: boolean;
  helpText?: string;
}>(function MediaDropzone({ name, accept, multiple = false, required = false, helpText }, ref) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [dragActive, setDragActive] = useState(false);

  function applyFiles(files: File[]) {
    setPreviews((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.url));
      return files.map((file) => ({ file, url: URL.createObjectURL(file), kind: detectKind(file) }));
    });
    if (inputRef.current) {
      const transfer = new DataTransfer();
      files.forEach((file) => transfer.items.add(file));
      inputRef.current.files = transfer.files;
    }
  }

  function mergeIncoming(incoming: File[]) {
    if (!incoming.length) return;
    const merged = multiple ? [...previews.map((item) => item.file), ...incoming] : incoming.slice(0, 1);
    applyFiles(merged);
  }

  function handleChange() {
    mergeIncoming(Array.from(inputRef.current?.files ?? []));
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    mergeIncoming(Array.from(event.dataTransfer.files));
  }

  function removeAt(index: number) {
    applyFiles(previews.filter((_, i) => i !== index).map((item) => item.file));
  }

  useImperativeHandle(ref, () => ({
    reset: () => {
      setPreviews((prev) => {
        prev.forEach((item) => URL.revokeObjectURL(item.url));
        return [];
      });
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return (
    <div>
      <div
        className={`admin-dropzone${dragActive ? " admin-dropzone-active" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => { event.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p>Drag and drop {multiple ? "files" : "a file"} here or click to select {multiple ? "files" : "a file"}</p>
        <span className="button-outline admin-dropzone-button">Select {multiple ? "files" : "file"}</span>
        {helpText && <span className="field-help admin-dropzone-help">{helpText}</span>}
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          required={required}
          className="admin-dropzone-input"
          onChange={handleChange}
        />
      </div>
      {previews.length > 0 && (
        <div className="admin-file-preview-grid">
          {previews.map((item, index) => (
            <div className="admin-file-preview-item" key={item.url}>
              {item.kind === "image" ? <img src={item.url} alt="" /> : <video src={item.url} muted />}
              <button type="button" className="admin-file-preview-remove" onClick={(event) => { event.stopPropagation(); removeAt(index); }} aria-label="Remove file">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
