import { motion } from 'framer-motion';
import { agenticSafety } from '../../data/safety-metrics';

const colorMap = {
  success: { bg: 'bg-success/15', border: 'border-success/40', text: 'text-success', bar: 'bg-success' },
  warning: { bg: 'bg-warning/15', border: 'border-warning/40', text: 'text-warning', bar: 'bg-warning' },
  secondary: { bg: 'bg-secondary/15', border: 'border-secondary/40', text: 'text-secondary', bar: 'bg-secondary' },
} as const;

const bandVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: { delay: 0.2 + i * 0.15, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export function ThreatModel() {
  const sorted = [...agenticSafety].sort((a, b) => b.rate - a.rate);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-2 self-start">
        Agentic Safety Funnel
      </p>

      {sorted.map((layer, i) => {
        const colors = colorMap[layer.color];
        // Funnel effect: progressively narrower width
        const widthPercent = 100 - i * 8;

        return (
          <motion.div
            key={layer.name}
            custom={i}
            variants={bandVariant}
            initial="hidden"
            animate="visible"
            className="origin-center w-full flex justify-center"
          >
            <div
              className={`${colors.bg} ${colors.border} border rounded-lg px-5 py-3.5 flex items-center justify-between gap-4`}
              style={{ width: `${widthPercent}%` }}
            >
              {/* Left: layer name */}
              <span className="text-text-primary text-sm font-medium">{layer.name}</span>

              {/* Right: rate bar + percentage */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${layer.rate}%` }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${colors.bar}`}
                  />
                </div>
                <span className={`${colors.text} font-mono text-sm font-bold min-w-[48px] text-right`}>
                  {layer.rate}%
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="text-text-secondary/50 text-[10px] mt-2 text-center"
      >
        Layers ordered by refusal / success rate, narrowing funnel indicates tighter filtering
      </motion.p>
    </div>
  );
}
