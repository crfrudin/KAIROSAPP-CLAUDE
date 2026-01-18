"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { SubjectQueueItem, UserPlan } from "../domain/types";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export const SubjectsCard = ({
  subjects,
  plan,
  blockedCount,
  onUpgrade
}: {
  subjects: SubjectQueueItem[];
  plan: UserPlan;
  blockedCount: number;
  onUpgrade: () => void;
}) => {
  const hasSubjects = subjects.length > 0;
  const showBlocked = plan === "free" && blockedCount > 0;

  return (
    <Card>
      <div className="card__header">
        <div className="card__title">
          <BookOpen size={18} aria-hidden="true" />
          Matérias na Fila
        </div>
      </div>
      {!hasSubjects ? (
        <div className="list">
          <div className="muted" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📚</div>
            <p>Nenhuma matéria cadastrada</p>
            <p className="muted">Comece adicionando sua primeira matéria!</p>
            <Link href="/materias/nova" className="button">
              Adicionar Matéria
            </Link>
          </div>
        </div>
      ) : (
        <div className="list">
          {subjects.slice(0, 3).map((subject) => (
            <div key={subject.id} className="list-item">
              <div className="list-item__row">
                <Link href={`/materias/${subject.id}`}>{subject.name}</Link>
                <span className="muted">{subject.progressLabel}</span>
              </div>
              <ProgressBar value={subject.progressPercent} muted={subject.progressPercent <= 50} />
            </div>
          ))}
          {showBlocked ? (
            <button className="button button--ghost" onClick={onUpgrade}>
              +{blockedCount} matérias bloqueadas 🔒
            </button>
          ) : null}
          <Link href="/materias" className="button button--outline">
            Ver todas →
          </Link>
        </div>
      )}
    </Card>
  );
};
