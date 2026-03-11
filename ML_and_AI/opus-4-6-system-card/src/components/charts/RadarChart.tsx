import {
  Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
  axis: string;
  [key: string]: string | number;
}

interface Series {
  key: string;
  label: string;
  color: string;
}

interface Props {
  data: DataPoint[];
  series: Series[];
}

export function RadarChartComponent({ data, series }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full h-80"
    >
      <ResponsiveContainer>
        <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: '#94A3B8', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
          {series.map((s) => (
            <Radar
              key={s.key}
              name={s.label}
              dataKey={s.key}
              stroke={s.color}
              fill={s.color}
              fillOpacity={s.key === 'opus46' ? 0.15 : 0.05}
              strokeWidth={s.key === 'opus46' ? 2.5 : 1.5}
            />
          ))}
          <Legend
            wrapperStyle={{ fontSize: 12, color: '#94A3B8' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#F8FAFC' }}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </motion.div>
  );
}
