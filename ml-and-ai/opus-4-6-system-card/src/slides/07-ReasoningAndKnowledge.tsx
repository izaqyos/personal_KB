import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { Badge } from '../components/ui/Badge';
import { BarChartComponent } from '../components/charts/BarChart';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';
import { motion } from 'framer-motion';

const scienceData = [
  { name: 'GPQA Diamond', opus46: 91.3, opus45: 87.0, gpt52: 93.2 },
  { name: 'AIME 2025', opus46: 99.8, opus45: 93.0, gpt52: 96.0 },
  { name: 'MMMLU', opus46: 91.1, opus45: 90.8, gpt52: 89.6 },
];

const scienceSeries = [
  { key: 'opus46', label: 'Opus 4.6', color: '#D97757' },
  { key: 'opus45', label: 'Opus 4.5', color: '#4A90D9' },
  { key: 'gpt52', label: 'GPT-5.2', color: '#8B5CF6' },
];

export default function ReasoningAndKnowledge() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Reasoning & Science"
        subtitle="Fluid intelligence, graduate-level science, and mathematical reasoning."
        slideNumber={7}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {/* Left: ARC-AGI-2 spotlight */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-card-bg rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center"
        >
          <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-6">
            ARC-AGI-2 -- Fluid Intelligence
          </p>
          <div className="flex items-center gap-6">
            {/* Opus 4.5 score */}
            <div className="text-center">
              <AnimatedNumber
                value={37.6}
                suffix="%"
                decimals={1}
                className="text-4xl text-text-secondary/40"
              />
              <p className="text-text-secondary/50 text-xs mt-1">Opus 4.5</p>
            </div>

            {/* Arrow + badge */}
            <div className="flex flex-col items-center gap-1">
              <svg width="40" height="20" viewBox="0 0 40 20" className="text-primary">
                <line x1="2" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" />
                <polygon points="30,5 40,10 30,15" fill="currentColor" />
              </svg>
              <Badge label="1.8x" color="success" />
            </div>

            {/* Opus 4.6 score */}
            <div className="text-center">
              <AnimatedNumber
                value={68.8}
                suffix="%"
                decimals={1}
                className="text-4xl text-primary"
              />
              <p className="text-primary/70 text-xs mt-1 font-semibold">Opus 4.6</p>
            </div>
          </div>
        </motion.div>

        {/* Right: bar chart */}
        <div>
          <BarChartComponent
            data={scienceData}
            series={scienceSeries}
            xKey="name"
            layout="horizontal"
            height={260}
          />
        </div>
      </div>

      <Callout>
        ARC-AGI-2 tests fluid intelligence -- pattern recognition from few examples without memorization. Opus 4.6 nearly doubles its predecessor.
      </Callout>
    </div>
  );
}
