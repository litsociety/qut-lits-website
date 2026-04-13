import React, { memo, useEffect, useRef } from "react";

const LINES = [
  "Community · Innovation · Learning · Excellence · ",
  "Bridging law and technology · QUT LITS · ",
  "Empowering the next generation of legal innovators · ",
  "Workshops · Networking · Industry Partnerships · ",
  "Artificial Intelligence · Cybersecurity · Data Privacy · ",
  "Smart Contracts · Digital Evidence · Legal Analytics · ",
  "Regulatory Technology · Dispute Resolution · Governance · ",
  "Law, Innovation and Technology Society · QUT · ",
  "Shaping the future of legal tech · Innovation · ",
  "Jurisdiction · Algorithm · Precedent · Blockchain · ",
  "Compliance · Arbitration · Encryption · Advocacy · ",
  "Intellectual Property · Due Process · Mediation · ",
];

const TextSphere = memo(function TextSphere() {
  const canvasRef = useRef(null);
  const rotRef = useRef(0);
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
      const maxSize = Math.min(container.offsetWidth - 32, 420);
      const size = Math.max(250, maxSize);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + "px";
      canvas.style.height = size + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;

      const size = parseInt(canvas.style.width);
      if (!size) { rafRef.current = requestAnimationFrame(draw); return; }

      const cx = size / 2;
      const cy = size / 2;
      const R = size * 0.44;
      const rot = rotRef.current;

      ctx.clearRect(0, 0, size, size);

      // === Sphere glow ===
      const glow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.15);
      glow.addColorStop(0, "rgba(200, 200, 200, 0)");
      glow.addColorStop(0.85, "rgba(200, 200, 200, 0.015)");
      glow.addColorStop(1, "rgba(200, 200, 200, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // === Sphere fill — subtle gradient for 3D lighting ===
      const sphereGrad = ctx.createRadialGradient(
        cx - R * 0.25, cy - R * 0.25, R * 0.05,
        cx, cy, R
      );
      sphereGrad.addColorStop(0, "rgba(255, 255, 255, 0.03)");
      sphereGrad.addColorStop(0.5, "rgba(200, 200, 200, 0.015)");
      sphereGrad.addColorStop(1, "rgba(100, 100, 100, 0.01)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // === Sphere outline ===
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(200, 200, 200, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // === Longitude lines (wireframe feel) ===
      ctx.strokeStyle = "rgba(200, 200, 200, 0.04)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 8; i++) {
        const angle = rot + (i / 8) * Math.PI;
        const xScale = Math.cos(angle);
        // Draw an ellipse representing a longitude line
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xScale) * R, R, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // === Latitude lines ===
      for (let i = 1; i < 6; i++) {
        const latAngle = ((i / 6) - 0.5) * Math.PI;
        const y = cy + Math.sin(latAngle) * R;
        const latR = Math.cos(latAngle) * R;
        ctx.beginPath();
        ctx.ellipse(cx, y, latR, latR * 0.06, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // === Text on latitude bands ===
      const fontSize = Math.max(9, R * 0.075);
      ctx.font = `${fontSize}px Montserrat, sans-serif`;
      ctx.textBaseline = "middle";

      const lineCount = LINES.length;

      for (let i = 0; i < lineCount; i++) {
        // Distribute from -75° to +75°
        const phi = ((i / (lineCount - 1)) - 0.5) * 2.6;
        const y = cy + Math.sin(phi) * R * 0.92;
        const latR = Math.cos(phi) * R;

        if (latR < 10) continue;

        // Depth: text on the "back" of the sphere is invisible
        const depthFade = Math.pow(Math.cos(phi), 0.6);

        // Text scrolls horizontally — this sells the rotation
        const text = LINES[i];
        const textW = ctx.measureText(text).width;
        if (textW === 0) continue;

        // Scroll offset — different speeds per latitude for parallax
        const scrollSpeed = Math.cos(phi) * 0.8 + 0.2;
        const xShift = (rot * 80 * scrollSpeed) % textW;

        // Clip to sphere bounds at this latitude
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, y, latR - 2, fontSize * 0.75, 0, 0, Math.PI * 2);
        ctx.clip();

        // Perspective compression: chars near edges appear compressed
        // We simulate this by varying alpha across the line
        const alpha = depthFade * 0.45;
        ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;

        // Tile the text to fill the clipped region
        const tileCount = Math.ceil((latR * 2 + textW) / textW) + 2;
        const startX = cx - latR - xShift;

        for (let t = 0; t < tileCount; t++) {
          ctx.fillText(text, startX + t * textW, y);
        }

        ctx.restore();
      }

      // === Specular highlight on top-left ===
      const spec = ctx.createRadialGradient(
        cx - R * 0.3, cy - R * 0.35, 0,
        cx - R * 0.3, cy - R * 0.35, R * 0.5
      );
      spec.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      spec.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.fill();

      if (!prefersReduced) {
        rotRef.current += 0.008;
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
    <div className="flex justify-center py-4">
      <canvas
        ref={canvasRef}
        className="max-w-[420px] w-full aspect-square"
        aria-hidden="true"
      />
    </div>
  );
});

TextSphere.displayName = "TextSphere";

export default TextSphere;
