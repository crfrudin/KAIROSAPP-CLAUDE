"use client";

import { useCallback, useEffect, useState } from "react";
import type { DashboardData } from "../domain/types";
import { getDashboardData } from "../application/getDashboardData";
import { dashboardRepository } from "@/core/composition/dashboard";
import { clearCache, getCache, setCache } from "@/shared/cache";

const CACHE_TTL = 5 * 60 * 1000;
const CACHE_KEY = "dashboard-data";

export type DashboardState = {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
};

export const useDashboardData = () => {
  const [state, setState] = useState<DashboardState>({
    data: null,
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const cached = getCache<DashboardData>(CACHE_KEY);
    if (cached) {
      setState({ data: cached, isLoading: false, error: null });
      return;
    }
    const result = await getDashboardData(dashboardRepository, "user-1");
    if (!result.ok) {
      setState({ data: null, isLoading: false, error: result.error.message });
      return;
    }
    setCache(CACHE_KEY, result.data, CACHE_TTL);
    setState({ data: result.data, isLoading: false, error: null });
  }, []);

  const refresh = useCallback(async () => {
    clearCache();
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { ...state, refresh };
};
