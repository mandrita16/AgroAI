"use client"

import { useRef, useEffect } from "react"

interface ThreeDBackgroundProps {
  mousePosition: { x: number; y: number }
}

export default function ThreeDBackground({ mousePosition }: ThreeDBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if Three.js is available
    let THREE: any
    try {
      THREE = require("three")
    } catch (error) {
      console.warn("Three.js not available, skipping 3D background")
      return
    }

    if (!mountRef.current) return

    // Optimized scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Disable for performance
      powerPreference: "high-performance",
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Reduced number of geometries for performance
    const geometries = [new THREE.TetrahedronGeometry(1), new THREE.OctahedronGeometry(1)]

    const materials = [
      new THREE.MeshBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.4,
        wireframe: true,
      }),
    ]

    const meshes: any[] = []

    // Reduced number of meshes
    for (let i = 0; i < 6; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)

      mesh.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20)

      const scale = Math.random() * 1.5 + 0.5
      mesh.scale.set(scale, scale, scale)

      scene.add(mesh)
      meshes.push(mesh)
    }

    // Simplified lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    camera.position.z = 15

    // Optimized animation loop
    let lastTime = 0
    const targetFPS = 30 // Lower FPS for 3D scene
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        // Simplified mesh rotation
        meshes.forEach((mesh) => {
          mesh.rotation.x += 0.003
          mesh.rotation.y += 0.003
        })

        // Simplified camera movement
        camera.position.x += (mousePosition.x * 2 - camera.position.x) * 0.02
        camera.position.y += (mousePosition.y * 2 - camera.position.y) * 0.02
        camera.lookAt(scene.position)

        renderer.render(scene, camera)
        lastTime = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()

      // Clean up geometries and materials
      meshes.forEach((mesh) => {
        mesh.geometry.dispose()
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material: any) => material.dispose())
        } else {
          mesh.material.dispose()
        }
      })
    }
  }, [mousePosition])

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
}
