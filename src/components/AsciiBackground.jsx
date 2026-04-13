import React, { memo, useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const CHARS_LOW = [".", "·", "+"];
const CHARS_HIGH = ["L", "I", "T", "S"];
const FONT_SIZE = 14;
const LINE_HEIGHT = FONT_SIZE * 1.4;
const NOISE_SCALE = 0.045;
const TIME_SPEED = 0.002;
const MOUSE_RADIUS = 0.18;
const MOUSE_BOOST = 0.5;
const MAX_ALPHA = 0.14;
const COLOR = "200,200,200";

const AsciiBackground = memo(function AsciiBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const noise3D = createNoise3D();
    let time = 0;
    let running = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Measure the widest character to set cell width
    const setupFont = () => {
      const dpr = window.devicePixelRatio || 1;
      ctx.font = `${FONT_SIZE}px Montserrat, sans-serif`;
      const allChars = [...CHARS_LOW, ...CHARS_HIGH];
      let maxW = 0;
      for (const ch of allChars) {
        const w = ctx.measureText(ch).width;
        if (w > maxW) maxW = w;
      }
      return { cellW: Math.ceil(maxW) + 2, cellH: LINE_HEIGHT, dpr };
    };

    let cellW, cellH, cols, rows, dpr;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
      const m = setupFont();
      cellW = m.cellW;
      cellH = m.cellH;
      dpr = m.dpr;
      cols = Math.ceil(window.innerWidth / cellW);
      rows = Math.ceil(window.innerHeight / cellH);
    };

    const draw = () => {
      if (!running) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Clear
      ctx.clearRect(0, 0, w, h);
      ctx.font = `${FONT_SIZE}px Montserrat, sans-serif`;
      ctx.textBaseline = "top";

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Noise value → [0,1]
          const n = (noise3D(c * NOISE_SCALE, r * NOISE_SCALE, time) + 1) * 0.5;

          // Mouse proximity boost
          let boost = 0;
          if (mx >= 0) {
            const dx = c / cols - mx;
            const dy = r / rows - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
              boost = (1 - dist / MOUSE_RADIUS) * MOUSE_BOOST;
            }
          }

          const brightness = Math.min(1, n + boost);
          if (brightness < 0.08) continue; // skip nearly invisible cells

          // Pick character
          let ch;
          if (brightness > 0.6) {
            ch = CHARS_HIGH[(c + r + Math.floor(time * 10)) % CHARS_HIGH.length];
          } else if (brightness > 0.25) {
            ch = CHARS_LOW[(c + r) % CHARS_LOW.length];
          } else {
            ch = ".";
          }

          const alpha = brightness * MAX_ALPHA;
          ctx.fillStyle = `rgba(${COLOR},${alpha.toFixed(3)})`;
          ctx.fillText(ch, c * cellW, r * cellH);
        }
      }

      if (!prefersReduced) {
        time += TIME_SPEED;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    // Wait for font then start
    document.fonts.ready.then(() => {
      resize();
      draw();
    });

    // Mouse tracking with RAF throttle
    let mouseRafPending = false;
    const onMouseMove = (e) => {
      if (mouseRafPending) return;
      mouseRafPending = true;
      requestAnimationFrame(() => {
        mouseRef.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        };
        mouseRafPending = false;
      });
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
});

AsciiBackground.displayName = "AsciiBackground";

export default AsciiBackground;
