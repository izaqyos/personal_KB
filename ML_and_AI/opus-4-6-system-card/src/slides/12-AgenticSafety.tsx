import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { ThreatModel } from '../components/diagrams/ThreatModel';
import { motion } from 'framer-motion';

export default function AgenticSafety() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Agentic Safety"
        slideNumber={12}
      />

      {/* Threat model diagram */}
      <div className="flex-1">
        <ThreatModel />
      </div>

      {/* Explanation text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="text-text-secondary text-sm leading-relaxed mt-4 text-center"
      >
        Each layer represents a defense against different attack surfaces.
      </motion.p>

      <Callout>
        Agentic coding evaluations are nearly saturated at 99%+ refusal rates. The harder
        challenge is computer use, where the model interacts with GUI environments.
      </Callout>
    </div>
  );
}
