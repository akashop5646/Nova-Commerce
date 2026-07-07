import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Palette, Layout, Smartphone, ExternalLink, Settings } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";


function OnlineStorePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    document.title = "Online Store · Kiln";
    try {
      const rawUser = localStorage.getItem("kiln.auth.user");
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (u?.id) setUserId(u.id);
      }
    } catch {}
  }, []);

  const handleViewStore = () => {
    if (userId) {
      window.open(`/store/${userId}`, "_blank");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Online Store</h1>
          <p className="mt-1 text-sm text-muted-foreground">Customize your storefront and themes.</p>
        </div>
        <button 
          onClick={handleViewStore}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          <ExternalLink className="h-4 w-4" />
          View store
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 anim-fade-in-up anim-delay-2">
        <StoreCard
          icon={Palette}
          title="Theme"
          description="Customize colors, fonts, and layout of your store."
          cta="Customize"
          onClick={() => navigate("/dashboard/online-store/builder")}
        />
        <StoreCard
          icon={Layout}
          title="Navigation"
          description="Set up your store's menu and page links."
          cta="Edit navigation"
        />
        <StoreCard
          icon={Smartphone}
          title="Mobile preview"
          description="See how your store looks on mobile devices."
          cta="Preview"
        />
        <StoreCard
          icon={Settings}
          title="Store settings"
          description="Manage checkout, shipping, and payment options."
          cta="Configure"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <div className="border-b border-border bg-muted/30 p-6">
          <h3 className="font-medium">Theme preview</h3>
          <p className="mt-1 text-sm text-muted-foreground">Your current storefront appearance.</p>
        </div>
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Globe className="mx-auto h-8 w-8 opacity-40" />
            <p className="mt-2 text-sm">Preview will appear here once you customize your theme.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StoreCard({ icon: Icon, title, description, cta, onClick }: { icon: any; title: string; description: string; cta: string; onClick?: () => void }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-[var(--shadow-card)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <button
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline cursor-pointer"
        style={{ color: "var(--terracotta)" }}
        onClick={onClick}
      >
        {cta} →
      </button>
    </div>
  );
}

export default OnlineStorePage;
