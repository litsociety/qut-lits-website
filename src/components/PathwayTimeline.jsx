import React, { useState, useRef } from "react";
import { IMPORTANCE_META, resolveProvider } from "../data/pathways";
import { TiltableAnchor } from "./Tiltable";

const IMPORTANCE_STYLES = {
  essential: { chip: "bg-white/15 text-white border-white/30", dot: "bg-primary" },
  recommended: { chip: "bg-white/10 text-white/70 border-white/20", dot: "bg-white/50" },
  optional: { chip: "bg-white/5 text-white/45 border-white/10", dot: "bg-white/25" },
};

export function ImportanceChip({ importance }) {
  const meta = IMPORTANCE_META[importance];
  const style = IMPORTANCE_STYLES[importance] || IMPORTANCE_STYLES.optional;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold font-rubik px-2.5 py-1 rounded-full border shrink-0 ${style.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {meta.label}
    </span>
  );
}

function MilestoneCard({ milestone, index }) {
  const provider = resolveProvider(milestone.provider);
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col h-full transition-colors duration-300 hover:bg-white/[0.08] hover:border-white/20 animate-rise-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-base font-bold font-rubik leading-snug">
          <TiltableAnchor
            href={milestone.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors duration-300"
            tiltOptions={{ maxTilt: 0, scale: 1 }}
          >
            {milestone.title}
          </TiltableAnchor>
        </h4>
        <ImportanceChip importance={milestone.importance} />
      </div>

      <p className="text-white/55 font-montserrat text-sm leading-relaxed mb-4 flex-1">{milestone.detail}</p>

      <p className="mt-auto pt-3 border-t border-white/10 text-[11px] uppercase tracking-wider text-white/35 font-rubik">
        {milestone.type === "cert" ? "Issued by " : "Offered by "}
        <span className="text-white/60 tracking-normal normal-case font-montserrat">{provider.name}</span>
      </p>
    </div>
  );
}

// ─── Interactive timeline ──────────────────────────────────────────────────────
// The connecting line is drawn as segments in the gaps between nodes, so nothing
// sits behind a circle. Content is never gated on opacity.

export default function PathwayTimeline({ stages }) {
  const [active, setActive] = useState(0);
  const btnRefs = useRef([]);
  const count = stages.length;

  const clamp = (i) => Math.max(0, Math.min(count - 1, i));
  const select = (i) => setActive(clamp(i));

  const onKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowRight") next = clamp(active + 1);
    else if (e.key === "ArrowLeft") next = clamp(active - 1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      btnRefs.current[next]?.focus();
    }
  };

  const stage = stages[active];
  const prevDisabled = active === 0;
  const nextDisabled = active === count - 1;
  const navBtn = "text-sm font-rubik rounded-xl px-4 py-2 border transition-all duration-300";

  return (
    <div>
      {/* Control deck: node rail + step controls */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 mb-10">
        <div role="tablist" aria-label="Pathway stages" onKeyDown={onKeyDown} className="relative mb-8">
          {/* line segments, only in the gaps between nodes */}
          {Array.from({ length: count - 1 }).map((_, k) => {
            const filled = k < active;
            const leftPct = (k + 0.5) * (100 / count);
            const widthPct = 100 / count;
            return (
              <div
                key={k}
                className={`absolute top-5 -translate-y-1/2 h-0.5 rounded-full ${
                  filled ? "bg-gradient-to-r from-primary to-purple" : "bg-white/15"
                }`}
                style={{ left: `calc(${leftPct}% + 22px)`, width: `calc(${widthPct}% - 44px)` }}
                aria-hidden="true"
              />
            );
          })}

          <div className="relative flex">
            {stages.map((s, i) => {
              const isActive = i === active;
              const isDone = i < active;
              return (
                <button
                  key={s.phase}
                  ref={(el) => (btnRefs.current[i] = el)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Stage ${i + 1}: ${s.phase}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  className="group/node flex-1 min-w-0 flex flex-col items-center gap-2 focus:outline-none"
                >
                  <span
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-tomorrow font-bold text-sm border transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-purple text-white border-white/40 scale-110 animate-pulse-ring"
                        : isDone
                        ? "bg-white/15 text-white border-white/25 group-hover/node:scale-105"
                        : "bg-white/5 text-white/45 border-white/15 group-hover/node:border-white/30 group-hover/node:text-white/70 group-hover/node:scale-105"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`hidden sm:block text-xs font-rubik font-semibold leading-tight max-w-[9rem] text-center transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/55 group-hover/node:text-white/80"
                    }`}
                  >
                    {s.phase}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => select(active - 1)}
            disabled={prevDisabled}
            className={`${navBtn} ${
              prevDisabled
                ? "text-white/30 border-white/5 cursor-not-allowed"
                : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border-white/10"
            }`}
            aria-label="Previous stage"
          >
            Previous
          </button>
          <span className="text-xs font-rubik text-white/45">
            Stage {active + 1} of {count}
          </span>
          <button
            onClick={() => select(active + 1)}
            disabled={nextDisabled}
            className={`${navBtn} ${
              nextDisabled
                ? "text-white/30 border-white/5 cursor-not-allowed"
                : "text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border-white/10"
            }`}
            aria-label="Next stage"
          >
            Next
          </button>
        </div>
      </div>

      {/* Stage content (keyed so the staggered card rise replays on change) */}
      <div key={active} role="tabpanel" aria-label={stage.phase}>
        <p className="text-xs font-bold tracking-widest text-white/40 uppercase font-rubik mb-1">{stage.when}</p>
        <h3 className="text-2xl md:text-3xl font-bold text-white font-tomorrow mb-3">{stage.phase}</h3>
        <p className="text-white/65 font-montserrat text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
          {stage.summary}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {stage.milestones.map((m, i) => (
            <MilestoneCard key={m.title} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
