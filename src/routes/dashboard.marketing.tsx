import { useEffect, useState } from "react";
import { Megaphone, Mail, Share2, Bell, Plus, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

type Campaign = {
  id: string;
  name: string;
  sentTo: number;
  status: "Draft" | "Sent" | "Scheduled";
};

const initialCampaigns: Campaign[] = [
  { id: "c1", name: "Summer Launch Discount Announcement", sentTo: 890, status: "Sent" },
  { id: "c2", name: "Abandoned Cart Reminder Automations", sentTo: 142, status: "Draft" },
];

function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    document.title = "Marketing · Kiln";
    setCampaigns(initialCampaigns);
  }, []);

  const handleCreateCampaign = () => {
    const names = [
      "Weekly Newsletter & Product Drops",
      "Winter Clearance Blowout",
      "Customer Appreciation Coupon",
      "Back In Stock Alerts",
    ];
    const nextName = names[Math.floor(Math.random() * names.length)];
    const newCamp: Campaign = {
      id: "c_" + Date.now().toString(36),
      name: nextName,
      sentTo: 0,
      status: "Draft",
    };

    console.log("[Platform Engine Integration] Marketing campaign registered successfully:", newCamp);
    setCampaigns(prev => [...prev, newCamp]);
  };

  const handleRemoveCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Marketing</h1>
          <p className="mt-1 text-sm text-muted-foreground">Promote your storefront, target audiences, and increase conversions.</p>
        </div>
        <button 
          onClick={handleCreateCampaign}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Create Campaign
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 anim-fade-in-up anim-delay-2">
        <MarketingCard
          icon={Mail}
          title="Email campaigns"
          description="Send promotional emails to your subscribers."
          cta="Trigger email"
          onClick={handleCreateCampaign}
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
          cta="Set up reminders"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <div className="border-b border-border bg-muted/20 px-6 py-4">
          <h3 className="font-medium text-foreground">Active Marketing Campaigns ({campaigns.length})</h3>
        </div>
        
        <div className="divide-y divide-border">
          {campaigns.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Megaphone className="h-8 w-8 mx-auto opacity-30 mb-2" />
              <p className="text-sm">No campaigns defined yet.</p>
            </div>
          ) : (
            campaigns.map(c => (
              <div key={c.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/10 transition-colors">
                <div>
                  <h4 className="font-medium text-foreground text-sm">{c.name}</h4>
                  <div className="flex gap-2 items-center mt-1">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${c.status === "Sent" ? "bg-emerald-500/10 text-emerald-600" : "bg-zinc-500/10 text-zinc-600"}`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-muted-foreground">Sent to {c.sentTo} subscribers</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveCampaign(c.id)}
                  className="p-1.5 rounded-lg border border-border hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function MarketingCard({ icon: Icon, title, description, cta, onClick }: { icon: any; title: string; description: string; cta: string; onClick?: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-[var(--shadow-card)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted/40">
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <h3 className="mt-4 font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <button 
        onClick={onClick}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline cursor-pointer text-left" 
        style={{ color: "var(--terracotta)" }}
      >
        {cta} →
      </button>
    </div>
  );
}

export default MarketingPage;
