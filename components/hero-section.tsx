"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ChevronDown, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  isHighPerformance: boolean
}

export default function HeroSection({ isHighPerformance }: HeroSectionProps) {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(
    () => {
      if (typeof window === "undefined") return

      const tl = gsap.timeline()

      // Simplified entrance animation
      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          taglineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ctaRef.current.children,
          {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        )

      // Conditional floating animation
      if (isHighPerformance) {
        gsap.to(".floating-icon", {
          y: (i) => [10, -10][i % 2],
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.5,
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Simplified Floating Tech Icons */}
      {isHighPerformance && (
        <div className="absolute inset-0 pointer-events-none">
          <Zap className="floating-icon absolute top-1/4 left-1/4 h-6 w-6 text-emerald-400/20" />
          <Brain className="floating-icon absolute top-1/3 right-1/4 h-8 w-8 text-cyan-400/20" />
        </div>
      )}

      <div className="max-w-6xl mx-auto text-center z-10">
        <h1
          ref={headingRef}
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-8 leading-tight"
        >
          Your Soil. Your Crops.
          <br />
          <span className="text-4xl md:text-6xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your AI.
          </span>
        </h1>

        <p ref={taglineRef} className="text-lg md:text-2xl text-emerald-100/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          <span className="text-cyan-300">Let AI Cultivate Your Future</span> with intelligent soil analysis and
          <span className="text-emerald-300"> neural crop recommendations</span>.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            size="lg"
            className="group relative bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white rounded-full px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="h-5 w-5" />
              Analyze My Soil
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group relative border-2 border-emerald-400/50 text-emerald-300 hover:text-white rounded-full px-10 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-transparent hover:bg-emerald-500/20"
          >
            <span className="relative z-10 flex items-center gap-3">
              <Brain className="h-5 w-5" />
              AI Recommendations
            </span>
          </Button>
        </div>

        {/* Simplified Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Soil Samples", value: "2.4M+", icon: "🌱" },
            { label: "Yield Increase", value: "47%", icon: "📈" },
            { label: "AI Accuracy", value: "99.2%", icon: "🎯" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-emerald-900/20 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4 hover:border-emerald-400/40 transition-all duration-300"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-emerald-300 mb-1">{stat.value}</div>
              <div className="text-emerald-100/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="text-emerald-300 text-sm">Scroll Down</div>
          <ChevronDown className="h-6 w-6 text-emerald-400 animate-bounce" />
        </div>
      </div>

      {/* Simplified Background Elements */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"></div>
    </section>
  )
}
