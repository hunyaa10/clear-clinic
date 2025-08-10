"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BRAND_COLOR } from '@/lib/colors'

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(3) // 실제 첫 번째 아이템부터 시작
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)
  
  const services = [
    {
      title: "여드름/흉터치료",
      subtitle: "Professional",
      description: "깨끗하고 매끄러운 피부로, 자신감 있는 나와 마주하기",
      hoverDescription: "개인별 피부 상태에 맞는 맞춤형 치료로\n건강하고 아름다운 피부를 되찾아드립니다",
      image: "/placeholder.svg?height=400&width=600&text=여드름흉터치료",
      alt: "여드름 흉터 치료"
    },
    {
      title: "안티에이징",
      subtitle: "High-End",
      description: "손끝으로 건어 올리는 시간의 잠막, 최선의 나와 마주보기",
      hoverDescription: "시간을 거슬러 올라가는 특별한 케어로\n젊고 탄력 있는 피부를 선사합니다",
      image: "/placeholder.svg?height=400&width=600&text=안티에이징",
      alt: "안티에이징 치료"
    },
    {
      title: "보톡스/필러",
      subtitle: "Premium",
      description: "자연스러운 아름다움으로, 진정한 나의 모습 찾기",
      hoverDescription: "자연스러운 볼륨과 라인으로\n더욱 아름다운 당신을 완성합니��",
      image: "/placeholder.svg?height=400&width=600&text=보톡스필러",
      alt: "보톡스 필러 시술"
    },
    {
      title: "기미/잡티",
      subtitle: "Advanced",
      description: "맑고 균일한 피부톤으로, 빛나는 내 얼굴 되찾기",
      hoverDescription: "피부 본연의 색을 찾는 시간\n더 자연스럽게 더 맑게",
      image: "/placeholder.svg?height=400&width=600&text=기미잡티치료",
      alt: "기미 잡티 치료"
    },
    {
      title: "탈모클리닉",
      subtitle: "Specialized",
      description: "건강한 모발로, 당당한 일상의 시작하기",
      hoverDescription: "과학적 진단과 개인 맞춤 솔루션으로\n풍성하고 건강한 모발을 되찾습니다",
      image: "/placeholder.svg?height=400&width=600&text=탈모클리닉",
      alt: "탈모 클리닉 치료"
    }
  ]

  // 화면 크기에 따른 카드 수 설정
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1) // 모바일: 1개
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2) // 태블릿: 2개
      } else {
        setCardsPerView(3) // 데스크톱: 3개
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

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => prev + 1)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(prev => prev - 1)
  }

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
      }, 4000) // 4초로 변경

      return () => clearInterval(interval)
    }
  }, [isTransitioning, isHovered])

  // 카드 너비 계산
  const getCardWidth = () => {
    if (cardsPerView === 1) return 'w-full'
    if (cardsPerView === 2) return 'w-1/2'
    return 'w-1/3'
  }

  // 변환 비율 계산
  const getTransformPercentage = () => {
    return (100 / cardsPerView)
  }

  return (
    <section id="services" className="relative py-20 bg-gray-50 z-20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            개인 맞춤형 피부 치료
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            최신 장비와 검증된 치료법으로 다양한 피부 고민을 해결해드립니다.
          </p>
        </div>
        
        {/* Slider Container */}
        <div className="max-w-6xl mx-auto">
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
                    : 'bg-gray-300 hover:bg-gray-400'
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
}
