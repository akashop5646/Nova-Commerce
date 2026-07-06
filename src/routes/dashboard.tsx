import { Link, Outlet, useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { ShoppingBag, Check, PartyPopper, X, ChevronDown, ChevronRight } from "lucide-react";
import { useOnboarding } from "@/lib/onboarding";
import { DashboardLayout } from "@/components/dashboard-layout";

function DashboardLayoutWrapper() {
  const location = useLocation();
  const isParentRoute = location.pathname === "/dashboard" || location.pathname === "/dashboard/";

  useEffect(() => {
    if (isParentRoute) {
      document.title = "Home · Kiln";
    }
  }, [isParentRoute]);

  if (!isParentRoute) {
    return <Outlet />;
  }

  return <DashboardComponent />;
}

type ChecklistItem = {
  id: string;
  title: string;
  desc: string;
  cta: string;
  show?: boolean;
};

function DashboardComponent() {
  const { storeName, productType, channels } = useOnboarding();
  const displayName = storeName.trim() || "Your store";

  const items = useMemo<ChecklistItem[]>(() => {
    const hasPhysical = productType === "physical" || productType === "unsure" || productType === "";
    const channelLabel =
      channels.includes("social")
        ? "Connect a social channel"
        : channels.includes("marketplace")
          ? "Connect a marketplace"
          : channels.includes("inperson")
            ? "Set up in-person selling"
            : "Share your store";
    return [
      { id: "product", title: "Add your first product", desc: "Give your store something to sell. You can always add more later.", cta: "Add product" },
      { id: "theme", title: "Customize your theme", desc: "Pick colors, fonts, and layout that feel like you.", cta: "Customize theme" },
      { id: "domain", title: "Set up a custom domain", desc: "Point yourshop.com at your Kiln store.", cta: "Add domain" },
      { id: "payments", title: "Set up payments", desc: "Accept cards, wallets, and BNPL out of the box.", cta: "Set up payments" },
      { id: "shipping", title: "Set your shipping rates", desc: "Decide how much to charge, where you deliver.", cta: "Set up shipping", show: hasPhysical },
      { id: "channel", title: channelLabel, desc: "Reach customers where they already spend time.", cta: "Connect channel" },
    ].filter((i) => i.show !== false);
  }, [productType, channels]);

  const [done, setDone] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id ?? null);
  const [dismissed, setDismissed] = useState(false);

  const total = items.length;
  const completed = items.filter((i) => done[i.id]).length;
  const percent = total ? (completed / total) * 100 : 0;
  const allDone = completed === total;

  return (
    <DashboardLayout>
      <h1 className="font-display text-3xl anim-fade-in-up anim-delay-1">Good morning, {displayName}.</h1>
      <p className="mt-1 text-sm text-muted-foreground anim-fade-in-up anim-delay-2">
        Here's what to do next. You'll be open for business in no time.
      </p>

      {!dismissed && (
        <section className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] anim-fade-in-up anim-delay-3">
          <div className="flex items-start justify-between gap-4 border-b border-border bg-muted/30 p-6">
            <div>
              <div className="text-xs uppercase tracking-[0.15em]" style={{ color: "var(--terracotta)" }}>
                Setup guide
              </div>
              <h2 className="mt-1 font-display text-2xl">
                {allDone ? "Setup complete." : `${completed} of ${total} tasks completed`}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {allDone
                  ? "Nice work. Your shop is ready to open."
                  : "Use this guide to get your store ready to sell."}
              </p>
            </div>
            {allDone ? (
              <button
                onClick={() => setDismissed(true)}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            ) : (
              <PartyPopper className="h-5 w-5 text-muted-foreground" style={{ opacity: percent > 50 ? 1 : 0.35 }} />
            )}
          </div>
          <div className="h-1.5 w-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: `${percent}%`,
                background: "var(--terracotta)",
                transition: "width 800ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
          <ul className="divide-y divide-border">
            {items.map((item, i) => {
              const isDone = !!done[item.id];
              const isOpen = expanded === item.id;
              return (
                <ChecklistRow key={item.id} item={item} isDone={isDone} isOpen={isOpen} index={i} onToggle={() => setExpanded(isOpen ? null : item.id)} onCheck={() => setDone((d) => ({ ...d, [item.id]: !d[item.id] }))} onComplete={() => setDone((d) => ({ ...d, [item.id]: true }))} />
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <EmptyStat title="Total sales" value="$0.00" hint="Sales will appear here once you make one." delay={0} />
        <EmptyStat title="Sessions" value="0" hint="Visitors show up after you share your store." delay={1} />
        <EmptyStat title="Orders" value="0" hint="Your first order is closer than you think." delay={2} />
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-8 text-center anim-fade-in-up anim-delay-5">
        <div
          className="mx-auto grid h-12 w-12 place-items-center rounded-xl"
          style={{ background: "oklch(0.94 0.03 55)" }}
        >
          <ShoppingBag className="h-5 w-5" style={{ color: "var(--terracotta)" }} />
        </div>
        <h3 className="mt-4 font-display text-2xl">No orders yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Orders will show up here once customers start buying.
        </p>
        <Link
          to="/dashboard/products"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 hover-scale"
        >
          Add a product
        </Link>
      </section>

      <div className="mt-10 flex justify-center pb-16">
        <Link to="/" className="text-xs text-muted-foreground underline hover:text-foreground transition-colors">
          ← Back to landing page (demo)
        </Link>
      </div>
    </DashboardLayout>
  );
}

function ChecklistRow({
  item,
  isDone,
  isOpen,
  index,
  onToggle,
  onCheck,
  onComplete,
}: {
  item: ChecklistItem;
  isDone: boolean;
  isOpen: boolean;
  index: number;
  onToggle: () => void;
  onCheck: () => void;
  onComplete: () => void;
}) {
  return (
    <li
      className="anim-fade-in"
      style={{ animationDelay: `${200 + index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-muted/30 hover-slide-right"
      >
        <span
          onClick={(e) => {
            e.stopPropagation();
            onCheck();
          }}
          className={
            "grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 border-dashed transition " +
            (isDone ? "border-transparent" : "border-border hover:border-foreground")
          }
          style={isDone ? { background: "var(--emerald)", borderStyle: "solid" } : undefined}
        >
          {isDone && <Check className="h-3.5 w-3.5 text-white" />}
        </span>
        <span className="flex-1">
          <span
            className={
              "block font-medium " +
              (isDone ? "text-muted-foreground line-through" : "")
            }
          >
            {item.title}
          </span>
        </span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && !isDone && (
        <div className="grid gap-4 px-6 pb-6 pl-16 md:grid-cols-[1fr_auto] md:items-center anim-fade-in-down">
          <p className="text-sm text-muted-foreground">{item.desc}</p>
          <button
            onClick={onComplete}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 hover-scale"
          >
            {item.cta}
          </button>
        </div>
      )}
    </li>
  );
}

function EmptyStat({ title, value, hint, delay }: { title: string; value: string; hint: string; delay: number }) {
  return (
    <div
      className="rounded-2xl border border-border bg-card p-5 anim-scale-in"
      style={{ animationDelay: `${300 + delay * 100}ms` }}
    >
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="mt-1 font-display text-3xl">{value}</div>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export default DashboardLayoutWrapper;
