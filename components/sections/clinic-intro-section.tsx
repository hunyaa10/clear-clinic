"use client"

import { BRAND_COLOR } from "@/lib/colors"
import clinicIntroData from "@/public/data/clinic-intro.json"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import MarqueeText from '@/components/common/MarqueeText'
import { useState, useEffect } from 'react'

import 'swiper/css'

export default function ClinicIntroSection() {
  const [spaceBetween, setSpaceBetween] = useState(64)
  const [imageHeights, setImageHeights] = useState([700, 500, 650, 580])
  
  // 화면 크기에 따른 spaceBetween 설정
  useEffect(() => {
    const updateSpaceBetween = () => {
      if (window.innerWidth < 1440) {
        setSpaceBetween(32) // 노트북 크기: 32
      } else {
        setSpaceBetween(64) // 데스크톱 이상: 64
      }
    }

    updateSpaceBetween()
    window.addEventListener('resize', updateSpaceBetween)
    return () => window.removeEventListener('resize', updateSpaceBetween)
  }, [])

  // 화면 높이에 따른 이미지 높이 비율 계산
  useEffect(() => {
    const updateImageHeights = () => {
      const viewportHeight = window.innerHeight
      const baseHeight = viewportHeight * 0.7
      
      const ratios = [1.0, 0.714, 0.929, 0.829]
      const newHeights = ratios.map(ratio => Math.round(baseHeight * ratio))
      
      setImageHeights(newHeights)
    }

    updateImageHeights()
    window.addEventListener('resize', updateImageHeights)
    return () => window.removeEventListener('resize', updateImageHeights)
  }, [])

  return (
    <section id="clinic-intro" className="relative z-20 pt-20 md:pt-24 pb-8 md:pb-12 bg-white min-h-screen">
      {/* lg 이상: 2열 배치, lg 미만: 세로 1열 배치 */}
      <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] 2xl:grid-cols-[45%_55%] mb-12 h-full gap-8">
        {/* 텍스트 영역 */}
        <div className="px-4 md:px-8 lg:px-20 space-y-6 md:space-y-7 lg:pr-0">
          <div className="space-y-2">
            <p className="text-sm 2xl:text-lg tracking-[0.18em] font-semibold" style={{ color: BRAND_COLOR }}>
              {clinicIntroData.title.label}
            </p>
            <h2 className="text-5xl 2xl:text-6xl font-light text-gray-900 tracking-tight">
              {clinicIntroData.title.main}
            </h2>
          </div>

          <blockquote className="text-xl 2xl:text-3xl font-light leading-8 2xl:leading-10 text-gray-800">
            {'"'}
            {clinicIntroData.quote.split(",").map((part, i) => (
              <span key={i}>
                {part}
                {i === 0 && <br className="hidden sm:block" />}
              </span>
            ))}
            {'"'}
          </blockquote>

          <div className="space-y-4 text-gray-600 leading-8 2xl:leading-10 text-md 2xl:text-xl">
            {clinicIntroData.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* 이미지 영역_swiper 사용 */}
        <div className="relative mt-8 md:mt-0 lg:mt-0 lg:pl-0 px-4 md:px-0">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.67,
              }
            }}
            spaceBetween={spaceBetween}
            loop={true}
            speed={2000}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false,
            }}
            className="w-full"
          >
            {clinicIntroData.images.map((img, i) => (
              <SwiperSlide key={`${img.src}-${i}`}>
                <div
                  className="relative rounded-lg w-full"
                  style={{
                    height: `${imageHeights[i % imageHeights.length]}px`,
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

      {/* 하단 무한 슬라이드 텍스트 */}
      <div className="bg-white">
        <MarqueeText
          text="CLEAR CLINIC"
          color={BRAND_COLOR}
        />
      </div>
    </section>
  )
}
