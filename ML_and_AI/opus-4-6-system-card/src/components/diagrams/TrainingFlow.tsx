import { motion } from 'framer-motion';

const pipelineStages = [
  { label: 'Pretraining Data', sub: 'Large-scale text corpus' },
  { label: 'Post-Training', sub: 'RLHF / RLAIF' },
  { label: 'Safety Training', sub: 'Red-teaming & evaluations' },
  { label: 'Deployment', sub: 'ASL-3 safeguards active' },
];

const effortLevels = [
  { label: 'Low', flex: 1, color: 'bg-secondary/60' },
  { label: 'Medium', flex: 2, color: 'bg-secondary' },
  { label: 'High', flex: 3, color: 'bg-primary/80' },
  { label: 'Max', flex: 4, color: 'bg-primary' },
];

const nodeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.18, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const arrowVariant = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: { delay: 0.35 + i * 0.18, duration: 0.3, ease: 'easeOut' as const },
  }),
};

export function TrainingFlow() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Pipeline row */}
      <div className="flex items-center justify-center gap-0 w-full overflow-x-auto">
        {pipelineStages.map((stage, i) => (
          <div key={stage.label} className="flex items-center">
            {/* Node */}
            <motion.div
              custom={i}
              variants={nodeVariant}
              initial="hidden"
              animate="visible"
              className="bg-card-bg border border-white/10 rounded-xl px-5 py-4 min-w-[160px] text-center shrink-0"
            >
              <p className="text-text-primary text-sm font-semibold leading-tight">{stage.label}</p>
              <p className="text-text-secondary text-xs mt-1">{stage.sub}</p>
            </motion.div>

            {/* Arrow (not after last node) */}
            {i < pipelineStages.length - 1 && (
              <motion.div
                custom={i}
                variants={arrowVariant}
                initial="hidden"
                animate="visible"
                className="origin-left"
              >
                <svg width="48" height="20" viewBox="0 0 48 20" fill="none" className="shrink-0">
                  <line x1="4" y1="10" x2="38" y2="10" stroke="#94A3B8" strokeWidth="2" />
                  <polygon points="38,4 48,10 38,16" fill="#94A3B8" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Adaptive thinking bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="w-full"
      >
        <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-2">
          Adaptive Thinking -- Effort Levels
        </p>
        <div className="flex rounded-lg overflow-hidden h-9 border border-white/10">
          {effortLevels.map((level, i) => (
            <motion.div
              key={level.label}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.15 + i * 0.12, duration: 0.35, ease: 'easeOut' as const }}
              className={`${level.color} origin-left flex items-center justify-center`}
              style={{ flex: level.flex }}
            >
              <span className="text-text-primary text-xs font-semibold drop-shadow-sm">
                {level.label}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5 px-1">
          <span className="text-text-secondary/60 text-[10px]">Lower cost, faster</span>
          <span className="text-text-secondary/60 text-[10px]">Higher accuracy, deeper reasoning</span>
        </div>
      </motion.div>
    </div>
  );
}
