'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function HeroButton({ 
  children, 
  variant = 'primary', 
  size = 'lg',
  onClick,
  className,
  disabled = false
}: HeroButtonProps) {
  const baseStyles = "transition-all duration-300 font-light tracking-wide"
  
  const variantStyles = {
    primary: "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30",
    secondary: "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/40"
  }
  
  const sizeStyles = {
    default: "px-10 py-3 text-base",
    sm: "px-8 py-2 text-base",
    lg: "px-12 py-4 text-lg",
    icon: "p-2"
  }

  return (
    <Button
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </Button>
  )
}
