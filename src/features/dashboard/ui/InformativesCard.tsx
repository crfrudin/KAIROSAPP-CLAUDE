"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import type { InformativesStatus, UserPlan } from "../domain/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const InformativesCard = ({
  status,
  plan,
  onUpgrade
}: {
  status: InformativesStatus | null;
  plan: UserPlan;
  onUpgrade: () => void;
}) => {
  const isPremiumLocked = plan === "free";

  return (
    <Card>
      <div className="card__header">
        <div className="card__title">
          <Bot size={18} aria-hidden="true" />
          Robô de Informativos
        </div>
        {isPremiumLocked ? <Badge variant="danger">🔒 Premium</Badge> : null}
      </div>
      {isPremiumLocked ? (
        <div className="list">
          <div className="muted">
            <div style={{ fontSize: 28 }}>🤖</div>
            <p>Recurso Premium</p>
            <p className="muted">Upgrade para acompanhar informativos automaticamente.</p>
          </div>
          <button className="button" onClick={onUpgrade}>
            Fazer Upgrade
          </button>
        </div>
      ) : status ? (
        <div className="list">
          <span>{status.stf}</span>
          <span>{status.stj}</span>
          <span>{status.tst}</span>
          <Link href="/informativos" className="button button--outline">
            Ver informativos →
          </Link>
        </div>
      ) : (
        <div className="list">
          <p className="muted">Nenhum tribunal configurado</p>
          <p className="muted">Configure tribunais em Ajustes</p>
          <Link href="/ajustes" className="button button--outline">
            Ir para Ajustes
          </Link>
        </div>
      )}
    </Card>
  );
};
