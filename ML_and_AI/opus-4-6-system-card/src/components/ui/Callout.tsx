import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, AlertTriangle, Quote } from 'lucide-react';

interface Props {
  children: ReactNode;
  type?: 'insight' | 'warning' | 'quote';
}

const config = {
  insight: { icon: Lightbulb, border: 'border-primary/40', bg: 'bg-primary/5', iconColor: 'text-primary' },
  warning: { icon: AlertTriangle, border: 'border-warning/40', bg: 'bg-warning/5', iconColor: 'text-warning' },
  quote: { icon: Quote, border: 'border-accent/40', bg: 'bg-accent/5', iconColor: 'text-accent' },
};

export function Callout({ children, type = 'insight' }: Props) {
  const { icon: Icon, border, bg, iconColor } = config[type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className={`flex gap-3 p-4 rounded-lg border ${border} ${bg} mt-6`}
    >
      <Icon size={20} className={`${iconColor} shrink-0 mt-0.5`} />
      <div className="text-sm text-text-secondary leading-relaxed">{children}</div>
    </motion.div>
  );
}
