"use client";

import Link from "next/link";

export const StreakRecoveryModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h2>Recuperar streak</h2>
        <p>Recupere seu streak cumprindo a meta de hoje!</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
          <button className="button button--ghost" onClick={onClose}>
            Agora não
          </button>
          <Link href="/cronograma" className="button">
            Ir para Meta Diária
          </Link>
        </div>
      </div>
    </div>
  );
};
