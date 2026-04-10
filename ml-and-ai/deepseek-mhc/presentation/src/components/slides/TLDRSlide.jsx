export default function TLDRSlide() {
  return (
    <div>
      <span className="slide-tag green">SUMMARY</span>
      <h2>TL;DR — The Big Picture</h2>

      <div className="card-grid cols-2" style={{ marginTop: 20 }}>
        <div className="card highlight-red">
          <div className="card-icon">🔴</div>
          <h3>The Problem</h3>
          <p style={{ fontSize: 14 }}>
            Hyper-Connections (HC) expand residual streams into n parallel paths with
            learned mixing. Great for capacity — but the mixing matrix H<sup>res</sup>
            compounds across layers, causing <strong>3000x signal amplification</strong>
            and training collapse at scale.
          </p>
        </div>

        <div className="card highlight-green">
          <div className="card-icon">🟢</div>
          <h3>The Fix</h3>
          <p style={{ fontSize: 14 }}>
            Force H<sup>res</sup> to be <strong>doubly stochastic</strong> (non-negative,
            rows & columns sum to 1). Enforced via Sinkhorn-Knopp projection (20 iterations).
            Spectral norm ≤ 1 guaranteed. <strong>Stability is architectural, not trained.</strong>
          </p>
        </div>

        <div className="card highlight-blue">
          <div className="card-icon">📊</div>
          <h3>The Results</h3>
          <p style={{ fontSize: 14 }}>
            At 27B params: beats baseline on all 8 benchmarks (+7.2% on BBH).
            Beats HC on 7/8 tasks (+2.1% BBH, +2.3% DROP). Signal gain drops
            from 3000x → 1.6x. No loss spikes.
          </p>
        </div>

        <div className="card highlight-orange">
          <div className="card-icon">⚙️</div>
          <h3>The Engineering</h3>
          <p style={{ fontSize: 14 }}>
            Custom CUDA kernels, selective recomputation, and DualPipe overlap
            reduce 4x stream expansion to just <strong>6.7% training overhead</strong>.
            Naive implementation would cost 50–100%.
          </p>
        </div>
      </div>

      <div className="key-insight" style={{ marginTop: 24 }}>
        <div className="label">The Core Insight</div>
        <p style={{ fontSize: 16 }}>
          <strong>Geometric constraints restore stability without sacrificing expressivity.</strong>
          <br /><br />
          The constraint (doubly stochastic) <em>is</em> the feature, not the limitation.
          It makes bad behavior (amplification, explosion, vanishing) architecturally impossible —
          you don't need to hope the optimizer avoids it, you make it structurally unreachable.
        </p>
        <p style={{ fontSize: 14, marginTop: 12 }}>
          This is a general principle: instead of training-time hacks (gradient clipping, loss scaling),
          <strong> design the architecture so it can't break</strong>. mHC demonstrates this beautifully.
        </p>
      </div>

      <div className="equation" style={{ marginTop: 20, fontSize: 18 }}>
        HC expressivity + ResNet stability = mHC
      </div>
    </div>
  )
}
