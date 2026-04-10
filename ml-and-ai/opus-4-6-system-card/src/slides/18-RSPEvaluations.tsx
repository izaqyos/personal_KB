import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { Badge } from '../components/ui/Badge';
import { rspEvaluations } from '../data/rsp-data';
import { motion } from 'framer-motion';
import { Biohazard, ShieldAlert, Bot } from 'lucide-react';

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.15, duration: 0.45, ease: 'easeOut' as const },
  }),
};

export default function RSPEvaluations() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Responsible Scaling Policy Evaluations"
        slideNumber={18}
      />

      <div className="grid grid-cols-3 gap-5 flex-1">
        {/* CBRN */}
        <motion.div
          custom={0}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-card-bg border border-white/5 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-3">
            <Biohazard size={18} className="text-success" />
            <h3 className="text-text-primary text-sm font-bold">{rspEvaluations.cbrn.label}</h3>
          </div>
          <div className="mb-3">
            <Badge label={rspEvaluations.cbrn.status} color={rspEvaluations.cbrn.statusColor} />
          </div>
          <p className="text-text-secondary text-xs leading-relaxed flex-1">
            {rspEvaluations.cbrn.detail}
          </p>
        </motion.div>

        {/* Cyber */}
        <motion.div
          custom={1}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-card-bg border border-white/5 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={18} className="text-warning" />
            <h3 className="text-text-primary text-sm font-bold">{rspEvaluations.cyber.label}</h3>
          </div>
          <div className="mb-3">
            <Badge label={rspEvaluations.cyber.status} color={rspEvaluations.cyber.statusColor} />
          </div>
          <div className="flex-1">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-text-secondary text-xs">Cybench (pass@30)</span>
                <span className="text-warning font-mono text-sm font-bold">
                  ~{rspEvaluations.cyber.scores.cybench}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="h-full rounded-full bg-warning"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-text-secondary text-xs">CyberGym (pass@1)</span>
                <span className="text-primary font-mono text-sm font-bold">
                  {rspEvaluations.cyber.scores.cybergym}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rspEvaluations.cyber.scores.cybergym}%` }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed mt-3">
            {rspEvaluations.cyber.detail}
          </p>
        </motion.div>

        {/* Autonomy */}
        <motion.div
          custom={2}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-card-bg border border-white/5 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-3">
            <Bot size={18} className="text-success" />
            <h3 className="text-text-primary text-sm font-bold">{rspEvaluations.autonomy.label}</h3>
          </div>
          <div className="mb-3">
            <Badge label={rspEvaluations.autonomy.status} color={rspEvaluations.autonomy.statusColor} />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-success text-4xl font-bold font-mono">
              {rspEvaluations.autonomy.surveyResult}
            </p>
            <p className="text-text-secondary/60 text-xs mt-1 text-center">
              survey participants believe full automation possible
            </p>
          </div>
          <p className="text-text-secondary text-xs leading-relaxed mt-3">
            {rspEvaluations.autonomy.detail}
          </p>
        </motion.div>
      </div>

      <Callout type="warning">
        Cybench is fully saturated. Anthropic can no longer use it to track capability progression.
        The evaluation infrastructure needs to advance to keep up.
      </Callout>
    </div>
  );
}
