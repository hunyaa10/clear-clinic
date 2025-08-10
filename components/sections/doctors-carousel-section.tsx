"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import CarouselArrow from "@/components/ui/buttons/carousel-arrow"
import { BRAND_BG_COLOR, BRAND_COLOR } from "@/lib/colors"
import { motion, AnimatePresence } from "framer-motion"

type Doctor = {
  id: number
  name: string
  title: string
  specialty: string
  image: string
  isChief?: boolean
  filmography?: {
    education?: string[]
    experience?: string[]
  }
}

// 데스크톱에서만 고정 높이, 모바일은 자동 높이
const WRAP_HEIGHT_DESKTOP = "md:h-[420px]"

// 네트워크 실패 시 사용할 폴백 데이터(플레이스홀더 이미지)
const fallbackDoctors: Doctor[] = [
  {
    id: 0,
    name: "김민수",
    title: "대표원장",
    specialty: "피부과 전문의",
    image: "/placeholder.svg?height=560&width=420",
    isChief: true,
    filmography: {
      education: ["서울대학교 의과대학 졸업", "서울대학교병원 피부과 전공의", "서울대학교병원 피부과 전임의"],
      experience: ["現 클리어 피부과 대표원장", "前 서울대학교병원 피부과 임상교수", "前 강남세브란스병원 피부과 과장"],
    },
  },
  {
    id: 1,
    name: "이지영",
    title: "원장",
    specialty: "미용피부과 전문의",
    image: "/placeholder.svg?height=560&width=420",
    isChief: false,
    filmography: {
      education: ["연세대학교 의과대학 졸업", "세브란스병원 피부과 전공의", "세브란스병원 피부과 전임의"],
      experience: ["現 클리어 피부과 원장", "前 세브란스병원 피부과 전임의", "前 강남차병원 피부과 과장"],
    },
  },
  {
    id: 2,
    name: "박성호",
    title: "원장",
    specialty: "레이저치료 전문의",
    image: "/placeholder.svg?height=560&width=420",
    isChief: false,
    filmography: {
      education: ["고려대학교 의과대학 졸업", "고려대병원 피부과 전공의", "고려대병원 피부과 전임의"],
      experience: ["現 클리어 피부과 원장", "前 고려대병원 피부과 전임의", "前 분당서울대병원 피부과 과장"],
    },
  },
]

