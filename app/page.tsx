import Navigation from "@/components/common/navigation"
import HeroSection from "@/components/sections/hero-section"
import ServicesSection from "@/components/sections/services-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/common/footer"
import DoctorsSection from "@/components/sections/doctors-section"
import ClinicIntroSection from "@/components/sections/clinic-intro-section"

export default function DermatologyHomePage() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Navigation />
      <HeroSection />
      <ClinicIntroSection />
      <ServicesSection />
      <DoctorsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
