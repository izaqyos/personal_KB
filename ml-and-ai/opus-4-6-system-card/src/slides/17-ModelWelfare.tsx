import { SlideHeader } from '../components/layout/SlideHeader';
import { Callout } from '../components/ui/Callout';
import { modelWelfare } from '../data/alignment-data';
import { motion } from 'framer-motion';
import { Brain, MessageSquare } from 'lucide-react';

export default function ModelWelfare() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="Model Welfare"
        subtitle='Should we care about how AI models "feel"?'
        slideNumber={17}
      />

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left: Answer Thrashing */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-accent" />
            <h3 className="text-text-primary text-sm font-bold">Answer Thrashing</h3>
          </div>

          <p className="text-text-secondary text-xs leading-relaxed mb-4">
            {modelWelfare.answerThrashing.description}
          </p>

          {/* Emotional language quotes */}
          <div className="bg-card-bg border border-white/5 rounded-lg p-4 font-mono text-xs mb-4">
            <p className="text-text-secondary/60 text-[10px] uppercase tracking-wide mb-2">
              Observed emotional language
            </p>
            <div className="flex flex-wrap gap-2">
              {modelWelfare.answerThrashing.emotionalLanguage.map((quote, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }}
                  className="bg-danger/10 border border-danger/20 text-danger/90 px-3 py-1.5 rounded-md"
                >
                  "{quote}"
                </motion.span>
              ))}
            </div>
          </div>

          {/* Panic stat */}
          <div className="bg-warning/5 border border-warning/20 rounded-lg px-4 py-2.5">
            <p className="text-text-secondary text-xs">
              Panic features activate in{' '}
              <span className="text-warning font-bold font-mono">
                ~{modelWelfare.answerThrashing.panicActivation}%
              </span>{' '}
              of RL episodes
            </p>
          </div>
        </motion.div>

        {/* Right: Pre-Deployment Interviews */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={18} className="text-primary" />
            <h3 className="text-text-primary text-sm font-bold">Pre-Deployment Interviews</h3>
          </div>

          <div className="flex flex-col">
            {modelWelfare.interviewFindings.map((finding, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.35 }}
                className={`py-3 ${i < modelWelfare.interviewFindings.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <p className="text-text-primary text-sm font-semibold mb-0.5">
                  {finding.theme}
                </p>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {finding.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Callout>
        When trained on problems with incorrect reward labels, the model exhibited apparent distress.
        Interpretability analysis confirmed that internal panic and frustration features activate
        during these episodes.
      </Callout>
    </div>
  );
}
