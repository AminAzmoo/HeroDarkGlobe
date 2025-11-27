import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Monitor, Network, Server, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pageConfig: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  "/device": {
    title: "Device Management",
    description: "Monitor and manage connected devices across your network infrastructure",
    icon: <Monitor className="w-8 h-8" />,
  },
  "/tunnel": {
    title: "Tunnel Configuration",
    description: "Configure and monitor secure tunnel connections between network nodes",
    icon: <Network className="w-8 h-8" />,
  },
  "/service": {
    title: "Service Status",
    description: "View and manage running services and their health status",
    icon: <Server className="w-8 h-8" />,
  },
  "/timeline": {
    title: "Activity Timeline",
    description: "Track historical events and changes across your network",
    icon: <Clock className="w-8 h-8" />,
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
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        >
          <Card className="max-w-md w-full">
            <CardContent className="pt-8 pb-8 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                {config.icon}
              </div>
              
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold" data-testid="page-title">
                  {config.title}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {config.description}
                </p>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Coming Soon
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
