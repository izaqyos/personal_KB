import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { BarChartComponent } from '../components/charts/BarChart';
import { effortScaling } from '../data/benchmarks';
import { motion } from 'framer-motion';

const codingData = [
  { name: 'SWE-bench Verified', opus46: 80.8, opus45: 80.9 },
  { name: 'SWE-bench Multilingual', opus46: 77.8, opus45: 74.0 },
  { name: 'Terminal-Bench 2.0', opus46: 65.4, opus45: 59.8 },
  { name: 'CyberGym', opus46: 66.6, opus45: 51.0 },
];

const codingSeries = [
  { key: 'opus46', label: 'Opus 4.6', color: '#D97757' },
  { key: 'opus45', label: 'Opus 4.5', color: '#4A90D9' },
];

export default function CodingBenchmarks() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Coding Benchmarks"
        subtitle="Real-world software engineering, terminal tasks, and vulnerability reproduction."
        slideNumber={5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Left: bar chart */}
        <div>
          <BarChartComponent
            data={codingData}
            series={codingSeries}
            xKey="name"
            layout="horizontal"
            height={280}
          />
        </div>

        {/* Right: effort scaling */}
        <div>
          <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-4">
            Adaptive Effort Scaling (Terminal-Bench)
          </p>
          <div className="flex flex-col gap-3">
            {effortScaling.map((row, i) => {
              const maxVal = 65.4;
              const pct = (row.terminalBench / maxVal) * 100;
              return (
                <motion.div
                  key={row.effort}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-text-primary text-sm font-medium">{row.effort}</span>
                    <span className="text-text-secondary text-xs font-mono">
                      {row.terminalBench}%
                      {row.tokenReduction && (
                        <span className="text-primary/70 ml-2">{row.tokenReduction}</span>
                      )}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(to right, #D97757, #D97757${row.effort === 'Max' ? '' : '99'})`,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <Callout>
        Adaptive effort lets developers trade cost for performance. At low effort, 40% fewer tokens while retaining 55% accuracy.
      </Callout>
    </div>
  );
}
