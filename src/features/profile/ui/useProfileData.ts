"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProfileData } from "../domain/types";
import { getProfileData } from "../application/getProfileData";
import { profileRepository } from "@/core/composition/profile";
import { clearCache, getCache, setCache } from "@/shared/cache";

const CACHE_TTL = 5 * 60 * 1000;
const CACHE_KEY = "profile-data";

export type ProfileState = {
  data: ProfileData | null;
  isLoading: boolean;
  error: string | null;
};

export const useProfileData = () => {
  const [state, setState] = useState<ProfileState>({
    data: null,
    isLoading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const cached = getCache<ProfileData>(CACHE_KEY);
    if (cached) {
      setState({ data: cached, isLoading: false, error: null });
      return;
    }
    const result = await getProfileData(profileRepository, "user-1");
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
