import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/kpi-card";
import { GlobeVisualization } from "@/components/globe-visualization";
import { useKPIData } from "@/hooks/use-kpi-data";

export default function Dashboard() {
  const { data: kpiData, isLoading, error } = useKPIData();

  return (
    <div className="min-h-screen pt-20 pb-8" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-2xl font-semibold" data-testid="dashboard-title">
            Network Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Real-time monitoring of your global network infrastructure
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
            data-testid="globe-section"
          >
            <div className="h-[70vh] min-h-[600px] rounded-2xl overflow-hidden relative shadow-2xl"
              style={{
                boxShadow: "0 0 60px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(59, 130, 246, 0.1)"
              }}
            >
              <GlobeVisualization />
            </div>
          </motion.section>

          <section className="w-full lg:w-80 space-y-4" data-testid="kpi-section">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Key Metrics</h3>
            <div className="grid grid-cols-1 gap-3">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm">Failed to load KPI data</p>
                </div>
              ) : (
                kpiData?.map((kpi: any, index: number) => (
                  <motion.div
                    key={kpi.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover-elevate p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                          <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpi.label}</p>
                          <p className="text-lg font-bold font-mono">{kpi.value}{kpi.unit ? ` ${kpi.unit}` : ""}</p>
                          <p className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-500" : kpi.trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                            {kpi.trendValue}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0 animate-pulse-badge">
                          {kpi.badgeText}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
