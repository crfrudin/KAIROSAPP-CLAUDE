import type { UserPlan } from "@/features/dashboard/domain/types";

export type ProfilePlan = {
  name: string;
  status: "active" | "overdue" | "trial";
  renewalDate: string;
  billing: string;
  plan: UserPlan;
};

export type ProfilePreferences = {
  dailyGoal: string;
  focusArea: string;
  examDate: string;
  studyMode: string;
  notifications: {
    email: boolean;
    whatsapp: boolean;
    push: boolean;
  };
};

export type ProfileSecurity = {
  lastPasswordUpdate: string;
  twoFactorEnabled: boolean;
  trustedDevices: number;
};

export type ProfileData = {
  id: string;
  fullName: string;
  socialName?: string;
  email: string;
  phone: string;
  birthDate: string;
  location: {
    city: string;
    state: string;
  };
  plan: ProfilePlan;
  preferences: ProfilePreferences;
  security: ProfileSecurity;
};
