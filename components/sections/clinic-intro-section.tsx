"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"
import clinicIntroData from "@/public/data/clinic-intro.json"

export default function ClinicIntroSection() {
  // 각 이미지별 크기 설정
  const imageSizes = [
    { width: 480, height: 640 },  // 세로로 긴 이미지
    { width: 720, height: 480 },  // 가로로 긴 이미지
    { width: 540, height: 540 },  // 정사각형 이미지
    { width: 640, height: 420 },  // 와이드 이미지
  ]

  return (
    <section id="clinic-intro" className="relative z-20 py-20 md:py-24 bg-white overflow-hidden">
      <div className="grid md:grid-cols-[45%_55%]">
        {/* 텍스트 영역 */}
        <div className="px-4 md:px-8 lg:px-12 space-y-6 md:space-y-7">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.18em] font-semibold" style={{ color: BRAND_COLOR }}>
              {clinicIntroData.title.label}
            </p>
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">
              {clinicIntroData.title.main}
            </h2>
          </div>

          <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-gray-800">
            {'"'}
            {clinicIntroData.quote.split(",").map((part, i) => (
              <span key={i}>
                {part}
                {i === 0 && <br className="hidden sm:block" />}
              </span>
            ))}
            {'"'}
          </blockquote>

          <div className="space-y-4 text-gray-600 leading-7">
            {clinicIntroData.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div>
            <Button
              size="lg"
              className="rounded-full px-6"
              style={{ backgroundColor: BRAND_COLOR, color: "#0A0A0A", borderColor: "transparent" }}
              onClick={() => {
                const el = document.getElementById(clinicIntroData.button.target)
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
            >
              {clinicIntroData.button.text}
            </Button>
          </div>
        </div>

        {/* 이미지 영역 */}
        <div className="relative mt-8 md:mt-0">
          <div className="flex gap-4 md:gap-6">
            {clinicIntroData.images.map((img, i) => (
              <div
                key={`clinic-intro-image-${i}`}
                className="relative flex-shrink-0"
                style={{
                  width: `${imageSizes[i].width}px`,
                  height: `${imageSizes[i].height}px`,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
