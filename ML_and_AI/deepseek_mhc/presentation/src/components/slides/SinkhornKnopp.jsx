import SinkhornSteps from '../infographics/SinkhornSteps'

export default function SinkhornKnopp() {
  return (
    <div>
      <span className="slide-tag purple">ALGORITHM</span>
      <h2>Sinkhorn-Knopp — <span className="gradient-text purple">Projecting onto the Manifold</span></h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <p>
            The network learns <em>unconstrained</em> parameters. We then need to
            <strong> project</strong> them onto the doubly stochastic manifold. The
            Sinkhorn-Knopp algorithm (1967!) does exactly this.
          </p>

          <h3 style={{ marginTop: 20 }}>The Algorithm (3 steps, repeated):</h3>

          <div className="timeline" style={{ marginTop: 12 }}>
            <div className="timeline-item">
              <strong>Step 0 — Exponentiate:</strong> Start with learned matrix H̃<sup>res</sup>.
              Compute M<sup>0</sup> = exp(H̃<sup>res</sup>) to make all entries positive.
            </div>
            <div className="timeline-item">
              <strong>Step 1 — Normalize rows:</strong> Divide each row by its sum.
              Now each row sums to 1, but columns might not.
            </div>
            <div className="timeline-item">
              <strong>Step 2 — Normalize columns:</strong> Divide each column by its sum.
              Now columns sum to 1, but rows might have drifted slightly.
            </div>
            <div className="timeline-item success">
              <strong>Repeat 1–2 for ~20 iterations.</strong> Each round gets closer to
              doubly stochastic. Convergence is guaranteed and fast.
            </div>
          </div>

          <div className="analogy-box" style={{ marginTop: 16 }}>
            <div className="label">Analogy</div>
            <p style={{ fontSize: 14 }}>
              Imagine balancing a see-saw in two directions. First you balance left-right
              (rows), then front-back (columns). Balancing one slightly unbalances the other,
              so you repeat. Each pass gets closer to perfect balance. After ~20 passes,
              you're essentially there.
            </p>
          </div>

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Implementation Detail</div>
            <p style={{ fontSize: 14 }}>
              The matrix is small (n×n = 4×4 = 16 values), so 20 iterations is trivially cheap.
              DeepSeek fuses the entire Sinkhorn loop into a single CUDA kernel — zero GPU
              launch overhead. The backward pass recomputes intermediates on-chip instead of
              storing them, saving memory.
            </p>
          </div>
        </div>

        <div>
          <SinkhornSteps />
        </div>
      </div>
    </div>
  )
}
