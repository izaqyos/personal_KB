export default function DoublyStochasticViz() {
  // Example 4x4 doubly stochastic matrix
  const matrix = [
    [0.40, 0.25, 0.20, 0.15],
    [0.20, 0.35, 0.30, 0.15],
    [0.25, 0.15, 0.25, 0.35],
    [0.15, 0.25, 0.25, 0.35],
  ]

  const cellColor = (val) => {
    const intensity = val * 2.5
    return `rgba(0, 230, 118, ${Math.min(intensity, 0.8)})`
  }

  return (
    <div>
      <div className="diagram-container">
        <div className="diagram-label">A Doubly Stochastic Matrix (4×4)</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
          <div>
            {/* Column sum labels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 52px)', gap: 3, marginLeft: 28, marginBottom: 4 }}>
              {[0,1,2,3].map(j => {
                const sum = matrix.reduce((s, row) => s + row[j], 0)
                return (
                  <div key={j} style={{
                    textAlign: 'center', fontSize: 10, fontWeight: 700,
                    color: Math.abs(sum - 1) < 0.01 ? 'var(--accent-green)' : 'var(--accent-red)',
                    fontFamily: 'JetBrains Mono'
                  }}>
                    Σ={sum.toFixed(1)}
                  </div>
                )
              })}
            </div>

            {/* Matrix */}
            {matrix.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 52px)', gap: 3
                }}>
                  {row.map((val, j) => (
                    <div key={j} style={{
                      width: 52, height: 42,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: cellColor(val),
                      borderRadius: 4,
                      fontSize: 13, fontWeight: 600,
                      fontFamily: 'JetBrains Mono',
                      color: 'var(--text-primary)',
                    }}>
                      {val.toFixed(2)}
                    </div>
                  ))}
                </div>
                {/* Row sum */}
                <div style={{
                  fontSize: 10, fontWeight: 700, minWidth: 44,
                  color: 'var(--accent-green)',
                  fontFamily: 'JetBrains Mono',
                  textAlign: 'center',
                }}>
                  → {row.reduce((s, v) => s + v, 0).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', gap: 20, fontSize: 12 }}>
            <span><span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span> All entries ≥ 0</span>
            <span><span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span> Each row → 1.0</span>
            <span><span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>✓</span> Each col ↓ 1.0</span>
          </div>
        </div>
      </div>

      {/* Before/after comparison */}
      <div className="diagram-container" style={{ marginTop: 12 }}>
        <div className="diagram-label">Unconstrained vs Doubly Stochastic</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center' }}>
          {/* Unconstrained */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-red)', fontWeight: 600, marginBottom: 8 }}>
              HC (unconstrained)
            </div>
            <div style={{
              display: 'inline-grid', gridTemplateColumns: 'repeat(3, 36px)', gap: 2
            }}>
              {[1.5, -0.3, 0.8, 0.2, 2.1, -0.4, -0.1, 0.6, 1.9].map((v, i) => (
                <div key={i} style={{
                  width: 36, height: 30,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: v < 0 ? 'rgba(255,82,82,0.2)' : v > 1.2 ? 'rgba(255,171,64,0.3)' : 'rgba(255,255,255,0.05)',
                  borderRadius: 3,
                  fontSize: 10, fontWeight: 500,
                  fontFamily: 'JetBrains Mono',
                  color: v < 0 ? 'var(--accent-red)' : v > 1.2 ? 'var(--accent-orange)' : 'var(--text-secondary)',
                }}>
                  {v > 0 ? '+' : ''}{v}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
              Negatives, large values, no sum constraint
            </div>
          </div>

          {/* Arrow */}
          <div style={{ fontSize: 24, color: 'var(--accent-green)' }}>→</div>

          {/* Constrained */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--accent-green)', fontWeight: 600, marginBottom: 8 }}>
              mHC (doubly stochastic)
            </div>
            <div style={{
              display: 'inline-grid', gridTemplateColumns: 'repeat(3, 36px)', gap: 2
            }}>
              {[0.45, 0.25, 0.30, 0.20, 0.50, 0.30, 0.35, 0.25, 0.40].map((v, i) => (
                <div key={i} style={{
                  width: 36, height: 30,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `rgba(0, 230, 118, ${v * 1.5})`,
                  borderRadius: 3,
                  fontSize: 10, fontWeight: 500,
                  fontFamily: 'JetBrains Mono',
                  color: 'var(--text-primary)',
                }}>
                  {v.toFixed(2)}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>
              All positive, rows & cols sum to 1
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
