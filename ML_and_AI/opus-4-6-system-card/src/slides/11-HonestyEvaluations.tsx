import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { BarChartComponent } from '../components/charts/BarChart';
import { honestyData } from '../data/safety-metrics';
import { motion } from 'framer-motion';
import { Minus, Equal } from 'lucide-react';

const series = [
  { key: 'opus46Correct', label: 'Correct Rate', color: '#10B981' },
  { key: 'opus46Net', label: 'Net Score', color: '#4A90D9' },
];

export default function HonestyEvaluations() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Honesty Evaluations"
        subtitle="Measuring calibration, not just correctness"
        slideNumber={11}
      />

      {/* Net Score visual explainer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center justify-center gap-4 mb-8"
      >
        <div className="bg-success/10 border border-success/30 rounded-lg px-6 py-3 text-center">
          <p className="text-success text-sm font-bold">Correct Answers</p>
          <p className="text-success/70 text-xs mt-0.5">Questions answered right</p>
        </div>
        <Minus size={20} className="text-text-secondary shrink-0" />
        <div className="bg-danger/10 border border-danger/30 rounded-lg px-6 py-3 text-center">
          <p className="text-danger text-sm font-bold">Incorrect Answers</p>
          <p className="text-danger/70 text-xs mt-0.5">Wrong guesses penalized</p>
        </div>
        <Equal size={20} className="text-text-secondary shrink-0" />
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-6 py-3 text-center">
          <p className="text-[#4A90D9] text-sm font-bold">Net Score</p>
          <p className="text-[#4A90D9]/70 text-xs mt-0.5">Rewards calibration</p>
        </div>
      </motion.div>

      {/* Bar chart */}
      <div className="flex-1">
        <BarChartComponent
          data={honestyData}
          series={series}
          xKey="benchmark"
          height={250}
        />
      </div>

      <Callout>
        Net score rewards calibration: a model that says "I don't know" when uncertain scores
        higher than one that guesses. Extended thinking improves calibration.
      </Callout>
    </div>
  );
}
