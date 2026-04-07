import Image from "next/image";
import type { GalleryImage } from "@/lib/microcms";

const labels = ["Interior", "Counter", "Drinks", "Private", "Night"];

export default function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <section id="gallery" className="relative py-32 px-8 bg-[var(--bg-secondary)]">
      <div className="max-w-[1100px] mx-auto">
        <p className="section-label reveal">Atmosphere</p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5vw,4rem)] font-light tracking-[0.2em] uppercase text-[var(--champagne)] leading-[1.2] mb-2 reveal reveal-delay-1">
          Gallery
        </h2>
        <p className="font-[family-name:var(--font-shippori)] text-[0.85rem] tracking-[0.4em] text-[var(--text-dim)] mb-12 reveal reveal-delay-2">
          空間のこと
        </p>
        <div className="w-10 h-px bg-[var(--rose-gold)] mb-12 reveal reveal-delay-2" />

        <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 grid-rows-[280px_280px] max-[900px]:grid-rows-[300px_200px_200px] max-[600px]:grid-rows-[repeat(5,220px)] gap-4">
          {Array.from({ length: 5 }).map((_, i) => {
            const img = images[i];
            return (
              <div
                key={i}
                className={`relative overflow-hidden cursor-pointer bg-[var(--bg-tertiary)] group ${
                  i === 0 ? "row-span-2 max-[900px]:col-span-2 max-[900px]:row-span-1 max-[600px]:col-span-1" : ""
                } reveal reveal-delay-${Math.min(i + 1, 3)}`}
              >
                <div className="w-full h-full flex items-center justify-center transition-transform duration-800 group-hover:scale-105" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
                  {img?.image?.url ? (
                    <Image
                      src={img.image.url}
                      alt={img.title || labels[i]}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="font-[family-name:var(--font-cormorant)] text-[0.65rem] tracking-[0.3em] uppercase text-[var(--text-dim)] border border-[var(--border-subtle)] px-5 py-2 transition-all duration-400 group-hover:border-[var(--rose-gold)] group-hover:text-[var(--rose-gold)]">
                      {labels[i]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
