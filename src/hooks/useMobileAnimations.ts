import { useEffect, useRef, useState, useCallback } from "react";

export const useReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / scrollHeight;
      setProgress(Math.min(scrolled, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

export const useTouchFeedback = () => {
  const [isTouched, setIsTouched] = useState(false);

  const handlers = {
    onTouchStart: useCallback(() => setIsTouched(true), []),
    onTouchEnd: useCallback(() => setIsTouched(false), []),
    onTouchCancel: useCallback(() => setIsTouched(false), []),
  };

  return { isTouched, handlers };
};
