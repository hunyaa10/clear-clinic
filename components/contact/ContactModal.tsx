"use client"

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { ko } from 'date-fns/locale'
import { BRAND_COLOR } from '@/lib/colors'
import ContactButton from '@/components/ui/buttons/contact-button'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 날짜 포맷팅
    const formattedDate = date ? new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(date) : ''

    // 예약 정보 콘솔 출력
    console.log('📅 상담 예약 정보:', {
      이름: name,
      연락처: phone,
      예약일: formattedDate,
      시간: time
    })

    alert('상담 예약이 완료되었습니다.')

    onClose()
    setName('')
    setPhone('')
    setDate(null)
    setTime('')
  }

  if (!isOpen) return null

  // 30분 단위로 시간 옵션 생성 (9:00 ~ 17:30)
  const timeOptions = []
  for (let hour = 9; hour <= 17; hour++) {
    timeOptions.push(`${hour}:00`)
    if (hour !== 17) timeOptions.push(`${hour}:30`)
  }

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">상담 예약</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              이름
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ "--tw-ring-color": BRAND_COLOR } as any}
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              휴대폰 번호
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ "--tw-ring-color": BRAND_COLOR } as any}
              placeholder="010-0000-0000"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                희망 상담 날짜
              </label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                locale={ko}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                placeholderText="날짜 선택"
                required
              />
            </div>

            <div className="flex-1 mb-6">
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                희망 상담 시간
              </label>
              <select
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ "--tw-ring-color": BRAND_COLOR } as any}
                required
              >
                <option value="">시간 선택</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

            <ContactButton
              type="submit"
              variant="primary"
              className="w-full"
            >
              상담 예약하기
            </ContactButton>
        </form>
      </div>
    </div>
  )
}
