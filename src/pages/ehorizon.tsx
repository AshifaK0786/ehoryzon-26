import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowDown,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


 
import herologo from "../assets/hero-logo.png";
import event1 from "../assets/event1.jpeg";
import event2 from "../assets/event2.jpeg";
import event3 from "../assets/event3.jpeg"
import emdc from "../assets/EMDC Transpernt.png"
import iic from "../assets/IIC_Logo_Transparent.png"

import events from "../data/events";
import { intraeventList, interEventList, workshopList, performingArtsList } from "../data/events";
import EventCountdownPortal from "../components/EventCountdownPortal";

// ✅ your hero video (change path/name)
import heroVideo from "../assets/hero.mp4";
import pitchVideo from "../assets/pitch.mp4";

/* -----------------------
   Helpers
------------------------ */
const rand = (min, max) => Math.random() * (max - min) + min;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));


function buildAcrossBolt() {
  let x = rand(0, 10);
  let y = rand(35, 55);
  const points = [[x, y]];

  const segments = Math.floor(rand(9, 14));
  for (let i = 0; i < segments; i++) {
    x = clamp(x + rand(8, 15), 0, 100);
    y = clamp(y + rand(-11, 11), 10, 90);
    points.push([x, y]);
    if (x > 98) break;
  }

  const toD = (pts) =>
    pts
      .map((p, idx) =>
        idx === 0
          ? `M ${p[0].toFixed(1)} ${p[1].toFixed(1)}`
          : `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`
      )
      .join(" ");

  const main = toD(points);

  const branches = [];
  if (Math.random() < 0.85 && points.length > 6) {
    const branchCount = Math.floor(rand(1, 3));
    for (let b = 0; b < branchCount; b++) {
      const startIndex = Math.floor(rand(2, points.length - 3));
      let [bx, by] = points[startIndex];
      const bPts = [[bx, by]];
      const bSeg = Math.floor(rand(3, 6));
      for (let j = 0; j < bSeg; j++) {
        bx = clamp(bx + rand(-14, 14), 0, 100);
        by = clamp(by + rand(-10, 14), 0, 100);
        bPts.push([bx, by]);
      }
      branches.push(toD(bPts));
    }
  }

  return { main, branches };
}

function generateStrikeBolts() {
  const bolts = [];
  bolts.push({ ...buildAcrossBolt(), width: rand(3.0, 4.8) });
  if (Math.random() < 0.55)
    bolts.push({ ...buildAcrossBolt(), width: rand(2.0, 3.6) });
  return bolts;
}

