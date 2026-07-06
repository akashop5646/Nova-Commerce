import { useEffect } from "react";

import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";


function AnalyticsPage() {
  useEffect(() => {
    document.title = "Analytics · Kiln";
  }, []);
  return (
    <DashboardLayout>
      <div className="anim-fade-in-up anim-delay-1">
        <h1 className="font-display text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your store's performance.</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4 anim-fade-in-up anim-delay-2">
        <StatCard title="Total sales" value="$0.00" change={0} />
        <StatCard title="Sessions" value="0" change={0} />
        <StatCard title="Conversion rate" value="0%" change={0} />
        <StatCard title="Average order value" value="$0.00" change={0} />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 anim-fade-in-up anim-delay-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-medium">Sales over time</h3>
          <div className="mt-4 flex h-48 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BarChart3 className="mx-auto h-8 w-8 opacity-40" />
              <p className="mt-2 text-sm">No data yet</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-medium">Top products</h3>
          <div className="mt-4 flex h-48 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <TrendingUp className="mx-auto h-8 w-8 opacity-40" />
              <p className="mt-2 text-sm">No data yet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 anim-fade-in-up anim-delay-4">
        <h3 className="font-medium">Visitors by source</h3>
        <div className="mt-4 flex h-40 items-center justify-center text-muted-foreground">
          <div className="text-center">
            <BarChart3 className="mx-auto h-8 w-8 opacity-40" />
            <p className="mt-2 text-sm">No traffic data yet. Share your store to start seeing visitors.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, change }: { title: string; value: string; change: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-3xl">{value}</div>
      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        {change > 0 ? (
          <TrendingUp className="h-3 w-3" style={{ color: "var(--emerald)" }} />
        ) : change < 0 ? (
          <TrendingDown className="h-3 w-3 text-destructive" />
        ) : (
          <Minus className="h-3 w-3" />
        )}
        <span>{change === 0 ? "No change" : `${Math.abs(change)}%`}</span>
      </div>
    </div>
  );
}

export default AnalyticsPage;
