import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="px-4 md:px-8 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-light text-white tracking-wider">CLEAR CLINIC</div>

          {/* Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <a href="#services" className="text-white/80 hover:text-white transition-colors font-light tracking-wide">
              TREATMENT
            </a>
            <a
              href="#doctors-carousel"
              className="text-white/80 hover:text-white transition-colors font-light tracking-wide"
            >
              DOCTORS
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors font-light tracking-wide">
              CONTACT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
