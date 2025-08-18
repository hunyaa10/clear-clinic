import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/common/header"
import { ModalProvider } from "@/components/providers/ModalProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clear Clinic",
  description: "피부 본연의 건강과 아름다움을 찾아, 일상의 자신감을 되돌려 드립니다.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} overflow-x-hidden w-full`}>
        <ModalProvider>
          <div className="relative w-full overflow-hidden">
            <Header />
            <main className="relative w-full">
              {children}
            </main>
          </div>
        </ModalProvider>
      </body>
    </html>
  )
}
