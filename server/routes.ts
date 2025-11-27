import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/kpi", async (req, res) => {
    try {
      const kpiData = await storage.getKPIData();
      res.json(kpiData);
    } catch (error) {
      console.error("Error fetching KPI data:", error);
      res.status(500).json({ error: "Failed to fetch KPI data" });
    }
  });

  app.get("/api/globe", async (req, res) => {
    try {
      const globeData = await storage.getGlobeData();
      res.json(globeData);
    } catch (error) {
      console.error("Error fetching globe data:", error);
      res.status(500).json({ error: "Failed to fetch globe data" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  return httpServer;
}
