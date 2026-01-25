import { useEffect, useRef } from 'react';

// Neon light particle system
class NeonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  maxOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.radius = Math.random() * 1.5 + 0.5;
    this.maxOpacity = Math.random() * 0.6 + 0.2;
    this.opacity = this.maxOpacity;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
  }

  update(mouseX: number, mouseY: number, width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Subtle mouse attraction
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 200) {
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * 0.015;
      this.vy += Math.sin(angle) * 0.015;
    }

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -0.8;
    if (this.y < 0 || this.y > height) this.vy *= -0.8;

    // Damping
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Keep within bounds
    this.x = Math.max(0, Math.min(width, this.x));
    this.y = Math.max(0, Math.min(height, this.y));

    // Pulsing opacity
    this.pulsePhase += this.pulseSpeed;
    this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(this.pulsePhase));
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Yellow/gold neon glow
    ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Outer glow
    ctx.strokeStyle = `rgba(255, 200, 0, ${this.opacity * 0.4})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius + 1.5, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: NeonParticle[] = Array.from({ length: 120 }, () => new NeonParticle(canvas.width, canvas.height));
    let animationId: number;
    let time = 0;

    // Circuit pattern drawer
    const drawCircuitPattern = (ctx: CanvasRenderingContext2D, opacity: number) => {
      ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.08})`;
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 200) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 200) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Connection nodes
      ctx.fillStyle = `rgba(255, 215, 0, ${opacity * 0.05})`;
      for (let x = 0; x < canvas.width; x += 200) {
        for (let y = 0; y < canvas.height; y += 200) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const animate = () => {
      // Deep black to charcoal gradient base
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );

      radialGradient.addColorStop(0, '#1a1a1a');
      radialGradient.addColorStop(0.4, '#0d0d0d');
      radialGradient.addColorStop(1, '#000000');

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Linear dark gradient overlay
      const linearGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      linearGradient.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
      linearGradient.addColorStop(0.5, 'rgba(20, 10, 0, 0.3)');
      linearGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');

      ctx.fillStyle = linearGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle top-to-bottom dark vignette
      const vignetteGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      vignetteGradient.addColorStop(0, 'rgba(255, 200, 0, 0.02)');
      vignetteGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');

      ctx.fillStyle = vignetteGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle circuit pattern
      drawCircuitPattern(ctx, Math.sin(time * 0.005) * 0.5 + 0.5);

      // Update and draw neon particles
      particles.forEach((particle) => {
        particle.update(mousePosRef.current.x, mousePosRef.current.y, canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Animated accent glow
      const glowPhase = Math.sin(time * 0.003);
      const accentGradient = ctx.createLinearGradient(
        0,
        canvas.height * (0.3 + glowPhase * 0.1),
        canvas.width,
        canvas.height * (0.7 + glowPhase * 0.1)
      );
      accentGradient.addColorStop(0, 'rgba(255, 215, 0, 0)');
      accentGradient.addColorStop(0.5, `rgba(255, 215, 0, ${0.03 + glowPhase * 0.02})`);
      accentGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

      ctx.fillStyle = accentGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time++;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #000000 0%, #0a0505 50%, #050505 100%)',
      }}
    />
  );
}

