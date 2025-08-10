"use client"

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"

export default function ClinicIntroSection() {
  // 4장 플레이스홀더 이미지를 가로로 나열
  const images = useMemo(
    () => [
      { src: "/placeholder.svg?height=640&width=900", alt: "클리닉 의료진 회의 장면" },
      { src: "/placeholder.svg?height=640&width=900", alt: "깔끔한 피부과 진료실" },
      { src: "/placeholder.svg?height=640&width=900", alt: "전문적인 피부 상담" },
      { src: "/placeholder.svg?height=640&width=900", alt: "최신 레이저 장비" },
    ],
    [],
  )

  // 무한 루프를 위한 확장 배열 (시각적 점프 방지)
  const extended = useMemo(() => images.concat(images), [images])

  // 1.5장 보이기 => 슬라이드 단위 너비: 100% / 1.5
  const SLIDES_VISIBLE_FRACTION = 1.5
  const SLIDE_PCT = 100 / SLIDES_VISIBLE_FRACTION // 66.666...

  const [index, setIndex] = useState(0)
  const [transitioning, setTransitioning] = useState(true)
  const intervalRef = useRef<number | null>(null)

  // 2초마다 우측(다음)으로 슬라이드
  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => i + 1)
      setTransitioning(true)
    }, 2000)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [])

  // 트랜지션 종료 후 루프 리셋 (확장 배열 중간에서 원본 첫 장으로 점프)
  const handleTransitionEnd = () => {
    if (index >= images.length) {
      // 현재 화면에는 extended의 첫 이미지 복제본이 보이는 상태
      // 트랜지션 제거 후 인덱스를 원본 첫 장(0)으로 재설정
      setTransitioning(false)
      setIndex(0)
      // 다음 프레임에 트랜지션 복구
      requestAnimationFrame(() => requestAnimationFrame(() => setTransitioning(true)))
    }
  }

  return (
    <section id="clinic-intro" className="relative z-20 py-20 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left Copy */}
          <div className="space-y-6 md:space-y-7">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.18em] font-semibold" style={{ color: BRAND_COLOR }}>
                클리어 피부과
              </p>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 tracking-tight">Story</h2>
            </div>

            <blockquote className="text-xl md:text-2xl font-light leading-relaxed text-gray-800">
              {'"'}피부 본연의 건강과 아름다움을 찾아,
              <br className="hidden sm:block" />
              일상의 자신감을 되돌려 드립니다.{'"'}
            </blockquote>

            <div className="space-y-4 text-gray-600 leading-7">
              <p>
                저희는 개개인의 피부 컨디션을 섬세하게 분석하여, 불필요한 시술은 줄이고 필요한 치료에 집중합니다. 과학적
                근거와 진정성 있는 진료를 통해 눈으로 보이는 변화를 약속드립니다.
              </p>
              <p>
                최신 장비와 풍부한 임상 경험을 바탕으로 안전하고 효과적인 솔루션을 제안합니다. 당신의 피부 이야기를
                듣고, 가장 당신다운 아름다움을 찾아드리는 것이 우리의 사명입니다.
              </p>
            </div>

            <div>
              <Button
                size="lg"
                className="rounded-full px-6"
                style={{ backgroundColor: BRAND_COLOR, color: "#0A0A0A", borderColor: "transparent" }}
                onClick={() => {
                  const el = document.getElementById("contact")
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
              >
                소개 더보기
              </Button>
            </div>
          </div>

          {/* Right: Horizontal strip with 4 images, show ~1.5, overflow clipped, auto slide right */}
          <div className="relative w-full">
            <div
              className="relative w-full rounded-2xl overflow-hidden shadow-xl"
              style={{ backgroundColor: BRAND_BG_COLOR }}
            >
              {/* 고정 높이로 레이아웃 안정화 */}
              <div className="relative h-[360px] md:h-[440px]">
                <div
                  className={[
                    "absolute inset-0",
                    "overflow-hidden", // 넘치는 부분 자름
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute top-0 left-0 h-full flex",
                      // 우측 빈공간 없이 꽉 차도록 트랜스폼 적용
                      transitioning ? "transition-transform duration-700 ease-out" : "",
                    ].join(" ")}
                    style={{
                      transform: `translateX(-${index * SLIDE_PCT}%)`,
                    }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {extended.map((img, i) => (
                      <div
                        key={`${img.src}-${i}`}
                        className="relative h-full flex-shrink-0"
                        style={{
                          // 카드 폭: 컨테이너의 1/1.5 (= 약 66.666%)
                          width: `calc(100% / ${SLIDES_VISIBLE_FRACTION})`,
                        }}
                      >
                        <Image
                          src={img.src || "/placeholder.svg"}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                          priority={i === 0}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
