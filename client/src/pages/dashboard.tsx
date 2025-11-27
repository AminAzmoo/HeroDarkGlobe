import { motion } from "framer-motion";
import { KPICard, KPIData } from "@/components/kpi-card";
import { GlobeVisualization } from "@/components/globe-visualization";
import { 
  Activity, 
  Wifi, 
  Server, 
  Shield, 
  Zap, 
  Clock 
} from "lucide-react";

const kpiData: KPIData[] = [
  {
    id: "uptime",
    label: "System Uptime",
    value: "99.97",
    unit: "%",
    trend: "up",
    trendValue: "+0.02%",
    badgeVariant: "success",
    badgeText: "Excellent",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    id: "bandwidth",
    label: "Bandwidth Usage",
    value: "847",
    unit: "Gbps",
    trend: "up",
    trendValue: "+12.4%",
    badgeVariant: "primary",
    badgeText: "High Load",
    icon: <Wifi className="w-4 h-4" />,
  },
  {
    id: "servers",
    label: "Active Servers",
    value: "1,284",
    trend: "up",
    trendValue: "+48",
    badgeVariant: "info",
    badgeText: "Scaling",
    icon: <Server className="w-4 h-4" />,
  },
  {
    id: "threats",
    label: "Threats Blocked",
    value: "12.4K",
    trend: "down",
    trendValue: "-8.2%",
    badgeVariant: "warning",
    badgeText: "Monitoring",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "latency",
    label: "Avg. Latency",
    value: "24",
    unit: "ms",
    trend: "down",
    trendValue: "-3ms",
    badgeVariant: "success",
    badgeText: "Optimal",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "requests",
    label: "API Requests",
    value: "2.8M",
    unit: "/hr",
    trend: "up",
    trendValue: "+156K",
    badgeVariant: "neutral",
    badgeText: "Normal",
    icon: <Clock className="w-4 h-4" />,
  },
];

export default function Dashboard() {
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
            {kpiData.map((kpi, index) => (
              <KPICard key={kpi.id} data={kpi} index={index} />
            ))}
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
