"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const UpgradeModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Recurso Premium</h2>
        <p>Este recurso está disponível apenas no plano pago.</p>
        <ul>
          <li>Matérias ilimitadas</li>
          <li>Robô de informativos</li>
          <li>Calendário completo</li>
          <li>Recursos premium futuros</li>
        </ul>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
          <Button variant="ghost" onClick={onClose}>
            Agora não
          </Button>
          <Link href="/assinatura" className="button">
            Fazer Upgrade
          </Link>
        </div>
      </div>
    </div>
  );
};
