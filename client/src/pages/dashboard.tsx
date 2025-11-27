import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { KPICard } from "@/components/kpi-card";
import { GlobeVisualization } from "@/components/globe-visualization";
import { useKPIData } from "@/hooks/use-kpi-data";

export default function Dashboard() {
  const { data: kpiData, isLoading, error } = useKPIData();

  return (
    <div className="min-h-screen pt-20 pb-8" data-testid="dashboard-page">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-semibold" data-testid="dashboard-title">
            Network Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Real-time monitoring of your global network infrastructure
          </p>
        </motion.div>

        <section data-testid="kpi-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))
            ) : error ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">Failed to load KPI data</p>
              </div>
            ) : (
              kpiData?.map((kpi: any, index: number) => (
                <KPICard key={kpi.id} data={kpi} index={index} />
              ))
            )}
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
          data-testid="globe-section"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Global Network Map</h2>
              <p className="text-sm text-muted-foreground">
                Interactive visualization of network nodes and connections
              </p>
            </div>
          </div>
          
          <div className="h-[60vh] min-h-[500px] rounded-2xl border border-card-border bg-card/30 backdrop-blur-sm overflow-hidden">
            <GlobeVisualization />
          </div>
        </motion.section>
      </div>
    </div>
  );
}
