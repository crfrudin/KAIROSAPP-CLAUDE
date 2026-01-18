"use client";

import { useMemo } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import type { DailyPlan } from "../domain/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

const activityStatusLabel = (status: DailyPlan["activities"][number]["status"]) => {
  switch (status) {
    case "completed":
      return "✅ Concluída";
    case "in_progress":
      return "⏳ Em andamento";
    default:
      return "⬜ Pendente";
  }
};

export const DailyPlanCard = ({
  plan,
  isExpanded,
  onToggle,
  onStartSession
}: {
  plan: DailyPlan;
  isExpanded: boolean;
  onToggle: () => void;
  onStartSession: () => void;
}) => {
  const progressMuted = plan.progressPercent <= 50;

  const buttonConfig = useMemo(() => {
    if (plan.status === "completed") {
      return { label: "✅ Meta Concluída!", variant: "success" as const, disabled: true };
    }
    if (plan.status === "missed") {
      return { label: "Meta não concluída ontem", variant: "outline" as const, disabled: true };
    }
    if (plan.status === "in_progress") {
      return { label: "Continuar Estudo", variant: "primary" as const, disabled: false };
    }
    if (plan.status === "day_off") {
      return { label: "Dia de folga", variant: "outline" as const, disabled: true };
    }
    return { label: "Iniciar Estudo", variant: "primary" as const, disabled: false };
  }, [plan.status]);

  return (
    <Card>
      <div className="card__header">
        <div className="card__title">
          <Calendar size={18} aria-hidden="true" />
          Meta de Hoje
        </div>
        {plan.status === "day_off" ? <Badge>🌴 Folga</Badge> : null}
      </div>
      {plan.status === "day_off" ? (
        <div className="list">
          <span className="card__subtitle">Dia de folga</span>
          <span className="muted">Aproveite seu descanso!</span>
        </div>
      ) : (
        <>
          <div className="list">
            <div className="list-item__row">
              <span className="card__subtitle">
                ⏱️ {plan.totalTime} | {plan.subjectsCount} matérias
                {plan.extraQuestions ? ` | ${plan.extraQuestions} questões` : ""}
              </span>
              <span className="card__subtitle">{plan.progressPercent}%</span>
            </div>
            <ProgressBar value={plan.progressPercent} muted={progressMuted} />
            {plan.status === "completed" ? (
              <span className="text-success">+1 dia de streak 🔥</span>
            ) : null}
            {plan.status !== "missed" ? (
              <Button onClick={onStartSession} disabled={buttonConfig.disabled} variant={buttonConfig.variant}>
                {buttonConfig.label}
              </Button>
            ) : null}
            {plan.status === "missed" ? <span className="text-danger">Meta não concluída ontem</span> : null}
          </div>
          <button className="button button--ghost" onClick={onToggle} aria-expanded={isExpanded}>
            {isExpanded ? (
              <>
                <ChevronUp size={16} /> Ocultar detalhes
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Ver detalhes
              </>
            )}
          </button>
          {isExpanded ? (
            <div className="list" style={{ marginTop: 16 }}>
              {plan.activities.map((activity) => (
                <div key={activity.id} className="list-item">
                  <div className="list-item__row">
                    <span>{activity.title}</span>
                    <span className="muted">{activity.detail}</span>
                  </div>
                  <span className={activity.status === "completed" ? "muted" : ""}>
                    {activityStatusLabel(activity.status)}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
};
