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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 auto-rows-max" data-testid="kpi-section">
          {/* Top Left KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[0] && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[0].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[0].value}{kpiData[0].unit ? ` ${kpiData[0].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[0].trend === "up" ? "text-emerald-500" : kpiData[0].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[0].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[0].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}

          {/* Top Center KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[1] && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[1].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[1].value}{kpiData[1].unit ? ` ${kpiData[1].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[1].trend === "up" ? "text-emerald-500" : kpiData[1].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[1].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[1].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}

          {/* Top Right KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[2] && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[2].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[2].value}{kpiData[2].unit ? ` ${kpiData[2].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[2].trend === "up" ? "text-emerald-500" : kpiData[2].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[2].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[2].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}

          {/* Right Side KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[3] && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[3].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[3].value}{kpiData[3].unit ? ` ${kpiData[3].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[3].trend === "up" ? "text-emerald-500" : kpiData[3].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[3].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[3].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}

          {/* MAIN GLOBE - spans 2x2 in center */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2 lg:row-span-2 row-span-2"
            data-testid="globe-section"
          >
            <div className="h-[500px] lg:h-[600px] rounded-2xl overflow-hidden relative shadow-2xl"
              style={{
                boxShadow: "0 0 60px rgba(59, 130, 246, 0.3), inset 0 0 60px rgba(59, 130, 246, 0.1)"
              }}
            >
              <GlobeVisualization />
            </div>
          </motion.section>

          {/* Bottom Left KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[4] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[4].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[4].value}{kpiData[4].unit ? ` ${kpiData[4].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[4].trend === "up" ? "text-emerald-500" : kpiData[4].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[4].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[4].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}

          {/* Bottom Center KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[5] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[5].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[5].value}{kpiData[5].unit ? ` ${kpiData[5].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[5].trend === "up" ? "text-emerald-500" : kpiData[5].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[5].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[5].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}

          {/* Bottom Right KPI */}
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : error ? null : (
            kpiData?.[3] && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 * 0.05 }}
              >
                <Card className="hover-elevate p-4 h-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{kpiData[3].label}</p>
                    <p className="text-lg font-bold font-mono">{kpiData[3].value}{kpiData[3].unit ? ` ${kpiData[3].unit}` : ""}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-xs font-medium ${kpiData[3].trend === "up" ? "text-emerald-500" : kpiData[3].trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                        {kpiData[3].trendValue}
                      </p>
                      <Badge variant="outline" className="text-xs animate-pulse-badge">{kpiData[3].badgeText}</Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
