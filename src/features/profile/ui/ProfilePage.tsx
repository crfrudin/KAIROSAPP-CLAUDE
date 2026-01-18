"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CalendarDays, Lock, Mail, MapPin, Phone, ShieldCheck, User } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Header } from "@/components/layout/Header";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ToastStack } from "@/components/ui/Toast";
import { useToast } from "@/shared/useToast";
import { useProfileData } from "./useProfileData";

const getStatusLabel = (status: "active" | "overdue" | "trial") => {
  switch (status) {
    case "active":
      return { label: "Ativo", variant: "primary" as const };
    case "overdue":
      return { label: "Pagamento pendente", variant: "danger" as const };
    case "trial":
    default:
      return { label: "Período de teste", variant: "default" as const };
  }
};

export const ProfilePage = () => {
  const { data, isLoading, error, refresh } = useProfileData();
  const { pushToast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
    pushToast("Perfil atualizado");
  };

  const greetingName = useMemo(() => {
    if (!data) {
      return "Usuário";
    }
    return data.socialName ?? data.fullName;
  }, [data]);

  return (
    <AppShell
      header={({ onToggleSidebar }) => (
        <Header
          title="Meu Perfil"
          subtitle={`Bem-vindo(a), ${greetingName}`}
          userName={greetingName}
          onToggleSidebar={onToggleSidebar}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      )}
    >
      <ToastStack />
      {isLoading ? (
        <div className="profile-grid">
          <Card>
            <Skeleton style={{ height: 140 }} />
          </Card>
          <Card>
            <Skeleton style={{ height: 180 }} />
          </Card>
          <Card>
            <Skeleton style={{ height: 180 }} />
          </Card>
          <Card>
            <Skeleton style={{ height: 160 }} />
          </Card>
        </div>
      ) : error || !data ? (
        <Card>
          <div className="list" style={{ alignItems: "center" }}>
            <AlertCircle size={32} className="text-danger" aria-hidden="true" />
            <p>Erro ao carregar o perfil</p>
            <button className="button" onClick={handleRefresh}>
              Tentar novamente
            </button>
          </div>
        </Card>
      ) : (
        <div className="profile-grid">
          <Card className="profile-card">
            <div className="profile-card__header">
              <div className="profile-avatar">
                <User size={22} aria-hidden="true" />
              </div>
              <div>
                <div className="profile-card__title">{data.socialName ?? data.fullName}</div>
                <div className="profile-card__subtitle">{data.fullName}</div>
              </div>
            </div>
            <div className="profile-list">
              <div className="profile-row profile-row--start">
                <Mail size={16} aria-hidden="true" />
                <span>{data.email}</span>
              </div>
              <div className="profile-row profile-row--start">
                <Phone size={16} aria-hidden="true" />
                <span>{data.phone}</span>
              </div>
              <div className="profile-row profile-row--start">
                <CalendarDays size={16} aria-hidden="true" />
                <span>Nascimento: {data.birthDate}</span>
              </div>
              <div className="profile-row profile-row--start">
                <MapPin size={16} aria-hidden="true" />
                <span>
                  {data.location.city}, {data.location.state}
                </span>
              </div>
            </div>
          </Card>

          <Card className="profile-card">
            <div className="card__header">
              <div>
                <div className="card__title">Plano atual</div>
                <div className="card__subtitle">{data.plan.name}</div>
              </div>
              <Badge variant={getStatusLabel(data.plan.status).variant}>
                {getStatusLabel(data.plan.status).label}
              </Badge>
            </div>
            <div className="profile-list">
              <div className="profile-row">
                <span className="profile-pill">Renovação</span>
                <span>{data.plan.renewalDate}</span>
              </div>
              <div className="profile-row">
                <span className="profile-pill">Cobrança</span>
                <span>{data.plan.billing}</span>
              </div>
              <div className="profile-row">
                <span className="profile-pill">Tipo</span>
                <span>{data.plan.plan === "premium" ? "Premium" : "Gratuito"}</span>
              </div>
            </div>
            <div className="profile-actions">
              <Button variant="outline">Gerenciar plano</Button>
              <Button>Atualizar pagamento</Button>
            </div>
          </Card>

          <Card className="profile-card">
            <div className="card__header">
              <div>
                <div className="card__title">Preferências de estudo</div>
                <div className="card__subtitle">Configurações gerais</div>
              </div>
            </div>
            <div className="profile-list">
              <div className="profile-row">
                <span className="profile-pill">Meta diária</span>
                <span>{data.preferences.dailyGoal}</span>
              </div>
              <div className="profile-row">
                <span className="profile-pill">Foco atual</span>
                <span>{data.preferences.focusArea}</span>
              </div>
              <div className="profile-row">
                <span className="profile-pill">Prova</span>
                <span>{data.preferences.examDate}</span>
              </div>
              <div className="profile-row">
                <span className="profile-pill">Método</span>
                <span>{data.preferences.studyMode}</span>
              </div>
              <div className="profile-row profile-row--stack">
                <span className="profile-pill">Notificações</span>
                <div className="profile-chips">
                  <span className={data.preferences.notifications.email ? "chip chip--active" : "chip"}>
                    E-mail
                  </span>
                  <span className={data.preferences.notifications.whatsapp ? "chip chip--active" : "chip"}>
                    WhatsApp
                  </span>
                  <span className={data.preferences.notifications.push ? "chip chip--active" : "chip"}>
                    Push
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="profile-card">
            <div className="card__header">
              <div>
                <div className="card__title">Segurança</div>
                <div className="card__subtitle">Proteção da conta</div>
              </div>
            </div>
            <div className="profile-list">
              <div className="profile-row profile-row--start">
                <Lock size={16} aria-hidden="true" />
                <span>Última atualização de senha: {data.security.lastPasswordUpdate}</span>
              </div>
              <div className="profile-row profile-row--start">
                <ShieldCheck size={16} aria-hidden="true" />
                <span>
                  2FA {data.security.twoFactorEnabled ? "ativo" : "inativo"} •{" "}
                  {data.security.trustedDevices} dispositivos confiáveis
                </span>
              </div>
            </div>
            <div className="profile-actions">
              <Button variant="outline">Alterar senha</Button>
              <Button>Gerenciar 2FA</Button>
            </div>
          </Card>
        </div>
      )}
    </AppShell>
  );
};
