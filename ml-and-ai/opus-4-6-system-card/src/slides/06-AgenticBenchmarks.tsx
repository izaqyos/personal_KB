import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { ScoreCard } from '../components/charts/ScoreCard';

const agenticScores = [
  { label: 'OSWorld', value: 72.7, previousValue: 66.3, description: 'Real-world desktop tasks on Ubuntu VM' },
  { label: 'tau2 Retail', value: 91.9, previousValue: 88.9, description: 'Customer service simulation' },
  { label: 'tau2 Telecom', value: 99.3, previousValue: 98.2, description: 'Technical support simulation' },
  { label: 'OpenRCA', value: 34.9, previousValue: 26.9, description: 'Root cause analysis in enterprise systems' },
  { label: 'MCP-Atlas', value: 59.5, previousValue: 62.3, description: 'Multi-step tool workflows' },
  { label: 'Finance Agent', value: 60.7, previousValue: 55.2, description: 'SEC filings research' },
];

export default function AgenticBenchmarks() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Agentic Benchmarks"
        subtitle="Autonomous task completion across desktop, customer service, and enterprise scenarios."
        slideNumber={6}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 content-start">
        {agenticScores.map((score, i) => (
          <ScoreCard
            key={score.label}
            label={score.label}
            value={score.value}
            previousValue={score.previousValue}
            description={score.description}
            index={i}
          />
        ))}
      </div>

      <Callout>
        First model to exceed 70% on OSWorld, demonstrating reliable execution of real-world desktop tasks.
      </Callout>
    </div>
  );
}
