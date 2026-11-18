import Image from "next/image"

import { cn } from "@/lib/utils"

interface BrandMarkProps {
  className?: string
  sizes?: string
  priority?: boolean
}

export function BrandMark({ className, sizes = "44px", priority = false }: BrandMarkProps) {
  return (
    <span
      className={cn(
        "relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-md shadow-brand/25 ring-1 ring-black/5 transition-transform group-hover:rotate-6 dark:bg-card dark:ring-white/10",
        className
      )}
    >
      <Image
        src="/images/gourmet-slice-logo.png"
        alt=""
        width={612}
        height={408}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-contain dark:hidden"
      />
      <Image
        src="/images/pizzahub-logo-white.png"
        alt=""
        width={612}
        height={408}
        sizes={sizes}
        priority={priority}
        className="hidden h-full w-full object-contain dark:block"
      />
      <span className="absolute -top-1 -right-1 flex size-3">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-secondary opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-brand-secondary" />
      </span>
    </span>
  )
}
