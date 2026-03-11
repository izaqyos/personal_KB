export default function HCDiagram() {
  const streamColors = ['#4f8ff7', '#00d4ff', '#b388ff', '#ff80ab']

  return (
    <div className="diagram-container">
      <div className="diagram-label">Hyper-Connections: n=4 Streams</div>
      <svg viewBox="0 0 360 440" width="100%" style={{ maxWidth: 360 }}>
        <defs>
          <linearGradient id="hcBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f8ff7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* 4 input streams */}
        {streamColors.map((c, i) => (
          <g key={`in-${i}`}>
            <rect x={40 + i * 75} y={20} width={60} height={30} rx={6}
              fill="#1a1a2e" stroke={c} strokeWidth="1.2" />
            <text x={70 + i * 75} y={39} textAnchor="middle"
              fill={c} fontSize="11" fontWeight="600" fontFamily="Inter">
              s{i}
            </text>
          </g>
        ))}

        <text x="180" y="12" textAnchor="middle" fill="#6a6a80" fontSize="10" fontFamily="Inter">
          4 parallel streams (expanded residual)
        </text>

        {/* Lines down from streams */}
        {streamColors.map((c, i) => (
          <line key={`l1-${i}`} x1={70 + i * 75} y1={50} x2={70 + i * 75} y2={80}
            stroke={c} strokeWidth="1" />
        ))}

        {/* H^res mixing block */}
        <rect x="30" y="80" width="300" height="60" rx="10"
          fill="url(#hcBlue)" stroke="#b388ff" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="180" y="100" textAnchor="middle" fill="#b388ff" fontSize="13" fontWeight="700" fontFamily="Inter">
          H^res (mixing matrix)
        </text>
        <text x="180" y="118" textAnchor="middle" fill="#6a6a80" fontSize="10" fontFamily="Inter">
          n×n learnable — streams exchange info
        </text>

        {/* Crossing lines inside H^res to show mixing */}
        {[0,1,2,3].map(from =>
          [0,1,2,3].filter(to => to !== from).map(to => (
            <line key={`mix-${from}-${to}`}
              x1={70 + from * 75} y1={82}
              x2={70 + to * 75} y2={138}
              stroke="#b388ff" strokeWidth="0.5" strokeOpacity="0.3" />
          ))
        )}

        {/* Lines down from H^res */}
        {streamColors.map((c, i) => (
          <line key={`l2-${i}`} x1={70 + i * 75} y1={140} x2={70 + i * 75} y2={170}
            stroke={c} strokeWidth="1" />
        ))}

        {/* H^pre aggregation */}
        {streamColors.map((c, i) => (
          <line key={`agg-${i}`} x1={70 + i * 75} y1={170} x2={180} y2={200}
            stroke={c} strokeWidth="1" strokeOpacity="0.6" />
        ))}
        <rect x="140" y="190" width="80" height="30" rx="6"
          fill="#1a1a2e" stroke="#4f8ff7" strokeWidth="1.2" />
        <text x="180" y="209" textAnchor="middle" fill="#4f8ff7" fontSize="10" fontWeight="600" fontFamily="Inter">
          H^pre · x̃
        </text>

        {/* F block */}
        <line x1="180" y1="220" x2="180" y2="245" stroke="#4f8ff7" strokeWidth="1" />
        <rect x="120" y="245" width="120" height="50" rx="8"
          fill="rgba(79,143,247,0.1)" stroke="#4f8ff7" strokeWidth="1.5" />
        <text x="180" y="267" textAnchor="middle" fill="#4f8ff7" fontSize="12" fontWeight="600" fontFamily="Inter">
          F(·, W_l)
        </text>
        <text x="180" y="283" textAnchor="middle" fill="#6a6a80" fontSize="9" fontFamily="Inter">
          Attention / FFN
        </text>

        {/* H^post expansion */}
        <line x1="180" y1="295" x2="180" y2="320" stroke="#00e676" strokeWidth="1" />
        <rect x="140" y="320" width="80" height="30" rx="6"
          fill="#1a1a2e" stroke="#00e676" strokeWidth="1.2" />
        <text x="180" y="339" textAnchor="middle" fill="#00e676" fontSize="10" fontWeight="600" fontFamily="Inter">
          H^post⊤ · F
        </text>

        {/* Fan out + merge */}
        {streamColors.map((c, i) => (
          <line key={`fan-${i}`} x1={180} y1={350} x2={70 + i * 75} y2={380}
            stroke="#00e676" strokeWidth="1" strokeOpacity="0.6" />
        ))}

        {/* Plus circles for residual merge */}
        {streamColors.map((c, i) => (
          <g key={`plus-${i}`}>
            <circle cx={70 + i * 75} cy={390} r={10} fill="#1a1a2e" stroke={c} strokeWidth="1" />
            <text x={70 + i * 75} y={394} textAnchor="middle" fill={c} fontSize="12" fontWeight="700">+</text>
          </g>
        ))}

        {/* Output streams */}
        {streamColors.map((c, i) => (
          <g key={`out-${i}`}>
            <line x1={70 + i * 75} y1={400} x2={70 + i * 75} y2={420} stroke={c} strokeWidth="1" />
            <rect x={40 + i * 75} y={420} width={60} height={20} rx={4}
              fill="#1a1a2e" stroke={c} strokeWidth="1" />
            <text x={70 + i * 75} y={434} textAnchor="middle"
              fill={c} fontSize="9" fontWeight="600" fontFamily="Inter">
              s{i}'
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
