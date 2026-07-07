import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Palette, Layout, Smartphone, ExternalLink, Settings, Sparkles, Check, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { getTemplates } from "@/lib/design-engine/templates";
import type { ThemeConfig } from "@/lib/design-engine/types";

export default function OnlineStorePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const templates = getTemplates();

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

  const handlePreviewPreset = (presetId: string) => {
    window.open(`/storefront-preview?preset=${presetId}`, "_blank");
  };

  const handleCustomizePreset = (presetId: string) => {
    navigate(`/dashboard/online-store/builder?preset=${presetId}`);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 anim-fade-in-up anim-delay-1 pb-6 border-b border-border/60">
        <div>
          <h1 className="font-display text-3xl tracking-tight text-foreground flex items-center gap-2">
            Online Store
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Select, customize, and publish professional themes for your storefront.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard/online-store/builder")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <Palette className="h-4 w-4 text-primary" />
            Open Customizer
          </button>
          <button 
            onClick={handleViewStore}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
            style={{ background: "var(--terracotta)" }}
          >
            <ExternalLink className="h-4 w-4" />
            View store
          </button>
        </div>
      </div>

      {/* Active Theme Preview Banner */}
      <div className="mt-8 rounded-2xl border border-border bg-card/40 overflow-hidden shadow-sm hover:shadow-md transition duration-300 anim-fade-in-up anim-delay-2">
        <div className="flex flex-col lg:flex-row">
          {/* Details */}
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Active Theme
              </span>
              <h2 className="mt-4 font-display text-2xl text-foreground">Your Customized Storefront</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md">
                Your draft design contains all customized sections, fonts, colors, and layout configurations. Customize it visually or publish it to update your live storefront.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/dashboard/online-store/builder")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition cursor-pointer"
              >
                Customize Current Draft
              </button>
              <button
                onClick={handleViewStore}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted transition cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" />
                View Live Storefront
              </button>
            </div>
          </div>
          {/* Simulated Mockup Preview */}
          <div className="lg:w-96 border-t lg:border-t-0 lg:border-l border-border bg-muted/20 p-8 flex items-center justify-center">
            <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-xl border border-border bg-background shadow-lg overflow-hidden flex flex-col">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-muted/30">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="w-16 h-3 rounded bg-zinc-200" />
                  <div className="w-4 h-4 rounded-full bg-zinc-200" />
                </div>
                <div className="my-3 space-y-1.5">
                  <div className="w-full h-8 rounded bg-zinc-100" />
                  <div className="w-3/4 h-3 rounded bg-zinc-200" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="aspect-square rounded bg-zinc-50 border border-zinc-100" />
                  <div className="aspect-square rounded bg-zinc-50 border border-zinc-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Presets Library */}
      <div className="mt-12 anim-fade-in-up anim-delay-3">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-xl text-foreground">Theme Presets Library</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Explore starter templates designed for clothing, accessories, and wellness stores.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:shadow-lg hover:border-border-hover"
            >
              {/* Visual Mockup representation of Preset colors */}
              <PresetMockup theme={tpl.theme} name={tpl.name} />

              {/* Title & Info */}
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {tpl.name}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-muted text-muted-foreground uppercase tracking-wide">
                      {tpl.category.split(" ")[0]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Color and typography chips */}
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Object.entries(tpl.theme.colors).slice(0, 4).map(([key, val]) => (
                      <span
                        key={key}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ background: val }}
                        title={key}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {tpl.theme.typography.headingFont}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handlePreviewPreset(tpl.id)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted transition cursor-pointer"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleCustomizePreset(tpl.id)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg text-white px-3 py-2 text-xs font-semibold transition cursor-pointer"
                    style={{ background: "var(--terracotta)" }}
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function PresetMockup({ theme, name }: { theme: ThemeConfig; name: string }) {
  return (
    <div
      style={{
        background: theme.colors.background,
        color: theme.colors.text,
        borderColor: `${theme.colors.text}10`,
      }}
      className="relative h-44 w-full rounded-xl overflow-hidden border shadow-sm flex flex-col p-4 select-none"
    >
      {/* Mini header */}
      <div className="flex justify-between items-center border-b pb-2 mb-2" style={{ borderColor: `${theme.colors.text}12` }}>
        <span className="text-[9px] font-bold uppercase tracking-wider" style={{ fontFamily: theme.typography.headingFont }}>
          {name.split(" ")[0]}
        </span>
        <div className="flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.colors.text, opacity: 0.7 }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.colors.accent }} />
        </div>
      </div>

      {/* Mini Hero content */}
      <div className="flex-1 flex flex-col justify-center">
        <h5 className="text-[12px] font-extrabold leading-tight tracking-tight" style={{ fontFamily: theme.typography.headingFont }}>
          Select Essentials
        </h5>
        <p className="text-[7.5px] opacity-60 mt-1 max-w-[85%] leading-normal">
          Designed for optimal comfort and clean, modern style.
        </p>
        <div className="mt-3 flex gap-1">
          <span className="px-2 py-0.5 rounded-[3px] text-[7px] font-bold" style={{ background: theme.colors.accent, color: theme.colors.background }}>
            Shop
          </span>
          <span className="px-2 py-0.5 rounded-[3px] text-[7px] font-bold border" style={{ color: theme.colors.text, borderColor: `${theme.colors.text}25` }}>
            Details
          </span>
        </div>
      </div>
      
      {/* Corner radius indicator */}
      <div className="absolute bottom-2 right-2 text-[6.5px] font-mono opacity-30">
        r:{theme.cards.radius}px
      </div>
    </div>
  );
}
