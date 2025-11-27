import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Globe from "globe.gl";
import { GlobeSearch } from "./globe-search";

interface LocationPoint {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

interface CablePath {
  type: "submarine" | "highlight";
  from: string;
  to: string;
  coords: [number, number][];
  color: string;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
  label: string;
}

const locations: LocationPoint[] = [
  { name: "Tehran", lat: 35.6892, lng: 51.3890, color: "#ef4444" },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821, color: "#3b82f6" },
  { name: "Toronto", lat: 43.6532, lng: -79.3832, color: "#10b981" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#8b5cf6" },
];

const submarineCable: CablePath = {
  type: "submarine",
  from: "Tehran",
  to: "Tokyo",
  coords: [
    [51.3890, 35.6892],
    [60, 30],
    [80, 20],
    [100, 15],
    [120, 25],
    [139.6503, 35.6762],
  ],
  color: "#ef4444",
};

const highlightArc: ArcData = {
  startLat: 50.1109,
  startLng: 8.6821,
  endLat: 43.6532,
  endLng: -79.3832,
  color: ["rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"],
  label: "Frankfurt - Toronto",
};

interface LocationInfo {
  name: string;
  lat: number;
  lng: number;
  status: string;
  latency: string;
  bandwidth: string;
}

const locationDetails: Record<string, LocationInfo> = {
  "Tehran": {
    name: "Tehran Data Center",
    lat: 35.6892,
    lng: 51.3890,
    status: "Online",
    latency: "12ms",
    bandwidth: "250 Gbps",
  },
  "Frankfurt": {
    name: "Frankfurt Hub",
    lat: 50.1109,
    lng: 8.6821,
    status: "Online",
    latency: "8ms",
    bandwidth: "500 Gbps",
  },
  "Toronto": {
    name: "Toronto Data Center",
    lat: 43.6532,
    lng: -79.3832,
    status: "Online",
    latency: "15ms",
    bandwidth: "350 Gbps",
  },
  "Tokyo": {
    name: "Tokyo Data Center",
    lat: 35.6762,
    lng: 139.6503,
    status: "Online",
    latency: "20ms",
    bandwidth: "400 Gbps",
  },
};

export function GlobeVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const handleLocationSelect = (location: LocationPoint) => {
    setSelectedLocation(locationDetails[location.name]);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: location.lat, lng: location.lng, altitude: 1.5 }, 1000);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const resizeObserver = new ResizeObserver(() => {
      if (globeRef.current && container) {
        globeRef.current.width(container.clientWidth);
        globeRef.current.height(container.clientHeight);
      }
    });

    try {
      const globe = new (Globe as any)(container)
        .globeImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg")
        .bumpImageUrl("//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png")
        .showAtmosphere(true)
        .atmosphereColor("rgba(59, 130, 246, 0.3)")
        .atmosphereAltitude(0.25)
        .width(container.clientWidth)
        .height(container.clientHeight);

      // Set transparent background
      if (globe.renderer) {
        globe.renderer.setClearColor(0x000000, 0);
      }
      if (globe.scene) {
        globe.scene.background = null;
      }

      globeRef.current = globe;

      fetch("https://cdn.jsdelivr.net/npm/three-globe/example/hexed-polygons/ne_110m_admin_0_countries.geojson")
        .then((res) => res.json())
        .then((countries) => {
          globe
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.4)
            .hexPolygonUseDots(true)
            .hexPolygonColor(() => "#3b82f6")
            .hexPolygonAltitude(0.01);
        })
        .catch((err) => {
          console.log("Hexed polygons loading skipped:", err);
        });

      globe
        .pointsData(locations)
        .pointLat("lat")
        .pointLng("lng")
        .pointColor((d: object) => {
          const point = d as LocationPoint;
          return hoveredLocation === point.name ? "#fbbf24" : point.color;
        })
        .pointAltitude(0.02)
        .pointRadius((d: object) => {
          const point = d as LocationPoint;
          return hoveredLocation === point.name ? 0.7 : 0.5;
        })
        .onPointHover((point: object | null) => {
          if (point) {
            const p = point as LocationPoint;
            setHoveredLocation(p.name);
          } else {
            setHoveredLocation(null);
          }
        })
        .onPointClick((point: object | null) => {
          if (point) {
            const p = point as LocationPoint;
            setSelectedLocation(locationDetails[p.name]);
            globe.pointOfView({ lat: p.lat, lng: p.lng, altitude: 1.5 }, 1000);
          }
        })
        .pointLabel((d: object) => {
          const point = d as LocationPoint;
          const detail = locationDetails[point.name];
          return `<div class="px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg border border-card-border text-foreground text-sm font-medium shadow-lg whitespace-nowrap">
            <div class="font-semibold">${detail.name}</div>
            <div class="text-xs text-muted-foreground mt-1">Status: ${detail.status}</div>
          </div>`;
        });

      globe
        .arcsData([highlightArc])
        .arcStartLat((d: object) => (d as ArcData).startLat)
        .arcStartLng((d: object) => (d as ArcData).startLng)
        .arcEndLat((d: object) => (d as ArcData).endLat)
        .arcEndLng((d: object) => (d as ArcData).endLng)
        .arcColor((d: object) => (d as ArcData).color)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(1500)
        .arcStroke(0.5)
        .arcAltitudeAutoScale(0.4)
        .arcLabel((d: object) => {
          const arc = d as ArcData;
          return `<div class="px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg border border-card-border text-foreground text-sm font-medium shadow-lg">${arc.label}</div>`;
        });

      const cablePath = {
        coords: submarineCable.coords,
        properties: {
          name: `${submarineCable.from} - ${submarineCable.to} Cable`,
          color: submarineCable.color,
        },
      };

      globe
        .pathsData([cablePath])
        .pathPoints("coords")
        .pathPointLat((p: unknown) => (p as number[])[1])
        .pathPointLng((p: unknown) => (p as number[])[0])
        .pathColor((path: object) => (path as typeof cablePath).properties.color)
        .pathStroke(2)
        .pathDashLength(0.1)
        .pathDashGap(0.02)
        .pathDashAnimateTime(8000)
        .pathLabel((path: object) => {
          const p = path as typeof cablePath;
          return `<div class="px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg border border-card-border text-foreground text-sm font-medium shadow-lg">${p.properties.name}</div>`;
        });

      globe.pointOfView({ lat: 30, lng: 30, altitude: 2.5 }, 0);

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableZoom = true;
      globe.controls().minDistance = 150;
      globe.controls().maxDistance = 500;

      resizeObserver.observe(container);

      setIsLoading(false);
    } catch (err) {
      setError("Failed to initialize globe visualization");
      setIsLoading(false);
      console.error(err);
    }

    return () => {
      resizeObserver.disconnect();
      if (globeRef.current) {
        globeRef.current._destructor?.();
      }
    };
  }, [hoveredLocation]);

  if (error) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center bg-card rounded-2xl border border-card-border"
        data-testid="globe-error"
      >
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-full"
      data-testid="globe-container"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10 rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Loading globe...</p>
          </div>
        </div>
      )}
      
      <GlobeSearch 
        locations={locations} 
        onLocationSelect={handleLocationSelect}
      />

      <div 
        ref={containerRef} 
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{ minHeight: "500px" }}
      />

      <div className="absolute bottom-4 left-4 flex flex-col gap-2" data-testid="globe-legend">
        <div className="px-3 py-2 bg-card/90 backdrop-blur-sm rounded-lg border border-card-border shadow-lg">
          <h4 className="text-xs font-semibold text-foreground mb-2">Network Connections</h4>
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-red-500 rounded-full" />
              <span className="text-muted-foreground">Submarine Cable (Tehran - Tokyo)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
              <span className="text-muted-foreground">Highlight Link (Frankfurt - Toronto)</span>
            </div>
          </div>
        </div>
        
        <div className="px-3 py-2 bg-card/90 backdrop-blur-sm rounded-lg border border-card-border shadow-lg">
          <h4 className="text-xs font-semibold text-foreground mb-2">Locations</h4>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {locations.map((loc) => (
              <button
                key={loc.name}
                onClick={() => {
                  setSelectedLocation(locationDetails[loc.name]);
                  if (globeRef.current) {
                    globeRef.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 1.5 }, 1000);
                  }
                }}
                className="flex items-center gap-1.5 px-2 py-1 rounded transition-colors hover:bg-accent/50"
                data-testid={`location-${loc.name.toLowerCase()}`}
              >
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: loc.color }}
                />
                <span className="text-muted-foreground hover:text-foreground">{loc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 w-72 px-4 py-3 bg-card/95 backdrop-blur-sm rounded-xl border border-card-border shadow-lg"
            data-testid="location-details"
          >
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-2 right-2 p-1 rounded hover:bg-accent/50 transition-colors"
              data-testid="button-close-details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{selectedLocation.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {selectedLocation.lat.toFixed(4)}° N, {selectedLocation.lng.toFixed(4)}° E
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="px-2 py-2 rounded-lg bg-accent/50">
                  <p className="text-xs text-muted-foreground font-medium">Status</p>
                  <p className="text-sm font-semibold text-emerald-500 mt-1">{selectedLocation.status}</p>
                </div>
                <div className="px-2 py-2 rounded-lg bg-accent/50">
                  <p className="text-xs text-muted-foreground font-medium">Latency</p>
                  <p className="text-sm font-semibold text-blue-500 mt-1">{selectedLocation.latency}</p>
                </div>
                <div className="px-2 py-2 rounded-lg bg-accent/50">
                  <p className="text-xs text-muted-foreground font-medium">Bandwidth</p>
                  <p className="text-sm font-semibold text-purple-500 mt-1">{selectedLocation.bandwidth}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
