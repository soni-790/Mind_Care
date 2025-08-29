"use client"
import { useState, useCallback } from "react"

export function useWebShare() {
  const [isSharing, setIsSharing] = useState(false)
  const [shareError, setShareError] = useState(null)

  const canShare = typeof navigator !== "undefined" && navigator.share

  const share = useCallback(
    async (shareData) => {
      if (!canShare) {
        setShareError("Web Share API is not supported in this browser")
        return false
      }

      setIsSharing(true)
      setShareError(null)

      try {
        await navigator.share(shareData)
        setIsSharing(false)
        return true
      } catch (error) {
        setIsSharing(false)
        if (error.name !== "AbortError") {
          setShareError(error.message)
        }
        return false
      }
    },
    [canShare],
  )

  const shareAssessment = useCallback(
    (assessment) => {
      const shareData = {
        title: "My Mental Health Assessment Results",
        text: `I just completed a mental health assessment on MindCare. Score: ${assessment.score}/27`,
        url: window.location.origin,
      }
      return share(shareData)
    },
    [share],
  )

  const shareResource = useCallback(
    (resource) => {
      const shareData = {
        title: `Mental Health Resource: ${resource.title}`,
        text: resource.description,
        url: window.location.origin + "/resources",
      }
      return share(shareData)
    },
    [share],
  )

  const shareApp = useCallback(() => {
    const shareData = {
      title: "MindCare - Mental Wellness Platform",
      text: "Check out this amazing mental health platform that helps track and improve mental wellness!",
      url: window.location.origin,
    }
    return share(shareData)
  }, [share])

  return {
    canShare,
    isSharing,
    shareError,
    share,
    shareAssessment,
    shareResource,
    shareApp,
  }
}
