import DoublyStochasticViz from '../infographics/DoublyStochasticViz'

export default function MHCSolution() {
  return (
    <div>
      <span className="slide-tag green">THE FIX</span>
      <h2>mHC — Constrain the Matrix to <span className="gradient-text green">Doubly Stochastic</span></h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <p>
            The core idea is elegant: force H<sup>res</sup> to be a
            <strong> doubly stochastic matrix</strong>. This is a matrix where:
          </p>

          <div className="card-grid cols-1" style={{ marginTop: 12, gridTemplateColumns: '1fr' }}>
            <div className="card highlight-green">
              <h3>Rule 1: All entries ≥ 0</h3>
              <p style={{ fontSize: 14 }}>No negative weights. Streams can only contribute positively.</p>
            </div>
            <div className="card highlight-green">
              <h3>Rule 2: Every row sums to 1</h3>
              <p style={{ fontSize: 14 }}>Each output stream is a <em>weighted average</em> of inputs. Conserves signal in the forward pass.</p>
            </div>
            <div className="card highlight-green">
              <h3>Rule 3: Every column sums to 1</h3>
              <p style={{ fontSize: 14 }}>Each input stream's total contribution is conserved. Bounds gradients in the backward pass.</p>
            </div>
          </div>

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Why This Specific Constraint?</div>
            <p style={{ fontSize: 14 }}>
              These three rules together guarantee the <strong>spectral norm ≤ 1</strong>.
              That means the matrix can never amplify — only mix and re-weight.
              Crucially, the product of two doubly stochastic matrices is also doubly
              stochastic. So even stacking 30+ layers, the composite mapping stays bounded.
            </p>
          </div>

          <div className="analogy-box" style={{ marginTop: 16 }}>
            <div className="label">Analogy</div>
            <p style={{ fontSize: 14 }}>
              Think of 4 water tanks (streams) connected by pipes. At each layer,
              water can redistribute between tanks. Doubly stochastic means:
              the total water leaving each tank equals what enters, and the total
              entering each tank equals what leaves. <strong>No water is created or destroyed</strong> —
              it just moves around. That's conservation.
            </p>
          </div>
        </div>

        <div>
          <DoublyStochasticViz />
        </div>
      </div>
    </div>
  )
}
