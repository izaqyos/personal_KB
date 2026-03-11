import {
  BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Legend, Cell,
} from 'recharts';
import { motion } from 'framer-motion';

interface BarSeries {
  key: string;
  label: string;
  color: string;
}

interface Props {
  data: Record<string, string | number>[];
  series: BarSeries[];
  xKey: string;
  layout?: 'horizontal' | 'vertical';
  height?: number;
  showLegend?: boolean;
  highlightKey?: string;
}

export function BarChartComponent({
  data, series, xKey, layout = 'vertical', height = 300, showLegend = true, highlightKey,
}: Props) {
  const isHorizontal = layout === 'horizontal';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{ height }}
      className="w-full"
    >
      <ResponsiveContainer>
        <RechartsBar
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          {isHorizontal ? (
            <>
              <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 11 }} domain={[0, 'auto']} />
              <YAxis dataKey={xKey} type="category" tick={{ fill: '#94A3B8', fontSize: 11 }} width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} tick={{ fill: '#94A3B8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} />
            </>
          )}
          <Tooltip
            contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#F8FAFC' }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} maxBarSize={40}>
              {highlightKey && data.map((entry, i) => (
                <Cell key={i} fillOpacity={entry[xKey] === highlightKey ? 1 : 0.5} />
              ))}
            </Bar>
          ))}
        </RechartsBar>
      </ResponsiveContainer>
    </motion.div>
  );
}
