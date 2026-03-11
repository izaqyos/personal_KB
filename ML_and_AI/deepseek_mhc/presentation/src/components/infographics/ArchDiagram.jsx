export default function ArchDiagram() {
  return (
    <div className="diagram-container">
      <div className="diagram-label">mHC in a Transformer Layer</div>

      <svg viewBox="0 0 300 520" width="100%" style={{ maxWidth: 300 }}>
        <defs>
          <linearGradient id="archBlue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f8ff7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="archGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00e676" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* mHC wrapper background */}
        <rect x="10" y="5" width="280" height="510" rx="12"
          fill="none" stroke="rgba(179,136,255,0.15)" strokeWidth="1" strokeDasharray="6 4" />
        <text x="150" y="22" textAnchor="middle" fill="#b388ff" fontSize="10" fontWeight="600" fontFamily="Inter">
          mHC WRAPPER
        </text>

        {/* Input: 4 streams */}
        <rect x="60" y="35" width="180" height="30" rx="6"
          fill="url(#archBlue)" stroke="#4f8ff7" strokeWidth="1" />
        <text x="150" y="54" textAnchor="middle" fill="#4f8ff7" fontSize="11" fontWeight="600" fontFamily="Inter">
          x̃ = [s₀, s₁, s₂, s₃]  (4×C)
        </text>

        {/* Arrow */}
        <line x1="150" y1="65" x2="150" y2="85" stroke="#6a6a80" strokeWidth="1" />
        <polygon points="146,82 154,82 150,88" fill="#6a6a80" />

        {/* Flatten + compute coefficients */}
        <rect x="40" y="90" width="220" height="40" rx="6"
          fill="rgba(179,136,255,0.08)" stroke="#b388ff" strokeWidth="1" />
        <text x="150" y="108" textAnchor="middle" fill="#b388ff" fontSize="10" fontWeight="600" fontFamily="Inter">
          Flatten → Linear → tanh
        </text>
        <text x="150" y="122" textAnchor="middle" fill="#6a6a80" fontSize="9" fontFamily="Inter">
          Compute H̃_pre, H̃_res, H̃_post
        </text>

        {/* Three branches */}
        <line x1="90" y1="130" x2="90" y2="155" stroke="#4f8ff7" strokeWidth="1" />
        <line x1="150" y1="130" x2="150" y2="155" stroke="#00e676" strokeWidth="1" />
        <line x1="210" y1="130" x2="210" y2="155" stroke="#b388ff" strokeWidth="1" />

        {/* H^pre: sigmoid */}
        <rect x="45" y="155" width="90" height="32" rx="5"
          fill="rgba(79,143,247,0.1)" stroke="#4f8ff7" strokeWidth="1" />
        <text x="90" y="170" textAnchor="middle" fill="#4f8ff7" fontSize="9" fontWeight="600" fontFamily="Inter">
          H^pre = σ(H̃)
        </text>
        <text x="90" y="182" textAnchor="middle" fill="#6a6a80" fontSize="8" fontFamily="Inter">sigmoid</text>

        {/* H^res: Sinkhorn */}
        <rect x="110" y="155" width="80" height="32" rx="5"
          fill="rgba(0,230,118,0.1)" stroke="#00e676" strokeWidth="1.5" />
        <text x="150" y="170" textAnchor="middle" fill="#00e676" fontSize="9" fontWeight="700" fontFamily="Inter">
          H^res = SK(H̃)
        </text>
        <text x="150" y="182" textAnchor="middle" fill="#6a6a80" fontSize="8" fontFamily="Inter">Sinkhorn×20</text>

        {/* H^post: 2*sigmoid */}
        <rect x="195" y="155" width="70" height="32" rx="5"
          fill="rgba(179,136,255,0.1)" stroke="#b388ff" strokeWidth="1" />
        <text x="230" y="170" textAnchor="middle" fill="#b388ff" fontSize="9" fontWeight="600" fontFamily="Inter">
          H^post = 2σ
        </text>
        <text x="230" y="182" textAnchor="middle" fill="#6a6a80" fontSize="8" fontFamily="Inter">scaled sigmoid</text>

        {/* Arrow from H^pre down to aggregation */}
        <line x1="90" y1="187" x2="90" y2="220" stroke="#4f8ff7" strokeWidth="1" />

        {/* Aggregation: H^pre · x̃ */}
        <rect x="45" y="220" width="90" height="30" rx="5"
          fill="rgba(79,143,247,0.1)" stroke="#4f8ff7" strokeWidth="1" />
        <text x="90" y="239" textAnchor="middle" fill="#4f8ff7" fontSize="10" fontWeight="600" fontFamily="Inter">
          H^pre · x̃
        </text>

        {/* Arrow to F */}
        <line x1="90" y1="250" x2="90" y2="275" stroke="#4f8ff7" strokeWidth="1" />
        <polygon points="86,272 94,272 90,278" fill="#4f8ff7" />

        {/* F block — the actual layer */}
        <rect x="30" y="280" width="120" height="55" rx="8"
          fill="rgba(79,143,247,0.12)" stroke="#4f8ff7" strokeWidth="1.5" />
        <text x="90" y="302" textAnchor="middle" fill="#4f8ff7" fontSize="12" fontWeight="700" fontFamily="Inter">
          F(·, W_l)
        </text>
        <text x="90" y="318" textAnchor="middle" fill="#6a6a80" fontSize="9" fontFamily="Inter">
          Attention or MoE FFN
        </text>
        <text x="90" y="330" textAnchor="middle" fill="#6a6a80" fontSize="8" fontFamily="Inter">
          (the expensive part)
        </text>

        {/* Arrow from F to H^post expansion */}
        <line x1="90" y1="335" x2="90" y2="360" stroke="#b388ff" strokeWidth="1" />

        {/* H^post expansion */}
        <rect x="30" y="360" width="120" height="30" rx="5"
          fill="rgba(179,136,255,0.1)" stroke="#b388ff" strokeWidth="1" />
        <text x="90" y="379" textAnchor="middle" fill="#b388ff" fontSize="10" fontWeight="600" fontFamily="Inter">
          H^post⊤ · F(·)
        </text>

        {/* H^res mixing (on the right side) */}
        <line x1="150" y1="187" x2="150" y2="400" stroke="#00e676" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Arrow labels for H^res */}
        <text x="168" y="290" fill="#00e676" fontSize="8" fontWeight="600" fontFamily="Inter"
          transform="rotate(90, 168, 290)">
          RESIDUAL PATH
        </text>

        {/* Merge point */}
        <line x1="90" y1="390" x2="90" y2="410" stroke="#b388ff" strokeWidth="1" />
        <line x1="150" y1="400" x2="150" y2="410" stroke="#00e676" strokeWidth="1" />

        {/* Addition/merge */}
        <rect x="40" y="410" width="220" height="40" rx="8"
          fill="url(#archGreen)" stroke="#00e676" strokeWidth="1.5" />
        <text x="150" y="428" textAnchor="middle" fill="#00e676" fontSize="10" fontWeight="700" fontFamily="Inter">
          x̃_{'{l+1}'} = H^res · x̃_l + H^post⊤ · F(·)
        </text>
        <text x="150" y="443" textAnchor="middle" fill="#6a6a80" fontSize="8" fontFamily="Inter">
          Residual mix + layer contribution
        </text>

        {/* Arrow to output */}
        <line x1="150" y1="450" x2="150" y2="470" stroke="#00e676" strokeWidth="1" />
        <polygon points="146,467 154,467 150,473" fill="#00e676" />

        {/* Output */}
        <rect x="60" y="475" width="180" height="30" rx="6"
          fill="url(#archGreen)" stroke="#00e676" strokeWidth="1" />
        <text x="150" y="494" textAnchor="middle" fill="#00e676" fontSize="11" fontWeight="600" fontFamily="Inter">
          x̃_{'{l+1}'} = [s₀', s₁', s₂', s₃']
        </text>
      </svg>
    </div>
  )
}
