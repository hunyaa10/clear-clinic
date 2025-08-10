"use client"

import { BRAND_COLOR } from "@/lib/colors"
import clinicIntroData from "@/public/data/clinic-intro.json"
import { useEffect, useState, useMemo } from "react"
import { motion } from "framer-motion"

export default function ClinicIntroSection() {
  // 임시 이미지 설정
  const IMAGE_WIDTH = 480
  const GAP = 32
  const imageSizes = [
    { height: 600 },
    { height: 400 },
    { height: 520 },
    { height: 480 },
  ]

  const extendedImages = useMemo(
    () => [...clinicIntroData.images, ...clinicIntroData.images, ...clinicIntroData.images],
    []
  )

  const [currentIndex, setCurrentIndex] = useState(clinicIntroData.images.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 7000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (currentIndex >= clinicIntroData.images.length * 2) {
      const timeout = setTimeout(() => {
        setCurrentIndex(clinicIntroData.images.length)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

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

        {/* 이미지 영역 */}
        <div className="relative mt-8 md:mt-0">
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-8"
              animate={{ 
                x: `-${currentIndex * (IMAGE_WIDTH + GAP)}px` 
              }}
              transition={{ 
                duration: 1.2,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {extendedImages.map((img, i) => (
                <div
                  key={`clinic-intro-image-${i}`}
                  className="relative flex-shrink-0 rounded-lg"
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
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
