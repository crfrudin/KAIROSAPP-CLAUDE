import type { DashboardRepository } from "../application/ports";
import type { DashboardData } from "../domain/types";
import { ok } from "@/shared/result";

const data: DashboardData = {
  profile: {
    id: "user-1",
    fullName: "Ana Clara Souza",
    socialName: "Ana Clara",
    plan: "free"
  },
  streak: {
    currentDays: 7,
    recordDays: 45,
    nextAchievement: {
      name: "Streak de 10",
      remainingDays: 3
    }
  },
  dailyPlan: {
    status: "in_progress",
    totalTime: "3h30min",
    subjectsCount: 3,
    extraQuestions: 50,
    progressPercent: 60,
    activities: [
      {
        id: "act-1",
        title: "Teoria: Direito Penal",
        detail: "20 páginas",
        status: "completed"
      },
      {
        id: "act-2",
        title: "Teoria: Direito Civil",
        detail: "12 páginas",
        status: "in_progress"
      },
      {
        id: "act-3",
        title: "Revisão: Constitucional",
        detail: "30min",
        status: "pending"
      },
      {
        id: "act-4",
        title: "Informativos: STF",
        detail: "Em aberto",
        status: "pending"
      },
      {
        id: "act-5",
        title: "Questões",
        detail: "50 questões",
        status: "pending"
      },
      {
        id: "act-6",
        title: "Lei Seca",
        detail: "15 artigos",
        status: "pending"
      }
    ]
  },
  subjects: [
    {
      id: "subj-1",
      name: "Direito Penal",
      progressLabel: "65% (350/1000 págs)",
      progressPercent: 65
    },
    {
      id: "subj-2",
      name: "Direito Civil",
      progressLabel: "35% (140/400 págs)",
      progressPercent: 35
    },
    {
      id: "subj-3",
      name: "Português",
      progressLabel: "98% (49/50 blocos)",
      progressPercent: 98,
      status: "completed"
    }
  ],
  blockedSubjectsCount: 2,
  informatives: {
    stf: "Em dia ✅",
    stj: "2 novos ⚠️",
    tst: "5 atrasados ❌"
  }
};

export const inMemoryDashboardRepository: DashboardRepository = {
  async getDashboardData() {
    return ok(data);
  }
};
