"use client"

import { motion, AnimatePresence, Transition } from "framer-motion"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"
import { Doctor } from "./types"
import { Avatar } from "./Avatar"

interface DoctorCardsProps {
  doctors: Doctor[]
  selected: Doctor | null
  setSelected: (doctor: Doctor | null) => void
  tweenFast: Transition
  tweenSlow: Transition
}

export default function DoctorCards({ 
  doctors, 
  selected, 
  setSelected,
  tweenFast,
  tweenSlow 
}: DoctorCardsProps) {
  return (
    <div className="lg:col-span-2 h-full">
      {/* 모바일 레이아웃 */}
      <div className="md:hidden space-y-6">
        <div className="flex justify-between px-1">
          {doctors.map((doc) => (
            <Avatar
              key={doc.id}
              doc={doc}
              active={selected?.id === doc.id}
              onClick={() => setSelected(doc)}
            />
          ))}
        </div>

        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={tweenFast}
            className="rounded-2xl p-6 space-y-6 border-l-2 border-gray-200"
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
      <div className="hidden md:block h-full min-h-[25vh]">
        <AnimatePresence mode="wait">
          {selected ? (
            <>
              <motion.div
                key="detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={tweenFast}
                className="grid grid-cols-2 gap-8 h-full"
              >
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={tweenSlow}
                  className="relative rounded-2xl overflow-hidden bg-gray-200 shadow-lg h-full"
                >
                  <Image
                    src={selected.image}
                    alt={`${selected.name} ${selected.title}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={tweenSlow}
                  className="rounded-2xl p-8 space-y-6 relative border-l-2 border-gray-200"
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

                  <div className="flex justify-end absolute top-0 bottom-auto right-6 xl:bottom-6 xl:top-auto">
                    <button
                      onClick={() => setSelected(null)}
                      className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-all hover:bg-white"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>목록으로 돌아가기</span>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tweenFast}
              className="grid grid-cols-3 gap-6 h-full"
            >
              {doctors.map((doctor) => (
                <motion.button
                  key={doctor.id}
                  onClick={() => setSelected(doctor)}
                  className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gray-200 shadow-lg h-full transition-all duration-300 ease-out transform-gpu hover:-translate-y-2 hover:shadow-xl text-left"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name} ${doctor.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      priority={doctor.isChief}
                    />
                  </div>
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
  )
}
