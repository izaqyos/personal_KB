import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { ASLLevels } from '../components/diagrams/ASLLevels';
import { deploymentQuote } from '../data/rsp-data';
import { motion } from 'framer-motion';

export default function ASL3Deployment() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="The ASL-3 Deployment Decision"
        slideNumber={19}
      />

      <div className="flex-1 overflow-y-auto">
        <ASLLevels />
      </div>

      {/* Quote */}
      <Callout type="quote">
        {deploymentQuote}
      </Callout>

      {/* Small footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="text-text-secondary/40 text-[11px] mt-3 text-center"
      >
        Anthropic will publish a Sabotage Risk Report for Opus 4.6 shortly after launch.
      </motion.p>
    </div>
  );
}
