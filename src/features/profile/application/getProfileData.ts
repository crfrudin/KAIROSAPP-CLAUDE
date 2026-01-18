import type { ProfileRepository } from "./ports";

export const getProfileData = async (repository: ProfileRepository, userId: string) => {
  return repository.getProfileData(userId);
};
