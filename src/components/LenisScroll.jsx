import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll position updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Frame-perfect sync: GSAP ticker passes time in seconds, Lenis expects ms
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Disable GSAP lag smoothing to avoid jumps during heavy rendering
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial mount to calculate exact layout heights
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
