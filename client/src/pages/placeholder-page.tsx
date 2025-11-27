import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Monitor, Network, Server, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pageConfig: Record<string, { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  items?: Array<{ name: string; status: string; info: string }>;
}> = {
  "/device": {
    title: "Device Management",
    description: "Monitor and manage connected devices across your network infrastructure",
    icon: <Monitor className="w-8 h-8" />,
    items: [
      { name: "Server-01", status: "Online", info: "Last sync: 2 minutes ago" },
      { name: "Server-02", status: "Online", info: "Last sync: 5 minutes ago" },
      { name: "Router-A", status: "Online", info: "Last sync: 1 minute ago" },
      { name: "Router-B", status: "Maintenance", info: "Scheduled maintenance in progress" },
    ]
  },
  "/tunnel": {
    title: "Tunnel Configuration",
    description: "Configure and monitor secure tunnel connections between network nodes",
    icon: <Network className="w-8 h-8" />,
    items: [
      { name: "Tehran → Frankfurt", status: "Active", info: "Latency: 45ms" },
      { name: "Frankfurt → Toronto", status: "Active", info: "Latency: 120ms" },
      { name: "Toronto → Tokyo", status: "Active", info: "Latency: 150ms" },
      { name: "Backup Route", status: "Standby", info: "Ready for failover" },
    ]
  },
  "/service": {
    title: "Service Status",
    description: "View and manage running services and their health status",
    icon: <Server className="w-8 h-8" />,
    items: [
      { name: "API Gateway", status: "Running", info: "Uptime: 99.98%" },
      { name: "Database Cluster", status: "Running", info: "CPU: 45%, Memory: 62%" },
      { name: "Cache Service", status: "Running", info: "Hit ratio: 94.2%" },
      { name: "Load Balancer", status: "Running", info: "Active connections: 12,847" },
    ]
  },
  "/timeline": {
    title: "Activity Timeline",
    description: "Track historical events and changes across your network",
    icon: <Clock className="w-8 h-8" />,
    items: [
      { name: "System Patch Applied", status: "Completed", info: "5 minutes ago" },
      { name: "Capacity Scaling Event", status: "Completed", info: "1 hour ago" },
      { name: "Backup Completed", status: "Completed", info: "Today at 02:30 AM" },
      { name: "Maintenance Window", status: "Scheduled", info: "Tomorrow 03:00 AM - 05:00 AM" },
    ]
  },
};

export default function PlaceholderPage() {
  const [location] = useLocation();
  const config = pageConfig[location] || {
    title: "Coming Soon",
    description: "This feature is currently under development",
    icon: <Network className="w-8 h-8" />,
  };

  return (
    <div className="min-h-screen pt-20 pb-8" data-testid={`page-${location.slice(1)}`}>
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-semibold" data-testid="page-title">
            {config.title}
          </h1>
          <p className="text-muted-foreground text-sm">
            {config.description}
          </p>
        </motion.div>

        {config.items ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {config.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="hover-elevate">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <Badge 
                          variant={item.status === "Online" || item.status === "Running" || item.status === "Active" || item.status === "Completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.info}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              {config.icon}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Coming Soon
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
