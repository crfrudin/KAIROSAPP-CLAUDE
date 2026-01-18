import type { ProfileRepository } from "../application/ports";
import type { ProfileData } from "../domain/types";
import { ok } from "@/shared/result";

const data: ProfileData = {
  id: "user-1",
  fullName: "Ana Clara Souza",
  socialName: "Ana Clara",
  email: "anaclara@email.com",
  phone: "(11) 98888-7766",
  birthDate: "21/03/1996",
  location: {
    city: "São Paulo",
    state: "SP"
  },
  plan: {
    name: "Plano Essencial",
    status: "active",
    renewalDate: "05/11/2024",
    billing: "R$ 49,90/mês",
    plan: "free"
  },
  preferences: {
    dailyGoal: "3h30 de estudo por dia",
    focusArea: "Direito Penal",
    examDate: "22/02/2025",
    studyMode: "Ciclo 90/20",
    notifications: {
      email: true,
      whatsapp: false,
      push: true
    }
  },
  security: {
    lastPasswordUpdate: "10/07/2024",
    twoFactorEnabled: true,
    trustedDevices: 3
  }
};

export const inMemoryProfileRepository: ProfileRepository = {
  async getProfileData() {
    return ok(data);
  }
};