export default function DoctorsCarouselSection() {
  // 데이터 로드
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetch("/data/doctors.json", { cache: "no-store" })
        if (!res.ok) throw new Error("failed to load doctors.json")
        const data: Doctor[] = await res.json()
        if (!mounted) return
        setDoctors(data && Array.isArray(data) && data.length ? data : fallbackDoctors)
      } catch {
        if (mounted) setDoctors(fallbackDoctors)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  // 대표원장을 맨 앞으로 정렬
  const ordered = useMemo(() => {
    if (!doctors?.length) return []
    return [...doctors].sort((a, b) => Number(b.isChief) - Number(a.isChief))
  }, [doctors])

  // 반응형: 휴대폰 1장(커스텀 모바일 레이아웃), md+ 3장
  const [cardsPerView, setCardsPerView] = useState(3)
  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return
      if (window.innerWidth < 768) setCardsPerView(1)
      else setCardsPerView(3)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // 캐러셀 상태(데스크톱 목록 전용)
  const [startIndex, setStartIndex] = useState(0)
  useEffect(() => {
    setStartIndex(0)
  }, [ordered.length])
  const lengthSafe = Math.max(ordered.length || 0, 1)
  const next = () => setStartIndex((i) => (i + 1) % lengthSafe)
  const prev = () => setStartIndex((i) => (i - 1 + lengthSafe) % lengthSafe)

  const visibleIndices = useMemo(() => {
    if (!ordered.length) return []
    const count = Math.min(3, ordered.length)
    return Array.from({ length: count }, (_, i) => (startIndex + i) % ordered.length)
  }, [ordered, startIndex])

  // 상세 보기 선택 상태
  const [selected, setSelected] = useState<Doctor | null>(null)

  useEffect(() => {
    if (!ordered.length) return
    if (cardsPerView === 1) {
      const def = ordered.find((d) => d.isChief) ?? ordered[0]
      setSelected((prev) => prev ?? def)
    } else {
      // 데스크탑: 목록(프로필 카드만) 보이도록 선택 해제
      setSelected(null)
    }
  }, [cardsPerView, ordered])

  // 애니메이션(데스크톱 전환)
  const tweenFast = { type: "tween", duration: 0.35, ease: "easeOut" }
  const tweenSlow = { type: "tween", duration: 0.7, ease: "easeInOut" }

  // 공통 카드 UI
  const PhotoCard = ({ doc }: { doc: Doctor }) => (
    <div className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-200 shadow-lg h-full transition-all duration-300 ease-out transform-gpu will-change-transform md:hover:-translate-y-2 md:hover:shadow-xl focus:-translate-y-2 focus:shadow-xl cursor-pointer">
      <Image
        src={doc.image || "/placeholder.svg?height=560&width=420&query=fallback"}
        alt={`${doc.name} ${doc.title}`}
        fill
        sizes="(max-width: 768px) 360px, 33vw"
        className="object-cover"
        priority
      />
      <p className="absolute left-4 bottom-4 text-white text-base md:text-lg font-medium drop-shadow-lg">
        {doc.title}. {doc.name}
      </p>
    </div>
  )

  // 모바일용 둥근 아바타
  const Avatar = ({ doc, active }: { doc: Doctor; active: boolean }) => (
    <button
      type="button"
      onClick={() => setSelected(doc)}
      aria-label={`${doc.name} ${doc.title} 선택`}
      className={[
        "relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden",
        "transition-all duration-300",
        active ? "ring-2 ring-gray-900/10 shadow-md" : "ring-0 opacity-90 hover:opacity-100",
      ].join(" ")}
    >
      <Image
        src={doc.image || "/placeholder.svg?height=200&width=200&query=doctor"}
        alt={`${doc.name} 프로필`}
        fill
        className="object-cover"
        priority={doc.isChief === true}
      />
    </button>
  )

  return (
    <section id="doctors-carousel" className="relative z-30 py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 데스크톱 타이틀(모바일에서는 내부 카드로 대체) */}
        <div className="hidden md:block text-center space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-[0.2em]" style={{ color: BRAND_COLOR }}>
            의료진 소개
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">클리어 피부과 의료진</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            풍부한 임상 경험과 섬세한 진료로, 당신의 피부 고민을 함께 해결합니다.
          </p>
        </div>

        {/* 래퍼: 모바일 자동 높이, 데스크톱 고정 높이 */}
        <div className={`relative mx-auto md:max-w-6xl max-w-[360px] ${WRAP_HEIGHT_DESKTOP}`}>
          {/* 로딩 스켈레톤 */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl md:rounded-2xl bg-gray-200/70 animate-pulse h-40 md:h-full" />
              ))}
            </div>
          ) : cardsPerView === 1 ? (
            // 모바일 레이아웃: 타이틀 카드 -> 아바타 가로 3개 -> 정보 카드
            <div className="md:hidden space-y-6">
              {/* 상단 타이틀 카드 */}
              <div
                className="rounded-xl bg-white shadow-sm p-6 border-y md:border-y-0"
                style={{ borderLeft: `4px solid ${BRAND_COLOR}`, borderRight: `4px solid ${BRAND_COLOR}` }}
              >
                <h3 className="text-2xl font-extrabold text-gray-900 text-center">클리어 피부과 원장단</h3>
                <p className="mt-3 text-center text-gray-600">
                  개인별 프리미엄 맞춤 진료와 가능한 모든 치료를
                  <br />
                  원장이 직접 시술합니다.
                </p>
              </div>

              {/* 아바타 3개 가로 배치 */}
              <div className="flex items-center justify-between px-1">
                {(ordered.length ? ordered.slice(0, 3) : fallbackDoctors.slice(0, 3)).map((d) => (
                  <Avatar key={d.id} doc={d} active={selected?.id === d.id} />
                ))}
              </div>

              {/* 선택 정보 카드 */}
              {selected && (
                <div
                  className="rounded-2xl p-5 sm:p-6 shadow-sm"
                  style={{
                    backgroundColor: BRAND_BG_COLOR,
                    borderLeft: `4px solid ${BRAND_COLOR}`,
                    borderRight: `4px solid ${BRAND_COLOR}`,
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-extrabold text-gray-900">
                      {selected.name} {selected.title}
                    </h4>
                    <p className="mt-1 text-sm font-semibold" style={{ color: BRAND_COLOR }}>
                      {selected.specialty}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {selected.filmography?.education?.length ? (
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2">학력</h5>
                        <ul className="space-y-1">
                          {selected.filmography.education.map((item, i) => (
                            <li key={`edu-m-${i}`} className="text-gray-700 text-sm">
                              {"• "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {selected.filmography?.experience?.length ? (
                      <div>
                        <h5 className="font-bold text-gray-900 mb-2">경력</h5>
                        <ul className="space-y-1">
                          {selected.filmography.experience.map((item, i) => (
                            <li key={`exp-m-${i}`} className="text-gray-700 text-sm">
                              {"• "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 데스크톱 레이아웃(기존 유지)
            <div className="hidden md:block">
              {/* 돌아가기 버튼: 데스크톱 전용 */}
              <AnimatePresence initial={false} mode="wait">
                {selected && (
                  <motion.button
                    key="back-btn"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0, transition: tweenFast }}
                    exit={{ opacity: 0, y: -6, transition: tweenFast }}
                    className="absolute -top-8 left-0 text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
                    onClick={() => setSelected(null)}
                  >
                    전체 보기로 돌아가기
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {selected ? (
                  // 상세 화면: 좌 설명, 우 이미지
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: tweenFast }}
                    exit={{ opacity: 0, transition: tweenFast }}
                    className="grid md:grid-cols-2 gap-6 h-full items-stretch"
                  >
                    {/* 설명 카드 */}
                    <motion.div
                      key="info"
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition: tweenSlow }}
                      exit={{ x: -40, opacity: 0, transition: tweenFast }}
                      className="rounded-xl md:rounded-2xl p-6 md:p-8 h-full overflow-y-auto"
                      style={{ backgroundColor: BRAND_BG_COLOR }}
                    >
                      <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                          {selected.name} {selected.title}
                        </h3>
                        <p className="mt-2 font-medium" style={{ color: BRAND_COLOR }}>
                          {selected.specialty}
                        </p>
                      </div>

                      <div className="space-y-6">
                        {selected.filmography?.education?.length ? (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">학력</h4>
                            <ul className="space-y-2">
                              {selected.filmography.education.map((item, i) => (
                                <li key={`edu-${i}`} className="text-gray-700 text-sm">
                                  {"• "}
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {selected.filmography?.experience?.length ? (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">경력</h4>
                            <ul className="space-y-2">
                              {selected.filmography.experience.map((item, i) => (
                                <li key={`exp-${i}`} className="text-gray-700 text-sm">
                                  {"• "}
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </motion.div>

                    {/* 프로필 카드 */}
                    <motion.div
                      key="photo"
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1, transition: tweenSlow }}
                      exit={{ x: 60, opacity: 0, transition: tweenFast }}
                      className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-200 shadow-lg h-full"
                    >
                      <Image
                        src={selected.image || "/placeholder.svg?height=560&width=420&query=fallback"}
                        alt={`${selected.name} ${selected.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                      <p className="absolute left-4 bottom-4 text-white text-base md:text-lg font-medium drop-shadow-lg">
                        {selected.title}. {selected.name}
                      </p>
                    </motion.div>
                  </motion.div>
                ) : (
                  // 목록 화면: 3장
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: tweenFast }}
                    exit={{ opacity: 0, y: 6, transition: tweenFast }}
                    className="relative h-full"
                  >
                    <div className="grid grid-cols-3 gap-6 h-full items-stretch">
                      {visibleIndices.map((idx, pos) => {
                        const d = ordered[idx]
                        if (!d) return <div key={`ph-${pos}`} className="rounded-xl bg-gray-200 h-full" />
                        return (
                          <button
                            key={`${d.id}-${pos}`}
                            type="button"
                            onClick={() => setSelected(d)}
                            className="block w-full text-left group outline-none h-full"
                          >
                            <PhotoCard doc={d} />
                          </button>
                        )
                      })}
                    </div>

                    {/* 화살표: 데스크톱에서는 숨김(요청 사항 유지) */}
                    <CarouselArrow direction="left" onClick={prev} size="lg" className="hidden" />
                    <CarouselArrow direction="right" onClick={next} size="lg" className="hidden" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
