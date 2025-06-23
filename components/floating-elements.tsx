"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Droplet, Sun, CloudRain, Leaf, Zap, Brain } from "lucide-react"

interface FloatingElementsProps {
  isHighPerformance: boolean
}

export default function FloatingElements({ isHighPerformance }: FloatingElementsProps) {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (typeof window === "undefined") return

      // Simplified animations based on performance
      const animationDuration = isHighPerformance ? 4 : 6
      const animationIntensity = isHighPerformance ? 20 : 10

      gsap.to(".floating-element", {
        y: (i) => [animationIntensity, -animationIntensity][i % 2],
        x: (i) => [animationIntensity * 0.5, -animationIntensity * 0.5][i % 2],
        rotation: (i) => [5, -5][i % 2],
        duration: animationDuration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })

      // Simplified tech elements animation
      if (isHighPerformance) {
        gsap.to(".tech-element", {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none",
          stagger: 2,
        })
      }
    },
    { scope: containerRef },
  )

  // Reduced number of elements for performance
  const floatingElements = [
    { icon: Leaf, color: "text-emerald-400", top: "20%", left: "10%" },
    { icon: Droplet, color: "text-cyan-400", top: "30%", right: "15%" },
    { icon: Sun, color: "text-amber-400", top: "70%", left: "8%" },
    { icon: CloudRain, color: "text-blue-400", top: "80%", right: "12%" },
  ]

  const techElements = isHighPerformance
    ? [
        { icon: Zap, color: "text-yellow-400", top: "25%", right: "25%" },
        { icon: Brain, color: "text-purple-400", top: "60%", left: "5%" },
      ]
    : []

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Simplified Floating Elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className="floating-element absolute opacity-30"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
        >
          <element.icon className={`h-12 w-12 ${element.color}`} />
        </div>
      ))}

      {/* Tech Elements (only for high performance) */}
      {techElements.map((element, index) => (
        <div
          key={`tech-${index}`}
          className="tech-element absolute opacity-20"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
          }}
        >
          <element.icon className={`h-10 w-10 ${element.color}`} />
        </div>
      ))}

      {/* Simplified Background Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <path
            fill="#10b981"
            fillOpacity="0.3"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
