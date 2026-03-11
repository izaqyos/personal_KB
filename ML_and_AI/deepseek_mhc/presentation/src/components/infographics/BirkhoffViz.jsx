export default function BirkhoffViz() {
  // Show the Birkhoff polytope concept: permutation matrices as vertices,
  // doubly stochastic as points inside
  const permutations = [
    { label: 'I', matrix: [[1,0,0],[0,1,0],[0,0,1]], pos: { x: 180, y: 40 } },
    { label: 'P₁', matrix: [[0,1,0],[1,0,0],[0,0,1]], pos: { x: 60, y: 160 } },
    { label: 'P₂', matrix: [[0,0,1],[0,1,0],[1,0,0]], pos: { x: 300, y: 160 } },
  ]

  return (
    <div className="diagram-container">
      <div className="diagram-label">The Birkhoff Polytope (Simplified 2D View)</div>

      <svg viewBox="0 0 360 240" width="100%" style={{ maxWidth: 360 }}>
        {/* Polytope triangle fill */}
        <polygon
          points="180,40 60,160 300,160"
          fill="rgba(79,143,247,0.06)"
          stroke="rgba(79,143,247,0.3)"
          strokeWidth="1"
        />

        {/* Interior point (our doubly stochastic matrix) */}
        <circle cx="170" cy="120" r="6" fill="#00e676" />
        <text x="182" y="114" fill="#00e676" fontSize="10" fontWeight="600" fontFamily="Inter">
          H^res
        </text>
        <text x="182" y="126" fill="#6a6a80" fontSize="9" fontFamily="Inter">
          (learned)
        </text>

        {/* Dashed lines from point to vertices showing it's a convex combination */}
        {permutations.map((p, i) => (
          <line key={i} x1={170} y1={120} x2={p.pos.x} y2={p.pos.y}
            stroke="rgba(79,143,247,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        ))}

        {/* Vertex points */}
        {permutations.map((p, i) => (
          <g key={i}>
            <circle cx={p.pos.x} cy={p.pos.y} r="5" fill="#4f8ff7" />
            <text x={p.pos.x} y={p.pos.y - 10} textAnchor="middle"
              fill="#4f8ff7" fontSize="11" fontWeight="700" fontFamily="Inter">
              {p.label}
            </text>
          </g>
        ))}

        {/* Labels */}
        <text x="180" y="195" textAnchor="middle" fill="#6a6a80" fontSize="9" fontFamily="Inter">
          Vertices = permutation matrices (n! total)
        </text>
        <text x="180" y="210" textAnchor="middle" fill="#6a6a80" fontSize="9" fontFamily="Inter">
          Interior = all doubly stochastic matrices (convex hull)
        </text>
        <text x="180" y="225" textAnchor="middle" fill="#00e676" fontSize="9" fontWeight="600" fontFamily="Inter">
          H^res lives inside this polytope — always safe
        </text>
      </svg>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
          Example: H<sup>res</sup> = 0.4·I + 0.35·P₁ + 0.25·P₂
        </div>

        {/* Show the three permutation matrices as mini grids */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {permutations.map((p, pi) => (
            <div key={pi} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, color: 'var(--accent-blue)', fontWeight: 600, marginBottom: 4 }}>
                {p.label}
              </div>
              <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 22px)', gap: 1 }}>
                {p.matrix.flat().map((v, i) => (
                  <div key={i} style={{
                    width: 22, height: 22,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: v === 1 ? 'rgba(79,143,247,0.3)' : 'rgba(255,255,255,0.03)',
                    borderRadius: 2,
                    fontSize: 10, fontWeight: v === 1 ? 700 : 400,
                    fontFamily: 'JetBrains Mono',
                    color: v === 1 ? 'var(--accent-blue)' : 'var(--text-muted)',
                  }}>
                    {v}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ fontSize: 18, color: 'var(--accent-green)', padding: '0 4px' }}>=</div>

          {/* Result */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--accent-green)', fontWeight: 600, marginBottom: 4 }}>
              H<sup>res</sup>
            </div>
            <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 22px)', gap: 1 }}>
              {[0.40, 0.35, 0.25, 0.35, 0.40, 0.25, 0.25, 0.25, 0.50].map((v, i) => (
                <div key={i} style={{
                  width: 22, height: 22,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `rgba(0, 230, 118, ${v * 1.5})`,
                  borderRadius: 2,
                  fontSize: 8, fontWeight: 600,
                  fontFamily: 'JetBrains Mono',
                  color: 'var(--text-primary)',
                }}>
                  {v.toFixed(1)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
