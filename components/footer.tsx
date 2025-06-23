"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Globe, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      // Rotate the globe slowly
      gsap.to(".globe-icon", {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      })

      // Twinkle stars
      gsap.to(".star", {
        opacity: (i) => [0.2, 0.5, 0.8][i % 3],
        scale: (i) => [0.8, 1, 1.2][i % 3],
        duration: (i) => [1.5, 2, 2.5][i % 3],
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-[50vh] flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-emerald-50 to-emerald-100"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-white globe-icon" />
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="star absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  ></div>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-emerald-800">AgroAI</h3>
            </div>

            <p className="text-emerald-700 mb-8 max-w-md">
              Revolutionizing agriculture with AI-powered soil analysis and crop recommendations for sustainable farming
              practices.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700">contact@agroai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-6 mt-6">
                <a href="#" className="text-emerald-600 hover:text-emerald-800 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-600 hover:text-emerald-800 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-600 hover:text-emerald-800 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">Stay Updated</h3>
            <p className="text-emerald-700 mb-6">
              Subscribe to our newsletter for the latest agricultural insights and AI advancements.
            </p>

            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Your email address"
                className="rounded-full border-emerald-200 focus-visible:ring-emerald-500"
              />
              <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600 whitespace-nowrap">Subscribe</Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              <p>We respect your privacy and will never share your information.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-emerald-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-emerald-600">© 2025 AgroAI. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-emerald-600 hover:text-emerald-800 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
