import { Link } from "wouter";
import { Network, Github, Twitter, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const quickLinks = [
  { label: "Dashboard", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Documentation", href: "#" },
];

const socialLinks = [
  { icon: <Github className="w-4 h-4" />, href: "#", label: "GitHub" },
  { icon: <Twitter className="w-4 h-4" />, href: "#", label: "Twitter" },
  { icon: <Mail className="w-4 h-4" />, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer 
      className="border-t border-border bg-card/30 backdrop-blur-sm"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <Network className="w-4 h-4" />
              </div>
              <span className="text-lg font-semibold">NetGlobe</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Real-time global network monitoring and analytics platform for enterprise infrastructure.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                  data-testid={`footer-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Status</h4>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </div>
              <span className="text-sm text-muted-foreground">All systems operational</span>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
                  aria-label={link.label}
                  data-testid={`footer-social-${link.label.toLowerCase()}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            2024 NetGlobe. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              v1.0.0
            </Badge>
            <span className="text-xs text-muted-foreground">
              Built with Globe.gl & Three.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
