import type { ProfileData } from "../domain/types";
import type { Result } from "@/shared/result";

export interface ProfileRepository {
  getProfileData(userId: string): Promise<Result<ProfileData>>;
}
