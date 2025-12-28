"use client";

import React, { useEffect, useRef } from "react";

export default function MarqueeText({
  items = ["NEXTGEN EV"],
  logo = "/nextgen.png",
  color = "#4ADE80",
  hoverColor = "#FFFFFF",
  speed = 0.05, // px / ms
  gap = 48,
  direction = "left",
  fontSize = 130,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let mounted = true;
    let last = performance.now();

    const loop = (t) => {
      if (!mounted) return;
      const dt = t - last;
      last = t;

      if (!pausedRef.current) {
        const delta = speed * dt * (direction === "left" ? 1 : -1);
        posRef.current += delta;

        const singleWidth = (track.scrollWidth || 1) / 2;
        if (posRef.current >= singleWidth) posRef.current -= singleWidth;
        if (posRef.current <= -singleWidth) posRef.current += singleWidth;

        const translateX =
          direction === "left" ? -posRef.current : posRef.current;

        track.style.transform = `translateX(${translateX}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onEnter = () => {
      pausedRef.current = true;
    };
    const onLeave = () => {
      pausedRef.current = false;
    };

    container.addEventListener("pointerenter", onEnter);
    container.addEventListener("pointerleave", onLeave);

    return () => {
      mounted = false;
      cancelAnimationFrame(rafRef.current || 0);
      container.removeEventListener("pointerenter", onEnter);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, [items, speed, direction]);

  const pair = [...items, ...items];

  const scopedStyles = `
    .ng-marquee-root {
      --marquee-color: ${color};
      --marquee-hover-color: ${hoverColor};
    }
    .ng-track {
      display:flex;
      align-items:center;
      gap:${gap}px;
      will-change:transform;
      transform:translateX(0);
    }
    .ng-item {
      white-space:nowrap;
      display:inline-flex;
      align-items:center;
      gap:14px;
      padding:2px 0;
      font-weight:800;
      letter-spacing:2px;
      font-style:oblique;
      transition:transform 220ms ease;
    }
    .ng-text {
      font-size:${fontSize}px;
      font-family:Montserrat;
      color:var(--marquee-color);
      -webkit-text-fill-color:var(--marquee-color);
      transition:color 220ms ease, -webkit-text-fill-color 220ms ease, transform 220ms ease;
    }
    .ng-logo {
      width:100px;
      height:100px;
      object-fit:contain;
      transition:transform 220ms ease, filter 220ms ease;
      filter:drop-shadow(0 6px 16px rgba(0,0,0,0.45));
    }
    .ng-item:hover .ng-text,
    .ng-item:active .ng-text {
      color:var(--marquee-hover-color);
      -webkit-text-fill-color:var(--marquee-hover-color);
      transform:scale(1.06);
    }
    .ng-item:hover .ng-logo,
    .ng-item:active .ng-logo {
      transform:scale(1.04);
    }
    @media (max-width: 900px) {
      .ng-text { font-size:${fontSize * 0.55}px; }
      .ng-logo { width:100px; height:100px; }
      
    }
    @media (max-width: 600px) {
      .ng-text { font-size:${fontSize * 0.1}px; }
      .ng-logo { width:60px; height:60px; }
      .ng-track{height:10px}
    }
  `;

  return (
    <>
      <style>{scopedStyles}</style>
      <section
        className="ng-marquee-root"
        style={{
          width: "100%",
          overflow: "hidden",
          padding: "18px 0",
          borderTop: "1px solid rgba(74,222,128,0.25)",
          borderBottom: "1px solid rgba(74,222,128,0.25)",
          background:
            "linear-gradient(90deg, #0f172a 0%, #111827 40%, rgba(6,78,59,0.7) 100%)",
        }}
        ref={containerRef}
      >
        <div
          ref={trackRef}
          className="ng-track"
          style={{ paddingInline: 16 }}
        >
          {pair.map((text, idx) => (
            <div key={`${text}-${idx}`} className="ng-item">
              {logo && (
                <img src={logo} alt="NextGen logo" className="ng-logo" />
              )}
              <span className="ng-text">{text}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
