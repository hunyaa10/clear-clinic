"use client"

import { User } from "lucide-react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const isAdminPage = pathname === '/admin'
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="px-4 md:px-8 lg:px-20 py-6 flex justify-between items-center">
        <Link href="/">
          <div className={`text-2xl font-light tracking-wider ${isAdminPage ? 'text-gray-800' : 'text-white'}`}>
            CLEAR CLINIC
          </div>
        </Link>

        <Link 
          href="/admin" 
          className="transition-transform duration-300 hover:-translate-y-1"
        >
          <User className={`w-6 h-6 stroke-[2] ${isAdminPage ? 'text-gray-800' : 'text-white'}`} />
        </Link>
      </div>
    </header>
  )
} 