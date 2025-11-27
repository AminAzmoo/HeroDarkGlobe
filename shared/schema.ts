import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type TrendDirection = "up" | "down" | "neutral";
export type BadgeVariant = "success" | "warning" | "danger" | "primary" | "info" | "neutral";

export interface KPIData {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend: TrendDirection;
  trendValue: string;
  badgeVariant: BadgeVariant;
  badgeText: string;
  iconName: string;
}

export interface LocationPoint {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

export interface CableConnection {
  type: "submarine" | "highlight";
  from: string;
  to: string;
  coords?: [number, number][];
  color: string;
}

export interface GlobeData {
  locations: LocationPoint[];
  connections: CableConnection[];
}

export const kpiDataSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  trend: z.enum(["up", "down", "neutral"]),
  trendValue: z.string(),
  badgeVariant: z.enum(["success", "warning", "danger", "primary", "info", "neutral"]),
  badgeText: z.string(),
  iconName: z.string(),
});

export const locationPointSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  color: z.string(),
});

export const cableConnectionSchema = z.object({
  type: z.enum(["submarine", "highlight"]),
  from: z.string(),
  to: z.string(),
  coords: z.array(z.tuple([z.number(), z.number()])).optional(),
  color: z.string(),
});

export const globeDataSchema = z.object({
  locations: z.array(locationPointSchema),
  connections: z.array(cableConnectionSchema),
});
