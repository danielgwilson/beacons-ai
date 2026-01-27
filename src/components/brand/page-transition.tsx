"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<
    "idle" | "entering" | "exiting"
  >("idle");
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setPrevPathname(pathname);
      return;
    }

    if (pathname !== prevPathname) {
      setIsTransitioning(true);
      setTransitionPhase("exiting");

      const exitTimer = setTimeout(() => {
        setTransitionPhase("entering");
        setPrevPathname(pathname);
      }, 500);

      const enterTimer = setTimeout(() => {
        setTransitionPhase("idle");
        setIsTransitioning(false);
      }, 1000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(enterTimer);
      };
    }
  }, [pathname, prevPathname]);

  return (
    <>
      {children}
      {isTransitioning && transitionPhase !== "idle" && (
        <div className={`page-transition-overlay ${transitionPhase}`} />
      )}
    </>
  );
}
