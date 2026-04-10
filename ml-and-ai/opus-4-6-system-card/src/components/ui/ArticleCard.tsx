import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Badge } from './Badge';

interface Props {
  title: string;
  authors: string;
  year: number;
  description: string;
  category: string;
  url: string;
  index: number;
}

const categoryColor: Record<string, 'primary' | 'accent' | 'secondary' | 'success' | 'warning'> = {
  alignment: 'primary',
  interpretability: 'accent',
  policy: 'secondary',
  safety: 'warning',
  foundational: 'success',
};

export function ArticleCard({ title, authors, year, description, category, url, index }: Props) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
      className="block p-4 rounded-lg bg-card-bg border border-white/5 hover:border-primary/30 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <Badge label={category} color={categoryColor[category] || 'primary'} />
        <ExternalLink size={14} className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-xs text-text-secondary mb-2">{authors}, {year}</p>
      <p className="text-xs text-text-secondary/80 leading-relaxed">{description}</p>
    </motion.a>
  );
}
