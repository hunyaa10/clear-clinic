"use client"

import { useEffect, useState } from "react"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "clinic-intro", "services", "doctors-carousel", "contact"]
      
      if (window.scrollY < 100) {
        setActiveSection("hero")
        return
      }

      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
      })

      setActiveSection(currentSection || "")
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 right-0 z-[100] h-full hidden sm:flex items-center">
      <div className="flex flex-col items-end justify-center h-full py-8 px-4">
        {/* 배경 그라데이션 */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black/40 to-transparent" />
        
        <div className="flex flex-col items-end gap-8 relative">
          {[
            { id: "hero", label: "HOME" },
            { id: "clinic-intro", label: "STORY" },
            { id: "services", label: "TREATMENT" },
            { id: "doctors-carousel", label: "DOCTORS" },
            { id: "contact", label: "CONTACT" }
          ].map(({ id, label }) => (
            <div key={id} className="relative group flex items-center gap-3">
              <span 
                className={`text-sm font-light tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  ${activeSection === "hero" ? 'text-white' : 'text-gray-900'}`}
              >
                {label}
              </span>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(id)
                }}
                className="block relative"
              >
                <div 
                  className={`w-3 h-3 rounded-full transition-all duration-300 
                    ${activeSection === id 
                      ? 'bg-white shadow-lg shadow-white/20 scale-110' 
                      : 'bg-white/30'
                    } 
                    group-hover:scale-125`}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}
