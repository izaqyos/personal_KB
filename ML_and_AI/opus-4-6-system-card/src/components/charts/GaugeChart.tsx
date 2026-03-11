import { motion } from 'framer-motion';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface Props {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  size?: number;
}

export function GaugeChart({ label, value, maxValue = 100, color = '#10B981', size = 180 }: Props) {
  const animated = useAnimatedCounter(value, 1500, 2);
  const radius = size / 2 - 15;
  const circumference = Math.PI * radius; // half circle
  const progress = (animated / maxValue) * circumference;
  const cx = size / 2;
  const cy = size / 2 + 10;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <svg width={size} height={size * 0.65} viewBox={`0 0 ${size} ${size * 0.65}`}>
        {/* Background arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#1E293B"
          strokeWidth={12}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={circumference - progress}
          style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
        />
        {/* Value text */}
        <text x={cx} y={cy - 15} textAnchor="middle" fill="#F8FAFC" fontSize={28} fontWeight={700} fontFamily="JetBrains Mono, monospace">
          {animated}%
        </text>
      </svg>
      <p className="text-text-secondary text-sm font-medium -mt-2">{label}</p>
    </motion.div>
  );
}
