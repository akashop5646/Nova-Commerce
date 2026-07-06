import { useEffect } from "react";

import { Tag, Plus, Search, Percent } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";


function DiscountsPage() {
  useEffect(() => {
    document.title = "Discounts · Kiln";
  }, []);
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between anim-fade-in-up anim-delay-1">
        <div>
          <h1 className="font-display text-3xl">Discounts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage discount codes.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale">
          <Plus className="h-4 w-4" />
          Create discount
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3 anim-fade-in-up anim-delay-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search discounts..."
            className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/30 transition-shadow"
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden anim-fade-in-up anim-delay-3">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Code</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Value</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Usage</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl" style={{ background: "oklch(0.94 0.03 55)" }}>
                  <Percent className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
                </div>
                <h3 className="mt-4 font-display text-xl">No discounts</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Create discount codes to offer promotions to your customers.
                </p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale">
                  <Plus className="h-4 w-4" />
                  Create discount
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default DiscountsPage;
