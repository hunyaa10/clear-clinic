"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ArrowSize = "sm" | "md" | "lg"

interface CarouselArrowProps {
  direction?: "left" | "right"
  onClick?: () => void
  className?: string
  ariaLabel?: string
  disabled?: boolean
  size?: ArrowSize
}

const sizeStyles: Record<ArrowSize, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

export default function CarouselArrow({
  direction = "right",
  onClick,
  className,
  ariaLabel,
  disabled = false,
  size = "md",
}: CarouselArrowProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight

  return (
    <Button
      type="button"
      aria-label={ariaLabel ?? (direction === "left" ? "이전" : "다음")}
      onClick={onClick}
      disabled={disabled}
      variant="ghost"
      className={cn(
        "rounded-full",
        "bg-white/10 text-white",
        "backdrop-blur-sm border border-white/20 shadow-lg",
        "hover:bg-white/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeStyles[size],
        "p-0",
        className,
      )}
    >
      <Icon className={cn(size === "lg" ? "h-6 w-6" : "h-5 w-5")} />
    </Button>
  )
}
