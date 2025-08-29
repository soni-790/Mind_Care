"use client"

import { useState, useEffect } from "react"

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    
    if (typeof window !== "undefined") {
      setIsInstalled(window.matchMedia("(display-mode: standalone)").matches)
    }

   
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }


    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.addEventListener("appinstalled", handleAppInstalled)

      
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          setUpdateAvailable(true)
        })
      }

      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
        window.removeEventListener("appinstalled", handleAppInstalled)
      }
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return false

    try {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setDeferredPrompt(null)
        setIsInstallable(false)
        return true
      }
      return false
    } catch (error) {
      console.error("Error installing app:", error)
      return false
    }
  }

  const reloadApp = () => {
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  return {
    isInstallable,
    isInstalled,
    updateAvailable,
    installApp,
    reloadApp,
  }
}
