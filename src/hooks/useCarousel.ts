"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type PointerEvent,
  type TouchEvent,
} from "react";

type Options = {
  /** Number of slides. */
  count: number;
  /** Autoplay delay in ms. */
  interval?: number;
  /** Minimum horizontal travel (px) that counts as a swipe. */
  swipeThreshold?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Reads prefers-reduced-motion without causing a hydration mismatch (server snapshot is `false`). */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Autoplaying carousel state.
 *
 * - Advances every `interval` ms and loops from the last slide back to the first.
 * - Any manual navigation restarts the countdown for the full interval.
 * - Autoplay is suspended while: the user has pressed pause, a mouse is hovering, keyboard focus is
 *   inside the carousel, the tab is hidden, or the OS asks for reduced motion (then it never starts).
 * - Spread `containerProps` on the carousel root to get the hover/focus/swipe handling.
 */
export function useCarousel({ count, interval = 3000, swipeThreshold = 50 }: Options) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  // Bumped on every manual action so the timer restarts even if the index doesn't change.
  const [restartKey, setRestartKey] = useState(0);

  const reducedMotion = usePrefersReducedMotion();
  const canAutoplay = !reducedMotion && count > 1;
  const playing = canAutoplay && !userPaused && !hovered && !focused && pageVisible;

  const goTo = useCallback(
    (target: number) => {
      setIndex(((target % count) + count) % count);
      setRestartKey((k) => k + 1);
    },
    [count],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay timer: one timeout per slide, rebuilt whenever the slide, pause state or restartKey changes.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(id);
  }, [playing, index, restartKey, count, interval]);

  // Don't burn through slides in a background tab.
  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // --- hover (mouse only: touch "hover" sticks after a tap and would freeze autoplay) ---
  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(false);
  };

  // --- focus (keyboard only: a clicked button keeps focus and would otherwise pause forever) ---
  const onFocus = (e: FocusEvent) => {
    if (e.target.matches(":focus-visible")) setFocused(true);
  };
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
  };

  // --- swipe ---
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // Ignore short moves and mostly-vertical gestures (those are page scrolls).
    if (Math.abs(dx) < swipeThreshold || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0) next();
    else prev();
  };

  return {
    index,
    playing,
    /** False when the user prefers reduced motion (or there is only one slide): hide play/pause UI. */
    canAutoplay,
    userPaused,
    togglePaused: () => setUserPaused((p) => !p),
    goTo,
    next,
    prev,
    containerProps: { onPointerEnter, onPointerLeave, onFocus, onBlur },
    swipeProps: { onTouchStart, onTouchEnd },
  };
}
