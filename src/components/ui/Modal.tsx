import type { ReactNode } from "react";

export const Modal = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        {children}
        <div style={{ textAlign: "right", marginTop: 16 }}>
          <button className="button button--ghost" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
