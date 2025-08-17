export default function Footer() {
  return (
    <footer className="relative bg-white text-gray-600 py-12 z-20 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gray-900 text-xl font-bold mb-4">클리어 피부과</h3>
            <p className="text-sm leading-relaxed">
              건강하고 아름다운 피부를 위한 전문 클리닉으로 최고의 의료 서비스를 제공합니다.
            </p>
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-4">진료 안내</h4>
            <ul className="space-y-2 text-sm">
              <li>여드름 치료</li>
              <li>안티에이징</li>
              <li>색소 치료</li>
              <li>모공 관리</li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 font-medium mb-4">병원 정보</h4>
            <ul className="space-y-2 text-sm">
              <li>서울시 강남구 테헤란로 123</li>
              <li>TEL: 02-1234-5678</li>
              <li>평일: 09:00-18:00</li>
              <li>토요일: 09:00-13:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 클리어 피부과. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
