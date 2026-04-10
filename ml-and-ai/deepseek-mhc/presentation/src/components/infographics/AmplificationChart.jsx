export default function AmplificationChart() {
  // Simulated gain magnitude across layers
  const hcGains = [1, 1.2, 2, 5, 15, 50, 120, 300, 600, 1200, 2000, 2800, 3000, 2500, 2000]
  const mhcGains = [1, 1.0, 1.02, 1.05, 1.08, 1.1, 1.15, 1.2, 1.25, 1.3, 1.35, 1.4, 1.5, 1.55, 1.6]

  const maxVal = 3200
  const chartW = 320
  const chartH = 200
  const padL = 40
  const padB = 30
  const padT = 10
  const padR = 10
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB

  const toX = (i) => padL + (i / (hcGains.length - 1)) * plotW
  const toY = (val) => padT + plotH - (Math.min(val, maxVal) / maxVal) * plotH

  const hcPath = hcGains.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')
  const mhcPath = mhcGains.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')

  return (
    <div className="diagram-container">
      <div className="diagram-label">Composite Gain Magnitude Across Layers</div>
      <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} width="100%" style={{ maxWidth: chartW }}>
        {/* Grid lines */}
        {[0, 1000, 2000, 3000].map(v => (
          <g key={v}>
            <line x1={padL} y1={toY(v)} x2={chartW - padR} y2={toY(v)}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <text x={padL - 4} y={toY(v) + 4} textAnchor="end"
              fill="#6a6a80" fontSize="9" fontFamily="Inter">{v}</text>
          </g>
        ))}

        {/* X axis */}
        <line x1={padL} y1={toY(0)} x2={chartW - padR} y2={toY(0)}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x={chartW / 2} y={chartH + 14} textAnchor="middle"
          fill="#6a6a80" fontSize="10" fontFamily="Inter">Layer depth →</text>

        {/* Y axis label */}
        <text x="8" y={chartH / 2} textAnchor="middle" fill="#6a6a80" fontSize="9"
          fontFamily="Inter" transform={`rotate(-90, 8, ${chartH / 2})`}>Gain</text>

        {/* HC line (red) */}
        <path d={hcPath} fill="none" stroke="#ff5252" strokeWidth="2.5" />
        {/* HC area */}
        <path d={`${hcPath} L${toX(hcGains.length - 1)},${toY(0)} L${toX(0)},${toY(0)} Z`}
          fill="#ff5252" fillOpacity="0.08" />

        {/* mHC line (green) */}
        <path d={mhcPath} fill="none" stroke="#00e676" strokeWidth="2.5" />

        {/* Danger zone annotation */}
        <line x1={toX(10)} y1={toY(2800)} x2={toX(10) + 30} y2={toY(3100)}
          stroke="#ff5252" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x={toX(10) + 32} y={toY(3200) + 4}
          fill="#ff5252" fontSize="9" fontWeight="600" fontFamily="Inter">~3000x!</text>

        {/* mHC annotation */}
        <line x1={toX(14)} y1={toY(1.6)} x2={toX(14) + 20} y2={toY(1.6) - 20}
          stroke="#00e676" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x={toX(14) + 22} y={toY(1.6) - 22}
          fill="#00e676" fontSize="9" fontWeight="600" fontFamily="Inter">~1.6x</text>

        {/* Legend */}
        <rect x={padL + 8} y={padT + 4} width={8} height={8} rx="2" fill="#ff5252" />
        <text x={padL + 20} y={padT + 12} fill="#ff5252" fontSize="9" fontFamily="Inter">HC (unconstrained)</text>
        <rect x={padL + 8} y={padT + 18} width={8} height={8} rx="2" fill="#00e676" />
        <text x={padL + 20} y={padT + 26} fill="#00e676" fontSize="9" fontFamily="Inter">mHC (constrained)</text>
      </svg>

      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
        HC gain grows exponentially with depth. mHC stays flat near 1.
        <br />
        The <span style={{ color: 'var(--accent-red)' }}>red area</span> is where training becomes unstable.
      </div>
    </div>
  )
}
