import React, { memo, useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

// Character palette ordered by visual density (light → heavy)
const PALETTE = " .·:+*LITS";
const FONT_SIZE = 13;
const LINE_HEIGHT = FONT_SIZE * 1.5;
const NOISE_SCALE = 0.03; // larger blobs, smoother field
const NOISE_DETAIL = 0.09; // second octave for fine detail
const TIME_SPEED = 0.0015;
const MOUSE_RADIUS = 0.2;
const MOUSE_BOOST = 0.35;
const MAX_ALPHA = 0.10;
const COLOR_R = 200, COLOR_G = 200, COLOR_B = 200;

const AsciiBackground = memo(function AsciiBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    const noise3D = createNoise3D();
    let time = 0;
    let running = true;
    let frameCount = 0;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cellW, cellH, cols, rows, dpr;
    // Pre-allocated brightness grid — avoids GC pressure
    let brightnessGrid = null;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.font = `${FONT_SIZE}px Montserrat, sans-serif`;
      // Measure a wide char to get consistent cell width
      cellW = Math.ceil(ctx.measureText("M").width) + 1;
      cellH = LINE_HEIGHT;
      cols = Math.ceil(w / cellW);
      rows = Math.ceil(h / cellH);
      brightnessGrid = new Float32Array(cols * rows);
    };

    const computeNoise = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mx >= 0;
      const mr2 = MOUSE_RADIUS * MOUSE_RADIUS;

      for (let r = 0; r < rows; r++) {
        const ny = r * NOISE_SCALE;
        const ny2 = r * NOISE_DETAIL;
        const rowNorm = r / rows;

        for (let c = 0; c < cols; c++) {
          const nx = c * NOISE_SCALE;
          // Two octaves of noise for organic variation
          const n1 = noise3D(nx, ny, time);
          const n2 = noise3D(c * NOISE_DETAIL + 100, ny2 + 100, time * 1.7) * 0.3;
          let val = (n1 + n2 + 1.3) / 2.6; // normalize to ~[0,1]

          // Mouse proximity boost
          if (mouseActive) {
            const dx = c / cols - mx;
            const dy = rowNorm - my;
            const d2 = dx * dx + dy * dy;
            if (d2 < mr2) {
              val += (1 - Math.sqrt(d2) / MOUSE_RADIUS) * MOUSE_BOOST;
            }
          }

          brightnessGrid[r * cols + c] = val < 0 ? 0 : val > 1 ? 1 : val;
        }
      }
    };

    const draw = () => {
      if (!running) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Recompute noise every 2nd frame for performance
      if (frameCount % 2 === 0) {
        computeNoise();
      }
      frameCount++;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${FONT_SIZE}px Montserrat, sans-serif`;
      ctx.textBaseline = "top";

      // Batch draws by similar alpha to reduce style changes
      const palLen = PALETTE.length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const b = brightnessGrid[r * cols + c];
          if (b < 0.12) continue; // skip very dim cells

          // Map brightness to character index
          const ci = Math.min(palLen - 1, (b * palLen) | 0);
          if (ci === 0) continue; // space character, skip

          const alpha = b * MAX_ALPHA;
          ctx.fillStyle = `rgba(${COLOR_R},${COLOR_G},${COLOR_B},${alpha})`;
          ctx.fillText(PALETTE[ci], c * cellW, r * cellH);
        }
      }

      if (!prefersReduced) {
        time += TIME_SPEED;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    document.fonts.ready.then(() => {
      resize();
      draw();
    });

    // Mouse tracking — RAF-throttled
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

    // Debounced resize
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
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
