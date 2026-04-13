import React, { memo, useEffect, useRef } from "react";

const SPHERE_LINES = [
  "Community · Innovation · Learning · Excellence",
  "Bridging law and technology",
  "Empowering the next generation",
  "Workshops · Networking · Partnerships",
  "AI · Cybersecurity · Data Privacy",
  "Smart Contracts · Legal Analytics",
  "Regulatory Technology · Innovation",
  "Law, Innovation and Technology Society",
  "Shaping the future of legal tech",
  "Queensland University of Technology",
];

const TextSphere = memo(function TextSphere() {
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const size = Math.min(container.offsetWidth, 400);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;

      const w = parseInt(canvas.style.width);
      const h = parseInt(canvas.style.height);
      if (!w || !h) { rafRef.current = requestAnimationFrame(draw); return; }

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      // Draw sphere outline — subtle glow
      const gradient = ctx.createRadialGradient(cx - radius * 0.2, cy - radius * 0.2, radius * 0.1, cx, cy, radius);
      gradient.addColorStop(0, "rgba(200, 200, 200, 0.06)");
      gradient.addColorStop(0.7, "rgba(200, 200, 200, 0.03)");
      gradient.addColorStop(1, "rgba(200, 200, 200, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Sphere border
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text lines as latitude bands on the sphere
      const lineCount = SPHERE_LINES.length;
      const fontSize = Math.max(10, radius * 0.09);
      ctx.font = `${fontSize}px Montserrat, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < lineCount; i++) {
        // Latitude angle: distribute lines from -70° to +70°
        const latAngle = ((i / (lineCount - 1)) - 0.5) * 2.4; // -1.2 to 1.2 radians

        // Y position on sphere
        const y = cy + Math.sin(latAngle) * radius * 0.85;

        // Width of sphere at this latitude (chord length)
        const latRadius = Math.cos(latAngle) * radius;

        // Horizontal offset — this is what creates the rotation illusion
        const xOffset = Math.sin(rotationRef.current + i * 0.3) * latRadius * 0.3;

        // Opacity: lines near the "edges" (high rotation offset) are dimmer
        const edgeFade = 1 - Math.abs(Math.sin(rotationRef.current + i * 0.3)) * 0.6;
        const depthFade = Math.cos(latAngle) * 0.8 + 0.2; // poles are dimmer
        const alpha = edgeFade * depthFade * 0.35;

        if (alpha < 0.03) continue;

        // Clip text to sphere width at this latitude
        ctx.save();
        ctx.beginPath();
        ctx.rect(cx - latRadius, y - fontSize, latRadius * 2, fontSize * 2);
        ctx.clip();

        ctx.fillStyle = `rgba(200, 200, 200, ${alpha.toFixed(3)})`;

        // Repeat text to fill width, shifted by rotation
        const text = SPHERE_LINES[i];
        const textW = ctx.measureText(text + "   ").width;
        const repeatCount = Math.ceil((latRadius * 2 + textW) / textW) + 1;
        const startX = cx + xOffset - repeatCount * textW / 2;

        for (let r = 0; r < repeatCount; r++) {
          ctx.fillText(text, startX + r * textW, y);
        }

        ctx.restore();
      }

      if (!prefersReduced) {
        rotationRef.current += 0.006;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    document.fonts.ready.then(() => {
      resize();
      draw();
    });

    window.addEventListener("resize", resize);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="max-w-[400px] w-full aspect-square"
        aria-hidden="true"
      />
    </div>
  );
});

TextSphere.displayName = "TextSphere";

export default TextSphere;
