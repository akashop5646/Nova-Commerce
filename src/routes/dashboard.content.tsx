import { useEffect } from "react";

import { FileText, Plus, Layout, Image, PenLine } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";


function ContentPage() {
  useEffect(() => {
    document.title = "Content · Kiln";
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Content</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage pages, blog posts, and media.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale">
          <Plus className="h-4 w-4" />
          Create page
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3 anim-fade-in-up anim-delay-2">
        <ContentCard
          icon={Layout}
          title="Pages"
          description="Static pages like About, Contact, and FAQ."
          count={0}
        />
        <ContentCard
          icon={PenLine}
          title="Blog posts"
          description="Articles and updates for your customers."
          count={0}
        />
        <ContentCard
          icon={Image}
          title="Media"
          description="Images, videos, and other files."
          count={0}
        />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center anim-fade-in-up anim-delay-3">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
          <FileText className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
        </div>
        <h3 className="mt-4 font-display text-xl">Build your brand</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Create pages and content to tell your story and connect with customers.
        </p>
      </div>
    </DashboardLayout>
  );
}

function ContentCard({ icon: Icon, title, description, count }: { icon: any; title: string; description: string; count: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition hover:shadow-[var(--shadow-card)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
        <Icon className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <p className="mt-3 text-xs text-muted-foreground">{count} items</p>
    </div>
  );
}

export default ContentPage;
