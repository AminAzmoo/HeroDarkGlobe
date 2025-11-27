import { useQuery } from "@tanstack/react-query";
import type { KPIData } from "@shared/schema";

export function useKPIData() {
  return useQuery({
    queryKey: ["/api/kpi"],
    staleTime: 5000,
    refetchInterval: 5000,
  });
}

export async function fetchKPIData(): Promise<KPIData[]> {
  const res = await fetch("/api/kpi");
  if (!res.ok) throw new Error("Failed to fetch KPI data");
  return res.json();
}
