"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Calendar,
  FileText,
  LogOut,
  Settings,
  Sun,
  Trophy,
  User
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/perfil", label: "Meu Perfil", icon: User },
  { href: "/materias", label: "Minhas Matérias", icon: BookOpen },
  { href: "/informativos", label: "Informativos", icon: FileText },
  { href: "/cronograma", label: "Cronograma", icon: Calendar },
  { href: "/estatisticas", label: "Estatísticas", icon: BarChart3 },
  { href: "/conquistas", label: "Conquistas", icon: Trophy },
  { href: "/ajustes", label: "Ajustes", icon: Settings }
];

type SidebarProps = {
  onNavigate?: () => void;
};

export const Sidebar = ({ onNavigate }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar" aria-label="Navegação principal">
      <Link href="/dashboard" className="sidebar__logo" aria-label="KAIROS">
        <span aria-hidden="true">⏱️</span>
        KAIROS
      </Link>
      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx("sidebar__link", isActive && "sidebar__link--active")}
              aria-current={isActive ? "page" : undefined}
              onClick={onNavigate}
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar__footer">
        <button className="sidebar__link" type="button">
          <Sun size={18} aria-hidden="true" />
          Alternar tema
        </button>
        <button className="sidebar__link" type="button">
          <LogOut size={18} aria-hidden="true" />
          Sair
        </button>
      </div>
    </aside>
  );
};
