import { BRAND_COLOR, BRAND_BG_COLOR } from "@/lib/colors"

export default function DoctorInfo() {
  return (
    <div className="p-8 rounded-2xl h-full" style={{ backgroundColor: BRAND_BG_COLOR }}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            피부과 전문의가 직접 진료합니다
          </h3>
          <p className="text-gray-600 leading-relaxed">
            클리어 피부과의 모든 의료진은 피부과 전문의 자격을 보유하고 있으며, 
            수년간의 임상 경험을 통해 축적된 전문성을 바탕으로 정확한 진단과 
            효과적인 치료를 제공합니다.
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}/>
              대한피부과학회 정회원
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}/>
              레이저 시술 전문가 과정 이수
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}/>
              미용 피부과 전문 과정 수료
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            환자 중심의 맞춤 치료
          </h3>
          <p className="text-gray-600 leading-relaxed">
            각 환자의 피부 상태와 생활 패턴을 고려한 맞춤형 치료 계획을 수립합니다. 
            최신 의료 장비와 검증된 치료법으로 안전하고 효과적인 치료를 약속드립니다.
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}/>
              1:1 맞춤 피부 분석 시스템
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}/>
              첨단 레이저 장비 보유
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLOR }}/>
              정기적인 치료 경과 관리
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
