import { motion } from 'framer-motion';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  previousValue?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  index?: number;
}

export function ScoreCard({ label, value, previousValue, suffix = '%', prefix = '', decimals = 1, description, index = 0 }: Props) {
  const delta = previousValue !== undefined ? value - previousValue : undefined;
  const TrendIcon = delta !== undefined ? (delta > 0.5 ? TrendingUp : delta < -0.5 ? TrendingDown : Minus) : null;
  const trendColor = delta !== undefined ? (delta > 0.5 ? 'text-success' : delta < -0.5 ? 'text-danger' : 'text-text-secondary') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.4 }}
      className="bg-card-bg rounded-xl p-5 border border-white/5"
    >
      <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-3">{label}</p>
      <div className="flex items-end gap-2">
        <AnimatedNumber value={value} suffix={suffix} prefix={prefix} decimals={decimals} className="text-3xl text-text-primary" />
        {TrendIcon && delta !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-mono mb-1 ${trendColor}`}>
            <TrendIcon size={14} />
            {delta > 0 ? '+' : ''}{delta.toFixed(1)}
          </span>
        )}
      </div>
      {description && <p className="text-text-secondary/70 text-xs mt-2 leading-relaxed">{description}</p>}
    </motion.div>
  );
}
