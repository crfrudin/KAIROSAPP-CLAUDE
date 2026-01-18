"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ToastStack } from "@/components/ui/Toast";
import { useToast } from "@/shared/useToast";
import { useDashboardData } from "./useDashboardData";
import { DailyPlanCard } from "./DailyPlanCard";
import { StreakCard } from "./StreakCard";
import { SubjectsCard } from "./SubjectsCard";
import { InformativesCard } from "./InformativesCard";
import { ConfirmCancelModal } from "./ConfirmCancelModal";
import { TimerModal } from "./TimerModal";
import { UpgradeModal } from "./UpgradeModal";
import { StreakRecoveryModal } from "./StreakRecoveryModal";

export const DashboardPage = () => {
  const { data, isLoading, error, refresh } = useDashboardData();
  const { pushToast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showStreakRecovery, setShowStreakRecovery] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
    pushToast("Dashboard atualizado");
  };

  const greeting = useMemo(() => {
    if (!data) {
      return "Bem-vindo(a)";
    }
    return `Bem-vindo(a), ${data.profile.socialName ?? data.profile.fullName}!`;
  }, [data]);

  return (
    <AppShell
      header={({ onToggleSidebar }) => (
        <Header
          title={greeting}
          subtitle="Você está a 3 dias de bater seu recorde! 🔥"
          userName={data?.profile.socialName ?? data?.profile.fullName ?? "Usuário"}
          onToggleSidebar={onToggleSidebar}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      )}
    >
      <ToastStack />
      {isLoading ? (
        <div className="dashboard-grid">
          <Card>
            <Skeleton style={{ height: 140 }} />
          </Card>
          <Card>
            <Skeleton style={{ height: 120 }} />
          </Card>
          <Card>
            <Skeleton style={{ height: 160 }} />
          </Card>
          <Card>
            <Skeleton style={{ height: 120 }} />
          </Card>
        </div>
      ) : error || !data ? (
        <Card>
          <div className="list" style={{ alignItems: "center" }}>
            <AlertCircle size={32} className="text-danger" aria-hidden="true" />
            <p>Erro ao carregar</p>
            <button className="button" onClick={handleRefresh}>
              Tentar novamente
            </button>
          </div>
        </Card>
      ) : (
        <div className="dashboard-grid">
          <div className="list" style={{ gap: 24 }}>
            <StreakCard streak={data.streak} onRecover={() => setShowStreakRecovery(true)} />
            <DailyPlanCard
              plan={data.dailyPlan}
              isExpanded={isExpanded}
              onToggle={() => setIsExpanded((prev) => !prev)}
              onStartSession={() => setIsTimerOpen(true)}
            />
          </div>
          <div className="list" style={{ gap: 24 }}>
            <SubjectsCard
              subjects={data.subjects}
              plan={data.profile.plan}
              blockedCount={data.blockedSubjectsCount}
              onUpgrade={() => setShowUpgrade(true)}
            />
            <InformativesCard
              status={data.informatives}
              plan={data.profile.plan}
              onUpgrade={() => setShowUpgrade(true)}
            />
          </div>
        </div>
      )}
      {isTimerOpen && data ? (
        <TimerModal
          plan={data.dailyPlan}
          onClose={() => setIsTimerOpen(false)}
          onCancel={() => setShowCancelConfirm(true)}
          onFinish={() => {
            setIsTimerOpen(false);
            pushToast("🎉 Meta concluída! +1 dia de streak");
          }}
        />
      ) : null}
      {showCancelConfirm ? (
        <ConfirmCancelModal
          onClose={() => setShowCancelConfirm(false)}
          onConfirm={() => {
            setShowCancelConfirm(false);
            setIsTimerOpen(false);
            pushToast("Sessão cancelada");
          }}
        />
      ) : null}
      {showUpgrade ? <UpgradeModal onClose={() => setShowUpgrade(false)} /> : null}
      {showStreakRecovery ? (
        <StreakRecoveryModal onClose={() => setShowStreakRecovery(false)} />
      ) : null}
    </AppShell>
  );
};
