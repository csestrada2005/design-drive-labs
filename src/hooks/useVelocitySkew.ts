import { useScroll, useVelocity, useTransform, useSpring, useReducedMotion, MotionValue } from "framer-motion";

/**
 * useVelocitySkew — skews and blurs elements based on scroll velocity.
 * Gives text physical weight: fast scroll = slight skew + blur, snaps back on stop.
 */
export const useVelocitySkew = (maxSkew = 4, maxBlur = 2) => {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const rawSkew = useTransform(velocity, [-3000, 0, 3000], [maxSkew, 0, -maxSkew]);
  const rawBlur = useTransform(velocity, [-3000, -300, 0, 300, 3000], [maxBlur, 0.5, 0, 0.5, maxBlur]);

  const skewY = useSpring(rawSkew, { stiffness: 300, damping: 30 });

  return {
    style: prefersReduced
      ? {}
      : {
          skewY: skewY as MotionValue<number>,
        },
  };
};
