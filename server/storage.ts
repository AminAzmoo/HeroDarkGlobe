import { 
  type User, 
  type InsertUser, 
  type KPIData, 
  type GlobeData,
  type LocationPoint,
  type CableConnection
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getKPIData(): Promise<KPIData[]>;
  getGlobeData(): Promise<GlobeData>;
}

const defaultKPIData: KPIData[] = [
  {
    id: "uptime",
    label: "System Uptime",
    value: "99.97",
    unit: "%",
    trend: "up",
    trendValue: "+0.02%",
    badgeVariant: "success",
    badgeText: "Excellent",
    iconName: "Activity",
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
    iconName: "Wifi",
  },
  {
    id: "servers",
    label: "Active Servers",
    value: "1,284",
    trend: "up",
    trendValue: "+48",
    badgeVariant: "info",
    badgeText: "Scaling",
    iconName: "Server",
  },
  {
    id: "threats",
    label: "Threats Blocked",
    value: "12.4K",
    trend: "down",
    trendValue: "-8.2%",
    badgeVariant: "warning",
    badgeText: "Monitoring",
    iconName: "Shield",
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
    iconName: "Zap",
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
    iconName: "Clock",
  },
];

const defaultLocations: LocationPoint[] = [
  { name: "Tehran", lat: 35.6892, lng: 51.3890, color: "#ef4444" },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821, color: "#3b82f6" },
  { name: "Toronto", lat: 43.6532, lng: -79.3832, color: "#10b981" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#8b5cf6" },
];

const defaultConnections: CableConnection[] = [
  {
    type: "submarine",
    from: "Tehran",
    to: "Tokyo",
    coords: [
      [51.3890, 35.6892],
      [60, 30],
      [80, 20],
      [100, 15],
      [120, 25],
      [139.6503, 35.6762],
    ],
    color: "#ef4444",
  },
  {
    type: "highlight",
    from: "Frankfurt",
    to: "Toronto",
    color: "#3b82f6",
  },
];

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private kpiData: KPIData[];
  private globeData: GlobeData;

  constructor() {
    this.users = new Map();
    this.kpiData = defaultKPIData;
    this.globeData = {
      locations: defaultLocations,
      connections: defaultConnections,
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getKPIData(): Promise<KPIData[]> {
    // Simulate real-time updates by varying the values slightly
    const baseKPI = this.kpiData;
    return baseKPI.map(kpi => {
      if (kpi.id === "bandwidth") {
        const variance = Math.floor(Math.random() * 100) - 50;
        const newValue = Math.max(750, Math.min(950, parseInt(kpi.value) + variance));
        return { ...kpi, value: newValue.toString(), trendValue: `${variance > 0 ? '+' : ''}${variance} Gbps` };
      }
      if (kpi.id === "uptime") {
        const variance = (Math.random() * 0.1 - 0.05).toFixed(2);
        return { ...kpi, trendValue: `${parseFloat(variance) > 0 ? '+' : ''}${variance}%` };
      }
      if (kpi.id === "servers") {
        const variance = Math.floor(Math.random() * 100) - 50;
        return { ...kpi, value: (parseInt(kpi.value.replace(",", "")) + variance).toLocaleString(), trendValue: `${variance > 0 ? '+' : ''}${variance}` };
      }
      return kpi;
    });
  }

  async getGlobeData(): Promise<GlobeData> {
    return this.globeData;
  }
}

export const storage = new MemStorage();
