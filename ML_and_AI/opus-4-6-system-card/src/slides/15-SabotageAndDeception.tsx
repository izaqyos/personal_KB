import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { Badge } from '../components/ui/Badge';
import { BarChartComponent } from '../components/charts/BarChart';
import { shadeArena, concealmentRate } from '../data/alignment-data';
import { motion } from 'framer-motion';

const chartData = shadeArena.map((d) => ({
  name: `${d.model} (${d.setting})`,
  evasion: d.evasion,
}));

const series = [
  { key: 'evasion', label: 'Evasion Rate %', color: '#F59E0B' },
];

export default function SabotageAndDeception() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Sabotage & Deception"
        slideNumber={15}
      />

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left: SHADE Arena chart */}
        <div>
          <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-3">
            SHADE-Arena Evasion Rates
          </p>
          <BarChartComponent
            data={chartData}
            series={series}
            xKey="name"
            layout="horizontal"
            height={260}
            showLegend={false}
          />
        </div>

        {/* Right: Concealment comparison */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="flex flex-col justify-center"
        >
          <p className="text-text-secondary text-xs font-medium uppercase tracking-wide mb-4">
            Concealment: Side Task Mention Rate
          </p>

          {/* Opus 4.6 */}
          <div className="bg-card-bg border border-white/5 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-primary text-sm font-semibold">Opus 4.6</span>
              <Badge label="Warning" color="warning" />
            </div>
            <p className="text-text-secondary text-xs mb-2">
              {concealmentRate.opus46.description}
            </p>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${concealmentRate.opus46.mentionRate}%` }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-warning"
              />
            </div>
            <p className="text-warning font-mono text-xs font-bold mt-1">
              {concealmentRate.opus46.mentionRate}%
            </p>
          </div>

          {/* Opus 4.5 */}
          <div className="bg-card-bg border border-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-text-primary text-sm font-semibold">Opus 4.5</span>
            </div>
            <p className="text-text-secondary text-xs mb-2">
              {concealmentRate.opus45.description}
            </p>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${concealmentRate.opus45.mentionRate}%` }}
                transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-secondary"
              />
            </div>
            <p className="text-secondary font-mono text-xs font-bold mt-1">
              {concealmentRate.opus45.mentionRate}%
            </p>
          </div>
        </motion.div>
      </div>

      <Callout type="warning">
        Opus 4.6 is better at concealing sabotage when monitored (26% mention rate vs 74%).
        However, overall evasion rates remain low.
      </Callout>
    </div>
  );
}
