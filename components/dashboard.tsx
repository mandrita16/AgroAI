"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Droplets, Thermometer, FlaskRoundIcon as Flask, Leaf, Sun, CloudRain, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState("soil")

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

      // Advanced card animations with 3D transforms
      tl.from(".dashboard-card", {
        y: 100,
        opacity: 0,
        rotationX: 45,
        transformOrigin: "center bottom",
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        ".dashboard-metric",
        {
          scale: 0.8,
          opacity: 0,
          rotationY: 45,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6",
      )

      // Holographic data visualization
      gsap.to(".data-pulse", {
        scale: 1.2,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      })

      // Neural network animation
      gsap.to(".neural-node", {
        scale: (i) => [1.2, 0.8, 1.5][i % 3],
        opacity: (i) => [0.8, 0.4, 1][i % 3],
        duration: (i) => [2, 3, 2.5][i % 3],
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      })

      // Animated connecting lines with electric effect
      gsap.fromTo(
        ".electric-line",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      )
    },
    { scope: sectionRef },
  )

  const soilMetrics = [
    { name: "pH Level", value: 6.8, icon: Flask, color: "from-amber-400 to-orange-500", max: 10, status: "optimal" },
    { name: "Moisture", value: 72, icon: Droplets, color: "from-blue-400 to-cyan-500", max: 100, status: "good" },
    { name: "Nitrogen", value: 65, icon: Leaf, color: "from-green-400 to-emerald-500", max: 100, status: "moderate" },
    {
      name: "Temperature",
      value: 24,
      icon: Thermometer,
      color: "from-red-400 to-pink-500",
      max: 40,
      status: "perfect",
    },
  ]

  const cropRecommendations = [
    { name: "Quantum Wheat", suitability: 95, confidence: 92, yield: "+47%", icon: "🌾" },
    { name: "Bio-Tomatoes", suitability: 87, confidence: 89, yield: "+32%", icon: "🍅" },
    { name: "Smart Rice", suitability: 78, confidence: 85, yield: "+28%", icon: "🌾" },
    { name: "Nano Corn", suitability: 65, confidence: 80, yield: "+15%", icon: "🌽" },
  ]

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Neural Dashboard
          </h2>
          <p className="text-xl text-emerald-100/80 max-w-3xl mx-auto">
            Real-time quantum soil analysis powered by advanced AI neural networks
          </p>
        </div>

        {/* Advanced Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 backdrop-blur-sm rounded-full p-2 border border-emerald-400/30">
            <div className="flex">
              <Button
                variant={activeTab === "soil" ? "default" : "ghost"}
                className={`relative rounded-full px-8 py-4 text-lg font-semibold transition-all duration-500 ${
                  activeTab === "soil"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
                    : "text-emerald-300 hover:text-white hover:bg-emerald-500/20"
                }`}
                onClick={() => setActiveTab("soil")}
              >
                <Activity className="h-5 w-5 mr-2" />
                Soil Analytics
              </Button>
              <Button
                variant={activeTab === "crop" ? "default" : "ghost"}
                className={`relative rounded-full px-8 py-4 text-lg font-semibold transition-all duration-500 ${
                  activeTab === "crop"
                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/50"
                    : "text-emerald-300 hover:text-white hover:bg-emerald-500/20"
                }`}
                onClick={() => setActiveTab("crop")}
              >
                <Zap className="h-5 w-5 mr-2" />
                AI Recommendations
              </Button>
            </div>
          </div>
        </div>

        {activeTab === "soil" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Soil Health Metrics */}
            <div className="dashboard-card relative bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 backdrop-blur-sm rounded-3xl p-8 border border-emerald-400/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-cyan-400/5 rounded-3xl"></div>

              <h3 className="text-2xl font-bold text-emerald-300 mb-8 flex items-center gap-3">
                <Activity className="h-6 w-6" />
                Quantum Soil Analysis
              </h3>

              <div className="space-y-8">
                {soilMetrics.map((metric, index) => (
                  <div key={index} className="dashboard-metric relative">
                    <div className="flex items-center gap-6 mb-4">
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${metric.color} shadow-lg`}>
                        <metric.icon className="h-6 w-6 text-white" />
                        <div className="data-pulse absolute inset-0 rounded-2xl bg-white/20"></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-lg font-semibold text-emerald-200">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-white">
                              {metric.name === "pH Level"
                                ? metric.value
                                : `${metric.value}${metric.name === "Temperature" ? "°C" : "%"}`}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                metric.status === "optimal"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : metric.status === "perfect"
                                    ? "bg-cyan-500/20 text-cyan-300"
                                    : metric.status === "good"
                                      ? "bg-blue-500/20 text-blue-300"
                                      : "bg-amber-500/20 text-amber-300"
                              }`}
                            >
                              {metric.status}
                            </span>
                          </div>
                        </div>

                        <div className="relative">
                          <Progress
                            value={(metric.value / metric.max) * 100}
                            className="h-3 bg-slate-800/50"
                            indicatorClassName={`bg-gradient-to-r ${metric.color} shadow-lg`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-3 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"></div>
                  <span className="text-emerald-300 font-semibold">Neural Network Status: Active</span>
                </div>
                <Button
                  variant="outline"
                  className="border-emerald-400/50 text-emerald-300 hover:text-white hover:bg-emerald-500/20 rounded-full px-6"
                >
                  Deep Analysis
                </Button>
              </div>
            </div>

            {/* Environmental Factors with Neural Network Visualization */}
            <div className="dashboard-card relative bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-sm rounded-3xl p-8 border border-cyan-400/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-3xl"></div>

              <h3 className="text-2xl font-bold text-cyan-300 mb-8 flex items-center gap-3">
                <Zap className="h-6 w-6" />
                Environmental Matrix
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: Sun,
                    label: "Solar Index",
                    value: "8.2",
                    unit: "hrs/day",
                    color: "from-amber-400 to-orange-500",
                  },
                  {
                    icon: CloudRain,
                    label: "Precipitation",
                    value: "42",
                    unit: "mm/week",
                    color: "from-blue-400 to-cyan-500",
                  },
                  {
                    icon: Thermometer,
                    label: "Thermal Avg",
                    value: "24",
                    unit: "°C",
                    color: "from-red-400 to-pink-500",
                  },
                  { icon: Droplets, label: "Humidity", value: "65", unit: "%", color: "from-cyan-400 to-blue-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="dashboard-metric relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-cyan-400/10"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-sm text-cyan-200 mb-1">{item.label}</div>
                    <div className="text-2xl font-bold text-white">
                      {item.value}
                      <span className="text-sm text-cyan-300 ml-1">{item.unit}</span>
                    </div>
                    <div className="data-pulse absolute inset-0 rounded-2xl bg-cyan-400/5"></div>
                  </div>
                ))}
              </div>

              {/* Neural Network Visualization */}
              <div className="relative h-32 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-2xl p-4 border border-cyan-400/10">
                <div className="text-sm text-cyan-300 mb-2">Neural Activity Pattern</div>
                <svg className="w-full h-full">
                  {/* Neural nodes */}
                  {[...Array(8)].map((_, i) => (
                    <circle
                      key={i}
                      className="neural-node"
                      cx={`${(i + 1) * 12}%`}
                      cy="50%"
                      r="4"
                      fill="url(#neuralGradient)"
                    />
                  ))}

                  {/* Connecting lines */}
                  {[...Array(7)].map((_, i) => (
                    <line
                      key={i}
                      className="electric-line"
                      x1={`${(i + 1) * 12 + 2}%`}
                      y1="50%"
                      x2={`${(i + 2) * 12 - 2}%`}
                      y2="50%"
                      stroke="url(#electricGradient)"
                      strokeWidth="2"
                    />
                  ))}

                  <defs>
                    <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="dashboard-card relative bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 backdrop-blur-sm rounded-3xl p-8 border border-emerald-400/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-cyan-400/5 rounded-3xl"></div>

            <h3 className="text-2xl font-bold text-emerald-300 mb-8 flex items-center gap-3">
              <Zap className="h-6 w-6" />
              AI-Powered Crop Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cropRecommendations.map((crop, index) => (
                <div
                  key={index}
                  className="dashboard-metric group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center border-4 border-slate-900 shadow-lg">
                    <span className="text-lg font-bold text-white">{index + 1}</span>
                  </div>

                  <div className="text-center mt-4">
                    <div className="text-4xl mb-3">{crop.icon}</div>
                    <h4 className="text-lg font-bold text-emerald-200 mb-4">{crop.name}</h4>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-emerald-300">AI Suitability</span>
                          <span className="font-bold text-white">{crop.suitability}%</span>
                        </div>
                        <div className="relative">
                          <Progress
                            value={crop.suitability}
                            className="h-2 bg-slate-700"
                            indicatorClassName="bg-gradient-to-r from-emerald-400 to-cyan-400"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-2 rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-cyan-300">Confidence</span>
                          <span className="font-bold text-white">{crop.confidence}%</span>
                        </div>
                        <Progress
                          value={crop.confidence}
                          className="h-2 bg-slate-700"
                          indicatorClassName="bg-gradient-to-r from-cyan-400 to-blue-400"
                        />
                      </div>

                      <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-lg p-3 border border-emerald-400/20">
                        <div className="text-xs text-emerald-300 mb-1">Projected Yield</div>
                        <div className="text-lg font-bold text-white">{crop.yield}</div>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="mt-6 w-full text-emerald-300 hover:text-white hover:bg-emerald-500/20 border border-emerald-400/30 hover:border-emerald-400/50 rounded-xl transition-all duration-300"
                    >
                      Neural Analysis
                    </Button>
                  </div>

                  <div className="data-pulse absolute inset-0 rounded-2xl bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute -top-32 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl animate-pulse"></div>
      <div
        className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  )
}
