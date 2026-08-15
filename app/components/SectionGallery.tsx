type SectionMediaItem = { id: string; kind: "image" | "video"; title: string; caption: string | null; url: string };

export function SectionGallery({ items }: { items: SectionMediaItem[] }) {
  if (!items.length) return null;

  return (
    <section className="section-gallery">
      <div className="media-grid">
        {items.map((item) => (
          <article className="media-card" key={item.id}>
            {item.kind === "image" ? (
              <img src={item.url} alt={item.title} loading="lazy" />
            ) : (
              <video controls preload="metadata" playsInline>
                <source src={item.url} />
                Your browser does not support video playback.
              </video>
            )}
            <div className="media-copy">
              <p>{item.title}</p>
              {item.caption && <span>{item.caption}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
