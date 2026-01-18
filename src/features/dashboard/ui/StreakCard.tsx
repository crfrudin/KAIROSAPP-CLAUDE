"use client";

import { Flame } from "lucide-react";
import type { StreakInfo } from "../domain/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const StreakCard = ({
  streak,
  onRecover
}: {
  streak: StreakInfo;
  onRecover: () => void;
}) => {
  const isBroken = streak.currentDays === 0;

  return (
    <Card>
      <div className="card__header">
        <div className="card__title">
          <Flame size={18} aria-hidden="true" />
          Ofensiva
        </div>
        {isBroken ? <Badge variant="danger">Streak perdido</Badge> : <Badge variant="primary">Ativa</Badge>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 32 }}>🔥</div>
        <div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>
            {streak.currentDays} DIAS
          </div>
          <div className="card__subtitle">dias de ofensiva</div>
        </div>
      </div>
      <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid var(--color-border)" }} />
      <div className="list">
        <span className="muted">Seu recorde: {streak.recordDays} dias</span>
        {streak.nextAchievement ? (
          <span className="muted">
            Faltam {streak.nextAchievement.remainingDays} dias para 🏆 {streak.nextAchievement.name}
          </span>
        ) : null}
        {isBroken ? (
          <div>
            <p className="text-danger" style={{ marginBottom: 8 }}>
              Streak perdido 💔 Você tinha {streak.recordDays} dias. Continue estudando para recomeçar!
            </p>
            <Button onClick={onRecover}>Recuperar Streak</Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
};
