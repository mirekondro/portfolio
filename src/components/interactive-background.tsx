import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const isDark = () => document.documentElement.classList.contains("dark");

    const target = { x: 0.5, y: 0.5 };
    const setTarget = (cx: number, cy: number) => {
      target.x = cx / window.innerWidth;
      target.y = cy / window.innerHeight;
    };
    const onPointer = (e: PointerEvent) => setTarget(e.clientX, e.clientY);

    type Wave = {
      amp: number;
      len: number;
      speed: number;
      yOff: number;
      phase: number;
      alpha: number;
    };

    const waves: Wave[] = [
      { amp: 38, len: 0.0042, speed: 0.0009, yOff: 0.55, phase: 0, alpha: 0.16 },
      { amp: 52, len: 0.0028, speed: 0.0012, yOff: 0.65, phase: 1.2, alpha: 0.14 },
      { amp: 30, len: 0.006, speed: 0.0016, yOff: 0.72, phase: 2.4, alpha: 0.12 },
      { amp: 64, len: 0.0021, speed: 0.0007, yOff: 0.82, phase: 0.7, alpha: 0.18 },
      { amp: 24, len: 0.008, speed: 0.0022, yOff: 0.45, phase: 3.1, alpha: 0.1 },
    ];

    let t = 0;
    let raf = 0;

    const tick = () => {
      t += 1;
      // smooth easing toward latest pointer/touch target
      mouse.current.x += (target.x - mouse.current.x) * 0.08;
      mouse.current.y += (target.y - mouse.current.y) * 0.08;
      ctx.clearRect(0, 0, width, height);
      const dark = isDark();
      const base = dark ? "245,245,240" : "20,20,18";

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const w of waves) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        const yBase = height * (w.yOff + (my - 0.5) * 0.06);
        const ampMod = w.amp * (1 + (mx - 0.5) * 0.4);

        for (let x = 0; x <= width; x += 6) {
          const y =
            yBase +
            Math.sin(x * w.len + t * w.speed + w.phase) * ampMod +
            Math.sin(x * w.len * 2.1 + t * w.speed * 1.6) * (ampMod * 0.25);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yBase - w.amp, 0, height);
        grad.addColorStop(0, `rgba(${base},${w.alpha})`);
        grad.addColorStop(1, `rgba(${base},0)`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(${base},${Math.min(w.alpha * 1.6, 0.35)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const y =
            yBase +
            Math.sin(x * w.len + t * w.speed + w.phase) * ampMod +
            Math.sin(x * w.len * 2.1 + t * w.speed * 1.6) * (ampMod * 0.25);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
