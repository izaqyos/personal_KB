import { motion } from 'framer-motion';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';

export default function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        Claude Opus 4.6
        <br />
        System Card
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-text-secondary text-xl mt-4"
      >
        A Visual Deep Dive
      </motion.p>

      {/* Animated page counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 flex flex-col items-center"
      >
        <AnimatedNumber
          value={212}
          decimals={0}
          duration={1800}
          className="text-6xl text-primary"
        />
        <p className="text-text-secondary text-sm mt-2 max-w-md">
          pages of safety evaluation, capabilities testing, and alignment research
        </p>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 text-text-secondary/50 text-xs font-mono tracking-wider"
      >
        Anthropic | February 2026
      </motion.p>
    </div>
  );
}
