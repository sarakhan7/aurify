import React from "react";

const count = 24;

const BackgroundJellies = () => {
  const nodes = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      {nodes.map((_, i) => {
        const left = (i * 37) % 100; // pseudo-random
        const top = (i * 53) % 100;
        const delay = (i % 10) * 0.3;
        const size = 6 + (i % 5) * 2; // 6-14px
        return (
          <span
            key={i}
            className="absolute rounded-full opacity-50 blur-[0.3px] animate-float"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: "hsl(var(--jellyfish))",
              filter: "drop-shadow(0 0 6px hsl(var(--jellyfish) / 0.35))",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default BackgroundJellies;
