import Image from "next/image";

/**
 * A picture from the content store — or the placeholder that stands in for it
 * while there is none.
 *
 * The store holds the address of a picture, not the picture itself, so the
 * picture is fetched from wherever it is kept. An address that cannot be a
 * picture — an empty field, or something that is not a link at all — shows
 * the placeholder rather than breaking the page.
 */
export function Picture({
  src,
  alt,
  placeholder,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  placeholder: string;
  className?: string;
  sizes?: string;
}) {
  const address = src.trim();
  const usable = /^https?:\/\/\S+$/i.test(address) || address.startsWith("/");

  if (!usable) {
    return (
      <div
        className={`flex items-center justify-center rounded-[14px] border border-dashed border-[#c3cad5] text-sm text-ink-subtle ${className}`}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[14px] bg-chip ${className}`}
    >
      <Image
        src={address}
        alt={alt}
        fill
        sizes={sizes}
        className="object-contain"
      />
    </div>
  );
}
