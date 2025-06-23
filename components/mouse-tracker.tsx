"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

interface MouseTrackerProps {
  mousePosition: { x: number; y: number }
}

export default function MouseTracker({ mousePosition }: MouseTrackerProps) {
  const cursorRef = useRef(null)
  const trailRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    if (typeof window === "undefined") return

    // Cursor glow effect
    gsap.to(cursorRef.current, {
      x: mousePosition.x * window.innerWidth * 0.05,
      y: mousePosition.y * window.innerHeight * 0.05,
      duration: 0.3,
      ease: "power2.out",
    })

    // Trail effect
    trailRef.current.forEach((trail, index) => {
      if (trail) {
        gsap.to(trail, {
          x: mousePosition.x * window.innerWidth * 0.03 * (1 - index * 0.1),
          y: mousePosition.y * window.innerHeight * 0.03 * (1 - index * 0.1),
          duration: 0.5 + index * 0.1,
          ease: "power2.out",
        })
      }
    })
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Main cursor glow */}
      <div
        ref={cursorRef}
        className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-radial from-emerald-400/20 via-cyan-400/10 to-transparent rounded-full blur-xl"
      ></div>

      {/* Trail elements */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el
          }}
          className="absolute top-1/2 left-1/2 rounded-full bg-gradient-radial from-emerald-400/10 to-transparent blur-lg"
          style={{
            width: `${48 - i * 8}px`,
            height: `${48 - i * 8}px`,
            opacity: 1 - i * 0.3,
          }}
        ></div>
      ))}
    </div>
  )
}
