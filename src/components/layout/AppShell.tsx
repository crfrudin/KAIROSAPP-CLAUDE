"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
  header: (params: { onToggleSidebar: () => void }) => React.ReactNode;
};

export const AppShell = ({ children, header }: AppShellProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggle = () => setIsDrawerOpen((prev) => !prev);
  const handleClose = () => setIsDrawerOpen(false);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className={`drawer-overlay ${isDrawerOpen ? "drawer-overlay--open" : ""}`} onClick={handleClose} />
      <div className={`drawer ${isDrawerOpen ? "drawer--open" : ""}`} aria-hidden={!isDrawerOpen}>
        <Sidebar onNavigate={handleClose} />
      </div>
      <div className="layout-content">
        {header({ onToggleSidebar: handleToggle })}
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};
