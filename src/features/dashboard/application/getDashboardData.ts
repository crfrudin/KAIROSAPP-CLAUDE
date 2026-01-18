import type { DashboardRepository } from "./ports";

export const getDashboardData = async (repository: DashboardRepository, userId: string) => {
  return repository.getDashboardData(userId);
};
