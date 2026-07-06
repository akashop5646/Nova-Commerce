import { useEffect } from "react";

import { Megaphone, Mail, Share2, Bell, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";


function MarketingPage() {
  useEffect(() => {
    document.title = "Marketing · Kiln";
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Marketing</h1>
          <p className="mt-1 text-sm text-muted-foreground">Promote your store and reach more customers.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 anim-fade-in-up anim-delay-2">
        <MarketingCard
          icon={Mail}
          title="Email campaigns"
          description="Send promotional emails to your subscribers."
          cta="Create campaign"
        />
        <MarketingCard
          icon={Share2}
          title="Social media"
          description="Share your products on social platforms."
          cta="Connect accounts"
        />
        <MarketingCard
          icon={Bell}
          title="Abandoned cart"
          description="Recover lost sales with automated reminders."
          cta="Set up"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center anim-fade-in-up anim-delay-3">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
          <Megaphone className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
        </div>
        <h3 className="mt-4 font-display text-xl">Start promoting</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Once your store is set up, use these tools to drive traffic and increase sales.
        </p>
      </div>
    </DashboardLayout>
  );
}

function MarketingCard({ icon: Icon, title, description, cta }: { icon: any; title: string; description: string; cta: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-[var(--shadow-card)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ color: "var(--terracotta)" }}>
        {cta} →
      </button>
    </div>
  );
}

export default MarketingPage;
