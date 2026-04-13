import React, { memo, useEffect, useRef } from "react";

const LEGAL_TERMS = [
  "jurisdiction", "algorithm", "precedent", "blockchain", "compliance",
  "arbitration", "innovation", "litigation", "cybersecurity", "governance",
  "regulation", "encryption", "advocacy", "smart contracts", "data privacy",
  "mediation", "intellectual property", "digital evidence", "due process",
  "machine learning", "legal analytics", "dispute resolution", "statutory",
  "regulatory technology", "artificial intelligence", "transparency",
];

// Bézier path definitions in normalized [0,1] coordinates
// Each path is an array of {x,y} points (line segments for simplicity)
function buildScalesPaths(w, h) {
  const cx = w / 2;
  const top = h * 0.08;
  const beamY = h * 0.22;
  const baseY = h * 0.92;
  const beamHalf = w * 0.38;
  const panDrop = h * 0.55;
  const panWidth = w * 0.18;

  return {
    // Vertical pillar
    pillar: [
      { x: cx, y: top },
      { x: cx, y: baseY },
    ],
    // Horizontal beam
    beam: [
      { x: cx - beamHalf, y: beamY },
      { x: cx + beamHalf, y: beamY },
    ],
    // Base
    base: [
      { x: cx - w * 0.1, y: baseY },
      { x: cx + w * 0.1, y: baseY },
    ],
    // Left chain
    leftChain: [
      { x: cx - beamHalf, y: beamY },
      { x: cx - beamHalf, y: beamY + panDrop },
    ],
    // Right chain
    rightChain: [
      { x: cx + beamHalf, y: beamY },
      { x: cx + beamHalf, y: beamY + panDrop },
    ],
    // Left pan (arc approximated as polyline)
    leftPan: (() => {
      const panCx = cx - beamHalf;
      const panCy = beamY + panDrop;
      const pts = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const angle = Math.PI * 0.15 + t * Math.PI * 0.7;
        pts.push({
          x: panCx + Math.cos(angle) * panWidth,
          y: panCy + Math.sin(angle) * panWidth * 0.5,
        });
      }
      return pts;
    })(),
    // Right pan
    rightPan: (() => {
      const panCx = cx + beamHalf;
      const panCy = beamY + panDrop;
      const pts = [];
      for (let i = 0; i <= 12; i++) {
        const t = i / 12;
        const angle = Math.PI * 0.15 + t * Math.PI * 0.7;
        pts.push({
          x: panCx + Math.cos(angle) * panWidth,
          y: panCy + Math.sin(angle) * panWidth * 0.5,
        });
      }
      return pts;
    })(),
  };
}

// Walk along a polyline path, placing text at measured intervals
function drawTextAlongPath(ctx, path, words, fontSize, gap) {
  // Calculate total path length
  let totalLen = 0;
  const segLens = [];
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segLens.push(len);
    totalLen += len;
  }

  ctx.font = `${fontSize}px Montserrat, sans-serif`;
  ctx.textBaseline = "middle";

  let dist = gap * 0.5; // start offset
  let wordIdx = 0;

  while (dist < totalLen && wordIdx < words.length * 3) {
    const word = words[wordIdx % words.length];
    const wordW = ctx.measureText(word).width;

    // Find point at distance along path
    let accum = 0;
    let pt = path[0];
    let angle = 0;
    for (let i = 0; i < segLens.length; i++) {
      if (accum + segLens[i] >= dist) {
        const t = (dist - accum) / segLens[i];
        pt = {
          x: path[i].x + (path[i + 1].x - path[i].x) * t,
          y: path[i].y + (path[i + 1].y - path[i].y) * t,
        };
        angle = Math.atan2(
          path[i + 1].y - path[i].y,
          path[i + 1].x - path[i].x
        );
        break;
      }
      accum += segLens[i];
    }

    ctx.save();
    ctx.translate(pt.x, pt.y);
    ctx.rotate(angle);
    ctx.fillText(word, 0, 0);
    ctx.restore();

    dist += wordW + gap;
    wordIdx++;
  }
}

const ScalesTextSculpture = memo(function ScalesTextSculpture({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const render = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(200, 200, 200, 0.06)";

      const paths = buildScalesPaths(w, h);
      const fontSize = Math.max(9, Math.min(12, w * 0.015));
      const gap = fontSize * 1.2;

      // Shuffle words differently per path for variety
      const shuffle = (arr, seed) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = (seed + i * 7) % (i + 1);
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      drawTextAlongPath(ctx, paths.pillar, shuffle(LEGAL_TERMS, 0), fontSize, gap);
      drawTextAlongPath(ctx, paths.beam, shuffle(LEGAL_TERMS, 3), fontSize, gap);
      drawTextAlongPath(ctx, paths.base, shuffle(LEGAL_TERMS, 7), fontSize, gap);
      drawTextAlongPath(ctx, paths.leftChain, shuffle(LEGAL_TERMS, 11), fontSize * 0.85, gap);
      drawTextAlongPath(ctx, paths.rightChain, shuffle(LEGAL_TERMS, 17), fontSize * 0.85, gap);
      drawTextAlongPath(ctx, paths.leftPan, shuffle(LEGAL_TERMS, 23), fontSize * 0.9, gap);
      drawTextAlongPath(ctx, paths.rightPan, shuffle(LEGAL_TERMS, 29), fontSize * 0.9, gap);
    };

    document.fonts.ready.then(render);
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ animation: "sway 14s ease-in-out infinite" }}
      aria-hidden="true"
    />
  );
});

ScalesTextSculpture.displayName = "ScalesTextSculpture";

export default ScalesTextSculpture;
