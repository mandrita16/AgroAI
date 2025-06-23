"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import HeroSection from "@/components/hero-section"
import MapSelector from "@/components/map-selector"
import Dashboard from "@/components/dashboard"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import FloatingElements from "@/components/floating-elements"
import ParticleBackground from "@/components/particle-background"
import HolographicOverlay from "@/components/holographic-overlay"
import MouseTracker from "@/components/mouse-tracker"
import ThreeDBackground from "@/components/three-d-background"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHighPerformance, setIsHighPerformance] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef(null)
  const mouseThrottleRef = useRef<NodeJS.Timeout>()

  // Performance detection
  useEffect(() => {
    const checkPerformance = () => {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        const isLowEnd =
          typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4

        setIsHighPerformance(!isMobile && !isLowEnd && !!gl)
      } catch (error) {
        console.warn("Performance check failed, using low performance mode")
        setIsHighPerformance(false)
      }
      setIsLoaded(true)
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(checkPerformance, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseThrottleRef.current) clearTimeout(mouseThrottleRef.current)

      mouseThrottleRef.current = setTimeout(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        })
      }, 16) // ~60fps throttling
    }

    if (isHighPerformance && typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove)
      }
      if (mouseThrottleRef.current) clearTimeout(mouseThrottleRef.current)
    }
  }, [isHighPerformance])

  useGSAP(() => {
    if (typeof window === "undefined") return

    gsap.registerPlugin(ScrollTrigger)

    // Optimized scroll progress tracking
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    // Simplified section animations
    const sections = gsap.utils.toArray(".section")
    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        toggleClass: { targets: section, className: "active" },
        onEnter: () => setActiveSection(i),
        onEnterBack: () => setActiveSection(i),
      })
    })

    // Simplified parallax only for high-performance devices
    if (isHighPerformance) {
      gsap.to(".parallax-bg", {
        y: (i, el) => -ScrollTrigger.maxScroll(window) * Number.parseFloat(el.dataset.speed || "0.3"),
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          invalidateOnRefresh: true,
          scrub: 1,
        },
      })
    }
  }, [isHighPerformance])

  const setActiveSection = (index: number) => {
    const dots = document.querySelectorAll(".nav-dot")
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll(".section")
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle location selection from map
  const handleLocationSelect = (lat: number, lng: number, state: string) => {
    console.log(`Location selected: ${state} at ${lat}, ${lng}`)
    // You can handle the location data here
    // For example, store it in state or send to an API
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-emerald-400 text-xl animate-pulse">Loading Agricultural AI...</div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-cyan-900/20">
      {/* Conditional rendering based on performance */}
      {isHighPerformance && <ThreeDBackground mousePosition={mousePosition} />}
      <ParticleBackground isHighPerformance={isHighPerformance} />
      {isHighPerformance && <HolographicOverlay />}
      <FloatingElements isHighPerformance={isHighPerformance} />
      {isHighPerformance && <MouseTracker mousePosition={mousePosition} />}

      {/* Simplified Navigation Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            className="nav-dot w-3 h-3 rounded-full bg-emerald-400/60 hover:bg-emerald-400 transition-all duration-300 hover:scale-125"
            onClick={() => scrollToSection(i)}
          />
        ))}
      </div>

      {/* Simplified Progress Indicator */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 z-50 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <main ref={containerRef} className="relative z-10">
        <HeroSection isHighPerformance={isHighPerformance} />
        <MapSelector onLocationSelect={handleLocationSelect} />
        <Dashboard />
        <Testimonials />
        <Footer />
      </main>
    </div>
  )
}
