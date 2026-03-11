export default function ResidualDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-label">Standard Residual Connection</div>
      <svg viewBox="0 0 360 400" width="100%" style={{ maxWidth: 360 }}>
        {/* Background */}
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f8ff7" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e676" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
        </defs>

        {/* Input */}
        <rect x="120" y="20" width="120" height="40" rx="8" fill="#1a1a2e" stroke="#4f8ff7" strokeWidth="1.5" />
        <text x="180" y="45" textAnchor="middle" fill="#e8e8f0" fontSize="14" fontWeight="600" fontFamily="Inter">x_l (input)</text>

        {/* Split point */}
        <line x1="180" y1="60" x2="180" y2="100" stroke="#4f8ff7" strokeWidth="1.5" />

        {/* Identity path (left) */}
        <line x1="180" y1="100" x2="80" y2="100" stroke="#00e676" strokeWidth="2" />
        <line x1="80" y1="100" x2="80" y2="300" stroke="#00e676" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="80" y1="300" x2="180" y2="300" stroke="#00e676" strokeWidth="2" />
        <text x="40" y="200" textAnchor="middle" fill="#00e676" fontSize="11" fontWeight="600" fontFamily="Inter" transform="rotate(-90, 40, 200)">IDENTITY PATH</text>

        {/* Residual path (right) */}
        <line x1="180" y1="100" x2="280" y2="100" stroke="#4f8ff7" strokeWidth="1.5" />
        <line x1="280" y1="100" x2="280" y2="160" stroke="#4f8ff7" strokeWidth="1.5" />

        {/* F block */}
        <rect x="220" y="160" width="120" height="60" rx="8" fill="url(#blueGrad)" fillOpacity="0.15" stroke="#4f8ff7" strokeWidth="1.5" />
        <text x="280" y="185" textAnchor="middle" fill="#4f8ff7" fontSize="12" fontWeight="600" fontFamily="Inter">F(x_l, W_l)</text>
        <text x="280" y="205" textAnchor="middle" fill="#6a6a80" fontSize="10" fontFamily="Inter">Attention / FFN</text>

        <line x1="280" y1="220" x2="280" y2="300" stroke="#4f8ff7" strokeWidth="1.5" />
        <line x1="280" y1="300" x2="200" y2="300" stroke="#4f8ff7" strokeWidth="1.5" />
        <text x="320" y="200" textAnchor="middle" fill="#4f8ff7" fontSize="11" fontWeight="600" fontFamily="Inter" transform="rotate(90, 320, 260)">RESIDUAL</text>

        {/* Addition circle */}
        <circle cx="180" cy="300" r="16" fill="#1a1a2e" stroke="#00e676" strokeWidth="1.5" />
        <text x="180" y="305" textAnchor="middle" fill="#00e676" fontSize="18" fontWeight="700" fontFamily="Inter">+</text>

        {/* Output */}
        <line x1="180" y1="316" x2="180" y2="350" stroke="#00e676" strokeWidth="1.5" />
        <rect x="120" y="350" width="120" height="40" rx="8" fill="#1a1a2e" stroke="#00e676" strokeWidth="1.5" />
        <text x="180" y="375" textAnchor="middle" fill="#e8e8f0" fontSize="14" fontWeight="600" fontFamily="Inter">x_l+1</text>

        {/* Equation */}
        <text x="180" y="15" textAnchor="middle" fill="#6a6a80" fontSize="10" fontFamily="JetBrains Mono">x_{'{l+1}'} = x_l + F(x_l, W_l)</text>
      </svg>

      <div style={{ marginTop: 12, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
        The green dashed line is the <strong style={{ color: 'var(--accent-green)' }}>identity shortcut</strong> —
        input passes through unchanged. Gradients flow directly through it.
      </div>
    </div>
  )
}
