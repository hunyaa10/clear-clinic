"use client"

import { useRef } from "react"

import Navigation from "@/components/common/navigation"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/common/footer"
import DoctorsSection from "@/components/sections/doctors-section"
import ClinicIntroSection from "@/components/sections/clinic-intro-section"

export default function DermatologyHomePage() {
    const servicesRef = useRef<HTMLDivElement>(null);

    const handleScrollToServices = () => {
      servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="hidden md:block">
        <Navigation />
      </div>
      <HeroSection onScrollToServices={handleScrollToServices}/>
      <ClinicIntroSection />
      <ServicesSection ref={servicesRef} />
      <DoctorsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
