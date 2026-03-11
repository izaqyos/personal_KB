import { useState } from 'react'

export default function SinkhornSteps() {
  const [step, setStep] = useState(0)

  // Simulate Sinkhorn iterations on a 3x3 matrix for visual clarity
  const steps = [
    {
      label: 'Step 0: Raw learned values',
      matrix: [[0.8, 1.2, 0.5], [0.3, 0.9, 1.1], [1.0, 0.4, 0.7]],
      desc: 'Network outputs unconstrained values. Not doubly stochastic.',
      rowSums: [2.5, 2.3, 2.1],
      colSums: [2.1, 2.5, 2.3],
    },
    {
      label: 'Step 1: Exponentiate (make positive)',
      matrix: [[2.23, 3.32, 1.65], [1.35, 2.46, 3.00], [2.72, 1.49, 2.01]],
      desc: 'M⁰ = exp(H̃). All entries now positive. But sums are way off.',
      rowSums: [7.20, 6.81, 6.22],
      colSums: [6.30, 7.27, 6.66],
    },
    {
      label: 'Step 2: Normalize rows (÷ row sum)',
      matrix: [[0.31, 0.46, 0.23], [0.20, 0.36, 0.44], [0.44, 0.24, 0.32]],
      desc: 'Each row now sums to 1.0. But columns don\'t yet.',
      rowSums: [1.00, 1.00, 1.00],
      colSums: [0.95, 1.06, 0.99],
    },
    {
      label: 'Step 3: Normalize columns (÷ col sum)',
      matrix: [[0.33, 0.43, 0.23], [0.21, 0.34, 0.45], [0.46, 0.23, 0.32]],
      desc: 'Each column now sums to ~1.0. Rows drifted slightly.',
      rowSums: [0.99, 1.00, 1.01],
      colSums: [1.00, 1.00, 1.00],
    },
    {
      label: 'After 20 iterations: Converged!',
      matrix: [[0.33, 0.44, 0.23], [0.21, 0.34, 0.45], [0.46, 0.22, 0.32]],
      desc: 'Both rows AND columns sum to 1.0. Doubly stochastic!',
      rowSums: [1.00, 1.00, 1.00],
      colSums: [1.00, 1.00, 1.00],
    },
  ]

  const current = steps[step]

  const cellColor = (val, stepIdx) => {
    if (stepIdx === 0) return 'rgba(179, 136, 255, 0.2)'
    if (stepIdx === 1) return `rgba(255, 171, 64, ${val / 4})`
    return `rgba(0, 230, 118, ${val * 1.2})`
  }

  return (
    <div className="diagram-container">
      <div className="diagram-label">Sinkhorn-Knopp: Step by Step</div>

      <div style={{ textAlign: 'center' }}>
        {/* Step navigation */}
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16 }}>
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                border: `1px solid ${i === step ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                background: i === step ? 'rgba(79,143,247,0.15)' : 'transparent',
                color: i === step ? 'var(--accent-blue)' : 'var(--text-muted)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {i}
            </button>
          ))}
        </div>

        {/* Step label */}
        <div style={{
          fontSize: 14, fontWeight: 600, color: 'var(--text-primary)',
          marginBottom: 12,
        }}>
          {current.label}
        </div>

        {/* Matrix visualization */}
        <div style={{ display: 'inline-block' }}>
          {/* Column sums on top */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: 3, marginLeft: 0, marginBottom: 4 }}>
            {current.colSums.map((s, j) => (
              <div key={j} style={{
                textAlign: 'center', fontSize: 10, fontWeight: 700,
                fontFamily: 'JetBrains Mono',
                color: Math.abs(s - 1) < 0.02 ? 'var(--accent-green)' : 'var(--accent-orange)',
              }}>
                ↓{s.toFixed(2)}
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {current.matrix.map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: 3 }}>
                {row.map((val, j) => (
                  <div key={j} style={{
                    width: 64, height: 48,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: cellColor(val, step),
                    borderRadius: 4,
                    fontSize: 14, fontWeight: 600,
                    fontFamily: 'JetBrains Mono',
                    color: 'var(--text-primary)',
                    transition: 'all 0.3s',
                  }}>
                    {val.toFixed(2)}
                  </div>
                ))}
              </div>
              {/* Row sum */}
              <div style={{
                fontSize: 10, fontWeight: 700, minWidth: 48,
                fontFamily: 'JetBrains Mono',
                color: Math.abs(current.rowSums[i] - 1) < 0.02 ? 'var(--accent-green)' : 'var(--accent-orange)',
              }}>
                →{current.rowSums[i].toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{
          marginTop: 16, fontSize: 13, color: 'var(--text-secondary)',
          padding: '8px 12px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 6,
        }}>
          {current.desc}
        </div>

        {/* Step indicator */}
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 40, height: 3, borderRadius: 2,
              background: i <= step ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
