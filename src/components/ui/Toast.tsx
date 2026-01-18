"use client";

import { X } from "lucide-react";
import { IconButton } from "./IconButton";
import { useToast } from "@/shared/useToast";

export const ToastStack = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          <span>{toast.title}</span>
          <IconButton aria-label="Fechar toast" onClick={() => removeToast(toast.id)}>
            <X size={16} />
          </IconButton>
        </div>
      ))}
    </div>
  );
};
