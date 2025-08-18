"use client"

import { useEffect, useState } from "react"
import { Transition } from "framer-motion"
import { BRAND_COLOR } from "@/lib/colors"
import { Doctor } from "./doctors/types"
import DoctorCards from "./doctors/DoctorCards"
import DoctorInfo from "./doctors/DoctorInfo"

export default function DoctorsSection() {
  const [doctorsData, setDoctorsData] = useState<any>([])
  const [selected, setSelected] = useState<Doctor | null>(null)

  useEffect(() => {
    fetch('/data/doctors.json')
      .then(res => res.json())
      .then((data: any) => {
        setDoctorsData(data)
        if (window.innerWidth < 768) {
          const chief = data.doctors.find((doc: Doctor) => doc.isChief) || data.doctors[0]
          setSelected(chief)
        }
      })
      .catch(err => console.error('의사 데이터 로딩 실패:', err))
  }, [])

  const tweenFast: Transition = {
    duration: 0.2,
    ease: "easeOut"
  }

  const tweenSlow: Transition = {
    duration: 0.7,
    ease: "easeInOut"
  }

  const doctors = doctorsData?.doctors || []

  return (
    <section id="doctors-carousel" className="relative z-20 bg-white h-auto xl:min-h-screen">
      <div className="px-4 md:px-8 lg:px-20 py-16 h-full flex flex-col">
        {/* 섹션 타이틀 */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-sm 2xl:text-lg tracking-[0.18em] font-semibold" style={{ color: BRAND_COLOR }}>
            {doctorsData?.title?.label}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {doctorsData?.title?.main}
          </h2>
          <p className="text-md lg:text-lg 2xl:text-xl text-gray-600 max-w-2xl mx-auto">
            {doctorsData?.subtitle}
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 xl:col-span-2 gap-8 min-h-[55vh]">
          <div className="xl:col-span-2">
            <DoctorCards 
              doctors={doctors}
              selected={selected}
              setSelected={setSelected}
              tweenFast={tweenFast}
              tweenSlow={tweenSlow}
            />
          </div>
          <div className="xl:col-span-1">
            <DoctorInfo />
          </div>
        </div>
      </div>
    </section>
  )
}