/* -----------------------
   Lightning Overlay (on top of video)
------------------------ */
function ThunderOverlay({ onStrike }) {
  const [strike, setStrike] = useState({ id: 0, bolts: [] });
  const timersRef = useRef([]);

  useEffect(() => {
    let cancelled = false;

    const clearAll = () => {
      timersRef.current.forEach((t) => clearTimeout(t));
      timersRef.current = [];
    };

    const schedule = () => {
      const delay = Math.floor(rand(2600, 8600));
      const t = setTimeout(() => {
        if (cancelled) return;

        setStrike((prev) => ({
          id: prev.id + 1,
          bolts: generateStrikeBolts(),
        }));

        onStrike?.();
        schedule();
      }, delay);

      timersRef.current.push(t);
    };

    schedule();
    return () => {
      cancelled = true;
      clearAll();
    };
  }, [onStrike]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div key={`flash-${strike.id}`} className="absolute inset-0 strike-flash" />

      <svg
        key={`bolt-${strike.id}`}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldBolt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFF6CC" />
            <stop offset="0.35" stopColor="#FCD34D" />
            <stop offset="0.6" stopColor="#FBBF24" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {strike.bolts.map((b, idx) => (
          <g key={`${strike.id}-${idx}`}>
            <path
              d={b.main}
              className="strike-bolt"
              style={{ strokeWidth: b.width, animationDelay: `${idx * 70}ms` }}
              stroke="url(#goldBolt)"
              vectorEffect="non-scaling-stroke"
            />
            {b.branches.map((bd, j) => (
              <path
                key={`${strike.id}-${idx}-br-${j}`}
                d={bd}
                className="strike-branch"
                style={{ animationDelay: `${idx * 70 + 90}ms` }}
                stroke="url(#goldBolt)"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* -----------------------
   Carousel
------------------------ */
function PosterCarousel({ images = [] }) {
  const scrollerRef = useRef(null);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-yellow-600/30 bg-black/40 backdrop-blur-md text-yellow-400 hover:bg-yellow-500/10 transition"
        aria-label="Scroll left"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => scrollByCard(1)}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-yellow-600/30 bg-black/40 backdrop-blur-md text-yellow-400 hover:bg-yellow-500/10 transition"
        aria-label="Scroll right"
      >
        <ChevronRight size={18} />
      </button>

      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory"
      >
        <div className="flex gap-6 pr-[120px]">
          {images.map((src, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[260px] sm:w-[320px] md:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden border border-yellow-600/20 bg-black relative"
            >
              <img
                src={src}
                alt={`carousel-${i}`}
                className="relative z-10 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -----------------------
   Main
------------------------ */
export default function EHorizon() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const navigate = useNavigate();
  const [strikeGlow, setStrikeGlow] = useState(false);
  const strikeTimerRef = useRef(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Animated Festival Sky Background Setup
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cloud class
    class Cloud {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      opacity: number;
      layer: number;

      constructor(layer: number) {
        this.layer = layer;
        this.speed = 0.1 + layer * 0.15;
        this.opacity = 0.3 + layer * 0.2;
        this.width = 100 + layer * 50;
        this.height = 40 + layer * 20;
        this.y = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
        this.x = Math.random() * (canvas.width + this.width) - this.width;
      }

      update() {
        this.x += this.speed;
        if (this.x > canvas.width) {
          this.x = -this.width;
          this.y = Math.random() * (canvas.height * 0.4) + canvas.height * 0.1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(this.x + this.width * 0.3, this.y - this.height * 0.4, this.width * 0.5, this.height * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Parachute class
    class Parachute {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      wobblePhase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = 0.3 + Math.random() * 0.3;
        this.size = 30 + Math.random() * 40;
        this.opacity = 0.4 + Math.random() * 0.4;
        this.wobblePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.vy;
        this.wobblePhase += 0.03;
        this.vx = Math.sin(this.wobblePhase) * 0.5;
        this.x += this.vx;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) {
          this.y = -50;
          this.x = Math.random() * canvas.width;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        // Parachute canopy
        ctx.fillStyle = `hsl(${Math.random() * 60 + 330}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Parachute strings
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.5)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const px = this.x + Math.cos(angle) * this.size * 0.7;
          const py = this.y + Math.sin(angle) * this.size * 0.7;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(this.x, this.y + this.size + 20);
          ctx.stroke();
        }

        ctx.restore();
      }
    }

    const clouds: Cloud[] = [
      new Cloud(0),
      new Cloud(1),
      new Cloud(2),
      new Cloud(0),
      new Cloud(1),
      new Cloud(2),
    ];

    const parachutes: Parachute[] = Array.from({ length: 8 }, () => new Parachute());
    let animationId: number;
    let time = 0;
    let scrollOffset = 0;

    const handleScroll = () => {
      scrollOffset = window.scrollY * 0.5;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      // Sky gradient (blue → purple → pink)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      const timePhase = Math.sin(time * 0.001) * 0.1;

      gradient.addColorStop(0, `hsl(220, 70%, ${55 + timePhase * 5}%)`);
      gradient.addColorStop(0.3, `hsl(240, 60%, ${50 + timePhase * 5}%)`);
      gradient.addColorStop(0.6, `hsl(280, 55%, ${45 + timePhase * 5}%)`);
      gradient.addColorStop(1, `hsl(320, 65%, ${40 + timePhase * 5}%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun/glow effect
      const sunX = canvas.width * 0.8;
      const sunY = canvas.height * 0.2;
      const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 200);
      sunGradient.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
      sunGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
      ctx.fillStyle = sunGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw clouds
      clouds.forEach((cloud) => {
        cloud.update();
        ctx.save();
        ctx.globalAlpha = cloud.opacity;
        cloud.draw(ctx);
        ctx.restore();
      });

      // Update and draw parachutes
      parachutes.forEach((parachute) => {
        parachute.update();
        parachute.draw(ctx);
      });

      // Parallax starfield (subtle)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let i = 0; i < 50; i++) {
        const starX = (i * 73.5 + scrollOffset * 0.1) % canvas.width;
        const starY = (i * 123.4) % (canvas.height * 0.3);
        ctx.fillRect(starX, starY, 1, 1);
      }

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleStrike = useCallback(() => {
    setStrikeGlow(true);
    if (strikeTimerRef.current) clearTimeout(strikeTimerRef.current);
    strikeTimerRef.current = setTimeout(() => setStrikeGlow(false), 900);
  }, []);

  useEffect(() => {
    return () => {
      if (strikeTimerRef.current) clearTimeout(strikeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setNavCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ redirect helper
  const goToRegister = (url) => {
    // use react-router navigation so we stay within the SPA
    navigate(url);
  };

  // ✅ MAIN EVENT (standalone)
  const pitchEvent = {
    title: "PITCH FOR TOMORROW",
    description: "The ultimate startup showcase and innovation challenge",
    date: "February 23 to 27, 2026",
    time: "Full Day Event",
    venue: "Maharaja Auditorium",
    image: "/assets/pitch/pitch-poster.jpg",
      
  };

  // ✅ 10 standard events (each has Register) - loaded from `src/data/events`
  // `events` is imported above

  const highlightCarousel = [
    "/assets/highlights/h1.jpg",
    "/assets/highlights/h2.jpg",
    "/assets/highlights/h3.jpg",
    "/assets/highlights/last-event.jpg",
  ];

  const [visibleCards, setVisibleCards] = useState(() => new Set<number>());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Get unique dates from all events
  const uniqueDates = useMemo(() => {
    const dates = new Set(events.map((e: any) => e.date).filter(Boolean));
    return Array.from(dates).sort();
  }, []);

  useEffect(() => {
    const els = cardRefs.current.filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          setVisibleCards((prev) => {
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [events.length]);

  const [heroIntro, setHeroIntro] = useState(true);

useEffect(() => {
  const t = setTimeout(() => setHeroIntro(false), 900); // animation duration
  return () => clearTimeout(t);
}, []);


  return (
    <>
      <style>{`
        .hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .hero-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.55));
        }

        @keyframes strikeFlash {
          0%   { opacity: 0; }
          10%  { opacity: 0.22; }
          22%  { opacity: 0.05; }
          38%  { opacity: 0.14; }
          65%  { opacity: 0.03; }
          100% { opacity: 0; }
        }
        .strike-flash{
          background: radial-gradient(circle at 50% 45%, rgba(251,191,36,0.25), transparent 60%);
          mix-blend-mode: screen;
          animation: strikeFlash 900ms ease-out both;
        }

        @keyframes boltDraw {
          0%   { opacity: 0; stroke-dashoffset: 140; }
          12%  { opacity: 1; stroke-dashoffset: 0; }
          22%  { opacity: 0.35; }
          34%  { opacity: 1; }
          60%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .strike-bolt{
          fill:none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          filter:
            drop-shadow(0 0 12px rgba(251,191,36,0.72))
            drop-shadow(0 0 30px rgba(251,191,36,0.20));
          animation: boltDraw 900ms ease-out both;
        }
        .strike-branch{
          fill:none;
          stroke-width: 2.2;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          filter: drop-shadow(0 0 10px rgba(251,191,36,0.55));
          animation: boltDraw 820ms ease-out both;
        }

        .hero-lite-glow{
          filter: drop-shadow(0 0 18px rgba(251,191,36,0.12));
        }
        @keyframes heroStrike {
          0%   { filter: drop-shadow(0 0 18px rgba(251,191,36,0.12)); }
          25%  { filter: drop-shadow(0 0 80px rgba(251,191,36,0.55)); }
          55%  { filter: drop-shadow(0 0 35px rgba(251,191,36,0.20)); }
          100% { filter: drop-shadow(0 0 18px rgba(251,191,36,0.12)); }
        }
        .hero-strike-glow{ animation: heroStrike 900ms ease-out both; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes heroPop {
  0%   { transform: translateY(18px) scale(0.85); opacity: 0; filter: blur(6px); }
  60%  { transform: translateY(0px) scale(1.06); opacity: 1; filter: blur(0px); }
  100% { transform: translateY(0px) scale(1); opacity: 1; }
}

.hero-pop {
  animation: heroPop 900ms cubic-bezier(.2,.9,.2,1) both;
}

.glow-text {
  transition: all 0.3s ease-in-out;
}
.glow-text:hover {
  color: #ffd300 !important;
  text-shadow: 0 0 30px rgba(255, 211, 0, 0.8);
}
.glow-text-permanent {
  color: #ffd300 !important;
  text-shadow: 0 0 20px rgba(255, 211, 0, 0.6);
}
      `}</style>

      <div className="bg-black text-white min-h-screen overflow-x-hidden">
        <canvas
          ref={bgCanvasRef}
          className="fixed inset-0 -z-10"
          style={{
            background: 'linear-gradient(135deg, #87CEEB 0%, #E0BBE4 50%, #FDBCB4 100%)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        />
        {/* NAVBAR */}
        <nav className="fixed top-0 w-full z-50">
          {!navCompact && (
            <div className="max-w-7xl mx-auto px-6 pt-6">
              <div className="flex items-center justify-between">
                <img src={herologo} alt="logo" className="h-12 w-auto" />
                <img src={iic} alt="logo" className="h-12 w-auto" />
                <img src={emdc} alt="logo" className="h-12 w-auto" />

                <div className="hidden md:flex items-center gap-3">
                  <button
                    onClick={() => navigate("/aboutus")}
                    className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/85 hover:text-yellow-300 hover:bg-white/15 transition"
                  >
                    About Us
                  </button>

                  {/* ✅ Event Agenda route -> Events section */}
                  <button
                    onClick={() => scrollToSection("events")}
                    className="px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/85 hover:text-yellow-300 hover:bg-white/15 transition"
                  >
                    Event Agenda
                  </button>

                  <button
                    onClick={() => navigate("/register/pitch")}
                    className="ml-2 flex items-center gap-3 px-4 py-2 rounded-full bg-white text-black font-semibold border border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.18)] transition"
                  >
                    Register Now!
                    <span className="w-9 h-9 rounded-full bg-black/90 text-white flex items-center justify-center">
                      <ArrowRight size={18} />
                    </span>
                  </button>
                </div>

                <button
                  className="md:hidden text-yellow-400"
                  onClick={() => setMenuOpen((s) => !s)}
                  aria-label="Menu"
                >
                  {menuOpen ? <X /> : <Menu />}
                </button>
              </div>

              {menuOpen && (
                <div className="md:hidden mt-4 rounded-2xl border border-yellow-600/20 bg-black/45 backdrop-blur-xl px-5 py-4 space-y-3">
                  <button
                    onClick={() => (setMenuOpen(false), navigate("/aboutus"))}
                    className="block w-full text-left text-white/80 hover:text-yellow-400"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => (setMenuOpen(false), scrollToSection("events"))}
                    className="block w-full text-left text-white/80 hover:text-yellow-400"
                  >
                    Event Agenda
                  </button>
                  <button
                    onClick={() => (setMenuOpen(false), navigate("/register/pitch"))}
                    className="block w-full text-left text-yellow-300"
                  >
                    Register Now!
                  </button>
                </div>
              )}
            </div>
          )}

          {navCompact && (
            <div className="w-full flex justify-center pt-4 px-4">
              <div className="flex items-center gap-4 rounded-full border border-white/15 bg-black/35 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.55)] px-4 py-2">
                <img src={herologo} alt="E-Horyzon" className="h-9 w-auto opacity-90" />

                <button
                  onClick={() => navigate("/register/pitch")}
                  className="ml-1 flex items-center gap-3 px-4 py-2 rounded-full bg-white text-black font-semibold border border-white/60"
                >
                  Register Now!
                  <span className="w-9 h-9 rounded-full bg-black/90 text-white flex items-center justify-center">
                    <ArrowRight size={18} />
                  </span>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* HERO (VIDEO) */}
        <section id="home" className="relative min-h-screen pt-28 flex items-center justify-center">
          <div className="absolute inset-0">
            <video
              className="hero-video"
              src={heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 hero-overlay" />
          </div>

          

         <div
  className={[
    "relative z-10 flex flex-col items-center text-center px-6 transition-all duration-700 ease-out",
    heroIntro ? "mt-0" : "-mt-16 md:-mt-24",
  ].join(" ")}
>
  <img
    src={herologo}
    alt="E-Horyzon"
    className={[
      "w-[420px] sm:w-[680px] md:w-[890px] lg:w-[980px] xl:w-[1100px] max-w-[94vw] h-auto object-contain",
      "hero-lite-glow",
      heroIntro ? "hero-pop" : "",
      strikeGlow ? "hero-strike-glow" : "",
    ].join(" ")}
  />
</div>



          {/* bottom meta */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 px-6 w-full">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-3">
                <Calendar className="text-yellow-400" />
                February 23 – 27, 2026
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-yellow-400" />
                Kongu Engineering College, Erode
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => scrollToSection("events")} // ✅ down goes to Event Agenda
                className="w-12 h-12 rounded-full border border-yellow-600/30 bg-black/25 backdrop-blur-md flex items-center justify-center text-yellow-400 hover:bg-yellow-500/10 transition animate-bounce"
                aria-label="Scroll down"
              >
                <ArrowDown size={26} />
              </button>
            </div>
          </div>
        </section>

        {/* EVENTS PAGE (Event Agenda) */}
        <section id="events" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-10 text-center">
              <span className="text-white">Event </span>
              <span className="text-yellow-400">Agenda</span>
            </h2>

            {/* ✅ Standalone MAIN EVENT (Pitch) */}
            <div className="rounded-3xl overflow-hidden border border-yellow-600/25 bg-black/40 backdrop-blur-md shadow-[0_20px_80px_rgba(0,0,0,0.55)]">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[360px] bg-black flex items-center justify-center">
                  <video
                    src={pitchVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                    style={{ animationPlayState: 'running', animationDuration: '0.67s' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/35 to-black/10" />
                </div>

                <div className="p-8 md:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full border border-yellow-600/30 bg-yellow-500/10 px-4 py-2 text-yellow-300 font-semibold">
                    Inter College Event
                  </div>

                  <h3 className="mt-5 text-4xl md:text-5xl font-black text-yellow-400">
                    {pitchEvent.title}
                  </h3>

                  <p className="mt-4 text-white/75 leading-relaxed">
                    {pitchEvent.description}
                  </p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4 text-white/80">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-yellow-400" />
                      {pitchEvent.date}
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-yellow-400" />
                      {pitchEvent.time}
                    </div>
                    <div className="flex items-center gap-3 sm:col-span-2">
                      <MapPin className="text-yellow-400" />
                      {pitchEvent.venue}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate("/register/pitch")}
                      className="px-8 py-4 bg-yellow-400 text-black rounded-full font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(251,191,36,0.25)] transition"
                    >
                      Register for Pitch <ArrowRight />
                    </button>

                    <button
                      onClick={() => scrollToSection("posters")}
                      className="px-8 py-4 rounded-full border border-white/15 bg-white/5 text-white/85 hover:bg-white/10 transition"
                    >
                      View Intra College Events
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* EVENT COUNTDOWN PORTAL */}
            <EventCountdownPortal />

            {/* ✅ EVENTS */}
            <div id="posters" className="mt-20 mb-12">
              <h3 className="text-4xl md:text-5xl font-black text-center mb-12 glow-text-permanent">
                <span>E-Horizon</span> <span>Events</span>
              </h3>

              {/* Date Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                  onClick={() => setSelectedDate(null)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    selectedDate === null
                      ? "bg-yellow-400 text-black"
                      : "border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                  }`}
                >
                  All Events
                </button>
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-full font-semibold transition ${
                      selectedDate === date
                        ? "bg-yellow-400 text-black"
                        : "border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* ✅ FABEX SECTION - Show only if has events */}
              {(() => {
                const filtered = intraeventList.filter((e) => !selectedDate || e.date === selectedDate || e.date === null);
                if (filtered.length === 0) return null;
                return (
                  <>
                    <div className="mt-20 mb-12">
                      <h3 className="text-4xl md:text-5xl font-black text-center mb-12 glow-text-permanent">
                        <span>FabEX</span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {intraeventList
                        .filter((e) => !selectedDate || e.date === selectedDate || e.date === null)
                        .map((e, i) => {
                          const isVisible = visibleCards.has(i);

                          return (
                          <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el }}
                            data-index={i}
                            className={[
                              "relative rounded-2xl overflow-hidden border bg-black",
                              "border-yellow-600/20",
                              "transition-all duration-700 ease-out will-change-transform",
                              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                            ].join(" ")}
                            style={{ transitionDelay: `${Math.min(i, 6) * 90}ms` }}
                          >
                      <div className="aspect-[3/4] relative rounded-3xl border-4 border-black hover:border-yellow-400 p-1 overflow-hidden transition-all duration-300">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(ev) => (ev.currentTarget.style.display = "none")}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-extrabold text-white">
                              {e.title}
                            </h4>
                            {e.date && (
                              <p className="text-sm text-yellow-400/80 mt-1">{e.date}</p>
                            )}
                          </div>

                          <button
                            onClick={() => goToRegister(e.registerUrl)}
                            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-bold hover:shadow-[0_0_22px_rgba(251,191,36,0.22)] transition"
                          >
                            Register <ArrowRight size={16} />
                          </button>
                        </div>

                        <p className="mt-2 text-sm text-white/60">
                          Click register to book your slot.
                        </p>
                      </div>
                    </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}

            {/* ✅ TECHNOPRENEUR SECTION - Show only if has events */}
            {(() => {
              const filtered = interEventList.filter((e) => !selectedDate || e.date === selectedDate || e.date === null);
              if (filtered.length === 0) return null;
              return (
                <>
                  <div className="mt-20 mb-12">
                    <h3 className="text-4xl md:text-5xl font-black text-center mb-12 glow-text-permanent">
                      <span>Technopreneur</span>
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {interEventList
                      .filter((e) => !selectedDate || e.date === selectedDate || e.date === null)
                      .map((e, i) => {
                        const baseIdx = intraeventList.length + i;
                        const isVisible = visibleCards.has(baseIdx);

                        return (
                        <div
                          key={baseIdx}
                          ref={(el) => { cardRefs.current[baseIdx] = el }}
                          data-index={baseIdx}
                          className={[
                            "relative rounded-2xl overflow-hidden border bg-black",
                            "border-yellow-600/20",
                            "transition-all duration-700 ease-out will-change-transform",
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                          ].join(" ")}
                          style={{ transitionDelay: `${Math.min(baseIdx, 12) * 90}ms` }}
                        >
                      <div className="aspect-[3/4] relative rounded-3xl border-4 border-black hover:border-yellow-400 p-1 overflow-hidden transition-all duration-300">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(ev) => (ev.currentTarget.style.display = "none")}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-extrabold text-white">
                              {e.title}
                            </h4>
                            {e.date && (
                              <p className="text-sm text-yellow-400/80 mt-1">{e.date}</p>
                            )}
                          </div>

                          <button
                            onClick={() => goToRegister(e.registerUrl)}
                            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-bold hover:shadow-[0_0_22px_rgba(251,191,36,0.22)] transition"
                          >
                            Register <ArrowRight size={16} />
                          </button>
                        </div>

                        <p className="mt-2 text-sm text-white/60">
                          Click register to book your slot.
                        </p>
                      </div>
                    </div>
                    );
                    })}
                  </div>
                </>
              );
            })()}

            {/* ✅ WORKSHOPS SECTION - Show only if has events */}
            {(() => {
              const filtered = workshopList.filter((e) => !selectedDate || e.date === selectedDate || e.date === null);
              if (filtered.length === 0) return null;
              return (
                <>
                  <div className="mt-20 mb-12">
                    <h3 className="text-4xl md:text-5xl font-black text-center mb-12 glow-text-permanent">
                      <span>Talentia</span> <span>~ Workshops</span>
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workshopList
                      .filter((e) => !selectedDate || e.date === selectedDate || e.date === null)
                      .map((e, i) => {
                        const baseIdx = intraeventList.length + interEventList.length + i;
                        const isVisible = visibleCards.has(baseIdx);

                        return (
                          <div
                            key={baseIdx}
                            ref={(el) => { cardRefs.current[baseIdx] = el }}
                            data-index={baseIdx}
                            className={[
                              "relative rounded-2xl overflow-hidden border bg-black",
                              "border-yellow-600/20",
                              "transition-all duration-700 ease-out will-change-transform",
                              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                            ].join(" ")}
                            style={{ transitionDelay: `${Math.min(baseIdx, 18) * 90}ms` }}
                          >
                      <div className="aspect-[3/4] relative rounded-3xl border-4 border-black hover:border-yellow-400 p-1 overflow-hidden transition-all duration-300">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(ev) => (ev.currentTarget.style.display = "none")}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className="text-lg font-extrabold text-white">
                              {e.title}
                            </h4>
                            {e.date && (
                              <p className="text-sm text-yellow-400/80 mt-1">{e.date}</p>
                            )}
                          </div>

                          <button
                            onClick={() => goToRegister(e.registerUrl)}
                            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-bold hover:shadow-[0_0_22px_rgba(251,191,36,0.22)] transition"
                          >
                            Register <ArrowRight size={16} />
                          </button>
                        </div>

                            </div>
                          </div>
                        );
                        })}
                    </div>
                  </>
                );
              })()}

            {(() => {
              const filtered = performingArtsList.filter((e) => !selectedDate || e.date === selectedDate || e.date === null);
              if (filtered.length === 0) return null;
              return (
                <>
                  <div className="mt-20 mb-12">
                    <h3 className="text-4xl md:text-5xl font-black text-center mb-12 glow-text-permanent">
                      <span>Innovative Short Film</span> <span>/ Tribute Videos</span>
                    </h3>
                  </div>

                  <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-fit">
                    {performingArtsList
                      .filter((e) => !selectedDate || e.date === selectedDate || e.date === null)
                      .map((e, i) => {
                        const baseIdx = intraeventList.length + interEventList.length + workshopList.length + i;
                        const isVisible = visibleCards.has(baseIdx);
                        
                        // Staggered margin-top for masonry effect
                        const staggerClasses = [
                          "mt-0",      // Card 1
                          "mt-16",     // Card 2
                          "mt-8",      // Card 3
                          "mt-20",     // Card 4
                          "mt-28",     // Card 5
                        ];
                        const marginClass = staggerClasses[i % staggerClasses.length];

                        return (
                          <div
                            key={baseIdx}
                            ref={(el) => { cardRefs.current[baseIdx] = el }}
                            data-index={baseIdx}
                            className={[
                              "relative rounded-2xl overflow-hidden border bg-black",
                              "border-yellow-600/20 hover:border-yellow-400/50",
                              "transition-all duration-700 ease-out will-change-transform",
                              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                              marginClass,
                              e.slug === "thirai-trivia" ? "col-span-1 md:col-span-4 lg:col-span-4 row-span-4" : "",
                            ].join(" ")}
                            style={{ transitionDelay: `${Math.min(baseIdx, 24) * 90}ms` }}
                          >
                      <div className={`${e.slug === "thirai-trivia" ? "aspect-[1/1.5]" : "aspect-[3/4]"} relative rounded-3xl border-4 border-black hover:border-yellow-400 p-1 overflow-hidden transition-all duration-300`}>
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <img
                            src={e.image}
                            alt={e.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(ev) => (ev.currentTarget.style.display = "none")}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <h4 className={`${e.slug === "thirai-trivia" ? "text-3xl md:text-5xl" : "text-lg"} font-extrabold text-white`}>
                              {e.title}
                            </h4>
                            {e.date && (
                              <p className="text-sm text-yellow-400/80 mt-1">{e.date}</p>
                            )}
                          </div>

                          <button
                            onClick={() => goToRegister(e.registerUrl)}
                            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-bold hover:shadow-[0_0_22px_rgba(251,191,36,0.22)] transition"
                          >
                            Register <ArrowRight size={16} />
                          </button>
                        </div>

                        <p className="mt-2 text-sm text-white/60">
                          Click register to book your slot.
                        </p>
                      </div>
                    </div>
                        );
                      })}
                    </div>
                    </div>
                  </>
                );
              })()}

            </div>

          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16 px-6 border-t border-yellow-600/20">
          <div 
            className="max-w-7xl mx-auto text-center cursor-pointer transition-colors"
            onClick={() => navigate("/aboutus#our-team")}
          >
            <p className="text-3xl md:text-5xl text-white/80 font-semibold mb-2 glow-text">
              Contact Us
            </p>
            <p className="text-lg md:text-xl text-white/60 glow-text-permanent">
              IEF@KEC• E-Horyzon 2026
            </p>
          </div>
        </section>

        {/* CREATORS */}
        <section className="py-12 px-6 border-t border-yellow-600/20">
          <div className="max-w-7xl mx-auto text-center">
            <p 
              className="text-2xl md:text-4xl font-light italic text-white/70 glow-text cursor-pointer"
              style={{
                fontFamily: "'Brush Script MT', cursive",
                letterSpacing: "0.05em",
              }}
            >
              Abdul Sahith - AIDS & Ashifa - CSE
            </p>
          </div>
        </section>

        <footer className="py-10 text-white/45">
          <div className="flex justify-between items-center px-10">
            <span className="creator"></span>
            <span className="text-center flex-1 glow-text-permanent">© 2026 IEF's EHoryzon. All Rights Reserved</span>
            <span className="creator"></span>
          </div>
        </footer>
      </div>
    </>
  );
}
