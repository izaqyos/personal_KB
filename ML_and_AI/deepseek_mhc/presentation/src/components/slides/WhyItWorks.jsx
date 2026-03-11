import BirkhoffViz from '../infographics/BirkhoffViz'

export default function WhyItWorks() {
  return (
    <div>
      <span className="slide-tag green">THEORY</span>
      <h2>Why It Works — <span className="gradient-text green">Mathematical Guarantees</span></h2>

      <div className="two-col" style={{ marginTop: 16 }}>
        <div>
          <h3>Three Properties That Save Training</h3>

          <div style={{ marginTop: 12 }}>
            <div className="card highlight-green" style={{ marginBottom: 12 }}>
              <h3>1. Spectral Norm ≤ 1</h3>
              <p style={{ fontSize: 14 }}>
                A doubly stochastic matrix has spectral norm (largest singular value) at most 1.
                This means it <strong>cannot amplify signals</strong> — only mix and attenuate.
                Forward pass signals stay bounded.
              </p>
            </div>

            <div className="card highlight-blue" style={{ marginBottom: 12 }}>
              <h3>2. Closure Under Multiplication</h3>
              <p style={{ fontSize: 14 }}>
                The product of two doubly stochastic matrices is also doubly stochastic.
                So even after composing H<sup>res</sup> across 30+ layers, the result is
                <em> still</em> doubly stochastic with spectral norm ≤ 1.
                <strong> Stability is structural, not learned.</strong>
              </p>
            </div>

            <div className="card highlight-purple" style={{ marginBottom: 12 }}>
              <h3>3. Birkhoff Polytope</h3>
              <p style={{ fontSize: 14 }}>
                The set of all n×n doubly stochastic matrices forms the <strong>Birkhoff polytope</strong> —
                a convex body whose vertices are the n! permutation matrices.
                This means any doubly stochastic matrix is a convex combination (weighted average)
                of permutations. The network learns <em>which mix of permutations</em> to use.
              </p>
            </div>
          </div>

          <div className="analogy-box" style={{ marginTop: 8 }}>
            <div className="label">Analogy: Birkhoff Polytope</div>
            <p style={{ fontSize: 14 }}>
              Imagine a color mixer with n! preset patterns (the permutations).
              Doubly stochastic means you can blend any of those patterns together,
              but you can't create entirely new colors (amplification). You're
              constrained to the <em>convex hull</em> — any weighted average of valid
              patterns is still valid. This is the "manifold" in mHC.
            </p>
          </div>
        </div>

        <div>
          <BirkhoffViz />

          <div className="key-insight" style={{ marginTop: 16 }}>
            <div className="label">Forward + Backward Conservation</div>
            <p style={{ fontSize: 14 }}>
              <strong>Row sums = 1</strong> → each output is a weighted average of inputs →
              forward signal magnitude is conserved.
            </p>
            <p style={{ fontSize: 14, marginTop: 8 }}>
              <strong>Column sums = 1</strong> → each input contributes equally to the total →
              backward gradient magnitude is conserved.
            </p>
            <p style={{ fontSize: 14, marginTop: 8 }}>
              Together: <strong>both forward and backward passes are bounded</strong>.
              No vanishing, no exploding — by construction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
