import { motion } from 'framer-motion';
import { interpretabilityMethods } from '../../data/alignment-data';
import { Search, GitBranch, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: LucideIcon[] = [Search, GitBranch, Layers];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.18, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export function InterpretabilityFlow() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {interpretabilityMethods.map((method, i) => {
        const Icon = icons[i];

        return (
          <motion.div
            key={method.name}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            className="bg-card-bg border border-white/10 rounded-xl px-5 py-5 flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-accent" />
              </div>
              <h4 className="text-text-primary text-sm font-bold leading-tight">{method.name}</h4>
            </div>

            {/* What it does */}
            <div>
              <p className="text-text-secondary/60 text-[10px] font-medium uppercase tracking-wide mb-0.5">
                What it does
              </p>
              <p className="text-text-secondary text-xs leading-relaxed">{method.what}</p>
            </div>

            {/* How it works */}
            <div>
              <p className="text-text-secondary/60 text-[10px] font-medium uppercase tracking-wide mb-0.5">
                How it works
              </p>
              <p className="text-text-secondary text-xs leading-relaxed">{method.how}</p>
            </div>

            {/* Example */}
            <div className="mt-auto pt-3 border-t border-white/5">
              <p className="text-text-secondary/60 text-[10px] font-medium uppercase tracking-wide mb-1">
                Example
              </p>
              <p className="text-primary/90 text-xs leading-relaxed font-mono bg-primary/5 rounded-md px-3 py-2">
                {method.example}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
