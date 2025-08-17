"use client"

import { useState } from 'react'
import { BRAND_COLOR } from '@/lib/colors'

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 로그인 로직 구현
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">관리자 로그인</h1>
        
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              이메일
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#B4CFE4] focus:border-[#B4CFE4] transition-colors"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className='mb-8'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#B4CFE4] focus:border-[#B4CFE4] transition-colors"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: BRAND_COLOR }}
            className="w-full text-gray-700 py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-[#B4CFE4] focus:ring-offset-2 transition-colors font-medium shadow-sm"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  )
}