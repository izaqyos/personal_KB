import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { RadarChartComponent } from '../components/charts/RadarChart';
import { radarData } from '../data/benchmarks';

const series = [
  { key: 'opus46', label: 'Opus 4.6', color: '#D97757' },
  { key: 'opus45', label: 'Opus 4.5', color: '#4A90D9' },
  { key: 'gemini3Pro', label: 'Gemini 3 Pro', color: '#10B981' },
  { key: 'gpt52', label: 'GPT-5.2', color: '#8B5CF6' },
];

export default function CapabilitiesOverview() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Capabilities at a Glance"
        subtitle="Head-to-head comparison across six capability dimensions using top-line benchmarks."
        slideNumber={4}
      />

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <RadarChartComponent data={radarData} series={series} />
        </div>
      </div>

      <Callout>
        Opus 4.6 leads in agentic tasks and search, while competitors edge ahead on knowledge benchmarks.
      </Callout>
    </div>
  );
}
