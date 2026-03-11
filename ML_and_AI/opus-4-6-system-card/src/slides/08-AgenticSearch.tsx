import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { ScoreCard } from '../components/charts/ScoreCard';
import { motion } from 'framer-motion';

export default function AgenticSearch() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Agentic Search"
        subtitle="Finding facts across large, unstructured web documents and dense reference material."
        slideNumber={8}
      />

      {/* Score cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ScoreCard
          label="BrowseComp"
          value={84.0}
          previousValue={64.0}
          description="Finding specific facts from large, unstructured web documents"
          index={0}
        />
        <ScoreCard
          label="DeepSearchQA"
          value={91.3}
          previousValue={82.0}
          description="Multi-hop question-answering over dense reference material (F1)"
          index={1}
        />
      </div>

      {/* Multi-agent diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <p className="text-text-secondary text-xs font-medium uppercase tracking-wide">
          Multi-Agent Architecture
        </p>

        {/* Orchestrator */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-6 py-3 text-center">
          <p className="text-text-primary text-sm font-semibold">Orchestrator</p>
          <p className="text-text-secondary text-xs">Decomposes queries, synthesizes results</p>
        </div>

        {/* Connector lines */}
        <div className="flex items-start justify-center gap-12 relative">
          {/* Vertical lines from orchestrator */}
          <svg width="300" height="24" viewBox="0 0 300 24" className="absolute -top-1 left-1/2 -translate-x-1/2">
            <line x1="50" y1="0" x2="50" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="150" y1="0" x2="150" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="250" y1="0" x2="250" y2="24" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
        </div>

        {/* Agents */}
        <div className="flex gap-6 mt-2">
          {['Agent 1', 'Agent 2', 'Agent 3'].map((agent, i) => (
            <motion.div
              key={agent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
              className="bg-card-bg border border-white/10 rounded-lg px-5 py-2.5 text-center"
            >
              <p className="text-text-primary text-sm font-medium">{agent}</p>
              <p className="text-text-secondary text-[10px]">Independent search</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Callout>
        Multi-agent setup pushes BrowseComp to 86.8% and DeepSearchQA to 92.5%. Accuracy scales with compute budget.
      </Callout>
    </div>
  );
}
