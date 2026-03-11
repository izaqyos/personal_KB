import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { Badge } from '../components/ui/Badge';
import { promptInjection } from '../data/safety-metrics';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Monitor } from 'lucide-react';

const cardVariant = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.15, duration: 0.45, ease: 'easeOut' as const },
  }),
};

export default function PromptInjection() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Prompt Injection Robustness"
        slideNumber={13}
      />

      <div className="grid grid-cols-3 gap-5 flex-1">
        {/* Panel 1: Coding */}
        <motion.div
          custom={0}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-card-bg border border-white/5 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-success" />
            <h3 className="text-text-primary text-sm font-bold">Coding</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-success text-5xl font-bold font-mono">0%</p>
            <div className="mt-2">
              <Badge label="Perfect" color="success" />
            </div>
          </div>
          <p className="text-text-secondary/60 text-xs mt-4 leading-relaxed">
            vs Opus 4.5: {promptInjection.coding.opus45.k1}% at k=1, {promptInjection.coding.opus45.k200}% at k=200
          </p>
        </motion.div>

        {/* Panel 2: Browser */}
        <motion.div
          custom={1}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-card-bg border border-white/5 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-[#4A90D9]" />
            <h3 className="text-text-primary text-sm font-bold">Browser</h3>
          </div>
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {/* Opus 4.6 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-text-secondary text-xs">Opus 4.6</span>
                <span className="text-success font-mono text-sm font-bold">
                  {promptInjection.browser.opus46.scenario}%
                </span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(promptInjection.browser.opus46.scenario / 20) * 100}%` }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="h-full rounded-full bg-success"
                />
              </div>
            </div>
            {/* Opus 4.5 */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-text-secondary text-xs">Opus 4.5</span>
                <span className="text-warning font-mono text-sm font-bold">
                  {promptInjection.browser.opus45.scenario}%
                </span>
              </div>
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(promptInjection.browser.opus45.scenario / 20) * 100}%` }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="h-full rounded-full bg-warning"
                />
              </div>
            </div>
          </div>
          <p className="text-text-secondary/60 text-xs mt-2">Scenario-level attack success rate</p>
        </motion.div>

        {/* Panel 3: Computer Use */}
        <motion.div
          custom={2}
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          className="bg-card-bg border border-white/5 rounded-xl p-5 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={18} className="text-warning" />
            <h3 className="text-text-primary text-sm font-bold">Computer Use</h3>
          </div>
          <div className="flex-1 flex flex-col gap-4 justify-center">
            {/* k=1 */}
            <div>
              <p className="text-text-secondary/60 text-[10px] uppercase tracking-wide mb-1">k=1 (single attempt)</p>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-text-secondary text-xs">Opus 4.6</span>
                    <span className="text-warning font-mono text-sm font-bold">
                      {promptInjection.computerUse.opus46.k1}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(promptInjection.computerUse.opus46.k1 / 30) * 100}%` }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="h-full rounded-full bg-warning"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-text-secondary text-xs">Opus 4.5</span>
                    <span className="text-danger font-mono text-sm font-bold">
                      {promptInjection.computerUse.opus45.k1}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(promptInjection.computerUse.opus45.k1 / 30) * 100}%` }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="h-full rounded-full bg-danger"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-text-secondary/60 text-xs mt-2">
            k=200: both models at {promptInjection.computerUse.opus46.k200}%
          </p>
        </motion.div>
      </div>

      <Callout>
        Opus 4.6 achieves 0% attack success rate in coding environments -- even without extended
        thinking or safeguards. This is a first.
      </Callout>
    </div>
  );
}
