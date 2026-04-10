import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  slideKey: number;
  direction: 'forward' | 'backward';
  children: ReactNode;
}

export function SlideContainer({ slideKey, direction, children }: Props) {
  const xOffset = direction === 'forward' ? 60 : -60;

  return (
    <div className="w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slideKey}
          initial={{ opacity: 0, x: xOffset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -xOffset }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-full h-full flex items-center justify-center px-8 py-16 md:px-16 lg:px-24"
        >
          <div className="w-full max-w-6xl mx-auto">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
