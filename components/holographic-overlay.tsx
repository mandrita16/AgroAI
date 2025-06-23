"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function HolographicOverlay() {
  const overlayRef = useRef(null)

  useGSAP(
    () => {
      if (typeof window === "undefined") return

      // Simplified holographic effects
      gsap.to(".holo-line", {
        opacity: (i) => [0.1, 0.3][i % 2],
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })

      // Simplified scanning effect
      gsap.to(".scan-line", {
        y: "100vh",
        duration: 6,
        repeat: -1,
        ease: "none",
      })
    },
    { scope: overlayRef },
  )

  return (
    <div ref={overlayRef} className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Simplified Holographic Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_98%,rgba(16,185,129,0.2)_100%),linear-gradient(0deg,transparent_98%,rgba(6,182,212,0.2)_100%)] bg-[size:100px_100px]"></div>
      </div>

      {/* Simplified Scanning Line */}
      <div className="scan-line absolute -top-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

      {/* Reduced Holographic Lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="holo-line absolute bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent h-px"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 150 + 50}px`,
            transform: `rotate(${Math.random() * 180}deg)`,
          }}
        ></div>
      ))}

      {/* Simplified Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-emerald-400/30"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-emerald-400/30"></div>
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-emerald-400/30"></div>
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-emerald-400/30"></div>
    </div>
  )
}
