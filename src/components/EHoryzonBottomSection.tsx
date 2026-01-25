import React, { useEffect, useRef } from "react";

export default function EHoryzonBottomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated particles effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const updateCanvasSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Particle system for golden glow
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      vx: number;
      vy: number;
      life: number;
    }> = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100 + 50,
      };
    };

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        // Remove dead particles and add new ones
        if (p.life <= 0) {
          particles.splice(i, 1);
          particles.push(createParticle());
          continue;
        }

        // Draw particle with golden glow
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * (p.life / 150)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = `rgba(212, 175, 55, ${p.opacity * 0.5 * (p.life / 150)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black border-t border-b border-yellow-600/20 py-8 md:py-12 px-4 md:px-8"
    >
      {/* Canvas for particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-8 mb-6 pb-6 border-b border-yellow-600/20">
          {/* Left: Event Name and Location */}
          <div className="flex items-center gap-4 md:gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                EHoryzon 2026
              </h3>
              <a
                href="https://www.google.com/maps/search/kongu+engineering+college+google+map+link/@11.2752043,77.6057732,16z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base text-neutral-400 hover:text-yellow-300 transition-colors duration-300 cursor-pointer"
              >
                Kongu Engineering College, Perundurai
              </a>
            </div>
          </div>

          {/* Center/Right: Navigation Links */}
          <nav className="flex items-center gap-6 md:gap-8 ml-auto">
            <a
              href="/"
              className="text-neutral-300 hover:text-yellow-400 text-sm md:text-base font-medium transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/schedule"
              className="text-neutral-300 hover:text-yellow-400 text-sm md:text-base font-medium transition-colors duration-300"
            >
              Schedule
            </a>
            <a
              href="/aboutus"
              className="text-neutral-300 hover:text-yellow-400 text-sm md:text-base font-medium transition-colors duration-300"
            >
              About Us
            </a>
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4 mb-6 pb-6 border-b border-yellow-600/20">
          {/* Event Info */}
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              EHoryzon 2026
            </h3>
            <a
              href="https://www.google.com/maps/search/kongu+engineering+college+google+map+link/@11.2752043,77.6057732,16z"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-yellow-300 transition-colors duration-300 block"
            >
              Kongu Engineering College, Perundurai
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex gap-4 flex-wrap">
            <a
              href="/"
              className="text-neutral-300 hover:text-yellow-400 text-sm font-medium transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/schedule"
              className="text-neutral-300 hover:text-yellow-400 text-sm font-medium transition-colors duration-300"
            >
              Schedule
            </a>
            <a
              href="/aboutus"
              className="text-neutral-300 hover:text-yellow-400 text-sm font-medium transition-colors duration-300"
            >
              About Us
            </a>
          </nav>
        </div>

        {/* Location Button */}
        <div className="flex justify-center">
          <a
            href="https://www.google.com/maps/place/Kongu+Engineering+College+Entrance/@11.2748063,77.6029969,16.6z/data=!4m14!1m7!3m6!1s0x3ba96d7c4c269e29:0x59fc34a434cc7ac2!2sKongu+Engineering+College+Entrance!8m2!3d11.2745691!4d77.6068078!16s%2Fg%2F11c55vfc1z!3m5!1s0x3ba96d7c4c269e29:0x59fc34a434cc7ac2!8m2!3d11.2745691!4d77.6068078!16s%2Fg%2F11c55vfc1z?entry=ttu&g_ep=EgoyMDI2MDEyMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-yellow-500/20 border border-yellow-400/60 hover:bg-yellow-500/40 hover:border-yellow-300 text-yellow-300 font-semibold text-sm md:text-base rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            View Location on Maps
          </a>
        </div>
      </div>
    </section>
  );
}
