"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MapPin, Search, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MapSelectorProps {
  onLocationSelect?: (lat: number, lng: number, state: string) => void
}

export default function MapSelector({ onLocationSelect }: MapSelectorProps) {
  const sectionRef = useRef(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const magnifyingGlassRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    state: string
  } | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true
    let leaflet: any

    const initializeMap = async () => {
      try {
        // Dynamically import Leaflet
        const L = await import("leaflet")
        leaflet = L

        // Import Leaflet CSS
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          link.crossOrigin = ""
          document.head.appendChild(link)
        }

        if (!isMounted || !mapRef.current) return

        // Create map centered on India
        const newMap = L.map(mapRef.current).setView([22.57, 78.96], 5)

        // Add OpenStreetMap tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(newMap)

        // Add click event listener
        newMap.on("click", (e: any) => {
          if (isMounted) {
            handleMapClick(e.latlng, newMap, L)
          }
        })

        if (!isMounted) return

        setMap(newMap)
        setIsMapLoaded(true)
        setMapError(null)
      } catch (error) {
        console.error("Failed to initialize map:", error)
        if (isMounted) {
          setMapError("Failed to load map. Please refresh the page.")
          setIsMapLoaded(false)
        }
      }
    }

    initializeMap()

    return () => {
      isMounted = false
      if (map) {
        map.remove()
      }
    }
  }, [])

  // Handle map click
  const handleMapClick = async (latlng: any, mapInstance: any, L: any) => {
    const { lat, lng } = latlng

    // Remove existing marker
    if (marker) {
      mapInstance.removeLayer(marker)
    }

    // Create new marker
    const newMarker = L.circleMarker([lat, lng], {
      radius: 8,
      fillColor: "#10b981",
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 1,
    }).addTo(mapInstance)

    setMarker(newMarker)

    // Reverse geocode to get state (using Nominatim)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=8&addressdetails=1`,
        { headers: { "Accept-Language": "en" } },
      )
      const data = await response.json()

      let state = "Unknown State"
      if (data && data.address) {
        state = data.address.state || data.address.county || "Unknown State"
      }

      const locationData = { lat, lng, state }
      setSelectedLocation(locationData)

      // Call parent callback
      if (onLocationSelect) {
        onLocationSelect(lat, lng, state)
      }

      // Show success animation with GSAP
      gsap.fromTo(newMarker._path, { r: 8 }, { r: 12, duration: 0.3, yoyo: true, repeat: 1 })
    } catch (error) {
      console.error("Geocoding failed:", error)
      const locationData = { lat, lng, state: "Unknown State" }
      setSelectedLocation(locationData)

      if (onLocationSelect) {
        onLocationSelect(lat, lng, "Unknown State")
      }
    }
  }

  // Search functionality
  const handleSearch = async () => {
    if (!searchQuery.trim() || !map) return

    setIsSearching(true)

    try {
      // Use Nominatim for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in&limit=1`,
        { headers: { "Accept-Language": "en" } },
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const location = {
          lat: Number.parseFloat(data[0].lat),
          lng: Number.parseFloat(data[0].lon),
        }

        map.setView([location.lat, location.lng], 10)

        // Simulate click at searched location
        const leaflet = await import("leaflet")
        handleMapClick({ lat: location.lat, lng: location.lng }, map, leaflet)
      }
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsSearching(false)
    }
  }

  // Magnifying glass animation
  useGSAP(
    () => {
      if (!magnifyingGlassRef.current || selectedLocation) return

      // Create floating animation path
      const tl = gsap.timeline({ repeat: -1 })

      tl.to(magnifyingGlassRef.current, {
        x: 200,
        y: 50,
        rotation: 15,
        duration: 4,
        ease: "sine.inOut",
      })
        .to(magnifyingGlassRef.current, {
          x: 350,
          y: -30,
          rotation: -10,
          duration: 3,
          ease: "sine.inOut",
        })
        .to(magnifyingGlassRef.current, {
          x: 150,
          y: 80,
          rotation: 20,
          duration: 3.5,
          ease: "sine.inOut",
        })
        .to(magnifyingGlassRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 3,
          ease: "sine.inOut",
        })

      // Pulsing glow effect
      gsap.to(".magnifying-glow", {
        scale: 1.2,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    },
    { scope: sectionRef, dependencies: [selectedLocation] },
  )

  // Section reveal animation
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

      tl.from(".map-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        ".search-container",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="section relative min-h-screen flex flex-col items-center justify-center px-4 py-20"
    >
      <div className="max-w-6xl mx-auto w-full z-10">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3 text-center">
          Select Your Field Location
        </h2>
        <p className="text-lg text-emerald-100/70 mb-10 text-center max-w-2xl mx-auto">
          Click anywhere on the map to pin your exact field location for precise soil analysis
        </p>

        {/* Search Container */}
        <div className="search-container flex items-center gap-4 mb-8 max-w-md mx-auto">
          <Input
            placeholder="Search location in India..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="rounded-full border-emerald-200/30 bg-slate-800/50 text-emerald-100 placeholder-emerald-300/50 focus-visible:ring-emerald-500"
          />
          <Button
            size="icon"
            onClick={handleSearch}
            disabled={isSearching || !isMapLoaded}
            className="rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/25"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Map Container */}
        <div className="map-container relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-emerald-400/20 bg-slate-900">
          {/* Map */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Animated Magnifying Glass */}
          {!selectedLocation && isMapLoaded && (
            <div
              ref={magnifyingGlassRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="magnifying-glow absolute inset-0 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl" />

                {/* Magnifying glass icon */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <Search className="h-8 w-8 text-emerald-400 drop-shadow-lg" />

                  {/* Animated search rings */}
                  <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-full animate-ping" />
                  <div
                    className="absolute inset-2 border border-cyan-400/40 rounded-full animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>

                {/* Floating text */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-slate-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-400/30">
                    <span className="text-xs text-emerald-300 font-medium">Click anywhere to explore</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {!isMapLoaded && !mapError && (
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-emerald-300 font-medium">Loading India Map...</p>
              </div>
            </div>
          )}

          {/* Error overlay */}
          {mapError && (
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-400 text-lg mb-2">⚠️</div>
                <p className="text-red-300 font-medium">{mapError}</p>
                <Button onClick={() => window.location.reload()} className="mt-4 bg-emerald-500 hover:bg-emerald-600">
                  Refresh Page
                </Button>
              </div>
            </div>
          )}

          {/* Map controls overlay */}
          {isMapLoaded && (
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl border border-emerald-400/20">
              <div className="flex items-center gap-2 text-emerald-300 text-sm">
                <Navigation className="h-4 w-4" />
                <span>Click to pin location</span>
              </div>
            </div>
          )}

          {/* Location info */}
          {selectedLocation && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-gradient-to-r from-emerald-900/90 to-cyan-900/90 backdrop-blur-sm p-4 rounded-xl border border-emerald-400/30 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-emerald-300 font-semibold mb-1">📍 Location Selected</h3>
                    <p className="text-emerald-100 text-sm">
                      <span className="font-medium text-cyan-300">{selectedLocation.state}</span>
                    </p>
                    <p className="text-emerald-200/70 text-xs mt-1">
                      Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-300 text-sm font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {selectedLocation && (
          <div className="mt-6 text-center animate-fadeIn">
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-full px-8 py-3 text-lg font-semibold shadow-lg shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
              <MapPin className="h-5 w-5 mr-2" />
              Analyze {selectedLocation.state} Soil
            </Button>
          </div>
        )}
      </div>

      {/* Background Elements */}
      <div className="absolute -bottom-32 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl -z-10" />
    </section>
  )
}
