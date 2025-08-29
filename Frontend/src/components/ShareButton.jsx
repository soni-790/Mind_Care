"use client"
import { useWebShare } from "../hooks/useWebShare"

export default function ShareButton({ data, children, className = "" }) {
  const { canShare, isSharing, share, shareError } = useWebShare()

  if (!canShare) return null

  const handleShare = async () => {
    await share(data)
  }

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
      >
        {isSharing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Sharing...
          </>
        ) : (
          <>
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
              />
            </svg>
            {children || "Share"}
          </>
        )}
      </button>
      {shareError && (
        <div className="absolute top-full left-0 mt-1 bg-red-100 text-red-700 p-2 rounded text-sm whitespace-nowrap z-10">
          {shareError}
        </div>
      )}
    </div>
  )
}
