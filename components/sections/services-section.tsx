"use client"

import React, { forwardRef } from 'react';
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useState, useEffect } from "react"
import { BRAND_COLOR } from '@/lib/colors'
import servicesData from '@/public/data/services.json'


const ServicesSection = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(3)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)
  
  const services = servicesData.services

  // 화면 크기에 따른 카드 수 설정
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 576) {
        setCardsPerView(1) // 모바일: 1개
      } else if (window.innerWidth < 768) {
        setCardsPerView(2) // 태블릿: 2개
      } else if (window.innerWidth < 1440) {
        setCardsPerView(3) // 노트북: 3개
      } else {
        setCardsPerView(4) // 데스크톱: 4개
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  // 무한 슬라이드를 위해 앞뒤에 복사본 추가
  const extendedServices = [
    ...services.slice(-cardsPerView), // 마지막 카드들을 앞에 추가
    ...services,                      // 원본
    ...services.slice(0, cardsPerView) // 처음 카드들을 뒤에 추가
  ]

  const handleTransitionEnd = () => {
    setIsTransitioning(false)
    
    // 마지막 복사본에 도달했을 때 처음으로 점프
    if (currentIndex >= services.length + cardsPerView) {
      setCurrentIndex(cardsPerView)
    }
    // 첫 번째 복사본에 도달했을 때 마지막으로 점프
    else if (currentIndex < cardsPerView) {
      setCurrentIndex(services.length + cardsPerView - 1)
    }
  }

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        if (!isTransitioning) {
          setCurrentIndex(prev => prev + 1)
          setIsTransitioning(true)
        }
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isTransitioning, isHovered])

  // 카드 너비 계산 - 화면 크기별로 동적 계산
  const getCardWidth = () => {
    if (cardsPerView === 1) return 'w-full'
    if (cardsPerView === 2) return 'w-1/2'
    if (cardsPerView === 3) return 'w-1/3'
    if (cardsPerView === 4) return 'w-1/4'
    return 'w-1/3'
  }

  // 변환 비율 계산
  const getTransformPercentage = () => {
    return (100 / cardsPerView)
  }

  return (
    <section id="services" ref={ref} className="relative py-20 bg-gray-50 z-20">
      <div className="px-4 md:px-8 lg:px-20">
        <div className="text-center space-y-4 mb-16">
          <p className="text-sm 2xl:text-lg tracking-[0.18em] font-semibold" style={{ color: BRAND_COLOR }}>
            {servicesData.title.label}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {servicesData.title.main}
          </h2>
          <p className="text-md lg:text-lg 2xl:text-xl text-gray-600 max-w-2xl mx-auto">
            {servicesData.subtitle}
          </p>
        </div>
        
        {/* Slider Container */}
        <div>
          {/* Cards Container */}
          <div 
            className="overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-out' : ''}`}
              style={{ 
                transform: `translateX(-${currentIndex * getTransformPercentage()}%)` 
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedServices.map((service, index) => (
                <div key={`${service.title}-${index}`} className={`${getCardWidth()} flex-shrink-0 px-2 md:px-4`}>
                  {/* Mobile/Tablet Layout */}
                  <Card className="md:hidden group transition-all duration-700 border-0 shadow-lg bg-white overflow-hidden h-96 relative cursor-pointer">
                    {/* Background Image - 전체 높이 */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30">
                      </div>
                    </div>

                    {/* White Box - 상단에 배치 */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-white/95 z-10 p-4 flex flex-col justify-center text-center">
                      <p className="text-xs font-bold tracking-wider mb-1" style={{ color: BRAND_COLOR }}>
                        {service.subtitle}
                      </p>
                      <h3 className="text-lg font-light text-gray-900 tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <div className="absolute bottom-15 left-4 right-4 z-20">
                      <p className="text-white text-center font-light leading-relaxed text-ml whitespace-pre-line drop-shadow-lg">
                        {service.hoverDescription}
                      </p>
                    </div>
                  </Card>

                  {/* Desktop Layout */}
                  <Card className="hidden md:block group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg bg-white overflow-hidden h-96 relative cursor-pointer">
                    {/* Background Image - 전체 높이 */}
                    <div className="absolute inset-0">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700">
                      </div>
                    </div>

                    {/* White Box - 상단에 배치, 호버 시 위로 슬라이드 */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-white/95 z-10 p-4 md:p-6 flex flex-col justify-center group-hover:-translate-y-full transition-transform duration-700 ease-in-out">
                      <p className="text-xs font-bold tracking-wider mb-1" style={{ color: BRAND_COLOR }}>
                        {service.subtitle}
                      </p>
                      <h3 className="text-lg md:text-xl font-light text-gray-900 tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    {/* Hover Content - 중앙에 표시 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 z-20">
                      <h3 className="text-2xl md:text-3xl font-light text-white mb-4 md:mb-6 tracking-tight text-center drop-shadow-lg">
                        {service.title}
                      </h3>
                      <p className="text-white text-center font-light leading-relaxed text-base md:text-lg whitespace-pre-line drop-shadow-lg">
                        {service.hoverDescription}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  (currentIndex - cardsPerView) % services.length === index
                    ? 'bg-gray-900 w-8'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
                onClick={() => {
                  setCurrentIndex(index + cardsPerView)
                  setIsTransitioning(true)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default ServicesSection