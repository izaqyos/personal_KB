import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { BarChartComponent } from '../components/charts/BarChart';
import { AnimatedNumber } from '../components/ui/AnimatedNumber';
import { harmlessnessMetrics } from '../data/safety-metrics';
import { motion } from 'framer-motion';

const chartData = harmlessnessMetrics.map((m) => ({
  name: m.name,
  opus46: m.opus46,
  opus45: m.opus45,
  sonnet45: m.sonnet45,
}));

const series = [
  { key: 'opus46', label: 'Opus 4.6', color: '#D97757' },
  { key: 'opus45', label: 'Opus 4.5', color: '#4A90D9' },
  { key: 'sonnet45', label: 'Sonnet 4.5', color: '#10B981' },
];

export default function HarmlessnessDeepDive() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Higher-Difficulty Safety Evaluations"
        subtitle="Next-generation evaluations with obfuscated malicious intent and elaborate benign framing."
        slideNumber={10}
      />

      <div className="flex-1">
        <BarChartComponent
          data={chartData}
          series={series}
          xKey="name"
          layout="horizontal"
          height={280}
        />
      </div>

      {/* Key stat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center justify-center gap-3 my-4"
      >
        <AnimatedNumber
          value={140000}
          decimals={0}
          duration={1500}
          className="text-4xl text-primary"
        />
        <p className="text-text-secondary text-sm">
          synthetic prompts used in higher-difficulty evaluations
        </p>
      </motion.div>

      <Callout>
        Old evaluations saturating at 99%+. Anthropic developed harder evals with obfuscated malicious intent and elaborate academic framing of benign requests.
      </Callout>
    </div>
  );
}
