export default function Footer() {
  return (
    <footer className="relative bg-white text-gray-600 z-20 border-t border-gray-200">
      {/* 알림 배너 */}
      <div className="w-full bg-gray-100 text-gray-600 border-b border-gray-200">
        <div className="px-4 md:px-8 lg:px-20 py-4">
          <p className="text-sm text-center">⚠️ 실제 병원사이트가 아닌 개인 포트폴리오 사이트입니다.</p>
        </div>
      </div>

      {/* 메인 푸터 컨텐츠 */}
      <div className="px-4 md:px-8 lg:px-20 py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="text-gray-900 text-xl font-bold mb-4">클리어 피부과</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              건강하고 아름다운 피부를 위한 전문 클리닉으로 최고의 의료 서비스를 제공합니다.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-4">진료 안내</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>여드름 치료</li>
              <li>안티에이징</li>
              <li>색소 치료</li>
              <li>모공 관리</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-4">병원 정보</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>서울시 강남구 테헤란로 123</li>
              <li>TEL: 02-1234-5678</li>
              <li>평일: 09:00-18:00</li>
              <li>토요일: 09:00-13:00</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 카피라이트 */}
      <div className="border-t border-gray-200">
        <div className="px-4 md:px-8 lg:px-20 py-8">
          <p className="text-sm text-center text-gray-500">&copy; 2025 클리어 피부과. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
