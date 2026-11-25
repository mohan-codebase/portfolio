import Image from "next/image";

import type { ProjectImage } from "@/content/site";
import { cn } from "@/lib/ui";

/** A project screenshot in a tinted frame that wipes open and drifts on scroll. */
export function ProjectVisual({
  image,
  priority,
  sizes: sizesOverride,
  frameClassName,
}: {
  image?: ProjectImage;
  priority?: boolean;
  sizes?: string;
  /** Replaces the frame's default aspect ratio and alignment classes. */
  frameClassName?: string;
}) {
  if (!image) return null;

  const isDevice = image.fit === "device";
  const frameClass = isDevice
    ? "h-full w-auto max-w-none shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] transition-transform duration-[1.2s] ease-out-expo group-hover:-translate-y-2"
    : "size-full object-cover object-left-top transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.025]";
  const sizes = sizesOverride ?? (isDevice ? "(min-width: 1024px) 260px, 45vw" : "(min-width: 1024px) 62vw, 100vw");

  return (
    <div
      data-curtain
      className={cn(
        "relative overflow-hidden bg-surface",
        isDevice && "flex justify-center",
        frameClassName ?? (isDevice ? "aspect-square items-end sm:aspect-[16/10]" : "aspect-[16/10]"),
      )}
    >
      {/* The wrapper carries the scroll parallax so it never fights the hover transition. */}
      <div
        data-parallax={image.fit}
        className={
          isDevice ? "flex h-[86%] justify-center will-change-transform" : "absolute inset-0 will-change-transform"
        }
      >
        <Image
          src={image.light}
          alt={image.alt}
          sizes={sizes}
          placeholder="blur"
          priority={priority}
          className={cn(frameClass, image.dark && "dark:hidden")}
        />
        {image.dark && (
          <Image
            src={image.dark}
            alt={image.alt}
            sizes={sizes}
            placeholder="blur"
            className={cn(frameClass, "hidden dark:block")}
          />
        )}
      </div>
    </div>
  );
}
