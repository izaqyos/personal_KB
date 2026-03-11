import { motion } from 'framer-motion';

interface Props {
  title: string;
  subtitle?: string;
  slideNumber?: number;
}

export function SlideHeader({ title, subtitle, slideNumber }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="mb-8"
    >
      {slideNumber !== undefined && (
        <span className="text-primary/60 font-mono text-sm mb-1 block">
          {String(slideNumber).padStart(2, '0')}
        </span>
      )}
      <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-secondary text-lg mt-2 max-w-3xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
