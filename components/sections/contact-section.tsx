"use client"

import ContactButton from "@/components/ui/buttons/contact-button"
import { Phone, MapPin, Clock } from "lucide-react"
import dynamic from 'next/dynamic'
import { useModal } from '@/components/providers/ModalProvider'
import { BRAND_COLOR } from "@/lib/colors"
import contactData from '@/public/data/contact.json'

const GoogleMapComponent = dynamic(
  () => import("@/components/google/GoogleMap"),
  { 
    loading: () => (
      <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
        지도를 불러오는 중...
      </div>
    ),
    ssr: false
  }
)

export default function ContactSection() {
  const { openModal } = useModal()

  return (
    <section id="contact" className="relative py-20 bg-gray-50 z-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 병원정보 */}
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
                <ContactButton
                  key={index}
                  size="lg"
                  variant={button.variant === 'primary' ? 'primary' : 'outline'}
                  onClick={() => {
                    if (button.text === '온라인 예약') {
                      openModal()
                    }
                  }}
                >
                  {button.text}
                </ContactButton>
              ))}
            </div>
          </div>

          {/* 구글맵 */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <GoogleMapComponent
                center={{ lat: 37.579617, lng: 126.998859 }} // 임시:서울대학교병원 주소
                height="400px"
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">* 임시로 서울대학교 병원 주소로 설정</p>
          </div>
        </div>
      </div>


    </section>
  )
}
