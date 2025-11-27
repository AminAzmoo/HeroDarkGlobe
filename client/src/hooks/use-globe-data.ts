import { useQuery } from "@tanstack/react-query";
import type { GlobeData } from "@shared/schema";

export function useGlobeData() {
  return useQuery({
    queryKey: ["/api/globe"],
    staleTime: Infinity,
  });
}

export async function fetchGlobeData(): Promise<GlobeData> {
  const res = await fetch("/api/globe");
  if (!res.ok) throw new Error("Failed to fetch globe data");
  return res.json();
}
