import { motion } from 'framer-motion';
import { aslLevels } from '../../data/rsp-data';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

const levelVariant = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.15 + i * 0.14, duration: 0.45, ease: 'easeOut' as const },
  }),
};

const statusConfig = {
  archived: {
    border: 'border-white/10',
    bg: 'bg-card-bg',
    textAccent: 'text-text-secondary/60',
    badge: 'bg-white/5 text-text-secondary/60',
    badgeLabel: 'Archived',
    icon: Shield,
    iconColor: 'text-text-secondary/40',
  },
  current: {
    border: 'border-primary/60',
    bg: 'bg-primary/5',
    textAccent: 'text-primary',
    badge: 'bg-primary/20 text-primary',
    badgeLabel: 'Current Level',
    icon: ShieldCheck,
    iconColor: 'text-primary',
  },
  threshold: {
    border: 'border-warning/40 border-dashed',
    bg: 'bg-warning/5',
    textAccent: 'text-warning',
    badge: 'bg-warning/20 text-warning',
    badgeLabel: 'Threshold',
    icon: ShieldAlert,
    iconColor: 'text-warning',
  },
} as const;

export function ASLLevels() {
  return (
    <div className="flex flex-col gap-3 w-full">
      {aslLevels.map((asl, i) => {
        const config = statusConfig[asl.status];
        const Icon = config.icon;
        const isCurrent = asl.status === 'current';

        return (
          <motion.div
            key={asl.level}
            custom={i}
            variants={levelVariant}
            initial="hidden"
            animate="visible"
            className={`
              ${config.bg} ${config.border} border rounded-xl
              ${isCurrent ? 'px-6 py-5 ring-1 ring-primary/30' : 'px-5 py-3.5'}
              transition-all
            `}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`shrink-0 mt-0.5 ${config.iconColor}`}>
                <Icon size={isCurrent ? 24 : 20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-mono font-bold ${isCurrent ? 'text-base' : 'text-sm'} ${config.textAccent}`}>
                    {asl.level}
                  </span>
                  <span className={`text-text-primary font-semibold ${isCurrent ? 'text-base' : 'text-sm'}`}>
                    {asl.name}
                  </span>
                  <span className={`${config.badge} text-[10px] font-medium px-2 py-0.5 rounded-full`}>
                    {config.badgeLabel}
                  </span>
                </div>
                <p className={`text-text-secondary ${isCurrent ? 'text-sm mt-2' : 'text-xs mt-1'} leading-relaxed`}>
                  {asl.description}
                </p>

                {/* Extra detail for current level */}
                {isCurrent && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="mt-3 pt-3 border-t border-primary/20"
                  >
                    <p className="text-primary/80 text-xs leading-relaxed">
                      Opus 4.6 is deployed at ASL-3 with enhanced containment measures, including strict access
                      controls, monitoring, and evaluation gates for capability thresholds.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
