import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { Zap, Shield, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const columns = [
  {
    icon: Zap,
    title: 'Capabilities',
    body: 'What can the model do? Benchmarks across coding, reasoning, search, and more.',
    color: '#D97757',
  },
  {
    icon: Shield,
    title: 'Safety',
    body: 'How does it behave under adversarial conditions? Tests of safeguards, honesty, and alignment.',
    color: '#10B981',
  },
  {
    icon: Scale,
    title: 'Deployment Decision',
    body: 'What safety level (ASL) should it be released under?',
    color: '#8B5CF6',
  },
];

export default function WhatIsASystemCard() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="What Is a System Card?"
        subtitle="A system card documents what a model can do, how it was tested, and why Anthropic believes it is safe to deploy."
        slideNumber={2}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {columns.map((col, i) => {
          const Icon = col.icon;
          return (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.45 }}
              className="bg-card-bg rounded-xl p-6 border border-white/5 flex flex-col"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: col.color + '15' }}
              >
                <Icon size={22} style={{ color: col.color }} />
              </div>
              <h3 className="text-text-primary text-lg font-semibold mb-2">{col.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{col.body}</p>
            </motion.div>
          );
        })}
      </div>

      <Callout>
        System cards are Anthropic's primary transparency mechanism -- released alongside each major model to inform users, researchers, and regulators.
      </Callout>
    </div>
  );
}
