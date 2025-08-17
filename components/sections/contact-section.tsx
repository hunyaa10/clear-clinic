"use client"

import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"
import contactData from '@/public/data/contact.json'

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-gray-50 z-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm 2xl:text-lg tracking-[0.18em] font-semibold" style={{ color: BRAND_COLOR }}>
                {contactData?.title?.label}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {contactData?.title?.main}
              </h2>
              <p className="text-md lg:text-lg 2xl:text-xl text-gray-600 max-w-2xl">
                {contactData?.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {contactData.contactInfo.map((info, index) => {
                const IconComponent = info.icon === 'phone' ? Phone : 
                                   info.icon === 'map-pin' ? MapPin : 
                                   info.icon === 'clock' ? Clock : Phone
                
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: BRAND_COLOR }} aria-hidden="true">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{info.title}</p>
                      <p className="text-gray-600">{info.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {contactData.buttons.map((button, index) => (
                <Button
                key={index}
                size="lg"
                className={`
                  transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md
                `}
                style={{
                  backgroundColor: button.variant === 'primary' ? BRAND_COLOR : 'transparent',
                  borderColor: button.variant === 'outline' ? BRAND_COLOR : 'transparent',
                  color: button.variant === 'outline' ? BRAND_COLOR : 'white',
                  borderWidth: button.variant === 'outline' ? '2px' : '0'
                }}
              >
                {button.text}
              </Button>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: BRAND_BG_COLOR }}>
              <Image
                src="/placeholder.svg"
                alt="클리어 피부과 구글맵"
                width={500}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
