"use client";

import { Menu, RefreshCw } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";

export type HeaderProps = {
  title: string;
  subtitle?: string;
  userName: string;
  onToggleSidebar: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
};

export const Header = ({
  title,
  subtitle,
  userName,
  onToggleSidebar,
  onRefresh,
  isRefreshing
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__left">
        <IconButton aria-label="Abrir menu" onClick={onToggleSidebar}>
          <Menu size={18} />
        </IconButton>
        <div>
          <div className="header__title">{title}</div>
          {subtitle ? <div className="header__subtitle">{subtitle}</div> : null}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button
          variant="outline"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Atualizar dashboard"
        >
          <RefreshCw size={16} />
          {isRefreshing ? "Atualizando" : "Atualizar"}
        </Button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span aria-hidden="true">👤</span>
          <span>{userName}</span>
        </div>
      </div>
    </header>
  );
};
