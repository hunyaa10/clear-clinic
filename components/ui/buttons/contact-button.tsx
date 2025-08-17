import { BRAND_COLOR } from "@/lib/colors"
import { ButtonHTMLAttributes } from "react"

interface ContactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  size?: 'default' | 'lg'
}

export default function ContactButton({ 
  children, 
  variant = 'primary',
  size = 'default',
  className = '',
  ...props 
}: ContactButtonProps) {
  const sizeClasses = size === 'lg' ? 'py-2 px-6' : 'py-2 px-4'
  
  return (
    <button
      {...props}
      className={`
        ${sizeClasses}
        transition-all duration-300 ease-in-out
        transform hover:-translate-y-1 hover:shadow-md
        rounded-md
        ${className}
      `}
      style={{
        backgroundColor: variant === 'primary' ? BRAND_COLOR : 'transparent',
        borderColor: variant === 'outline' ? BRAND_COLOR : 'transparent',
        color: variant === 'outline' ? BRAND_COLOR : 'white',
        borderWidth: variant === 'outline' ? '2px' : '0',
        borderStyle: 'solid'
      }}
    >
      {children}
    </button>
  )
}
