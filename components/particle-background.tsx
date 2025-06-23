"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  isHighPerformance: boolean
}

export default function ParticleBackground({ isHighPerformance }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Performance-based settings
    const particleCount = isHighPerformance ? 60 : 25
    const connectionDistance = isHighPerformance ? 100 : 60
    const animationSpeed = isHighPerformance ? 1 : 0.5

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Optimized Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * animationSpeed
        this.speedY = (Math.random() - 0.5) * animationSpeed
        this.opacity = Math.random() * 0.5 + 0.2

        const colors = ["rgba(16, 185, 129, 0.6)", "rgba(6, 182, 212, 0.6)", "rgba(59, 130, 246, 0.4)"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.restore()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Optimized animation loop
    let lastTime = 0
    const targetFPS = isHighPerformance ? 60 : 30
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        // Clear with fade effect for performance
        ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        particles.forEach((particle) => {
          particle.update()
          particle.draw()
        })

        // Simplified connections
        if (isHighPerformance) {
          connectParticles()
        }

        lastTime = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Optimized particle connections
    const connectParticles = () => {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.strokeStyle = "rgba(16, 185, 129, 0.3)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHighPerformance])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
