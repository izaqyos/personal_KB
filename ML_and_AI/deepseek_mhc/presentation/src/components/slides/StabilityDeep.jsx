import StabilityViz from '../infographics/StabilityViz'

export default function StabilityDeep() {
  return (
    <div>
      <span className="slide-tag orange">STABILITY</span>
      <h2>Stability Deep Dive — <span className="gradient-text red">HC vs mHC Signal Propagation</span></h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <h3>Measuring Stability: "Amax Gain Magnitude"</h3>
          <p style={{ marginTop: 8 }}>
            This metric tracks the maximum absolute row/column sums of the composite
            H<sup>res</sup> product across layers. Ideally, it stays near <strong>1.0</strong>.
          </p>

          <div className="comparison" style={{ marginTop: 20 }}>
            <div className="comparison-item">
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>HC (Unconstrained)</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--accent-red)' }}>~3000</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>peak gain magnitude</div>
            </div>
            <div className="comparison-arrow">→</div>
            <div className="comparison-item">
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>mHC (Constrained)</div>
              <div style={{ fontSize: 48, fontWeight: 800, color: 'var(--accent-green)' }}>~1.6</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>peak gain magnitude</div>
            </div>
          </div>

          <h3 style={{ marginTop: 20 }}>Layer-by-Layer Breakdown</h3>
          <ul className="bullet-list">
            <li><strong>Single layer:</strong> mHC gain = ~0.98–1.02 (tight band). HC varies from 0 to 20+.</li>
            <li><strong>Composite (all layers):</strong> mHC max ~1.6 at deepest layers. HC diverges exponentially.</li>
            <li><strong>Training loss:</strong> mHC maintains smooth curve. HC spikes at ~12k steps (Δ +0.030).</li>
            <li><strong>Gradient norm:</strong> mHC stable throughout. HC shows erratic oscillations at spike point.</li>
          </ul>

          <div className="warning-box" style={{ marginTop: 16 }}>
            <div className="label">Why 1.6 and not exactly 1.0?</div>
            <p style={{ fontSize: 14 }}>
              Even doubly stochastic matrices can have spectral norm slightly above 1 for
              non-square sub-blocks, and the composite includes H<sup>post</sup> contributions.
              But 1.6 vs 3000 is the difference between "works perfectly" and "explodes."
              The theoretical bound of ≤1 per H<sup>res</sup> prevents unbounded growth.
            </p>
          </div>
        </div>

        <div>
          <StabilityViz />
        </div>
      </div>
    </div>
  )
}
