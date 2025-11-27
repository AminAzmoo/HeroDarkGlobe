import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "success" | "warning" | "danger" | "primary" | "info" | "neutral";
export type TrendDirection = "up" | "down" | "neutral";

export interface KPIData {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend: TrendDirection;
  trendValue: string;
  badgeVariant: BadgeVariant;
  badgeText: string;
  icon: React.ReactNode;
}

interface KPICardProps {
  data: KPIData;
  index: number;
}

const badgeStyles: Record<BadgeVariant, { bg: string; text: string; glow: string }> = {
  success: { 
    bg: "bg-emerald-500/20 dark:bg-emerald-500/20", 
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-emerald-500/30"
  },
  warning: { 
    bg: "bg-amber-500/20 dark:bg-amber-500/20", 
    text: "text-amber-600 dark:text-amber-400",
    glow: "shadow-amber-500/30"
  },
  danger: { 
    bg: "bg-red-500/20 dark:bg-red-500/20", 
    text: "text-red-600 dark:text-red-400",
    glow: "shadow-red-500/30"
  },
  primary: { 
    bg: "bg-blue-500/20 dark:bg-blue-500/20", 
    text: "text-blue-600 dark:text-blue-400",
    glow: "shadow-blue-500/30"
  },
  info: { 
    bg: "bg-cyan-500/20 dark:bg-cyan-500/20", 
    text: "text-cyan-600 dark:text-cyan-400",
    glow: "shadow-cyan-500/30"
  },
  neutral: { 
    bg: "bg-gray-500/20 dark:bg-gray-500/20", 
    text: "text-gray-600 dark:text-gray-400",
    glow: "shadow-gray-500/30"
  },
};

const trendColors = {
  up: "text-emerald-500",
  down: "text-red-500",
  neutral: "text-muted-foreground",
};

const TrendIcon = ({ direction }: { direction: TrendDirection }) => {
  switch (direction) {
    case "up":
      return <TrendingUp className="w-3 h-3" />;
    case "down":
      return <TrendingDown className="w-3 h-3" />;
    default:
      return <Minus className="w-3 h-3" />;
  }
};

export function KPICard({ data, index }: KPICardProps) {
  const style = badgeStyles[data.badgeVariant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <Card 
        className="relative overflow-visible hover-elevate min-h-32"
        data-testid={`kpi-card-${data.id}`}
      >
        <motion.div
          className={cn(
            "absolute -top-2 -right-2 z-10"
          )}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.3
          }}
        >
          <Badge 
            variant="outline"
            className={cn(
              "px-2 py-0.5 text-xs font-semibold border-0 shadow-md",
              style.bg,
              style.text
            )}
            data-testid={`badge-${data.id}`}
          >
            <motion.span
              className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
              style={{ backgroundColor: "currentColor" }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {data.badgeText}
          </Badge>
        </motion.div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="p-1.5 rounded-md bg-muted/50">
                  {data.icon}
                </div>
                <span className="text-xs uppercase tracking-wide font-medium">
                  {data.label}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <motion.span 
                  className="text-3xl font-bold tracking-tight font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  data-testid={`value-${data.id}`}
                >
                  {data.value}
                </motion.span>
                {data.unit && (
                  <span className="text-sm text-muted-foreground font-medium">
                    {data.unit}
                  </span>
                )}
              </div>

              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendColors[data.trend]
              )}>
                <TrendIcon direction={data.trend} />
                <span>{data.trendValue}</span>
                <span className="text-muted-foreground ml-1">vs last week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
