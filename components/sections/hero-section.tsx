"use client"

import Image from "next/image"
import HeroButton from "@/components/ui/buttons/hero-button"

export default function HeroSection() {
  const handlePrimaryClick = () => {
    // 전문 상담 예약 로직
    console.log("전문 상담 예약 클릭")
  }

  const handleSecondaryClick = () => {
    // 치료 프로그램 보기 로직
    console.log("치료 프로그램 보기 클릭")
  }

  return (
    <section className="sticky top-0 h-screen flex items-center justify-center overflow-hidden z-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/banner/hero-background.png"
          alt="Professional facial treatment and skincare therapy"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="space-y-6 max-w-4xl mx-auto">          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight">
            <span className="block">Premium</span>
            <span className="block font-extralight">Skincare</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed opacity-90">
            개인 맞춤형 전문 치료와 최첨단 기술로
            <br />
            당신만의 완벽한 피부를 만들어갑니다
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <HeroButton 
              variant="primary"
              onClick={handlePrimaryClick}
            >
              전문 상담 예약
            </HeroButton>
            
            <HeroButton 
              variant="secondary"
              onClick={handleSecondaryClick}
            >
              치료 프로그램 보기
            </HeroButton>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-sm font-light tracking-wider">SCROLL</span>
          <div className="w-px h-8 bg-white/30"></div>
        </div>
      </div>
    </section>
  )
}
