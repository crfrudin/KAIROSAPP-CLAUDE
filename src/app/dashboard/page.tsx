import { ToastProvider } from "@/shared/useToast";
import { DashboardPage } from "@/features/dashboard/ui/DashboardPage";

export default function DashboardRoute() {
  return (
    <ToastProvider>
      <DashboardPage />
    </ToastProvider>
  );
}
