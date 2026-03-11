import { SlideHeader } from '../components/layout/SlideHeader';
import { ArticleCard } from '../components/ui/ArticleCard';
import { articles } from '../data/whats-next';
import { motion } from 'framer-motion';

export default function WhatsNext() {
  return (
    <div className="h-full flex flex-col">
      <SlideHeader
        title="What's Next"
        subtitle="Recommended reading to go deeper"
        slideNumber={20}
      />

      {/* 2x4 grid of article cards */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 flex-1">
        {articles.map((a, i) => (
          <ArticleCard key={i} {...a} index={i} />
        ))}
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="text-text-secondary/40 text-[11px] mt-4 text-center"
      >
        Links open in new tabs
      </motion.p>
    </div>
  );
}
