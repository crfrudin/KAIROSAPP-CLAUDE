export type UserPlan = "free" | "premium";

export type DailyPlanStatus = "not_started" | "in_progress" | "completed" | "missed" | "day_off";

export type ActivityStatus = "pending" | "in_progress" | "completed";

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  status: ActivityStatus;
};

export type DailyPlan = {
  status: DailyPlanStatus;
  totalTime: string;
  subjectsCount: number;
  extraQuestions?: number;
  progressPercent: number;
  activities: ActivityItem[];
};

export type StreakInfo = {
  currentDays: number;
  recordDays: number;
  nextAchievement?: {
    name: string;
    remainingDays: number;
  };
};

export type SubjectQueueItem = {
  id: string;
  name: string;
  progressLabel: string;
  progressPercent: number;
  status?: "active" | "completed";
};

export type InformativesStatus = {
  stf: string;
  stj: string;
  tst: string;
};

export type DashboardProfile = {
  id: string;
  fullName: string;
  socialName?: string;
  plan: UserPlan;
};

export type DashboardData = {
  profile: DashboardProfile;
  streak: StreakInfo;
  dailyPlan: DailyPlan;
  subjects: SubjectQueueItem[];
  blockedSubjectsCount: number;
  informatives: InformativesStatus | null;
};
