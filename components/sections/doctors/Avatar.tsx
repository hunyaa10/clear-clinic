import Image from "next/image"
import { Doctor } from "./types"

interface AvatarProps {
  doc: Doctor
  active: boolean
  onClick: () => void
}

export function Avatar({ doc, active, onClick }: AvatarProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${doc.name} ${doc.title} 선택`}
      className={[
        "relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden",
        "transition-all duration-300",
        active ? "ring-2 ring-gray-900/10 shadow-md" : "ring-0 opacity-90 hover:opacity-100",
      ].join(" ")}
    >
      <Image
        src={doc.image}
        alt={`${doc.name} 프로필`}
        fill
        className="object-cover"
        priority={doc.isChief}
      />
    </button>
  )
}
