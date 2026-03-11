import { SlideHeader } from '../components/layout/SlideHeader';
import { TrainingFlow } from '../components/diagrams/TrainingFlow';
import { motion } from 'framer-motion';

const facts = [
  {
    label: 'Training Data',
    value: 'Public internet (to May 2025), third-party, contractor, opted-in user data',
  },
  {
    label: 'Post-Training',
    value: 'RLHF + RLAIF (Constitutional AI)',
  },
  {
    label: 'Context Window',
    value: '1M tokens (beta)',
  },
  {
    label: 'Thinking',
    value: 'Adaptive thinking with 4 effort levels',
  },
];

export default function ModelOverview() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Model Overview"
        subtitle="Claude Opus 4.6 follows a multi-stage training pipeline combining large-scale pre-training with alignment techniques."
        slideNumber={3}
      />

      {/* Training flow diagram */}
      <div className="mb-8">
        <TrainingFlow />
      </div>

      {/* Key facts 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            className="bg-card-bg rounded-xl p-4 border border-white/5"
          >
            <p className="text-primary text-xs font-medium uppercase tracking-wide mb-1">
              {fact.label}
            </p>
            <p className="text-text-primary text-sm leading-relaxed">{fact.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
