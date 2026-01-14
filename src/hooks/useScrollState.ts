import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollState {
  isScrolled: boolean;
  showScrollTop: boolean;
  progress: number;
}

/**
 * Unified scroll state hook - combines multiple scroll listeners into one
 * Uses requestAnimationFrame for optimal performance
 */
export const useScrollState = (scrolledThreshold = 20, scrollTopThreshold = 300) => {
  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    showScrollTop: false,
    progress: 0,
  });
  
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Only update if scroll position changed significantly (reduces re-renders)
    if (Math.abs(scrollY - lastScrollY.current) < 5) {
      rafRef.current = null;
      return;
    }
    
    lastScrollY.current = scrollY;
    
    setState({
      isScrolled: scrollY > scrolledThreshold,
      showScrollTop: scrollY > scrollTopThreshold,
      progress: scrollHeight > 0 ? Math.min(scrollY / scrollHeight, 1) : 0,
    });
    
    rafRef.current = null;
  }, [scrolledThreshold, scrollTopThreshold]);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle using requestAnimationFrame
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    updateScrollState();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateScrollState]);

  return state;
};
