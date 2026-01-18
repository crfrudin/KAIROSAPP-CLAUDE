"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Pause, Play, X } from "lucide-react";
import type { DailyPlan } from "../domain/types";
import { Button } from "@/components/ui/Button";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const TimerModal = ({
  plan,
  onClose,
  onFinish,
  onCancel
}: {
  plan: DailyPlan;
  onClose: () => void;
  onFinish: () => void;
  onCancel: () => void;
}) => {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [paused]);

  const currentActivity = useMemo(() => {
    return plan.activities.find((activity) => activity.status !== "completed") ?? plan.activities[0];
  }, [plan.activities]);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Sessão de Estudo</h2>
        <p className="muted">Cronômetro</p>
        <div style={{ fontSize: 32, fontWeight: 700 }}>{formatTime(seconds)}</div>
        <p className="muted">Atividade atual: {currentActivity?.title}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
          <Button variant="outline" onClick={() => setPaused(true)} disabled={paused}>
            <Pause size={16} /> Pausar
          </Button>
          <Button variant="outline" onClick={() => setPaused(false)} disabled={!paused}>
            <Play size={16} /> Continuar
          </Button>
          <Button variant="outline" onClick={onCancel}>
            <X size={16} /> Cancelar Sessão
          </Button>
          <Button onClick={onFinish}>
            <Check size={16} /> Finalizar Sessão
          </Button>
        </div>
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <button className="button button--ghost" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
