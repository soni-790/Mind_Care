"use client"

import { useState, useEffect } from "react"
import { usePWA } from "../hooks/usePWA"

export default function PWAPrompt() {
  const { isInstallable, installApp, updateAvailable, reloadApp } = usePWA()
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)

  useEffect(() => {
    if (isInstallable) {
     
      const timer = setTimeout(() => {
        setShowInstallPrompt(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInstallable])

  useEffect(() => {
    if (updateAvailable) {
      setShowUpdatePrompt(true)
    }
  }, [updateAvailable])

  const handleInstall = async () => {
    const success = await installApp()
    if (success) {
      setShowInstallPrompt(false)
    }
  }

  const handleUpdate = () => {
    reloadApp()
  }

  if (showUpdatePrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Update Available</h3>
            <p className="text-sm text-blue-100">A new version of MindCare is available.</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleUpdate}
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50"
            >
              Update
            </button>
            <button onClick={() => setShowUpdatePrompt(false)} className="text-blue-100 hover:text-white">
              ✕
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showInstallPrompt) {
    return (
      <div className="fixed bottom-4 left-4 right-4 bg-white border border-gray-200 p-4 rounded-lg shadow-lg z-50 md:left-auto md:right-4 md:max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Install MindCare</h3>
            <p className="text-sm text-gray-600">Install our app for a better experience!</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleInstall}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700"
            >
              Install
            </button>
            <button onClick={() => setShowInstallPrompt(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
