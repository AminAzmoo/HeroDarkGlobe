import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Location {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

interface GlobeSearchProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

export function GlobeSearch({ locations, onLocationSelect }: GlobeSearchProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<Location[]>([]);

  useEffect(() => {
    if (search.trim()) {
      const results = locations.filter(loc =>
        loc.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
      setIsOpen(true);
    } else {
      setFiltered([]);
      setIsOpen(false);
    }
  }, [search, locations]);

  return (
    <div className="absolute top-4 left-4 z-20 w-72" data-testid="globe-search">
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => search && setIsOpen(true)}
            className="pl-10 pr-3 py-2 text-sm bg-card/90 backdrop-blur-sm border-card-border"
            data-testid="search-input"
          />
        </div>

        <AnimatePresence>
          {isOpen && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm border border-card-border rounded-lg shadow-lg overflow-hidden"
            >
              {filtered.map((location) => (
                <button
                  key={location.name}
                  onClick={() => {
                    onLocationSelect(location);
                    setSearch("");
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent/50 transition-colors text-left border-b border-border last:border-0"
                  )}
                  data-testid={`search-result-${location.name.toLowerCase()}`}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: location.color }}
                  />
                  <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  <span>{location.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
