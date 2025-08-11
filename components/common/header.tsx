import { User } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-[60]">
      <div className="px-4 md:px-8 lg:px-20 py-6 flex justify-between items-center">
        <Link href="/">
          <div className="text-2xl font-light text-white tracking-wider">
            CLEAR CLINIC
          </div>
        </Link>

        <Link 
          href="/admin" 
          className="transition-transform duration-300 hover:-translate-y-1"
        >
          <User className="text-white w-6 h-6 stroke-[2]" />
        </Link>
      </div>
    </header>
  )
} 