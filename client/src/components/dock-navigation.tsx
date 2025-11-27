import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Monitor, 
  Network, 
  Server, 
  Clock,
  Settings,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, href: "/" },
  { id: "device", label: "Device", icon: <Monitor className="w-4 h-4" />, href: "/device" },
  { id: "tunnel", label: "Tunnel", icon: <Network className="w-4 h-4" />, href: "/tunnel" },
  { id: "service", label: "Service", icon: <Server className="w-4 h-4" />, href: "/service" },
  { id: "timeline", label: "Timeline", icon: <Clock className="w-4 h-4" />, href: "/timeline" },
];

export function DockNavigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-center gap-1 px-2 py-1.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-card-border shadow-lg"
      data-testid="dock-navigation"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/">
            <motion.div 
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="link-logo"
            >
              <Network className="w-5 h-5" />
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>NetGlobe</p>
        </TooltipContent>
      </Tooltip>

      <div className="w-px h-6 bg-border mx-1" />

      <nav className="flex items-center gap-1" data-testid="nav-items">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <motion.div
                    className={cn(
                      "relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                    onHoverStart={() => setHoveredItem(item.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-testid={`nav-${item.id}`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium hidden md:inline">{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-lg bg-primary/10 -z-10"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {hoveredItem === item.id && !isActive && (
                      <motion.div
                        layoutId="hoverTab"
                        className="absolute inset-0 rounded-lg bg-accent/30 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="md:hidden">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="w-px h-6 bg-border mx-1" />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
            data-testid="button-settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className="flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer"
            onClick={toggleTheme}
            data-testid="toggle-theme"
          >
            <Sun className={cn(
              "w-4 h-4 transition-all",
              theme === "light" ? "text-amber-500" : "text-muted-foreground"
            )} />
            <Switch 
              checked={theme === "dark"} 
              onCheckedChange={toggleTheme}
              data-testid="switch-theme"
            />
            <Moon className={cn(
              "w-4 h-4 transition-all",
              theme === "dark" ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
}
