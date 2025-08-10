"use client"

import { BRAND_COLOR } from "@/lib/colors"
import clinicIntroData from "@/public/data/clinic-intro.json"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'

import 'swiper/css'

export default function ClinicIntroSection() {
  const IMAGE_WIDTH = 480
  const imageSizes = [
    { height: 600 },
    { height: 400 },
    { height: 520 },
    { height: 480 },
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
        </div>

        {/* 이미지 영역_swiper 사용 */}
        <div className="relative mt-8 md:mt-0">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.67}
            spaceBetween={32}
            loop={true}
            speed={1500}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {clinicIntroData.images.map((img, i) => (
              <SwiperSlide key={`${img.src}-${i}`}>
                <div
                  className="relative rounded-lg"
                  style={{
                    width: `${IMAGE_WIDTH}px`,
                    height: `${imageSizes[i % imageSizes.length].height}px`,
                    backgroundImage: `url(${img.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  role="img"
                  aria-label={img.alt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
