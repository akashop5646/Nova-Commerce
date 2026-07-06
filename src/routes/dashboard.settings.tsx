import { useEffect } from "react";

import { Settings, Store, CreditCard, Truck, Globe, Users, Bell, Shield, Key } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";


function SettingsPage() {
  useEffect(() => {
    document.title = "Settings · Kiln";
  }, []);
  return (
    <DashboardLayout>
      <div className="anim-fade-in-up anim-delay-1">
        <h1 className="font-display text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your store settings and preferences.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 anim-fade-in-up anim-delay-2">
        <SettingsCard
          icon={Store}
          title="Store details"
          description="Name, contact info, and store address."
        />
        <SettingsCard
          icon={CreditCard}
          title="Payments"
          description="Payment providers and checkout settings."
        />
        <SettingsCard
          icon={Truck}
          title="Shipping"
          description="Shipping rates and delivery zones."
        />
        <SettingsCard
          icon={Globe}
          title="Domains"
          description="Custom domains and SSL certificates."
        />
        <SettingsCard
          icon={Users}
          title="Team"
          description="Invite team members and manage permissions."
        />
        <SettingsCard
          icon={Bell}
          title="Notifications"
          description="Email and push notification preferences."
        />
        <SettingsCard
          icon={Shield}
          title="Security"
          description="Password, two-factor authentication, and sessions."
        />
        <SettingsCard
          icon={Key}
          title="API keys"
          description="Manage API keys for integrations."
        />
      </div>
    </DashboardLayout>
  );
}

function SettingsCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <button className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:shadow-[var(--shadow-card)] hover-slide-right">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

export default SettingsPage;
