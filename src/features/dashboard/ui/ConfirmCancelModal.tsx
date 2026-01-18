"use client";

import { Button } from "@/components/ui/Button";

export const ConfirmCancelModal = ({
  onConfirm,
  onClose
}: {
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Cancelar sessão</h2>
        <p>Tem certeza? O progresso desta sessão será perdido.</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
          <Button variant="ghost" onClick={onClose}>
            Não, continuar
          </Button>
          <Button variant="outline" onClick={onConfirm}>
            Sim, cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
