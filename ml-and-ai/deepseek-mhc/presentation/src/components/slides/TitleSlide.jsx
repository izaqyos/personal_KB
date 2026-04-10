export default function TitleSlide() {
  return (
    <div className="title-slide">
      <span className="slide-tag blue">PAPER DEEP DIVE</span>
      <h1>
        <span className="gradient-text">mHC</span>: Manifold-Constrained<br />
        Hyper-Connections
      </h1>
      <p className="subtitle">
        How DeepSeek tamed training instability in multi-stream residual architectures
        using a classical mathematical constraint — the doubly stochastic matrix.
      </p>
      <div className="meta">
        arXiv: 2512.24880 &nbsp;|&nbsp; DeepSeek-AI &nbsp;|&nbsp; 20 authors led by Zhenda Xie
        <br />
        Dec 2025 &nbsp;|&nbsp; Tested at 3B, 9B, 27B parameters
      </div>

      <div className="metric-row" style={{ marginTop: 40, maxWidth: 680 }}>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-green)' }}>+7.2%</div>
          <div className="metric-label">BBH vs Baseline</div>
        </div>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-cyan)', fontSize: 28 }}>3000x → 1.6</div>
          <div className="metric-label">Signal Gain Fix</div>
        </div>
        <div className="metric">
          <div className="metric-value" style={{ color: 'var(--accent-orange)' }}>6.7%</div>
          <div className="metric-label">Overhead Only</div>
        </div>
      </div>
    </div>
  )
}
