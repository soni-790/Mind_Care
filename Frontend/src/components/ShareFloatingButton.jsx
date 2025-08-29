"use client"
import { useState } from "react"
import { useWebShare } from "../hooks/useWebShare"

export default function ShareFloatingButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { canShare, shareApp, shareError } = useWebShare()

  if (!canShare) return null

  const handleShare = async () => {
    const success = await shareApp()
    if (success) {
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleShare}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
        title="Share MindCare"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
      </button>
      {shareError && (
        <div className="absolute bottom-full right-0 mb-2 bg-red-100 text-red-700 p-2 rounded text-sm whitespace-nowrap">
          {shareError}
        </div>
      )}
    </div>
  )
}
