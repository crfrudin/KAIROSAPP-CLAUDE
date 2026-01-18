import type { DashboardData } from "../domain/types";
import type { Result } from "@/shared/result";

export interface DashboardRepository {
  getDashboardData(userId: string): Promise<Result<DashboardData>>;
}
