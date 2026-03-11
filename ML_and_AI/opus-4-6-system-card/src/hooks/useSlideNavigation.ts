import { useState, useEffect, useCallback } from 'react';

export function useSlideNavigation(totalSlides: number) {
  const getInitialSlide = () => {
    const hash = window.location.hash;
    const match = hash.match(/^#\/slide\/(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n >= 1 && n <= totalSlides) return n - 1;
    }
    return 0;
  };

  const [current, setCurrent] = useState(getInitialSlide);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return;
    setDirection(index > current ? 'forward' : 'backward');
    setCurrent(index);
    window.location.hash = `#/slide/${index + 1}`;
  }, [current, totalSlides]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Backspace') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(totalSlides - 1);
      }
    };

    const handleHashChange = () => {
      const match = window.location.hash.match(/^#\/slide\/(\d+)$/);
      if (match) {
        const n = parseInt(match[1], 10) - 1;
        if (n >= 0 && n < totalSlides && n !== current) {
          setDirection(n > current ? 'forward' : 'backward');
          setCurrent(n);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [current, next, prev, goTo, totalSlides]);

  return { current, direction, next, prev, goTo, totalSlides };
}
