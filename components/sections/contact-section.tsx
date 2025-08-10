"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock } from "lucide-react"
import Image from "next/image"
import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 bg-gray-50 z-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                className="w-fit font-medium"
                style={{
                  backgroundColor: `${BRAND_COLOR}20`, // brand tint
                  color: "#111827",
                  borderColor: BRAND_COLOR,
                }}
              >
                병원 안내
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">언제든지 문의해주세요</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                전문적인 상담과 정확한 진단을 통해 최적의 치료 방법을 제안해드립니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: BRAND_COLOR }} aria-hidden="true">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">전화 예약</p>
                  <p className="text-gray-600">02-1234-5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: BRAND_COLOR }} aria-hidden="true">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">병원 위치</p>
                  <p className="text-gray-600">서울시 강남구 테헤란로 123</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg" style={{ backgroundColor: BRAND_COLOR }} aria-hidden="true">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">진료 시간</p>
                  <p className="text-gray-600">평일 09:00-18:00 | 토요일 09:00-13:00</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="text-gray-900"
                style={{ backgroundColor: BRAND_COLOR, borderColor: "transparent" }}
              >
                온라인 예약
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white"
                style={{ borderColor: BRAND_COLOR, color: "#374151" }}
              >
                카카오톡 상담
              </Button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: BRAND_BG_COLOR }}>
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="클리어 피부과 접수 공간"
                width={600}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
