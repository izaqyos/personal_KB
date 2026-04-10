export default function StabilityViz() {
  // Training loss comparison
  const lossSteps = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
  const baselineLoss = [4.0, 3.2, 2.8, 2.5, 2.3, 2.15, 2.05, 1.98, 1.92, 1.88, 1.85]
  const hcLoss = [4.0, 3.1, 2.65, 2.35, 2.15, 2.0, 2.15, 2.0, 1.88, 1.82, 1.80]
  const mhcLoss = [4.0, 3.05, 2.6, 2.3, 2.1, 1.95, 1.87, 1.80, 1.75, 1.72, 1.70]

  const chartW = 340
  const chartH = 180
  const padL = 40
  const padR = 10
  const padT = 20
  const padB = 30
  const plotW = chartW - padL - padR
  const plotH = chartH - padT - padB
  const minLoss = 1.5
  const maxLoss = 4.2

  const toX = (i) => padL + (i / (lossSteps.length - 1)) * plotW
  const toY = (v) => padT + plotH - ((v - minLoss) / (maxLoss - minLoss)) * plotH

  const makePath = (data) => data.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ')

  return (
    <div>
      {/* Loss curve comparison */}
      <div className="diagram-container">
        <div className="diagram-label">Training Loss (27B Model)</div>
        <svg viewBox={`0 0 ${chartW} ${chartH + 10}`} width="100%" style={{ maxWidth: chartW }}>
          {/* Grid */}
          {[2.0, 2.5, 3.0, 3.5, 4.0].map(v => (
            <g key={v}>
              <line x1={padL} y1={toY(v)} x2={chartW - padR} y2={toY(v)}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x={padL - 4} y={toY(v) + 3} textAnchor="end"
                fill="#6a6a80" fontSize="9" fontFamily="Inter">{v.toFixed(1)}</text>
            </g>
          ))}

          <text x={chartW / 2} y={chartH + 6} textAnchor="middle"
            fill="#6a6a80" fontSize="9" fontFamily="Inter">Training steps (k) →</text>

          {/* Baseline */}
          <path d={makePath(baselineLoss)} fill="none" stroke="#6a6a80" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* HC */}
          <path d={makePath(hcLoss)} fill="none" stroke="#ff5252" strokeWidth="2" />
          {/* mHC */}
          <path d={makePath(mhcLoss)} fill="none" stroke="#00e676" strokeWidth="2" />

          {/* Loss spike annotation */}
          <circle cx={toX(6)} cy={toY(hcLoss[6])} r="8"
            fill="none" stroke="#ff5252" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={toX(6) + 12} y={toY(hcLoss[6]) - 4}
            fill="#ff5252" fontSize="9" fontWeight="600" fontFamily="Inter">
            Loss spike!
          </text>

          {/* Legend */}
          <line x1={padL + 4} y1={padT - 6} x2={padL + 16} y2={padT - 6}
            stroke="#6a6a80" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x={padL + 20} y={padT - 3} fill="#6a6a80" fontSize="8" fontFamily="Inter">Baseline</text>

          <line x1={padL + 74} y1={padT - 6} x2={padL + 86} y2={padT - 6}
            stroke="#ff5252" strokeWidth="2" />
          <text x={padL + 90} y={padT - 3} fill="#ff5252" fontSize="8" fontFamily="Inter">HC</text>

          <line x1={padL + 110} y1={padT - 6} x2={padL + 122} y2={padT - 6}
            stroke="#00e676" strokeWidth="2" />
          <text x={padL + 126} y={padT - 3} fill="#00e676" fontSize="8" fontFamily="Inter">mHC</text>
        </svg>
      </div>

      {/* Gradient norm comparison */}
      <div className="diagram-container" style={{ marginTop: 12 }}>
        <div className="diagram-label">Gradient Norm Stability</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* HC gradient */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 600, marginBottom: 8 }}>
              HC — Erratic
            </div>
            <svg viewBox="0 0 140 60" width="100%">
              <polyline
                points="5,30 15,25 25,32 35,20 45,35 55,15 60,45 65,10 70,40 75,50 80,5 85,35 95,28 105,30 115,25 125,32 135,28"
                fill="none" stroke="#ff5252" strokeWidth="1.5" />
              <circle cx="80" cy="5" r="4" fill="none" stroke="#ff5252" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              Spikes at loss surge point
            </div>
          </div>

          {/* mHC gradient */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontWeight: 600, marginBottom: 8 }}>
              mHC — Stable
            </div>
            <svg viewBox="0 0 140 60" width="100%">
              <polyline
                points="5,32 15,30 25,31 35,29 45,30 55,31 65,29 75,30 85,31 95,29 105,30 115,31 125,30 135,29"
                fill="none" stroke="#00e676" strokeWidth="1.5" />
            </svg>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              Smooth throughout training
            </div>
          </div>
        </div>
      </div>

      {/* Matrix heatmap comparison */}
      <div className="diagram-container" style={{ marginTop: 12 }}>
        <div className="diagram-label">Learned H^res Visualization</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 600, marginBottom: 6 }}>HC</div>
            <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(4, 28px)', gap: 2 }}>
              {[2.1,-0.5,1.8,0.3, -0.8,3.2,-0.1,1.5, 0.4,-1.2,2.5,0.8, 1.9,0.1,-0.7,1.4].map((v, i) => (
                <div key={i} style={{
                  width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: v < 0 ? `rgba(255,82,82,${Math.abs(v) * 0.3})` : `rgba(255,171,64,${v * 0.15})`,
                  borderRadius: 2,
                  fontSize: 7, fontWeight: 500,
                  fontFamily: 'JetBrains Mono',
                  color: v < 0 ? '#ff5252' : '#ffab40',
                }}>
                  {v > 0 ? '+' : ''}{v}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>Chaotic, unbounded</div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontWeight: 600, marginBottom: 6 }}>mHC</div>
            <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(4, 28px)', gap: 2 }}>
              {[0.40,0.25,0.20,0.15, 0.20,0.35,0.30,0.15, 0.25,0.15,0.25,0.35, 0.15,0.25,0.25,0.35].map((v, i) => (
                <div key={i} style={{
                  width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `rgba(0,230,118,${v * 1.8})`,
                  borderRadius: 2,
                  fontSize: 7, fontWeight: 500,
                  fontFamily: 'JetBrains Mono',
                  color: '#e8e8f0',
                }}>
                  .{(v * 100).toFixed(0)}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 4 }}>Structured, bounded</div>
          </div>
        </div>
      </div>
    </div>
  )
}
