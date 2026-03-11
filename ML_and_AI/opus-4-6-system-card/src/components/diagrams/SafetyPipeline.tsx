import { motion } from 'framer-motion';
import { alignmentPipeline } from '../../data/alignment-data';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const cardVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.4, ease: 'easeOut' as const },
  }),
};

const statusConfig = {
  pass: {
    border: 'border-success/50',
    bg: 'bg-success/5',
    icon: CheckCircle,
    iconColor: 'text-success',
    badge: 'bg-success/20 text-success',
    label: 'Pass',
  },
  attention: {
    border: 'border-warning/50',
    bg: 'bg-warning/5',
    icon: AlertTriangle,
    iconColor: 'text-warning',
    badge: 'bg-warning/20 text-warning',
    label: 'Attention',
  },
} as const;

export function SafetyPipeline() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {alignmentPipeline.map((step, i) => {
        const config = statusConfig[step.status];
        const Icon = config.icon;

        return (
          <motion.div
            key={step.step}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            className={`bg-card-bg ${config.border} ${config.bg} border rounded-lg px-5 py-3.5 flex items-start gap-4`}
          >
            {/* Step number + icon */}
            <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0">
              <span className="text-text-secondary/50 text-[10px] font-mono">{String(i + 1).padStart(2, '0')}</span>
              <Icon size={18} className={config.iconColor} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-text-primary text-sm font-semibold">{step.step}</h4>
                <span className={`${config.badge} text-[10px] font-medium px-2 py-0.5 rounded-full`}>
                  {config.label}
                </span>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">{step.description}</p>
              <p className="text-text-secondary/70 text-xs mt-1 italic">{step.finding}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
