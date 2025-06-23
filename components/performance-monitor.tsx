"use client"

import { useEffect, useState } from "react"

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const [showMonitor, setShowMonitor] = useState(false)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Show monitor in development or when performance is low
    if (process.env.NODE_ENV === "development" || fps < 30) {
      setShowMonitor(true)
      measureFPS()
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [fps])

  if (!showMonitor) return null

  return (
    <div className="fixed top-4 left-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono">
      FPS: {fps}
      {fps < 30 && <span className="text-red-400 ml-2">⚠️ Low Performance</span>}
    </div>
  )
}
