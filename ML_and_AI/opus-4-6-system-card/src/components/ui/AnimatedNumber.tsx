import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({ value, suffix = '', prefix = '', decimals = 1, duration = 1200, className = '' }: Props) {
  const animated = useAnimatedCounter(value, duration, decimals);
  return (
    <span className={`font-mono font-bold ${className}`}>
      {prefix}{animated}{suffix}
    </span>
  );
}
