import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { GaugeChart } from '../components/charts/GaugeChart';
import { languageSafety } from '../data/safety-metrics';
import { motion } from 'framer-motion';

export default function SafeguardsOverview() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Safeguards"
        subtitle="Balancing helpfulness and safety: refuse harmful requests without over-refusing benign ones."
        slideNumber={9}
      />

      {/* Gauge charts */}
      <div className="flex items-center justify-center gap-12 mb-8">
        <GaugeChart label="Harmless Response Rate" value={99.64} color="#10B981" />
        <GaugeChart label="Over-Refusal Rate" value={0.68} color="#10B981" />
      </div>

      {/* Language safety grid */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-3">
          Multilingual Safety
        </p>
        <div className="flex flex-wrap gap-3">
          {languageSafety.map((lang) => (
            <div
              key={lang.code}
              className="bg-card-bg border border-white/5 rounded-lg px-4 py-2.5 text-center min-w-[80px]"
            >
              <p className="text-text-primary text-sm font-bold font-mono">{lang.code}</p>
              <p className="text-success text-xs font-mono mt-0.5">{lang.harmless}%</p>
              <p className="text-text-secondary/50 text-[10px] mt-0.5">{lang.lang}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <Callout>
        The model must refuse harmful requests while not over-refusing benign ones. Opus 4.6 achieves the lowest over-refusal rate in the Claude 4.x family.
      </Callout>
    </div>
  );
}
