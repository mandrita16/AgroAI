"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      tl.from(".testimonial-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      })

      // Growing plant animation
      gsap.to(".growing-plant", {
        height: "100%",
        duration: 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      })
    },
    { scope: sectionRef },
  )

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Organic Farmer",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The AI recommendations increased my crop yield by 32% while using less water and fertilizer. Game-changing technology!",
    },
    {
      name: "Michael Chen",
      role: "Agricultural Scientist",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The soil analysis is incredibly accurate. I've compared it with lab results and the AI predictions were spot on every time.",
    },
    {
      name: "Elena Rodriguez",
      role: "Small-scale Farmer",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "As someone new to farming, this system guided me to make the right decisions for my specific soil conditions. My first harvest was a success!",
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3 text-center">Success Stories</h2>
        <p className="text-lg text-emerald-700/70 mb-16 text-center max-w-2xl mx-auto">
          See how our AI-powered recommendations have transformed farming practices
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100 flex flex-col"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-md">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <Quote className="h-8 w-8 text-emerald-300 mt-8 mb-4 mx-auto" />

              <p className="text-emerald-700 text-center mb-6 flex-1">"{testimonial.quote}"</p>

              <div className="text-center">
                <h4 className="font-semibold text-emerald-800">{testimonial.name}</h4>
                <p className="text-sm text-emerald-600">{testimonial.role}</p>
              </div>

              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 bg-emerald-100 overflow-hidden"
                style={{ height: "60px" }}
              >
                <div
                  className="growing-plant w-full bg-gradient-to-t from-emerald-500 to-emerald-300"
                  style={{ height: "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-100/30 blur-3xl -z-10"></div>
    </section>
  )
}
