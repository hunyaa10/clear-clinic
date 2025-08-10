"use client"

import Image from "next/image"
import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"
import { useEffect, useState } from "react"
import { motion, AnimatePresence, Transition } from "framer-motion"

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

// 모바일용 둥근 아바타
const Avatar = ({ doc, active, onClick }: { doc: Doctor; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`${doc.name} ${doc.title} 선택`}
    className={[
      "relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden",
      "transition-all duration-300",
      active ? "ring-2 ring-gray-900/10 shadow-md" : "ring-0 opacity-90 hover:opacity-100",
    ].join(" ")}
  >
    <Image
      src={doc.image}
      alt={`${doc.name} 프로필`}
      fill
      className="object-cover"
      priority={doc.isChief}
    />
  </button>
)

export default function DoctorsCarouselSection() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [selected, setSelected] = useState<Doctor | null>(null)

  useEffect(() => {
    fetch('/data/doctors.json')
      .then(res => res.json())
      .then((data: Doctor[]) => {
        setDoctors(data)
        // 모바일에서만 초기 선택 (대표원장)
        if (window.innerWidth < 768) {
          const chief = data.find(doc => doc.isChief) || data[0]
          setSelected(chief)
        }
      })
      .catch(err => console.error('의사 데이터 로딩 실패:', err))
  }, [])

  // 애니메이션 설정
  const tweenFast: Transition = {
    duration: 0.2,
    ease: "easeOut"
  }

  const tweenSlow: Transition = {
    duration: 0.7,
    ease: "easeInOut"
  }

  return (
    <section id="doctors-carousel" className="relative z-30 py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 섹션 타이틀 */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs font-semibold tracking-[0.2em]" style={{ color: BRAND_COLOR }}>
            의료진 소개
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">클리어 피부과 의료진</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            풍부한 임상 경험과 섬세한 진료로, 당신의 피부 고민을 함께 해결합니다.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* 모바일 레이아웃 */}
          <div className="md:hidden space-y-6">
            {/* 아바타 목록 */}
            <div className="flex items-center justify-between px-1">
              {doctors.map((doc) => (
                <Avatar
                  key={doc.id}
                  doc={doc}
                  active={selected?.id === doc.id}
                  onClick={() => setSelected(doc)}
                />
              ))}
            </div>

            {/* 선택된 의사 정보 */}
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={tweenFast}
                className="rounded-2xl p-6 space-y-6"
                style={{ backgroundColor: BRAND_BG_COLOR }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selected.name} {selected.title}
                  </h3>
                  <p className="text-lg font-medium" style={{ color: BRAND_COLOR }}>
                    {selected.specialty}
                  </p>
                </div>

                {selected.filmography?.education && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">학력</h4>
                    <ul className="space-y-2">
                      {selected.filmography.education.map((edu, index) => (
                        <li key={index} className="text-gray-700">• {edu}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selected.filmography?.experience && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">경력</h4>
                    <ul className="space-y-2">
                      {selected.filmography.experience.map((exp, index) => (
                        <li key={index} className="text-gray-700">• {exp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* 데스크톱 레이아웃 */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              {selected ? (
                <>
                  {/* 돌아가기 버튼 */}
                  <button
                    onClick={() => setSelected(null)}
                    className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>목록으로 돌아가기</span>
                  </button>

                  {/* 상세 정보 */}
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={tweenFast}
                    className="grid grid-cols-2 gap-8 items-center"
                  >
                    {/* 이미지 */}
                    <motion.div
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={tweenSlow}
                      className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg"
                    >
                      <Image
                        src={selected.image}
                        alt={`${selected.name} ${selected.title}`}
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    </motion.div>

                    {/* 정보 */}
                    <motion.div
                      initial={{ x: -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={tweenSlow}
                      className="rounded-2xl p-8 space-y-6"
                      style={{ backgroundColor: BRAND_BG_COLOR }}
                    >
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                          {selected.name} {selected.title}
                        </h3>
                        <p className="text-lg font-medium" style={{ color: BRAND_COLOR }}>
                          {selected.specialty}
                        </p>
                      </div>

                      {selected.filmography?.education && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">학력</h4>
                          <ul className="space-y-2">
                            {selected.filmography.education.map((edu, index) => (
                              <li key={index} className="text-gray-700">• {edu}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selected.filmography?.experience && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">경력</h4>
                          <ul className="space-y-2">
                            {selected.filmography.experience.map((exp, index) => (
                              <li key={index} className="text-gray-700">• {exp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </>
              ) : (
                // 기본 카드 그리드
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={tweenFast}
                  className="grid grid-cols-3 gap-6"
                >
                  {doctors.map((doctor) => (
                    <motion.button
                      key={doctor.id}
                      onClick={() => setSelected(doctor)}
                      className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-200 shadow-lg aspect-[3/4] transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-xl text-left"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Image
                        src={doctor.image}
                        alt={`${doctor.name} ${doctor.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority={doctor.isChief}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-bold mb-1">
                          {doctor.name} {doctor.title}
                        </h3>
                        <p className="text-sm opacity-90">{doctor.specialty}</p>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
