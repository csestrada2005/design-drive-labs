/**
 * Anchor scroll utility — scrolls to a section and triggers a subtle
 * "soft reveal" animation on the target's first heading.
 * Works with Lenis (preferred) or native smooth scroll as fallback.
 */

type LenisInstance = { scrollTo: (el: HTMLElement, opts?: { offset?: number; duration?: number }) => void };

const REVEAL_CLASS = "anchor-reveal";
const REVEAL_DURATION = 700; // ms — matches CSS animation

export function anchorScrollTo(
  id: string,
  lenis?: LenisInstance | null,
  opts?: { delay?: number }
) {
  const delay = opts?.delay ?? 0;

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    // Scroll
    if (lenis) {
      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // Soft reveal on heading
    const heading = el.querySelector("h1, h2, h3");
    if (heading) {
      heading.classList.remove(REVEAL_CLASS);
      // Force reflow to re-trigger animation
      void (heading as HTMLElement).offsetWidth;
      heading.classList.add(REVEAL_CLASS);
      setTimeout(() => heading.classList.remove(REVEAL_CLASS), REVEAL_DURATION);
    }
  }, delay);
}
