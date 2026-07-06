import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { setOnboarding } from "@/lib/onboarding";

const testimonials = [
  {
    id: 1,
    quote: "I opened Larder & Co. on a Sunday afternoon. By Tuesday I'd shipped my first ten orders.",
    founder: "Mira Okafor",
    company: "Larder & Co.",
    domain: "larderandco.kiln.store",
    image: "/larder_co.png",
  },
  {
    id: 2,
    quote: "Kiln's checkout converted 40% better than our previous custom setup. The transition was seamless.",
    founder: "Lukas Berg",
    company: "Studio Nord",
    domain: "studionord.kiln.store",
    image: "/studio_nord.png",
  },
  {
    id: 3,
    quote: "Managing inventory across three locations used to take hours. Now it's fully automated on Kiln.",
    founder: "Elena Rostova",
    company: "Flora Botanicals",
    domain: "florabotanicals.kiln.store",
    image: "/flora_botanicals.png",
  },
];

type SignupSearch = { src?: string };

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.title = "Create your account · Kiln";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("Enter a valid email address.");
    if (password.length < 8) return setErr("Use at least 8 characters.");
    setOnboarding({ email });
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-0 lg:p-6">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 lg:rounded-3xl border-0 lg:border border-border/80 bg-card overflow-hidden shadow-2xl min-h-screen lg:min-h-[85vh]">
        <aside
          className="relative hidden flex-col justify-between p-10 text-background lg:flex anim-fade-in overflow-hidden grain lg:m-3 lg:rounded-2xl"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.32 0.06 155), oklch(0.22 0.04 155))",
          }}
        >
          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-background/10">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display text-xl">Kiln</span>
          </Link>

          {/* Browser Mockup Centerpiece */}
          <div className="relative flex-1 flex items-center justify-center py-8">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/20 backdrop-blur-md">
              {testimonials.map((item, idx) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 flex flex-col ${
                    idx === currentIndex ? "browser-mockup-active" : "browser-mockup-inactive"
                  }`}
                >
                  {/* Browser Header Bar */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10 select-none">
                    {/* Circle buttons */}
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    </div>
                    {/* Address bar */}
                    <div className="mx-auto flex items-center justify-center rounded-md bg-white/5 px-4 py-1 text-[11px] font-mono text-white/50 w-2/3 border border-white/5 truncate">
                      {item.domain}
                    </div>
                  </div>

                  {/* Browser Viewport */}
                  <div className="relative flex-1 overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.company}
                      className="absolute top-0 left-0 w-full object-cover origin-top animate-storefront-scroll"
                      style={{
                        height: "140%", // Taller than container to support scroll keyframes
                      }}
                    />
                    {/* Overlay to blend mockup nicely */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Quote Slider */}
          <div className="relative h-40 flex flex-col justify-end">
            {testimonials.map((item, idx) => (
              <div
                key={item.id}
                className={`absolute bottom-0 left-0 right-0 ${
                  idx === currentIndex ? "carousel-slide-active" : "carousel-slide-inactive"
                }`}
              >
                <blockquote className="font-display text-2.5xl md:text-3xl leading-snug text-balance">
                  "{item.quote}"
                </blockquote>
                <div className="mt-4 flex items-center gap-3 text-sm opacity-80">
                  <span className="font-semibold">{item.founder}</span>
                  <span className="opacity-50">—</span>
                  <span className="italic">{item.company}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 mt-8 flex items-center justify-between text-xs opacity-60">
            <span>© 2026 Kiln, Inc.</span>
            {/* Dots navigation to show slider progress */}
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-white w-3" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </aside>

        <main className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm">
            <Link to="/" className="flex items-center gap-2 lg:hidden anim-fade-in-down">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg"
                style={{ background: "var(--terracotta)" }}
              >
                <Sparkles className="h-4 w-4 text-background" />
              </span>
              <span className="font-display text-xl">Kiln</span>
            </Link>
            <h1 className="mt-6 font-display text-4xl leading-tight anim-fade-in-up anim-delay-1">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground anim-fade-in-up anim-delay-2">
              Free for three days. No credit card required.
            </p>

            <div className="mt-8 grid gap-2 anim-fade-in-up anim-delay-3">
              <button
                type="button"
                onClick={() => {
                  setOnboarding({ email: "you@gmail.com" });
                  navigate("/onboarding");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted hover-lift"
              >
                <GoogleIcon /> Continue with Google
              </button>
              <button
                type="button"
                onClick={() => {
                  setOnboarding({ email: "you@icloud.com" });
                  navigate("/onboarding");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium hover:bg-muted hover-lift"
              >
                <AppleIcon /> Continue with Apple
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground anim-fade-in anim-delay-4">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={submit} className="grid gap-3">
              <label className="grid gap-1.5 anim-fade-in-up" style={{ animationDelay: "360ms" }}>
                <span className="text-xs font-medium text-muted-foreground">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErr(null);
                  }}
                  placeholder="you@shop.com"
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow"
                />
              </label>
              <label className="grid gap-1.5 anim-fade-in-up" style={{ animationDelay: "440ms" }}>
                <span className="text-xs font-medium text-muted-foreground">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErr(null);
                  }}
                  placeholder="At least 8 characters"
                  className="rounded-lg border border-border bg-card px-4 py-3 text-sm outline-none ring-ring/30 focus:ring-2 transition-shadow"
                />
              </label>
              {err && <p className="text-xs text-destructive">{err}</p>}
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background hover:opacity-90 hover-scale anim-fade-in-up"
                style={{ animationDelay: "520ms" }}
              >
                Create account <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            <p className="mt-6 text-xs text-muted-foreground anim-fade-in anim-delay-6">
              By continuing you agree to Kiln's{" "}
              <a className="underline" href="#">Terms</a> and{" "}
              <a className="underline" href="#">Privacy Policy</a>.
            </p>

            <p className="mt-6 text-sm text-muted-foreground anim-fade-in anim-delay-7">
              Already have an account?{" "}
              <Link to="/signup" className="font-medium text-foreground underline">
                Log in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.24 1.4-1.66 4.1-5.4 4.1-3.25 0-5.9-2.7-5.9-6s2.65-6 5.9-6c1.85 0 3.09.79 3.8 1.47l2.6-2.5C16.5 3.7 14.5 2.8 12 2.8 6.87 2.8 2.75 6.9 2.75 12S6.87 21.2 12 21.2c6.05 0 8.94-4.24 8.94-8.5 0-.57-.06-1-.14-1.5H12z"
      />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M16.7 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.2-2.9.9-3.6.9-.8 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.4-1.6 2.9-.4 7.1 1.2 9.5.8 1.2 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2.1-1.2 2.8-2.3.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-1-2.5-3.9zM14.4 5.6c.6-.8 1.1-2 .9-3.1-1 0-2.2.6-2.9 1.4-.6.7-1.2 1.9-1 3 1.1.1 2.3-.5 3-1.3z" />
    </svg>
  );
}

export default SignupPage;
