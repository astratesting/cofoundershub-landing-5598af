"use client";

import { useState, useEffect, useRef } from "react";

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Intersection observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Stat component ───────────────────────────────────────────────────────────
function StatCard({
  value,
  suffix,
  prefix,
  label,
  delay,
  started,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay: number;
  started: boolean;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(value, 1800, go);

  return (
    <div className="card-glass rounded-sm p-8 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="stat-number text-4xl lg:text-5xl font-light text-white mb-2">
        {prefix && <span className="text-blue-400">{prefix}</span>}
        {count.toLocaleString()}
        {suffix && <span className="text-blue-400">{suffix}</span>}
      </div>
      <div
        className="text-sm text-slate-500 uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Feature card ─────────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  tag,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="card-glass rounded-sm p-7 reveal group cursor-default"
      style={{ animationDelay: delay }}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="w-10 h-10 rounded-sm bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/15 group-hover:border-blue-500/35 transition-all duration-300">
          {icon}
        </div>
        <span className="tag-mono">{tag}</span>
      </div>
      <h3
        className="text-lg text-white mb-2.5 leading-snug"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.25rem" }}
      >
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ─── How it works step ────────────────────────────────────────────────────────
function Step({
  number,
  title,
  description,
  isLast,
}: {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-sm border border-blue-500/30 bg-blue-500/5 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/60 group-hover:bg-blue-500/10 transition-all duration-300">
          <span
            className="text-blue-400 font-medium"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
          >
            {number}
          </span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-3 bg-gradient-to-b from-blue-500/25 to-transparent min-h-[3rem]" />
        )}
      </div>
      <div className="pb-10">
        <h3
          className="text-white text-xl mb-2"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{description}</p>
      </div>
    </div>
  );
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
function Testimonial({
  quote,
  name,
  role,
  outcome,
}: {
  quote: string;
  name: string;
  role: string;
  outcome: string;
}) {
  return (
    <div className="card-glass rounded-sm p-7 flex flex-col gap-5 group">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-3 h-3 text-blue-400 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p
        className="text-slate-300 leading-relaxed italic flex-1"
        style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 300 }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white text-sm font-medium">{name}</div>
          <div className="text-slate-500 text-xs mt-0.5">{role}</div>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-sm bg-blue-500/8 border border-blue-500/20 text-blue-400"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {outcome}
        </span>
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#06080f] overflow-x-hidden">
      {/* ── Ambient orbs ── */}
      <div
        className="orb w-[600px] h-[600px] bg-blue-600/8 -top-60 left-1/2 -translate-x-1/2"
        style={{ position: "fixed", zIndex: 0 }}
      />
      <div
        className="orb w-[400px] h-[400px] bg-cyan-500/5 top-1/2 -right-40"
        style={{ position: "fixed", zIndex: 0 }}
      />

      {/* ════════════════════════════════════════════════════
          NAV
      ════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "nav-blur bg-[#06080f]/85 border-b border-blue-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-sm bg-blue-500 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600" />
              <svg className="w-4 h-4 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span
              className="text-white font-medium tracking-tight"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", letterSpacing: "-0.01em" }}
            >
              CoFounders<span className="text-blue-400">Hub</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Social Proof", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="btn-ghost text-sm py-2 px-4">Sign in</a>
            <a href="#" className="btn-primary text-sm py-2 px-5">
              Apply for Access
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden nav-blur bg-[#06080f]/95 border-t border-blue-500/10 px-6 py-4 flex flex-col gap-4">
            {["Features", "How It Works", "Social Proof", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-400 hover:text-white text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
            <a href="#" className="btn-primary text-sm w-fit">Apply for Access</a>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 bg-grid noise-overlay">
        {/* Radial glow behind hero */}
        <div className="absolute inset-0 bg-radial-accent pointer-events-none" />
        <div className="absolute inset-0 bg-radial-signal pointer-events-none" />

        {/* Pre-badge */}
        <div className="reveal reveal-delay-1 flex items-center gap-2 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span
            className="text-slate-400"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em" }}
          >
            NOW OPEN — COHORT 08 • 240 SPOTS REMAINING
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="reveal reveal-delay-2 text-center max-w-4xl leading-none mb-6"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 300 }}
        >
          <span className="text-white">Find the co-founder who makes</span>
          <br />
          <span className="text-gradient-blue italic glow-blue"> your startup inevitable.</span>
        </h1>

        {/* Subheadline */}
        <p className="reveal reveal-delay-3 text-center max-w-xl text-slate-400 text-lg leading-relaxed mb-10">
          CoFoundersHub uses 47-dimension AI matching to pair technical and business founders with{" "}
          <span className="text-slate-300">verified commitment</span>,{" "}
          <span className="text-slate-300">aligned equity expectations</span>, and{" "}
          <span className="text-slate-300">compatible work styles</span> — before you ever shake hands.
        </p>

        {/* CTA buttons */}
        <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-3 mb-16">
          <a href="#" className="btn-primary text-base px-8 py-3.5">
            Apply for Access
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn-ghost text-base px-8 py-3.5">
            See how it works
          </a>
        </div>

        {/* Social proof line */}
        <div className="reveal reveal-delay-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center">
          <div className="flex -space-x-2">
            {["MJ", "SR", "AK", "PL", "TW"].map((init, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#06080f] flex items-center justify-center text-xs font-medium"
                style={{
                  background: `hsl(${210 + i * 15}, 60%, ${25 + i * 5}%)`,
                  color: `hsl(${210 + i * 15}, 80%, 75%)`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                }}
              >
                {init}
              </div>
            ))}
          </div>
          <div
            className="text-slate-500 text-sm"
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem" }}
          >
            <span className="text-slate-300">12,400+</span> founders matched ·{" "}
            <span className="text-slate-300">$240M</span> raised ·{" "}
            <span className="text-slate-300">89</span> countries
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════════════ */}
      <section className="relative py-20 px-6 border-y border-blue-500/8" ref={statsRef}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={12400} suffix="+" label="Founders matched" delay={0} started={statsInView} />
            <StatCard value={240} prefix="$" suffix="M" label="Raised by CFH companies" delay={150} started={statsInView} />
            <StatCard value={89} label="Countries represented" delay={300} started={statsInView} />
            <StatCard value={33} suffix="%" label="Match-to-company rate" delay={450} started={statsInView} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════════ */}
      <section id="features" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="tag-mono mb-4 inline-block">Platform Features</span>
            <h2
              className="text-white mt-3 mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}
            >
              Built for founders who are{" "}
              <span className="text-gradient-blue italic">serious about building.</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto text-base leading-relaxed">
              Most co-founder platforms are glorified LinkedIn search. We built everything the
              co-founder relationship actually needs — from first match to first dollar.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              tag="AI · CORE"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              }
              title="Signal Match AI"
              description="Goes beyond skills and location. Our 47-dimension model scores domain expertise, risk tolerance, decision-making style, communication cadence, and ambition trajectory — surfaces who you'll actually build well with."
              delay="0.1s"
            />
            <FeatureCard
              tag="LEGAL · EQUITY"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              }
              title="Equity Alignment Engine"
              description="See cap table previews before any conversation starts. Both founders independently set equity expectations — we surface misalignment before you waste weeks on a relationship that was never going to work."
              delay="0.2s"
            />
            <FeatureCard
              tag="TRUST · VERIFIED"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 10c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />
                </svg>
              }
              title="Verified Traction Score"
              description="Only founders who demonstrate real commitment get access. We verify GitHub activity, domain purchases, user interviews, or revenue — no tire-kickers, no idea-only explorers. Every match is a builder."
              delay="0.3s"
            />
            <FeatureCard
              tag="PRIVACY · SECURE"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              }
              title="NDA-Gated Introductions"
              description="Every first conversation is protected by a mutual NDA, auto-signed before profiles are fully revealed. Share your real idea, your real numbers, your real runway — without the anxiety of open exposure."
              delay="0.4s"
            />
            <FeatureCard
              tag="ASSESSMENT · DEEP"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              }
              title="Founder DNA Profile"
              description="A 40-minute deep assessment covering conflict resolution style, 2AM-crisis communication, vision vs. execution balance, and long-term lifestyle goals. This is the interview process your co-founder deserves."
              delay="0.5s"
            />
            <FeatureCard
              tag="COLLABORATION"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              }
              title="30-Day Sprint Protocol"
              description="Before any co-founder agreement, we facilitate a structured 30-day trial sprint on a shared problem. Real work, real pressure, real insight — the only honest way to know if you'll build well together."
              delay="0.6s"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="relative py-28 px-6 border-t border-blue-500/8">
        <div className="absolute inset-0 bg-[#0d1117]/50" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: section header */}
            <div className="sticky top-32">
              <span className="tag-mono mb-4 inline-block">Process</span>
              <h2
                className="text-white mt-3 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
              >
                From anonymous founder
                <br />
                to{" "}
                <span className="text-gradient-blue italic">committed co-builder.</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                We compressed 12 months of founder networking into a four-step process that surfaces
                your highest-probability matches in weeks, not years.
              </p>
              <div
                className="flex items-center gap-3 p-4 rounded-sm border border-blue-500/15 bg-blue-500/5"
              >
                <div className="w-8 h-8 rounded-sm bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">
                  Average time from application to first meaningful match:{" "}
                  <span className="text-white font-medium">11 days.</span>
                </p>
              </div>
            </div>

            {/* Right: steps */}
            <div>
              <Step
                number="01"
                title="Build your Founder DNA profile"
                description="Complete our 40-minute deep assessment covering technical skills, work style, equity expectations, vision, and what kind of co-founder you're wiring yourself to need. No fluffy answers — we ask the questions VCs ask on term sheet day."
              />
              <Step
                number="02"
                title="Set your match parameters"
                description="Define your domain, funding stage, geography flexibility, time commitment, and the exact role gaps you need filled. Our AI uses your Founder DNA to weight parameters you didn't know mattered."
              />
              <Step
                number="03"
                title="Receive curated introductions"
                description="Every week, you receive 3–5 curated matches with compatibility scores, mutual alignment summaries, and automatic NDA protection. No cold outreach. No awkward 'are you looking' DMs. Just clean, protected first conversations."
              />
              <Step
                number="04"
                title="Run your 30-day sprint"
                description="Matched founders who want to explore seriously join our Sprint Protocol — a structured 30-day project on a shared challenge. We track velocity, conflict patterns, and decision quality. Real data before a real commitment."
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SOCIAL PROOF
      ════════════════════════════════════════════════════ */}
      <section id="social-proof" className="relative py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="tag-mono mb-4 inline-block">Founder Stories</span>
            <h2
              className="text-white mt-3 mb-4"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}
            >
              Companies started here.
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Every co-founder pair below met through CoFoundersHub. These are not edited highlight
              reels — they&apos;re the real work.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Testimonial
              quote="The equity alignment scan alone saved us from a disaster. My match and I were 15 points apart on dilution tolerance. We talked it through before day one. We closed our seed six months later."
              name="Mara Jensen"
              role="CEO, Fieldset AI"
              outcome="$2.1M raised"
            />
            <Testimonial
              quote="I'd tried three other co-founder platforms. They were LinkedIn but worse. CoFoundersHub sent me five matches in my first week. I built a company with the second one. We're at $40K MRR."
              name="Soren Park"
              role="CTO, Lumen Health"
              outcome="$40K MRR"
            />
            <Testimonial
              quote="The 30-day sprint protocol is genuinely the best product in this space. We disagreed on everything during the sprint — and somehow that made us more confident we'd work well together. We were right."
              name="Aditi Krishnan"
              role="Co-CEO, Thicket"
              outcome="YC W24"
            />
          </div>

          {/* Press logos placeholder */}
          <div className="divider mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {["TechCrunch", "Forbes", "The Information", "Hacker News", "First Round Review"].map(
              (pub) => (
                <span
                  key={pub}
                  className="text-slate-400"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.08em" }}
                >
                  {pub}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════════ */}
      <section id="pricing" className="relative py-28 px-6 border-t border-blue-500/8">
        <div className="absolute inset-0 bg-[#0d1117]/40" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="tag-mono mb-4 inline-block">Access Model</span>
          <h2
            className="text-white mt-3 mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}
          >
            We charge for matches,{" "}
            <span className="text-gradient-blue italic">not memberships.</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-12 text-base leading-relaxed">
            No monthly subscription you forget to cancel. You pay $199 per curated match batch, only
            after you&apos;ve reviewed your Founder DNA report and confirmed you&apos;re serious. The
            30-day sprint is included.
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {/* Free */}
            <div className="card-glass rounded-sm p-8 text-left">
              <div
                className="text-slate-500 mb-1"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em" }}
              >
                FREE
              </div>
              <div
                className="text-white text-3xl mb-1"
                style={{ fontFamily: "var(--font-mono)", fontWeight: 300 }}
              >
                $0
              </div>
              <p className="text-slate-500 text-sm mb-6">Founder DNA assessment + report</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full 47-dimension assessment",
                  "Founder DNA report PDF",
                  "Compatibility benchmark vs. 12K+ founders",
                  "1 free compatibility preview",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-ghost w-full justify-center">Get my DNA Report</a>
            </div>

            {/* Paid */}
            <div className="relative rounded-sm p-8 text-left border-animated bg-gradient-to-b from-blue-500/8 to-transparent border border-blue-500/25">
              <div className="absolute top-4 right-4">
                <span className="tag-mono text-green-400 border-green-500/30 bg-green-500/8">Most popular</span>
              </div>
              <div
                className="text-blue-400 mb-1"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.1em" }}
              >
                PER BATCH
              </div>
              <div
                className="text-white text-3xl mb-1"
                style={{ fontFamily: "var(--font-mono)", fontWeight: 300 }}
              >
                $199
                <span className="text-slate-500 text-base ml-1">/ 5 matches</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Full curated introduction batch + sprint</p>
              <ul className="space-y-3 mb-8">
                {[
                  "5 AI-curated co-founder matches",
                  "NDA-protected first conversations",
                  "Equity alignment pre-scan",
                  "30-day sprint access",
                  "Dedicated matching advisor",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#" className="btn-primary w-full justify-center">
                Apply for Access
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* CTA glow background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/6 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="mb-8 inline-flex items-center gap-2 text-slate-400" style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            COHORT 08 — ACCEPTING APPLICATIONS
          </div>

          <h2
            className="text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300 }}
          >
            Your startup is{" "}
            <span className="text-gradient-blue italic">one person away</span>{" "}
            from becoming real.
          </h2>

          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            240 founders. One cohort. The co-founder conversations you&apos;ve been avoiding because
            the right person never showed up — they&apos;re here now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#" className="btn-primary text-base px-10 py-4">
              Apply for Cohort 08
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <span
              className="text-slate-600 text-sm"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem" }}
            >
              FREE TO APPLY · RESULTS IN 72H
            </span>
          </div>

          <p className="text-slate-600 text-xs mt-6" style={{ fontFamily: "var(--font-mono)" }}>
            Applications close when cohort fills. Last cohort closed in 9 days.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <footer className="relative border-t border-blue-500/8 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 rounded-sm bg-blue-500 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <span
                  className="text-white"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
                >
                  CoFounders<span className="text-blue-400">Hub</span>
                </span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                The only co-founder platform built around commitment verification, equity alignment,
                and structured discovery.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4
                className="text-slate-400 mb-4"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em" }}
              >
                PRODUCT
              </h4>
              <ul className="space-y-2.5">
                {["Signal Match AI", "Equity Engine", "Sprint Protocol", "Founder DNA", "NDA Vault"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4
                className="text-slate-400 mb-4"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em" }}
              >
                COMPANY
              </h4>
              <ul className="space-y-2.5">
                {["About", "Blog", "Careers", "Press", "Investors"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4
                className="text-slate-400 mb-4"
                style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.12em" }}
              >
                LEGAL
              </h4>
              <ul className="space-y-2.5">
                {["Privacy Policy", "Terms of Service", "NDA Template", "Data Security", "Cookie Policy"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="divider mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span
              className="text-slate-600 text-xs"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              © 2026 CoFoundersHub, Inc. All rights reserved.
            </span>
            <div className="flex items-center gap-5">
              {["Twitter", "LinkedIn", "GitHub", "Discord"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-600 hover:text-slate-400 transition-colors"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.06em" }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
